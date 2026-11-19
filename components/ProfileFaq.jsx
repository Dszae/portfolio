import { PROFILE_FAQ } from '@/lib/profileFaq';

const LINK_PATTERN = /(https?:\/\/[^\s,]*[^\s,.]|[\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
const OWN_ORIGIN = 'https://www.dipeshsapkota7.com.np';

function linkify(text) {
  return text.split(LINK_PATTERN).map((part, i) => {
    if (i % 2 === 0) return part;
    const isEmail = !part.startsWith('http');
    const isExternal = !isEmail && !part.startsWith(OWN_ORIGIN);
    return (
      <a
        key={i}
        href={isEmail ? `mailto:${part}` : part}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-[#065F46] dark:text-[#34D399] underline underline-offset-4 break-words hover:opacity-80"
      >
        {part}
      </a>
    );
  });
}

/**
 * Collapsed identity FAQ. Native <details> keeps the answers in the server
 * HTML while closed, so crawlers read the same text as the FAQPage JSON-LD.
 */
export default function ProfileFaq() {
  return (
    <details id="about-dipesh-sapkota" className="group mt-16 border-t border-[#CBD5E1] dark:border-[#334155]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] transition-colors [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]">
        <h2 className="font-mono text-xs font-semibold">About Dipesh Sapkota</h2>
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>

      <dl className="divide-y divide-[#CBD5E1] dark:divide-[#334155] pb-4">
        {PROFILE_FAQ.map(({ question, answer }) => (
          <div key={question} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8">
            <dt className="md:col-span-4">
              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{question}</h3>
            </dt>
            <dd className="md:col-span-8 text-sm sm:text-base leading-relaxed text-[#1E293B] dark:text-[#E2E8F0]">
              {linkify(answer)}
            </dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
