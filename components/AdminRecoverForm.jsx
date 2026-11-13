"use client";

import { useEffect, useRef, useState } from 'react';
import { FIELD, LABEL, FieldError, Notice, SubmitButton, formatWait } from './AdminAuthFields';

/* Asks the server to email a password reset link to the site owner. */
export default function AdminRecoverForm({ linkMinutes = 15 }) {
  const submitting = useRef(false);
  const inputRef = useRef(null);

  const [identifier, setIdentifier] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [waitFor, setWaitFor] = useState(0);

  const waiting = waitFor > 0;

  useEffect(() => {
    if (!waiting) return undefined;
    const timer = setInterval(() => setWaitFor((seconds) => Math.max(0, seconds - 1)), 1000);
    return () => clearInterval(timer);
  }, [waiting]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting.current || waiting) return;

    if (!identifier.trim()) {
      setFieldError('Enter your username or email');
      inputRef.current?.focus();
      return;
    }

    submitting.current = true;
    setFieldError('');
    setError('');
    setSent(false);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ identifier: identifier.trim() }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSent(true);
      } else if (response.status === 429) {
        setWaitFor(Number(data.retryAfterSeconds) || 900);
      } else if (response.status === 503) {
        setError('Email reset is not set up on this server. Use the steps below to reset from the deployment');
      } else {
        setError(data.error || 'The request failed. Try again');
      }
    } catch {
      setError('Could not reach the server. Check your connection and try again');
    }

    submitting.current = false;
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={loading} className="mt-8 space-y-5">
      {sent && (
        <Notice>
          If that matches the admin account, a reset link is on its way to the owner&apos;s inbox. It works once and expires in {linkMinutes} minutes
        </Notice>
      )}
      {waiting && (
        <Notice tone="error">
          Too many reset requests. Try again in <span className="tabular-nums">{formatWait(waitFor)}</span>
        </Notice>
      )}
      {!waiting && error && <Notice tone="error">{error}</Notice>}

      <div>
        <label htmlFor="admin-recover-identifier" className={`${LABEL} mb-2`}>
          Username or email
        </label>
        <input
          ref={inputRef}
          id="admin-recover-identifier"
          name="identifier"
          type="text"
          value={identifier}
          onChange={(event) => setIdentifier(event.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          autoFocus
          maxLength={200}
          disabled={loading}
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? 'admin-recover-identifier-error' : undefined}
          className={FIELD}
        />
        <FieldError id="admin-recover-identifier-error">{fieldError}</FieldError>
      </div>

      <SubmitButton loading={loading} disabled={waiting} loadingLabel="Sending">
        {sent ? 'Send another link' : 'Send reset link'}
      </SubmitButton>
    </form>
  );
}
