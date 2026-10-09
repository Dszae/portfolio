import Link from 'next/link';

const siteUrl = 'https://www.dipeshsapkota7.com.np';

export default function BreadcrumbJsonLd({ items }) {
  if (!items || items.length === 0) return null;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, path }, index) => {
      const cleanPath = path.split('#')[0] || '/';
      const normalizedPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
      const fullUrl = `${siteUrl}${normalizedPath}`;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name,
        item: fullUrl,
      };
    }),
  };

  const scriptId = `breadcrumb-json-ld-${items[items.length - 1]?.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'page'}`;

  return (
    <>
      <script
        id={scriptId}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#334155] dark:text-[#94A3B8]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map(({ name, path }, index) => (
            <li key={path} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index === items.length - 1 ? (
                <span aria-current="page" className="font-semibold text-[#0F172A] dark:text-[#F9FAFB]">{name}</span>
              ) : (
                <Link href={path} className="hover:text-[#065F46] dark:hover:text-[#34D399] hover:underline font-medium">
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
