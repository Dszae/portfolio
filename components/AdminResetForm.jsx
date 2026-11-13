"use client";

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Notice, PasswordField, QUIET_LINK, SubmitButton } from './AdminAuthFields';

/* Chooses a new password from an emailed reset link. */
export default function AdminResetForm({ token, minLength = 10 }) {
  const router = useRouter();
  const submitting = useRef(false);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [linkDead, setLinkDead] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current || linkDead) return;

    const problems = {};
    if (password.length < minLength) problems.password = `Use at least ${minLength} characters`;
    else if (confirm !== password) problems.confirm = 'The two passwords do not match';
    setFieldErrors(problems);
    if (problems.password) {
      passwordRef.current?.focus();
      return;
    }
    if (problems.confirm) {
      confirmRef.current?.focus();
      return;
    }

    submitting.current = true;
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        router.replace('/admin/login?reason=password-reset');
        router.refresh();
        return;
      }

      if (data.code === 'weak_password') {
        setFieldErrors({ password: data.error });
        passwordRef.current?.focus();
      } else if (data.code === 'invalid_token') {
        setLinkDead(true);
        setError('This reset link has expired or was already used');
      } else if (response.status === 429) {
        setError('Too many attempts. Wait a few minutes and try again');
      } else {
        setError(data.error || 'The password could not be saved. Try again');
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again');
    }

    submitting.current = false;
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={loading} className="mt-8 space-y-5">
      {error && <Notice tone="error">{error}</Notice>}

      <PasswordField
        id="admin-new-password"
        label="New password"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
        inputRef={passwordRef}
        disabled={loading || linkDead}
        error={fieldErrors.password}
        hint={`At least ${minLength} characters`}
      />

      <PasswordField
        id="admin-confirm-password"
        label="Repeat the new password"
        value={confirm}
        onChange={setConfirm}
        autoComplete="new-password"
        inputRef={confirmRef}
        disabled={loading || linkDead}
        error={fieldErrors.confirm}
      />

      <SubmitButton loading={loading} disabled={linkDead} loadingLabel="Saving">
        Save new password
      </SubmitButton>

      {linkDead ? (
        <Link href="/admin/forgot-password" className={QUIET_LINK}>Request a new link</Link>
      ) : (
        <p className="text-xs leading-5 text-[#85858b]">Saving signs out every open session, including this browser</p>
      )}
    </form>
  );
}
