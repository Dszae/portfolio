export async function GET() {
  const markdownContent = `# Dipesh Sapkota - Portfolio

## Engineering Student & AI/ML Enthusiast
- **Campus**: Thapathali Campus, Institute of Engineering
- **Core Skills**: C, C++, Python, React, Next.js, Vercel
- **Portfolio**: https://www.dipeshsapkota7.com.np

## Projects
- **IoT-Based Emergency Response System for the Elderly** (ESP32, biopotential sensors, custom PCB)
`;

  return new Response(markdownContent, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}