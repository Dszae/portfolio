export default async function sitemap() {
  const baseUrl = 'https://www.dipeshsapkota7.com.np';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://sportivo.dipeshsapkota7.com.np/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://ioe-admission.dipeshsapkota7.com.np/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://git-visualizer.dipeshsapkota7.com.np/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}