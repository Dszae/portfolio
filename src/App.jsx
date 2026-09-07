import React, { useState, useEffect, useRef } from 'react';

// --- DATA ARRAYS ---
const SKILL_CATEGORIES = [
  {
    title: "Programming",
    icon: (
      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    ),
    skills: [
      { name: "C / C++", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-blue-500" },
      { name: "Python", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-blue-500" },
      { name: "React.js", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-blue-500" },
      { name: "PHP", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-blue-500" }
    ]
  },
  {
    title: "Creative & Media",
    icon: (
      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
    ),
    skills: [
      { name: "Video Editing", exp: "5+ Years", level: "High Proficiency", percent: 90, color: "bg-purple-500" },
      { name: "Graphic Design", exp: "3+ Years", level: "Advanced", percent: 85, color: "bg-pink-500" },
      { name: "Motion Graphics", exp: "2+ Years", level: "Intermediate", percent: 70, color: "bg-purple-400" }
    ]
  },
  {
    title: "Engineering",
    icon: (
      <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    ),
    skills: [
      { name: "Proteus Suite", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-500" },
      { name: "Circuit Analysis", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-emerald-400" },
      { name: "Breadboarding", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-500" }
    ]
  }
];

const EXPERIENCE = [
  { year: "2026 - Present", role: "Video Editor & Graphics Designer", company: "Clamphook Academy", desc: "Producing and editing promotional videos and designing graphic materials for secondary-level and entrance examination crash courses." },
  { year: "2026 - Present", role: "Video Editor", company: "College Programs", desc: "Managing post-production and digital layout execution for university events and academic programs." },
  { year: "2023 - Present", role: "Freelancer", company: "Independent", desc: "Delivering custom digital content, graphic layouts, and promotional assets for various clients." }
];

const EDUCATION = [
  {
    year: "2026 - Present",
    degree: "Bachelor in Computer Engineering",
    school: "Institute of Engineering (IOE), Thapathali Campus",
    desc: "Currently pursuing my 2nd semester."
  },
  { year: "2022 - 2024", degree: "School Leaving Certificate (SLC)", school: "Shree Janak Model Secondary School", desc: "GPA: 3.88 / 4.00" },
  { year: "2022", degree: "Secondary Education Examination (SEE)", school: "Shree Mahendra Adarsha Secondary School", desc: "GPA: 3.88 / 4.00" }
];

const PROJECTS = [
  { id: 1, title: "Astable Multivibrator LED Flasher", category: "Hardware", description: "Physical breadboard circuit built and simulated using a 555 timer, focusing on frequency control and stable oscillation cycles.", tech: ["Circuit Analysis", "Proteus", "555 Timer"] },
  { id: 2, title: "Sports Highlight Reels", category: "Creative Media", description: "High-impact motion graphics and dynamic video editing showcasing football and futsal moments. Focused on rendering optimization.", tech: ["Premiere Pro", "After Effects"] },
  { id: 3, title: "Electrical Machinery Modeling", category: "Engineering", description: "Analysis and torque derivations of three-phase induction and DC motors, solving complex phasor circuit networks.", tech: ["Mathematics", "Network Analysis"] },
  { id: 4, title: "Automated Analyzer Diagnostics", category: "Instrumentation", description: "Troubleshooting procedures for vacuum failures, probe calibrations, and component layouts on advanced immunoassay platforms.", tech: ["Medical Tech", "Fluidics"] }
];

const GALLERY_IMAGES = [
  {
    id: 1,
    title: "Participating in college cricket tournament",
    img: "/cricket.jpeg"
  },
  {
    id: 2,
    title: "Successfully conducted Yathartha",
    img: "/yathartha.jpg"
  },
  {
    id: 3,
    title: "Celebrating incredible results of Clamphook with the team",
    img: "/clamphook.jpeg"
  },
  {
    id: 4,
    title: "Attending boring lectures",
    img: "/lecture.jpg"
  },
  {
    id: 5,
    title: "Deep in focus and exploring concepts",
    img: "/exploring.png"
  },
  {
    id: 6,
    title: "Nagdhunga Surung Marga",
    img: "/nagdhunga surung marga.png"
  }
];

const CERTIFICATES = [
  {
    id: 1,
    title: "Graphic Design Masterclass",
    org: "Udemy",
    img: "/graphic-design.png"
  },
  {
    id: 2,
    title: "Motion Design with Figma",
    org: "Udemy",
    img: "/motion-design.png"
  },
  {
    id: 3,
    title: "After Effects Course",
    org: "EDUCBA",
    img: "/after-effects.png"
  },
  {
    id: 4,
    title: "DaVinci Resolve 16: Color Correction",
    org: "Blackmagicdesign",
    img: "/davinci-resolve.png"
  },
  {
    id: 5,
    title: "Adobe Premiere Pro CC Masterclass",
    org: "Udemy",
    img: "/premiere-pro.png"
  },
  {
    id: 6,
    title: "Web Development Masterclass",
    org: "Udemy",
    img: "/web-development.png"
  },
  {
    id: 7,
    title: "Google Adwords Crash Course 2021",
    org: "Udemy",
    img: "/google-adwords.png"
  },
  {
    id: 8,
    title: "Design Principles, Typography & Color Theory",
    org: "Udemy",
    img: "/design-principles.jpg"
  }
];


// --- MAIN COMPONENT STARTS HERE ---
function App() {
  // --- STATE VARIABLES ---
  const [isDark, setIsDark] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const canvasRef = useRef(null);

  // Typewriter states
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;
  const roles = ["Video Editor", "Graphics Designer", "Computer Engineer"];

  // --- FORM SUBMISSION LOGIC ---
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Transmitting payload...");

    const formData = new FormData(event.target);
    formData.append("access_key", "e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus("Message transmitted successfully!");
        event.target.reset();
      } else {
        setFormStatus("Error: Transmission failed.");
      }
    } catch (error) {
      setFormStatus("Error: Could not connect to server.");
    }
  };

  // --- CANVAS PARTICLE NETWORK ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('resize', handleResize);

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5;
        let color = isDark ? 'rgba(3, 177, 252, 0.8)' : 'rgba(3, 177, 252, 0.5)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = isDark ? `rgba(3, 177, 252, ${opacityValue * 0.15})` : `rgba(3, 177, 252, ${opacityValue * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        if (mouse.x != null && mouse.y != null) {
          let distanceToMouse = ((particlesArray[a].x - mouse.x) * (particlesArray[a].x - mouse.x))
            + ((particlesArray[a].y - mouse.y) * (particlesArray[a].y - mouse.y));

          if (distanceToMouse < mouse.radius * mouse.radius) {
            let opacityValue = 1 - (distanceToMouse / (mouse.radius * mouse.radius));
            ctx.strokeStyle = `rgba(3, 177, 252, ${opacityValue * 0.8})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  // --- TYPEWRITER LOGIC ---
  useEffect(() => {
    let timer;
    const currentRole = roles[loopNum % roles.length];

    if (isDeleting) {
      timer = setTimeout(() => setText(currentRole.substring(0, text.length - 1)), typingSpeed / 2);
    } else {
      timer = setTimeout(() => setText(currentRole.substring(0, text.length + 1)), typingSpeed);
    }

    if (!isDeleting && text === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  // --- THEME CLASSES ---
  const theme = {
    bg: isDark ? 'bg-slate-950' : 'bg-slate-50',
    text: isDark ? 'text-slate-100' : 'text-slate-900',
    nav: isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200',
    card: isDark ? 'bg-slate-900/60 backdrop-blur-sm border-slate-800 hover:border-blue-500 hover:bg-slate-800/80' : 'bg-white/80 backdrop-blur-sm border-slate-200 hover:border-blue-400',
    muted: isDark ? 'text-slate-400' : 'text-slate-600',
    tag: isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200',
    input: isDark ? 'bg-slate-900/80 border-slate-700 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500'
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${theme.bg} ${theme.text} relative selection:bg-blue-500/30`}>

      {/* ACTUAL INTERACTIVE PARTICLE CANVAS */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md border-b z-50 transition-colors duration-300 ${theme.nav}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative z-10">
          <a href="#home" className="text-2xl font-black tracking-tighter">
            D<span className="text-blue-500">.</span>S
          </a>
          <div className="hidden md:flex gap-4 lg:gap-8 font-mono text-sm font-semibold uppercase tracking-wider">
            <a href="#home" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="#skills" className="hover:text-blue-500 transition-colors">Skills</a>
            <a href="#resume" className="hover:text-blue-500 transition-colors">Resume</a>
            <a href="#projects" className="hover:text-blue-500 transition-colors">Projects</a>
            <a href="#gallery" className="hover:text-blue-500 transition-colors">Gallery</a>
            <a href="#certificates" className="hover:text-blue-500 transition-colors">Certificates</a>
            <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-slate-500/30 hover:bg-slate-500/10 transition-colors shadow-sm"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Main Content Wrapper */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section id="home" className="pt-32 pb-20 px-6 min-h-[95vh] flex items-center max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            
            {/* Text Side */}
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/50 bg-blue-500/10 text-blue-500 font-mono text-sm font-bold mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(3,177,252,0.5)]">
                <svg className="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                System Online
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
                Dipesh Sapkota
              </h1>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-500 h-12 flex items-center">
                I'm a <span className="ml-3 text-inherit">{text}</span><span className="animate-pulse">|</span>
              </div>
              <p className={`mt-6 max-w-xl text-lg leading-relaxed ${theme.muted}`}>
                Computer Engineering student blending logical problem-solving with high-end creative execution. Exploring the intersection of code, circuits, and visual media.
              </p>

              {/* Social Media Links (Native SVGs) */}
              <div className="flex gap-5 mt-8 items-center flex-wrap">
                <a href="https://github.com/dszae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 ${theme.muted} hover:text-blue-500 transition-colors font-mono font-semibold`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  <span>dsz.ae</span>
                </a>
                <a href="https://linkedin.com/in/dszae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 ${theme.muted} hover:text-blue-500 transition-colors font-mono font-semibold`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  <span>dsz.ae</span>
                </a>
                <a href="https://instagram.com/dsz.ae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 ${theme.muted} hover:text-blue-500 transition-colors font-mono font-semibold`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  <span>dsz.ae</span>
                </a>
              </div>

              {/* Download CV Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/my_cv.pdf" download="Dipesh_Sapkota_CV.pdf" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(3,177,252,0.4)] hover:shadow-[0_0_30px_rgba(3,177,252,0.6)] hover:-translate-y-1 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download CV
                </a>
                <a href="#contact" className={`px-8 py-4 border font-bold rounded-xl transition-all hover:-translate-y-1 ${isDark ? 'border-slate-600 hover:bg-slate-800 hover:border-slate-500 bg-slate-900/50' : 'border-slate-300 hover:bg-white bg-white/50'}`}>
                  Get In Touch
                </a>
              </div>
            </div>

            {/* Logo/Avatar Side */}
            <div className="order-1 md:order-2 flex justify-center items-center relative pt-10 md:pt-0">
              <div className={`absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed animate-[spin_20s_linear_infinite] ${isDark ? 'border-blue-500/30' : 'border-blue-500/20'}`}></div>
              <img
                src="/ChatGPT Image Sep 7, 2026, 09_05_40 PM.png"
                alt="Dipesh Sapkota Logo"
                className={`relative z-10 w-full max-w-[280px] lg:max-w-[380px] rounded-full shadow-[0_0_40px_rgba(3,177,252,0.4)] border-2 transition-transform duration-500 hover:scale-105 cursor-pointer ${isDark ? 'border-blue-500' : 'border-blue-400'}`}
              />
            </div>
            
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
            <span className="text-blue-500">/</span> Technical Proficiency
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((category, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${theme.card}`}>
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-3xl mb-6 shadow-[0_0_15px_rgba(3,177,252,0.2)] border border-blue-500/20">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold mb-8">{category.title}</h3>

                <div className="space-y-8">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx}>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-sm">{skill.name}</h4>
                          <p className={`font-mono text-[10px] ${theme.muted}`}>{skill.exp} • {skill.level}</p>
                        </div>
                        <span className="font-mono text-xs font-bold">{skill.percent}%</span>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                        <div
                          className={`h-full rounded-full ${skill.color} shadow-[0_0_8px_currentColor]`}
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
            <span className="text-blue-500">/</span> My Journey
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Experience Column */}
            <div className={`p-8 md:p-12 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${theme.card}`}>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Experience
              </h3>
              <div className="space-y-10">
                {EXPERIENCE.map((exp, index) => (
                  <div key={index} className={`relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-500 before:rounded-full after:absolute after:left-1.5 after:top-5 after:bottom-[-2.5rem] after:w-0.5 ${isDark ? 'after:bg-slate-700' : 'after:bg-slate-200'} last:after:hidden`}>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full mb-3">{exp.year}</span>
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <p className={`font-mono text-sm mb-3 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>{exp.company}</p>
                    <p className={`${theme.muted}`}>{exp.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Column */}
            <div className={`p-8 md:p-12 rounded-3xl border backdrop-blur-xl transition-colors duration-300 ${theme.card}`}>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                Education
              </h3>
              <div className="space-y-10">
                {EDUCATION.map((edu, index) => (
                  <div key={index} className={`relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-blue-500 before:rounded-full after:absolute after:left-1.5 after:top-5 after:bottom-[-2.5rem] after:w-0.5 ${isDark ? 'after:bg-slate-700' : 'after:bg-slate-200'} last:after:hidden`}>
                    <span className="inline-block px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full mb-3">{edu.year}</span>
                    <div className="flex items-start gap-4 mb-2">
                      <div>
                        <h4 className="text-lg font-bold leading-tight">{edu.degree}</h4>
                        <p className={`font-mono text-sm mt-1 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>{edu.school}</p>
                      </div>
                    </div>
                    <p className={`${theme.muted}`}>{edu.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Projects Archive */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
            <span className="text-blue-500">/</span> Projects Archive
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className={`p-8 rounded-2xl border backdrop-blur-xl transition-all duration-300 group ${theme.card} flex flex-col`}>
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block px-4 py-1.5 bg-blue-500/10 text-blue-500 text-xs font-bold rounded-full uppercase tracking-wider border border-blue-500/20">
                    {proj.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                <p className={`mb-8 line-clamp-3 leading-relaxed ${theme.muted}`}>{proj.description}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map((t) => (
                    <span key={t} className={`px-3 py-1.5 text-xs font-mono rounded-lg ${theme.tag}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Image Gallery Section */}
        <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-6 flex items-center gap-4">
            <span className="text-blue-500">/</span> Visual Archive
          </h2>
          <p className={`mb-12 text-lg ${theme.muted}`}>A curated space for current media projects, photography, and future uploads.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((item) => (
              <div key={item.id} className="group relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200/20 bg-gray-800 shadow-lg cursor-default">

                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* 
        bg-gradient-to-t from-white via-white/80 to-transparent: Creates the fading background
        flex flex-col justify-end: Pushes the text to the bottom
    */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">

                  {/* translate-y-4 group-hover:translate-y-0 makes the text slide up slightly when hovering */}
                  <p className="text-slate-900 text-sm md:text-base font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-24 px-6 max-w-7xl mx-auto">
          <h2 className="text-4xl font-black mb-12 flex items-center gap-4">
            <span className="text-blue-500">/</span> Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTIFICATES.map((cert) => (
              <div key={cert.id} className={`p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 group hover:-translate-y-2 ${theme.card}`}>
                <div className={`aspect-[4/3] overflow-hidden rounded-xl border-2 border-dashed flex items-center justify-center mb-6 transition-colors ${isDark ? 'border-slate-700 bg-slate-800/50 group-hover:border-blue-500/50' : 'border-slate-300 bg-slate-100/50 group-hover:border-blue-400'}`}>
                  <img src={cert.img} alt={cert.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Certificate' }} />
                </div>
                <h4 className="font-bold mb-2 group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                <p className={`font-mono text-xs ${theme.muted}`}>{cert.org}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section with Web3Forms */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
          <div className={`p-8 md:p-14 rounded-[2.5rem] border backdrop-blur-xl ${theme.card}`}>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-6">Let's Connect</h2>
                <p className={`mb-10 text-lg ${theme.muted}`}>Open for freelance projects, collaborations, and technical discussions.</p>

                <div className="space-y-6">
                  {/* Native SVG Icons for Location, Phone, Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl shadow-[0_0_10px_rgba(3,177,252,0.2)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <div>
                      <h4 className={`font-mono text-xs uppercase font-bold ${theme.muted}`}>Location</h4>
                      <p className="font-bold text-lg">Kathmandu, Nepal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl shadow-[0_0_10px_rgba(3,177,252,0.2)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <div>
                      <h4 className={`font-mono text-xs uppercase font-bold ${theme.muted}`}>Phone</h4>
                      <p className="font-bold text-lg">9764685307</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl shadow-[0_0_10px_rgba(3,177,252,0.2)]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                    <div>
                      <h4 className={`font-mono text-xs uppercase font-bold ${theme.muted}`}>Email</h4>
                      <p className="font-bold text-lg">dsz.ae18@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${theme.input}`}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${theme.input}`}
                    required
                  />
                </div>
                <textarea
                  name="message"
                  placeholder="Your Message..."
                  rows="5"
                  className={`w-full px-6 py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none ${theme.input}`}
                  required
                ></textarea>

                <button
                  type="submit"
                  className="px-10 py-5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors w-full shadow-lg shadow-blue-600/30"
                >
                  Transmit Message
                </button>

                {formStatus && (
                  <p className={`font-mono text-sm text-center font-bold mt-4 ${formStatus.includes("Error") ? "text-red-500" : "text-emerald-500"}`}>
                    {formStatus}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-10 text-center font-mono text-sm border-t ${isDark ? 'border-slate-800' : 'border-slate-200'} ${theme.muted}`}>
          {/* Explicit Native SVG Social Handles in Footer */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 hover:text-blue-500 transition-colors font-bold`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              dsz.ae
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 hover:text-blue-500 transition-colors font-bold`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              dsz.ae
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 hover:text-blue-500 transition-colors font-bold`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              @dsz.ae
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 hover:text-blue-500 transition-colors font-bold`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              @dsz.ae
            </a>
            <a href="https://tiktok.com/@dsz.ae" target="_blank" rel="noreferrer" className={`flex items-center gap-2 hover:text-blue-500 transition-colors font-bold`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.37-3.43-5.68.02-1.3.39-2.58 1.05-3.71 1.4-2.28 3.96-3.66 6.64-3.64v4.01c-1.14-.02-2.31.25-3.28.94-.85.64-1.36 1.7-1.31 2.8.04 1.15.65 2.21 1.63 2.79.9.54 2.01.7 3.03.49 1.15-.22 2.11-.97 2.53-2.06.19-.51.27-1.07.28-1.61.03-4.75.01-9.5.02-14.25z" /></svg>
              @dsz.ae
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Dipesh Sapkota. All rights reserved.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;