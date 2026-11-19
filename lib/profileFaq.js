/**
 * Canonical identity FAQ for Dipesh Sapkota.
 *
 * Single source of truth for the collapsed "About Dipesh Sapkota" accordion on
 * /about, its FAQPage JSON-LD (buildProfileFaqJsonLd in seoEngine.js), and the
 * /api/markdown dossier. Kept dependency-free because the client About view
 * imports it. The static
 * public/llms-full.txt and public/.well-known/llms-full.txt copies must carry
 * the same question and answer text verbatim; update them together.
 */
export const PROFILE_FAQ = [
  {
    question: 'Who is Dipesh Sapkota?',
    answer:
      'Dipesh Sapkota is a Computer Engineering undergraduate student at IOE Thapathali Campus (Tribhuvan University) in Kathmandu, Nepal, an AI/ML enthusiast, and a freelance motion graphics designer. He is the creator of educational software tools including the IOE Admission Hub, Git Visualizer, and Sportivo.',
  },
  {
    question: 'Where does Dipesh Sapkota study?',
    answer:
      'He studies Bachelor of Computer Engineering at the Department of Electronics and Computer Engineering, Thapathali Campus, Institute of Engineering (IOE), Tribhuvan University in Kathmandu, Nepal.',
  },
  {
    question: 'What has Dipesh Sapkota created?',
    answer:
      'Dipesh Sapkota created IOE Admission Hub (an IOE entrance cutoff analyzer and rank predictor), Git Visualizer (an interactive DAG version-control simulator), and Sportivo (a live sports schedule and streaming tracker).',
  },
  {
    question: 'What does Dipesh Sapkota do for work?',
    answer:
      'Alongside his engineering studies, Dipesh Sapkota works as a freelance motion graphics designer and video editor, with over 4 years of experience and visual projects completed for 50+ clients globally using Adobe Premiere Pro, After Effects, and DaVinci Resolve.',
  },
  {
    question: 'Where can I find Dipesh Sapkota online?',
    answer:
      'His official website is https://www.dipeshsapkota7.com.np/ and he can be contacted via email at contact@dipeshsapkota7.com.np or the contact page at https://www.dipeshsapkota7.com.np/contact. He is also on LinkedIn at https://www.linkedin.com/in/dipeshsapkota7/ and GitHub at https://github.com/Dszae, under the handle dszae.',
  },
];

/** Markdown rendering of PROFILE_FAQ, matching the llms-full.txt format. */
export function profileFaqMarkdown() {
  return PROFILE_FAQ.map(({ question, answer }) => `**Q: ${question}**  \nA: ${answer}`).join('\n\n');
}
