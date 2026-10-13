export default function Page() {
  const xTicks = ['15/07/2026', '26/07/2026', '06/08/2026', '17/08/2026', '28/08/2026', '08/09/2026', '19/09/2026', '30/09/2026'];

  return (
    <main className="min-h-screen bg-[#dfe3e5] px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1180px] rounded-[28px] border border-[#d5d8d9] bg-[#f4f4f4] p-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
        <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-[#d8d8d8] bg-[#e8e8e8]">
          <div className="border-r border-[#d8d8d8] bg-[#d9d9d9] px-5 pb-4 pt-3.5">
            <div className="flex items-center gap-3 text-[#1d1d1d]">
              <span className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-[#5d5d5d] bg-[#f4f4f4] shadow-inner">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-[#3a3a3a]" aria-hidden="true">
                  <path d="M3.5 8.5l2.2 2.2 6.8-7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[16px] font-medium">Not indexed</span>
            </div>
            <div className="mt-4 text-[52px] font-medium leading-none text-[#3a3a3a]">5</div>
            <div className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#4b4f52]">
              <span>1 reason</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#bfc3c5] text-[11px] font-semibold text-[#4f565a]">?</span>
            </div>
          </div>

          <div className="bg-[#1ea86d] px-5 pb-4 pt-3.5 text-[#fff]">
            <div className="flex items-center gap-3 text-[#ebfff4]">
              <span className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-[#0a7d4d] bg-[#1fa86f] shadow-inner">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-none stroke-[#e6fff0]" aria-hidden="true">
                  <path d="M3.5 8.5l2.2 2.2 6.8-7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[16px] font-medium">Indexed</span>
            </div>
            <div className="mt-4 text-[52px] font-medium leading-none text-white">2</div>
            <div className="mt-2 flex justify-end">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#7bddaa] bg-[#1f9f67]/60 text-[12px] font-semibold text-[#ebfff4]">?</span>
            </div>
          </div>
        </div>

        <section className="mt-7 rounded-[20px] border border-[#dfe1e2] bg-[#f5f5f5] px-3 pb-4 pt-2">
          <div className="mb-4 flex items-center gap-3 pl-1 text-[#2d2f31]">
            <span className="flex h-5 w-5 items-center justify-center rounded-[4px] border border-[#9ba0a3] bg-[#f6f6f6]">
              <span className="h-2.5 w-2.5 rounded-[2px] border border-[#9aa0a4] bg-transparent" />
            </span>
            <span className="text-[18px] font-medium">Impressions</span>
          </div>

          <div className="rounded-[10px] border border-[#d9dde0] bg-[#f3f3f3] px-3 pb-2 pt-4">
            <div className="relative h-[215px] overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                {[0, 1, 2, 3, 4].map((line) => (
                  <div key={line} className="absolute inset-x-0 border-t border-[#c9ced2]" style={{ top: `${(line / 4) * 100}%` }} />
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-0 left-3 right-3 top-0">
                <div className="absolute right-0 top-8 h-44 w-[180px] opacity-95">
                  <div className="absolute inset-x-0 bottom-0 top-0">
                    <div className="absolute bottom-0 left-0 right-0 h-[78%] rounded-[3px] bg-[#dfe3e5]" />
                    <div className="absolute bottom-0 left-0 right-0 flex h-[80%] items-end justify-between gap-[4px] px-[3px] pb-[0px]">
                      {[...Array(15)].map((_, i) => (
                        <span key={i} className="w-[7px] rounded-[1.5px] bg-[#1ea86d]" style={{ height: `${22 + ((i * 11) % 18)}px` }} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex h-[38%] items-end justify-between gap-[4px] px-[3px] pb-[0px]">
                      {[...Array(8)].map((_, i) => (
                        <span key={i} className="w-[7px] rounded-[1.5px] bg-[#d7dbdd]" style={{ height: `${16 + ((i * 21) % 26)}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-3 bottom-0 flex items-end justify-between text-[11px] text-[#6d7277]">
                {xTicks.map((tick) => (
                  <span key={tick} className="font-medium">{tick}</span>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-5 flex w-full items-center justify-between rounded-[20px] border border-[#c8cbce] bg-[#f3f3f3] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition hover:bg-[#eef1f1]">
            <span className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#6d9d80] bg-[#dfeff0] text-[#1b8d66]">
                <svg viewBox="0 0 18 18" className="h-4 w-4 fill-none stroke-current" aria-hidden="true">
                  <path d="M5.2 9.4l2.7 2.8 6.1-7" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[16px] font-medium text-[#202426]">View data about indexed pages</span>
            </span>
            <span className="text-[26px] leading-none text-[#4f575b]">›</span>
          </button>
        </section>

        <section className="mt-8 rounded-[22px] border border-[#d8d9d9] bg-[#f1f2f2] p-0 shadow-[0_8px_20px_rgba(148,163,184,0.08)]">
          <div className="flex items-center justify-between border-b border-[#d5d7d8] px-5 py-4">
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d8d9da] text-[20px] font-semibold text-[#4a4f54]">i</span>
              <div>
                <h2 className="text-[26px] font-medium tracking-[-0.02em] text-[#2d2f31]">Why pages aren&apos;t indexed</h2>
                <p className="mt-1 text-[14px] text-[#5f656b]">Pages that aren&apos;t indexed can&apos;t be served on Google</p>
              </div>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d1d4d6] bg-[#e9ecec] text-[#5c6267]">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M4 12.6h12v1.1H4zm0-3.8h12v1.1H4zm0-3.8h12v1.1H4z" />
              </svg>
            </div>
          </div>

          <div className="px-5 pb-4 pt-4">
            <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_80px] items-center gap-3 border-b border-[#d7d8d9] pb-3 text-[14px] font-medium text-[#4f565a]">
              <div className="flex items-center gap-2">Reason</div>
              <div className="flex items-center gap-1 justify-start">
                <span>Source</span>
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#a5a9ad] text-[10px] leading-none text-[#636a70]">?</span>
              </div>
              <div className="text-right">Validation</div>
              <div className="text-right">Trend</div>
              <div className="text-right">Pages</div>
            </div>

            <div className="grid grid-cols-[minmax(0,2.1fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_minmax(120px,0.8fr)_80px] items-center gap-3 pt-4 text-[14px] text-[#2e2f31]">
              <div className="font-medium">Crawled - currently not indexed</div>
              <div className="text-left text-[#5c6267]">Google systems</div>
              <div className="flex items-center justify-center gap-2 text-[#2d2f31]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f7d2d2] text-[12px] font-semibold text-[#b12f2f]">!</span>
                <span className="font-semibold">Not Started</span>
              </div>
              <div className="text-center text-[#5d6165]">—</div>
              <div className="text-right font-medium">5</div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-[#d8d9db] px-5 py-3 text-[12px] text-[#4e5459]">
            <span>Rows per page:</span>
            <div className="flex items-center gap-2 rounded border border-[#c9cdd0] bg-[#f8f8f8] px-2 py-1">
              <span>10</span>
              <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M2 4.5 6 8l4-3.5z" /></svg>
            </div>
            <span className="px-2">1-1 of 1</span>
            <div className="flex items-center gap-2 text-[#7d8185]">
              <button className="h-7 w-7 rounded border border-[#cfd3d5] bg-[#f3f3f3] text-lg leading-none">‹</button>
              <button className="h-7 w-7 rounded border border-[#cfd3d5] bg-[#f3f3f3] text-lg leading-none">›</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
