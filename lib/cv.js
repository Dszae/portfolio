// Single source of truth for the public CV asset (PDF + preview image).
// Update CV_UPDATED and CV_SIZE_LABEL whenever public/dipesh-sapkota-cv.pdf is replaced.

export const CV_PDF_PATH = '/dipesh-sapkota-cv.pdf';
export const CV_PREVIEW_PATH = '/dipesh-sapkota-cv-preview.webp';
export const CV_PREVIEW_SIZE = { width: 900, height: 1273 };
export const CV_FILENAME = 'Dipesh_Sapkota_CV.pdf';
export const CV_TITLE = 'Dipesh Sapkota CV | Computer Engineering Student & AI/ML Enthusiast';
export const CV_DESCRIPTION =
  'One-page curriculum vitae of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus, Kathmandu, Nepal. AI/ML enthusiast and motion graphics designer with 4+ years of video editing experience and 50+ international clients.';
export const CV_UPDATED = '2026-11-16';
export const CV_SIZE_BYTES = 101755;
export const CV_SIZE_LABEL = '100 KB';

const SITE = 'https://www.dipeshsapkota7.com.np';

// Compact reference used as Person.subjectOf in the site-wide schema.
export const CV_SCHEMA_REF = {
  '@type': 'DigitalDocument',
  '@id': `${SITE}/resume#cv-pdf`,
  name: 'Curriculum Vitae of Dipesh Sapkota (PDF)',
  url: `${SITE}${CV_PDF_PATH}`,
  encodingFormat: 'application/pdf',
};

const LEGACY_CV_PATHS = new Set(['/my_cv.pdf']);

// Site settings stored in the database may still point at the legacy filename.
export function resolveCvUrl(url) {
  if (!url || LEGACY_CV_PATHS.has(url)) return CV_PDF_PATH;
  return url;
}
