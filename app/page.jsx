"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import FadeUp from '../components/FadeUp';

const SKILL_CATEGORIES = [
  {
    title: "Programming",
    icon: (
      <svg className="w-6 h-6 text-sky-700 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    ),
    skills: [
      { name: "C / C++", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "Python", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "React.js", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "PHP", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-sky-700 dark:bg-sky-500" }
    ]
  },
  {
    title: "Creative & Media",
    icon: (
      <svg className="w-6 h-6 text-purple-800 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
    ),
    skills: [
      { name: "Video Editing", exp: "5+ Years", level: "High Proficiency", percent: 90, color: "bg-purple-800 dark:bg-purple-400" },
      { name: "Graphic Design", exp: "3+ Years", level: "Advanced", percent: 85, color: "bg-pink-800 dark:bg-pink-400" },
      { name: "Motion Graphics", exp: "2+ Years", level: "Intermediate", percent: 70, color: "bg-purple-700 dark:bg-purple-300" }
    ]
  },
  {
    title: "Engineering",
    icon: (
      <svg className="w-6 h-6 text-emerald-800 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    ),
    skills: [
      { name: "Proteus Suite", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-800 dark:bg-emerald-400" },
      { name: "Circuit Analysis", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-emerald-700 dark:bg-emerald-300" },
      { name: "Breadboarding", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-800 dark:bg-emerald-400" }
    ]
  }
];

const EXPERIENCE = [
  { 
    year: "2026 - Present", 
    role: "Video Editor & Graphics Designer", 
    company: "Clamphook Academy", 
    desc: "Producing and editing promotional videos and designing graphic materials for secondary-level and entrance examination crash courses.",
    logo: "/clamphook_.webp" 
  },
  { 
    year: "2026 - Present", 
    role: "Video Editor", 
    company: "College Programs", 
    desc: "Managing post-production and digital layout execution for university events and academic programs.",
    logo: "/campus.webp" 
  },
  { 
    year: "2023 - Present", 
    role: "Freelancer", 
    company: "Independent", 
    desc: "Delivering custom digital content, graphic layouts, and promotional assets for various clients.",
    logo: "/freelance.webp" 
  }
];

const EDUCATION = [
  {
    year: "2025 - Present",
    degree: "Bachelor in Computer Engineering",
    school: "Institute of Engineering (IOE), Thapathali Campus",
    desc: "Currently pursuing my engineering degree.",
    logo: "/thapathali.webp"
  },
  { 
    year: "2022 - 2024", 
    degree: "School Leaving Certificate (SLC)", 
    school: "Shree Janak Model Secondary School", 
    desc: "GPA: 3.88 / 4.00",
    logo: "/janak.webp"
  },
  { 
    year: "2022", 
    degree: "Secondary Education Examination (SEE)", 
    school: "Shree Mahendra Adarsha Secondary School", 
    desc: "GPA: 3.88 / 4.00",
    logo: "/mahendra.webp"
  }
];

const PROJECTS = [
  { id: 1, title: "Astable Multivibrator LED Flasher", category: "Hardware", description: "Physical breadboard circuit built and simulated using a 555 timer, focusing on frequency control and stable oscillation cycles.", tech: ["Circuit Analysis", "Proteus", "555 Timer"] },
  { id: 2, title: "Sports Highlight Reels", category: "Creative Media", description: "High-impact motion graphics and dynamic video editing showcasing football and futsal moments. Focused on rendering optimization.", tech: ["Premiere Pro", "After Effects"] },
  { id: 3, title: "Electrical Machinery Modeling", category: "Engineering", description: "Analysis and torque derivations of three-phase induction and DC motors, solving complex phasor circuit networks.", tech: ["Mathematics", "Network Analysis"] },
  { id: 4, title: "Automated Analyzer Diagnostics", category: "Instrumentation", description: "Troubleshooting procedures for vacuum failures, probe calibrations, and component layouts on advanced immunoassay platforms.", tech: ["Medical Tech", "Fluidics"] }
];

const GALLERY_IMAGES = [
  { id: 1, title: "Participating in college cricket tournament", img: "/cricket.webp" },
  { id: 2, title: "Successfully conducted Yathartha", img: "/yathartha.webp" },
  { id: 3, title: "Celebrating incredible results of Clamphook with the team", img: "/clamphook.webp" },
  { id: 4, title: "Attending boring lectures", img: "/lecture.webp" },
  { id: 5, title: "Deep in focus and exploring concepts", img: "/exploring.webp" },
  { id: 6, title: "Nagdhunga Surung Marga", img: "/nagdhunga surung marga.webp" }
];

const CERTIFICATES = [
  { id: 1, title: "Graphic Design Masterclass", org: "Udemy", img: "/graphic-design.webp" },
  { id: 2, title: "Motion Design with Figma", org: "Udemy", img: "/motion-design.webp" },
  { id: 3, title: "After Effects Course", org: "EDUCBA", img: "/after-effects.webp" },
  { id: 4, title: "DaVinci Resolve 16: Color Correction", org: "Blackmagicdesign", img: "/davinci-resolve.webp" },
  { id: 5, title: "Adobe Premiere Pro CC Masterclass", org: "Udemy", img: "/premiere-pro.webp" },
  { id: 6, title: "Web Development Masterclass", org: "Udemy", img: "/web-development.webp" },
  { id: 7, title: "Google Adwords Crash Course 2021", org: "Udemy", img: "/google-adwords.webp" },
  { id: 8, title: "Design Principles, Typography & Color Theory", org: "Udemy", img: "/design-principles.webp" }
];

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

const ROLES = ["Video Editor", "Graphics Designer", "Computer Engineer"];

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-sky-800 dark:bg-sky-600 hover:bg-sky-700 dark:hover:bg-sky-500 text-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center cursor-pointer border border-sky-700/40 backdrop-blur-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const canvasRef = useRef(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeSection, setActiveSection] = useState('home');

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;

  const [skillsInView, setSkillsInView] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedImage || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage, isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 300) {
          current = section.getAttribute('id');
        }
      });

      if (window.scrollY < 50) {
        current = 'home';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setFormStatus("Sending message...");

    const formData = new FormData(event.target);
    formData.append("access_key", "e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus("Thank you! Your message has been sent.");
        event.target.reset();
      } else {
        setFormStatus("Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("Network error. Please try again later.");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;

    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;

    let mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleTouchStart = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    let currentWidth = heroSection.offsetWidth;

    const handleResize = () => {
      if (heroSection && heroSection.offsetWidth !== currentWidth) {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
        currentWidth = heroSection.offsetWidth;
        init();
      }
    };

    const heroEl = heroSection;
    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('touchstart', handleTouchStart);
    heroEl.addEventListener('mouseout', handleMouseOut);
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
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;
      
      const densityDivider = 15000;
      let numberOfParticles = (canvas.height * canvas.width) / densityDivider;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.8) - 0.4;
        let directionY = (Math.random() * 0.8) - 0.4;
        let color = isDark ? 'rgba(14, 116, 144, 0.25)' : 'rgba(3, 105, 161, 0.3)';
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
            ctx.strokeStyle = isDark ? `rgba(14, 116, 144, ${opacityValue * 0.1})` : `rgba(3, 105, 161, ${opacityValue * 0.25})`;
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
            ctx.strokeStyle = isDark ? `rgba(14, 116, 144, ${opacityValue * 0.7})` : `rgba(3, 105, 161, ${opacityValue * 0.6})`;
            ctx.lineWidth = 1.2;
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (mouse.x != null && mouse.y != null) {
        const glowRadius = 300;
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        gradient.addColorStop(0, isDark ? 'rgba(14, 116, 144, 0.2)' : 'rgba(3, 105, 161, 0.2)');
        gradient.addColorStop(1, 'rgba(14, 116, 144, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    init();
    if (window.innerWidth >= 768) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('touchstart', handleTouchStart);
      heroEl.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  useEffect(() => {
    let timer;
    const currentRole = ROLES[loopNum % ROLES.length];

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

  const theme = {
    bg: isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900',
    nav: isDark ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900',
    card: isDark ? 'bg-slate-900/60 backdrop-blur-md border-slate-800 hover:border-sky-500 text-slate-100' : 'bg-white backdrop-blur-md border-slate-200 hover:border-sky-500 text-slate-900 shadow-sm',
    muted: isDark ? 'text-slate-400' : 'text-slate-600',
    tag: isDark ? 'bg-slate-800 text-sky-400' : 'bg-sky-50 text-sky-700',
    input: isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${theme.bg} relative selection:bg-sky-500/30 w-full m-0 p-0`}>

      <header className="sr-only">
        <h1>Dipesh Sapkota - Computer Engineer, Video Editor, and Motion Graphics Designer Portfolio</h1>
        <p>Official professional portfolio of Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus, Kathmandu, Nepal, specializing in software development, AI/ML enthusiasm, and high-end multimedia production.</p>
      </header>

      <style>{`
        @keyframes slideFromLeft {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-left {
          animation: slideFromLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-slide-right {
          animation: slideFromRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div 
        className={`md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 cursor-pointer ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsMenuOpen(false);
        }}
        onTouchStart={() => setIsMenuOpen(false)}
      />

      <nav aria-label="Main Navigation" className={`fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 transition-colors duration-300 ${theme.nav}`}>
        <div className="w-full px-6 sm:px-12 h-20 flex justify-between items-center relative z-10">
          <a href="https://www.dipeshsapkota7.com.np/" className="text-2xl font-bold tracking-tight" onClick={() => setIsMenuOpen(false)}>
            Dipesh Sapkota<span className="text-sky-500">.</span>
          </a>
          
          <div className="hidden md:flex gap-4 lg:gap-8 font-mono text-sm font-medium uppercase tracking-wider">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                className={`${activeSection === link.id ? 'text-sky-500 font-bold' : 'opacity-80 hover:opacity-100'} hover:text-sky-500 transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors shadow-sm cursor-pointer ${isDark ? 'border-slate-800 text-sky-400 hover:bg-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              aria-label="Toggle Theme Mode"
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            
            <button 
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative z-50 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>

        <div 
          id="mobile-navigation"
          className={`md:hidden absolute top-20 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 shadow-xl overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} ${theme.nav}`}
        >
          <div className="flex flex-col px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider space-y-6 text-center relative z-20">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={`#${link.id}`} 
                onClick={() => setIsMenuOpen(false)} 
                className={`${activeSection === link.id ? 'text-sky-500 font-bold' : ''} hover:text-sky-500 transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">

        <section id="home" className={`pt-32 pb-20 px-6 sm:px-12 min-h-[95vh] flex items-center w-full relative overflow-hidden ${theme.bg}`}>
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
            
            <div className="order-2 md:order-1 opacity-0 animate-slide-left">
              <div className="inline-block px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-500 font-mono text-sm font-medium mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                System Online
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Dipesh Sapkota
              </h1>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-sky-500 h-12 flex items-center">
                I&apos;m a <span className="ml-2 sm:ml-3 text-inherit">{text}</span><span className="animate-pulse">|</span>
              </div>
              <p className={`mt-6 max-w-xl text-base sm:text-lg leading-relaxed ${theme.muted}`}>
                Computer Engineering student and AI/ML enthusiast blending analytical problem-solving with high-end creative execution in digital media.
              </p>

              <div className="flex gap-4 sm:gap-5 mt-8 items-center flex-wrap">
                <a href="https://github.com/dszae" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/dszae" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://instagram.com/dsz.ae" target="_blank" rel="noreferrer" aria-label="Instagram Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://facebook.com/dsz.ae" target="_blank" rel="noreferrer" aria-label="Facebook Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
              </div>

              <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
                <a href="/my_cv.pdf" download="Dipesh_Sapkota_CV.pdf" className="px-6 py-3 sm:px-8 sm:py-4 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-all hover:-translate-y-1 flex items-center gap-2 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  Download CV
                </a>
                <a href="#contact" className={`px-6 py-3 sm:px-8 sm:py-4 border font-semibold rounded-xl transition-all hover:-translate-y-1 ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900/50 text-white' : 'border-slate-200 hover:bg-slate-50 bg-white text-slate-900'}`}>
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center items-center relative pt-10 md:pt-0 opacity-0 animate-slide-right">
              <div className={`absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed animate-[spin_20s_linear_infinite] ${isDark ? 'border-slate-800' : 'border-sky-200'}`}></div>
              <Image
                src="/og-image.webp"
                id="primary-profile-image"
                itemProp="image"
                alt="Dipesh Sapkota - Computer Engineer and Video Editor Profile"
                width="380"
                height="380"
                priority
                fetchPriority="high"
                className={`relative z-10 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[380px] rounded-full shadow-lg border-2 transition-transform duration-500 hover:scale-105 cursor-pointer ${isDark ? 'border-sky-500/50' : 'border-sky-300'}`}
              />
            </div>
            
          </div>
        </section>

        <FadeUp>
          <section id="about" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
                <span className="text-sky-500">/</span> About Me
              </h2>
              <div className="grid md:grid-cols-12 gap-8 items-center">
                
                <div className={`md:col-span-7 p-6 sm:p-8 md:p-12 rounded-[2.5rem] border backdrop-blur-md ${theme.card}`}>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">Bridging Logic and Visual Execution</h3>
                  <p className={`text-base sm:text-lg leading-relaxed mb-6 ${theme.muted}`}>
                    Hello! I am <strong>Dipesh Sapkota</strong>, a dedicated Computer Engineering student at <span className="font-semibold text-sky-500">IOE Thapathali Campus</span> in Kathmandu, Nepal. As an AI and ML enthusiast, I am deeply invested in exploring intelligent systems, analyzing algorithms, and architecting embedded hardware solutions. My technical foundation is built on rigorous academic training and a continuous drive to solve complex computational challenges.
                  </p>
                  <p className={`text-base sm:text-lg leading-relaxed ${theme.muted}`}>
                    Complementing my engineering background, I possess over 4 years of professional experience as a freelance Video Editor and Motion Graphics Designer. This unique convergence of analytical problem-solving and high-end creative design empowers me to bridge the gap between logical architecture and visually engaging digital execution.
                  </p>
                </div>
                
                <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                  
                  <div className={`p-5 sm:p-6 md:p-8 rounded-3xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-bold mb-1">4+</h4>
                      <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Years Experience</p>
                    </div>
                  </div>
                  
                  <div className={`p-5 sm:p-6 md:p-8 rounded-3xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-bold mb-1">50+</h4>
                      <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Global Clients</p>
                    </div>
                  </div>

                  <div className={`p-5 sm:p-6 md:p-8 rounded-3xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 sm:w-8 sm:h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-2xl sm:text-3xl font-bold mb-1">Creative</h4>
                      <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Design Focus</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>
        </FadeUp>

        <FadeUp>
          <section id="skills" ref={skillsRef} className={`py-16 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
            <div className="max-w-[100rem] mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-10 flex items-center gap-4">
                <span className="text-sky-500">/</span> Technical Proficiency
              </h2>

              <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                {SKILL_CATEGORIES.map((category, idx) => (
                  <div key={idx} className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 w-full ${theme.card} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-2xl">
                          {category.icon}
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold">{category.title}</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        {category.skills.map((skill, sIdx) => (
                          <div key={sIdx} className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                            <div className="flex justify-between items-end mb-1.5">
                              <div>
                                <h4 className="font-semibold text-xs sm:text-sm">{skill.name}</h4>
                                <p className={`font-mono text-[11px] ${theme.muted}`}>{skill.exp} • {skill.level}</p>
                              </div>
                              <span className="font-mono text-[11px] font-semibold">{skill.percent}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                              <div
                                className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                                style={{ width: skillsInView ? `${skill.percent}%` : '0%' }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        <FadeUp>
          <section id="resume" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-16 flex items-center gap-4">
                <span className="text-sky-500">/</span> My Journey
              </h2>
              <div className="grid lg:grid-cols-2 gap-16">

                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Experience
                  </h3>
                  <div className="space-y-8 relative border-l-2 border-sky-500/20 pl-6 ml-3">
                    {EXPERIENCE.map((exp, index) => (
                      <div 
                        key={index} 
                        className="relative pb-4 transition-transform duration-300 hover:translate-x-3 group cursor-default"
                      >
                        <div className="absolute -left-[35px] top-4 w-3.5 h-3.5 bg-sky-500 rounded-full border-4 border-slate-900"></div>
                        
                        <div className={`p-6 rounded-2xl transition-all duration-300 group-hover:shadow-md ${theme.card}`}>
                          <div className="flex items-center gap-4">
                            {exp.logo && (
                              <div className="flex-shrink-0 flex items-center justify-center">
                                <Image
                                  src={exp.logo} 
                                  alt={exp.company} 
                                  width="48"
                                  height="48"
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-white border border-slate-200 dark:border-slate-800" 
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <span className={`inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 ${theme.tag}`}>
                                {exp.year}
                              </span>
                              <h4 className="text-lg sm:text-xl font-semibold mb-1">{exp.role}</h4>
                              <p className="font-mono text-xs sm:text-sm mb-2 font-light text-blue-900 dark:text-blue-400">{exp.company}</p>
                              <p className={`text-sm leading-relaxed ${theme.muted}`}>{exp.desc}</p>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-6 w-0 h-1 bg-sky-500 transition-all duration-300 group-hover:w-[calc(100%-3rem)] rounded-b-2xl"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                    Education
                  </h3>
                  <div className="space-y-8 relative border-l-2 border-sky-500/20 pl-6 ml-3">
                    {EDUCATION.map((edu, index) => (
                      <div 
                        key={index} 
                        className="relative pb-4 transition-transform duration-300 hover:translate-x-3 group cursor-default"
                      >
                        <div className="absolute -left-[35px] top-4 w-3.5 h-3.5 bg-sky-500 rounded-full border-4 border-slate-900"></div>
                        
                        <div className={`p-6 rounded-2xl transition-all duration-300 group-hover:shadow-md ${theme.card}`}>
                          <div className="flex items-center gap-4">
                            {edu.logo && (
                              <div className="flex-shrink-0 flex items-center justify-center">
                                <Image
                                  src={edu.logo} 
                                  alt={edu.school} 
                                  width="48"
                                  height="48"
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover bg-white border border-slate-200 dark:border-slate-800" 
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <span className={`inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 ${theme.tag}`}>
                                {edu.year}
                              </span>
                              <h4 className="text-base sm:text-lg font-semibold leading-tight mb-1">{edu.degree}</h4>
                              <p className="font-mono text-xs sm:text-sm mb-2 font-light text-blue-900 dark:text-blue-400">{edu.school}</p>
                              <p className={`text-sm leading-relaxed ${theme.muted}`}>{edu.desc}</p>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-6 w-0 h-1 bg-sky-500 transition-all duration-300 group-hover:w-[calc(100%-3rem)] rounded-b-2xl"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </FadeUp>

        <section id="projects" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
              <span className="text-sky-500">/</span> Projects Archive
            </h2>

            <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-sky-500 ${theme.card}`}>
              <div className="w-full lg:w-1/2">
                <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-500 bg-sky-500/10 border border-sky-500/20 rounded-full mb-4">
                  Featured Web App
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Sportivo</h3>
                <p className={`text-sm sm:text-base mb-6 leading-relaxed ${theme.muted}`}>
                  A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Real-time Football, Cricket & Basketball Streams
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-sky-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Instant Live Match Search & Filter
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4">
                  <a href="https://sportivo.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    Launch Sportivo
                  </a>
                  <a href="https://github.com/dszae/sportivo" target="_blank" rel="noreferrer" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                    Source Code
                  </a>
                  <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    Read Article
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                  <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
                    </div>
                    <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
                      sportivo.dipeshsapkota7.com.np
                    </div>
                  </div>
                  <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                    <Image 
                      src="/sportivo-preview.jpg" 
                      alt="Sportivo Live Sports Streaming Platform Preview" 
                      width="993"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => window.open("https://sportivo.dipeshsapkota7.com.np/", "_blank")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500 ${theme.card}`}>
              <div className="w-full lg:w-1/2">
                <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                  Featured Web App
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">IOE Admission Guide</h3>
                <p className={`text-sm sm:text-base mb-6 leading-relaxed ${theme.muted}`}>
                  A comprehensive admission ecosystem for Tribhuvan University engineering applicants. Beyond predicting ranks, it provides step-by-step procedural counseling guides, automated priority form generation, and detailed cutoff analytics.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Step-by-Step IOE Counseling & Document Guides
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Statistical Rank Predictor & Priority Form Generator
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4">
                  <a href="https://ioe-admission.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    Explore Guide
                  </a>
                  <a href="https://github.com/dszae/ioe-admission-guide" target="_blank" rel="noreferrer" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                    Source Code
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                  <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                    <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/90"></div><div className="w-3 h-3 rounded-full bg-amber-500/90"></div><div className="w-3 h-3 rounded-full bg-emerald-500/90"></div></div>
                    <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
                      ioe-admission.dipeshsapkota7.com.np
                    </div>
                  </div>
                  <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                    <Image 
                      src="/ioe-preview.jpg" 
                      alt="IOE Admission Guide Preview" 
                      width="993"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => window.open("https://ioe-admission.dipeshsapkota7.com.np/", "_blank")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-500 ${theme.card}`}>
              <div className="w-full lg:w-1/2">
                <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                  Featured Web App
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Git Visualizer</h3>
                <p className={`text-sm sm:text-base mb-6 leading-relaxed ${theme.muted}`}>
                  An interactive, visually driven learning tool designed to demystify Git version control. Features a dynamic data-flow architecture and an interactive canvas for mapping standard Git commands.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Interactive Hover-Driven UI
                  </li>
                  <li className="flex items-center gap-3 text-sm font-semibold">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Live Diagramming of Git Operations
                  </li>
                </ul>

                <div className="flex flex-wrap gap-4">
                  <a href="https://git-visualizer.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    Explore Visualizer
                  </a>
                  <a href="https://github.com/dszae/git-visualizer" target="_blank" rel="noreferrer" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                    Source Code
                  </a>
                  <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                    Read Article
                  </a>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                  <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                    <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/90"></div><div className="w-3 h-3 rounded-full bg-amber-500/90"></div><div className="w-3 h-3 rounded-full bg-emerald-500/90"></div></div>
                    <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
                      git-visualizer.dipeshsapkota7.com.np
                    </div>
                  </div>
                  <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                    <Image 
                      src="/git-preview.jpg" 
                      alt="Git Visualizer Tool Preview" 
                      width="993"
                      height="450"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                      onClick={() => window.open("https://git-visualizer.dipeshsapkota7.com.np/", "_blank")}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group ${theme.card} flex flex-col`}>
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-block px-3.5 py-1 bg-sky-500/10 text-sky-500 text-xs font-semibold rounded-full uppercase tracking-wider border border-sky-500/20">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-sky-500 transition-colors">{proj.title}</h3>
                  <p className={`mb-8 line-clamp-3 text-sm sm:text-base leading-relaxed ${theme.muted}`}>{proj.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tech.map((t) => (
                      <span key={t} className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-mono font-medium rounded-lg ${theme.tag}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FadeUp>
          <section id="gallery" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 flex items-center gap-4">
                <span className="text-sky-500">/</span> Visual Archive
              </h2>
              <p className={`mb-12 text-base sm:text-lg ${theme.muted}`}>A curated space for current media projects, photography, and future uploads.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {GALLERY_IMAGES.map((item) => (
                  <button 
                    type="button"
                    aria-label={`Open ${item.title}`}
                    key={item.id} 
                    className="group relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-800 shadow-md cursor-pointer"
                    onClick={() => setSelectedImage({ src: item.img, title: item.title, desc: 'Visual Archive' })}
                  >
                    <Image
                      src={item.img}
                      alt={`Visual archive image of ${item.title}`}
                      width="640"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-6">
                      <div className="self-end w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                      <p className="text-white text-xs sm:text-sm md:text-base font-semibold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        <FadeUp>
          <section id="certificates" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <h2 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
                <span className="text-sky-500">/</span> Certifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CERTIFICATES.map((cert) => (
                  <button 
                    type="button"
                    aria-label={`Open certificate: ${cert.title}`}
                    key={cert.id} 
                    className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:-translate-y-2 hover:shadow-md cursor-pointer ${theme.card}`}
                    onClick={() => setSelectedImage({ src: cert.img, title: cert.title, desc: `Issued by ${cert.org}` })}
                  >
                    <div className={`aspect-[4/3] overflow-hidden rounded-xl border flex items-center justify-center mb-6 transition-colors relative ${isDark ? 'border-slate-800 bg-slate-900 group-hover:border-sky-500' : 'border-slate-200 bg-slate-50 group-hover:border-sky-500'}`}>
                      <Image 
                        src={cert.img} 
                        alt={`Certificate for ${cert.title} issued by ${cert.org}`} 
                        width="400"
                        height="300"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=Certificate' }} 
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-sky-500 transition-colors">{cert.title}</h3>
                    <p className={`font-mono text-xs ${theme.muted}`}>{cert.org}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </FadeUp>

        <FadeUp>
          <section id="contact" className={`py-24 px-6 sm:px-12 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className={`p-6 sm:p-8 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] border backdrop-blur-md ${theme.card}`}>
                <div className="grid lg:grid-cols-2 gap-12">
                  <div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Let&apos;s Connect</h2>
                    <p className={`mb-10 text-base sm:text-lg ${theme.muted}`}>Open for freelance projects, collaborations, and technical discussions.</p>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </div>
                        <div>
                          <h4 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Location</h4>
                          <p className="font-semibold text-sm sm:text-lg">Kathmandu, Nepal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </div>
                        <div>
                          <h4 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Phone</h4>
                          <a href="tel:+9779764685307" className="font-semibold text-sm sm:text-lg hover:text-sky-500 transition-colors block">9764685307</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                          <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <div>
                          <h4 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Email</h4>
                          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm sm:text-lg hover:text-sky-500 transition-colors block">dsz.ae18@gmail.com</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <label className="sr-only" htmlFor="contact-name">Your Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        aria-label="Your Name"
                        className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all ${theme.input}`}
                        required
                      />
                      <label className="sr-only" htmlFor="contact-email">Your Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        aria-label="Your Email"
                        className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all ${theme.input}`}
                        required
                      />
                    </div>
                    <label className="sr-only" htmlFor="contact-message">Your Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your Message..."
                      aria-label="Your Message"
                      rows="5"
                      className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all resize-none ${theme.input}`}
                      required
                    ></textarea>

                    <button
                      type="submit"
                      className="px-6 py-4 sm:px-10 sm:py-5 bg-sky-500 text-white font-semibold rounded-xl hover:bg-sky-600 transition-colors w-full shadow-md cursor-pointer"
                    >
                      Send Message
                    </button>

                    {formStatus && (
                      <p className={`text-sm text-center font-semibold mt-4 ${formStatus.includes("wrong") || formStatus.includes("error") ? "text-red-500" : "text-emerald-500"}`}>
                        {formStatus}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </section>
        </FadeUp>
      </main>

      <footer className={`py-8 sm:py-10 text-center font-mono text-[11px] sm:text-sm border-t w-full ${isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-4 mb-6 sm:mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="noreferrer" aria-label="GitHub Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="noreferrer" aria-label="Instagram Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="noreferrer" aria-label="Facebook Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
            <a href="/about" className="hover:text-sky-500 transition-colors">About</a>
            <a href="/experience" className="hover:text-sky-500 transition-colors">Experience</a>
            <a href="/blog" className="hover:text-sky-500 transition-colors">Articles</a>
            <a href="/contact" className="hover:text-sky-500 transition-colors">Contact</a>
          </nav>
          <p className="font-semibold">
            &copy; {new Date().getFullYear()} <a href="https://www.dipeshsapkota7.com.np/" className="hover:text-sky-500 underline transition-colors">Dipesh Sapkota</a>. All rights reserved.
          </p>
        </div>
      </footer>

      <ScrollToTopButton />

      {selectedImage && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage ? selectedImage.title : 'Image preview'}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 md:p-8 opacity-100 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close image preview"
              className="absolute top-0 right-0 z-10 rounded-full bg-white/10 px-3 py-2 text-2xl text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              width={1200}
              height={800}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" 
            />
            
            <div className="mt-4 sm:mt-6 text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 sm:mb-2">{selectedImage.title}</h3>
              <p className="text-sky-400 font-mono text-xs sm:text-sm tracking-wide uppercase font-semibold">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}