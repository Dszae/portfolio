export const metadata = {
  title: "Projects by Dipesh Sapkota - Computer Engineer & Developer",
  description: "Explore web applications, hardware projects, and technical tools engineered by Dipesh Sapkota (dszae) in Kathmandu, Nepal.",
};

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-32">
      <h1 className="text-4xl font-bold mb-6">Projects by Dipesh Sapkota</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-10">
        A collection of web applications, system tools, and engineering prototypes built with React, Next.js, and C++.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl">
          <h2 className="text-2xl font-semibold mb-2"><a href="/projects/sportivo" className="hover:text-sky-500">Sportivo</a></h2>
          <p className="text-slate-600 dark:text-slate-400">Real-time live sports streaming platform with multi-server switching.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h2 className="text-2xl font-semibold mb-2"><a href="/projects/ioe-admission-guide" className="hover:text-sky-500">IOE Admission Guide</a></h2>
          <p className="text-slate-600 dark:text-slate-400">Tribhuvan University engineering admission predictor and priority form generator.</p>
        </div>
        <div className="p-6 border rounded-xl">
          <h2 className="text-2xl font-semibold mb-2"><a href="/projects/git-visualizer" className="hover:text-sky-500">Git Visualizer</a></h2>
          <p className="text-slate-600 dark:text-slate-400">Interactive learning tool mapping out Git version control commands.</p>
        </div>
      </div>
    </main>
  );
}