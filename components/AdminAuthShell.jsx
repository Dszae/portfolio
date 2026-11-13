import Link from 'next/link';

/* Shared frame for the admin sign-in and password reset screens. */
export default function AdminAuthShell({ title, description, children, wide = false }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#141415] text-[#ededed] antialiased selection:bg-[#34D399] selection:text-[#141415]">
      <header className="flex h-14 items-center justify-between border-b border-white/[0.08] px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#34D399] text-xs font-semibold text-[#0f0f10]" aria-hidden="true">
            DS
          </span>
          <span className="text-sm font-medium">Dipesh Sapkota</span>
          <span className="text-sm text-[#85858b]">Admin</span>
        </div>
        <Link
          href="/"
          className="rounded text-[13px] text-[#a1a1a6] underline-offset-4 transition-colors duration-150 hover:text-[#ededed] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
        >
          Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className={`w-full ${wide ? 'max-w-[480px]' : 'max-w-[360px]'}`}>
          <h1 className="text-[28px] font-medium leading-tight text-[#ededed]">{title}</h1>
          {description && <p className="mt-2 text-sm leading-6 text-[#a1a1a6]">{description}</p>}
          {children}
        </div>
      </main>
    </div>
  );
}
