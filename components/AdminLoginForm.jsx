"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FIELD, LABEL, QUIET_LINK, FieldError, Notice, PasswordField, SubmitButton, formatWait } from './AdminAuthFields';

const NOTICES = {
  expired: 'Your session ended. Sign in again to continue',
  'signed-out': 'You are signed out',
  'password-reset': 'Password changed. Sign in with the new password',
};

export default function AdminLoginForm({ reason = '', sessionHours = 12, maxAttempts = 5, lockMinutes = 15 }) {
  const router = useRouter();
  const submitting = useRef(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [lockedFor, setLockedFor] = useState(0);
  const [notice, setNotice] = useState(NOTICES[reason] || '');

  const locked = lockedFor > 0;

  useEffect(() => {
    if (!locked) return undefined;
    const timer = setInterval(() => setLockedFor((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => clearInterval(timer);
  }, [locked]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current || locked) return;

    const missing = {};
    if (!username.trim()) missing.username = 'Enter your username or email';
    if (!password) missing.password = 'Enter your password';
    setFieldErrors(missing);
    if (missing.username) {
      usernameRef.current?.focus();
      return;
    }
    if (missing.password) {
      passwordRef.current?.focus();
      return;
    }

    submitting.current = true;
    setLoading(true);
    setError('');
    setNotice('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.replace('/admin');
        router.refresh();
        return;
      }

      if (response.status === 429) {
        setLockedFor(Number(data.retryAfterSeconds) || lockMinutes * 60);
        setPassword('');
      } else if (response.status === 401) {
        const left = Number(data.attemptsRemaining);
        const hint = Number.isFinite(left) && left <= 2 ? `. ${left} ${left === 1 ? 'attempt' : 'attempts'} left before a ${lockMinutes} minute lock` : '';
        setError(`Incorrect username or password${hint}`);
        setPassword('');
        passwordRef.current?.focus();
      } else if (response.status === 503) {
        setError('Sign-in is not set up on this server. Add the admin credentials to the environment');
      } else {
        setError(data.error || 'Sign-in failed. Try again');
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again');
    }

    submitting.current = false;
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={loading} className="mt-8 space-y-5">
      {notice && !error && !locked && <Notice>{notice}</Notice>}

      {locked && (
        <Notice tone="error">
          Too many failed attempts. Try again in <span className="tabular-nums">{formatWait(lockedFor)}</span>
        </Notice>
      )}
      {!locked && error && <Notice tone="error">{error}</Notice>}

      <div>
        <label htmlFor="admin-username" className={`${LABEL} mb-2`}>
          Username or email
        </label>
        <input
          ref={usernameRef}
          id="admin-username"
          name="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          maxLength={200}
          disabled={loading}
          aria-invalid={Boolean(fieldErrors.username)}
          aria-describedby={fieldErrors.username ? 'admin-username-error' : undefined}
          className={FIELD}
        />
        <FieldError id="admin-username-error">{fieldErrors.username}</FieldError>
      </div>

      <PasswordField
        id="admin-password"
        label="Password"
        labelAction={<Link href="/admin/forgot-password" className={QUIET_LINK}>Forgot password</Link>}
        value={password}
        onChange={setPassword}
        autoComplete="current-password"
        inputRef={passwordRef}
        disabled={loading}
        error={fieldErrors.password}
      />

      <SubmitButton loading={loading} disabled={locked} loadingLabel="Signing in">
        {locked ? 'Sign-in locked' : 'Sign in'}
      </SubmitButton>

      <p className="text-xs leading-5 text-[#85858b]">
        Sessions end after {sessionHours} hours. {maxAttempts} failed attempts lock sign-in for {lockMinutes} minutes
      </p>
    </form>
  );
}
