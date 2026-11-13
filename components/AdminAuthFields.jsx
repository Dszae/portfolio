"use client";

import { useState } from 'react';

/* Form controls shared by the admin sign-in, reset request and new password screens. */

export const FIELD =
  'h-10 w-full rounded-lg border border-white/10 bg-[#232325] px-3 text-sm text-[#ededed] placeholder:text-[#85858b] outline-none transition-colors duration-150 hover:border-white/20 focus-visible:border-[#34D399] focus-visible:ring-2 focus-visible:ring-[#34D399]/25 disabled:opacity-60';

export const LABEL = 'block text-[13px] font-medium text-[#ededed]';

export const QUIET_LINK =
  'rounded text-[13px] text-[#a1a1a6] underline-offset-4 transition-colors duration-150 hover:text-[#ededed] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]';

export function formatWait(seconds) {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${rest}`;
}

export function Notice({ tone = 'neutral', children }) {
  if (tone === 'error') {
    return (
      <p role="alert" className="rounded-lg border border-[#e5484d]/30 bg-[#e5484d]/10 px-3 py-2.5 text-[13px] leading-5 text-[#f1a5a8]">
        {children}
      </p>
    );
  }
  return (
    <p role="status" className="rounded-lg border border-white/10 bg-[#19191b] px-3 py-2.5 text-[13px] leading-5 text-[#a1a1a6]">
      {children}
    </p>
  );
}

export function FieldError({ id, children }) {
  if (!children) return null;
  return <p id={id} className="mt-2 text-xs text-[#f1a5a8]">{children}</p>;
}

function EyeIcon({ hidden }) {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {hidden ? (
        <>
          <path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61" />
          <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          <path d="m2 2 20 20" />
        </>
      ) : (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

/* Password input with a show / hide toggle and a Caps Lock hint. */
export function PasswordField({ id, label, labelAction, value, onChange, autoComplete, inputRef, disabled, error, hint }) {
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const trackCapsLock = (event) => {
    if (typeof event.getModifierState === 'function') {
      setCapsLock(event.getModifierState('CapsLock'));
    }
  };

  const describedBy = error ? `${id}-error` : capsLock ? `${id}-caps` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={id} className={LABEL}>{label}</label>
        {labelAction}
      </div>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyUp={trackCapsLock}
          onKeyDown={trackCapsLock}
          onBlur={() => setCapsLock(false)}
          autoComplete={autoComplete}
          maxLength={200}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${FIELD} pr-11 [&::-ms-clear]:hidden [&::-ms-reveal]:hidden`}
        />
        <button
          type="button"
          onClick={() => setVisible((shown) => !shown)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          aria-controls={id}
          className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-md text-[#85858b] transition-colors duration-150 hover:bg-white/5 hover:text-[#ededed] focus-visible:outline-2 focus-visible:outline-[#34D399]"
        >
          <EyeIcon hidden={visible} />
        </button>
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
      {!error && capsLock && <p id={`${id}-caps`} className="mt-2 text-xs text-[#a1a1a6]">Caps Lock is on</p>}
      {!error && !capsLock && hint && <p id={`${id}-hint`} className="mt-2 text-xs text-[#85858b]">{hint}</p>}
    </div>
  );
}

export function SubmitButton({ loading, disabled, loadingLabel, children }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#ededed] text-sm font-medium text-[#141415] transition-[background-color,transform] duration-150 hover:bg-white active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] disabled:cursor-not-allowed disabled:bg-[#232325] disabled:text-[#85858b] disabled:active:scale-100"
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-6.22-8.56" />
        </svg>
      )}
      <span>{loading ? loadingLabel : children}</span>
    </button>
  );
}
