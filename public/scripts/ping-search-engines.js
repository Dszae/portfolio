import https from 'https';

const sitemapUrl = 'https://www.dipeshsapkota7.com.np/sitemap.xml';
const pingUrls = [
  `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
  `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
];

pingUrls.forEach((url) => {
  https.get(url, (res) => {
    console.log(`Pinged search engine. Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error('Error pinging search engine:', err.message);
  });
});