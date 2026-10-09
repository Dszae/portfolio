"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '../components/SiteHeader';
import FadeUp from '../components/FadeUp';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const ROLES = ["Video Editor", "Graphics Designer", "Computer Engineer"];

const SITELINK_HUBS = [
  {
    path: "/about",
    title: "About Me",
    badge: "Official Bio",
    description: "Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. Over 4 years of freelance media production, combining analytical logic with creative visual execution.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    path: "/skills",
    title: "Technical Skills",
    badge: "Proficiency",
    description: "C/C++, Python, React.js, Next.js, video editing in Premiere Pro and DaVinci Resolve, motion graphics, and hardware simulation in Proteus.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    path: "/resume",
    title: "Curriculum Vitae",
    badge: "Work & Education",
    description: "Professional journey at Clamphook Academy, university event production, freelance clients, and academic history at IOE Thapathali Campus. Download full PDF CV.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    path: "/projects",
    title: "Featured Projects",
    badge: "Engineering & Apps",
    description: "Explore Sportivo (live sports streaming), IOE Admission Guide (rank prediction & counseling), Git Visualizer (interactive VCS learning), and hardware prototypes.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    path: "/gallery",
    title: "Visual Archive",
    badge: "Campus & Media",
    description: "A curated photo gallery documenting college life at IOE Thapathali, the Yathartha national tech exhibition, creative studio sessions, and field visits in Nepal.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    path: "/certificates",
    title: "Certifications",
    badge: "Credentials",
    description: "Verified certifications and completed coursework in Graphic Design, Motion Design with Figma, DaVinci Resolve Color Correction, Premiere Pro, and Web Development.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    path: "/contact",
    title: "Get in Touch",
    badge: "Collaboration",
    description: "Reach out directly for freelance media editing, web development projects, or engineering collaborations in Kathmandu, Nepal. Contact form and direct details.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

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
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center cursor-pointer border border-sky-500/40 backdrop-blur-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function Home() {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;

  // Typewriter effect
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

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;

    const heroSection = document.getElementById('hero');
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
        let color = 'rgba(14, 116, 144, 0.25)';
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
            ctx.strokeStyle = `rgba(14, 116, 144, ${opacityValue * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  }, []);

  return (
    <div className="min-h-screen font-sans transition-colors duration-500 overflow-x-hidden relative selection:bg-sky-500/30 w-full m-0 p-0">
      <HomePageJsonLd />
      <SiteHeader />

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

      <main className="relative z-10 w-full flex flex-col items-center">
        {/* HERO SECTION */}
        <section id="hero" className="pt-32 pb-20 px-6 sm:px-12 min-h-[92vh] flex items-center w-full relative overflow-hidden">
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
          />

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full relative z-10">
            <div className="order-2 md:order-1 opacity-0 animate-slide-left">
              <div className="inline-block px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400 font-mono text-sm font-medium mb-6 backdrop-blur-sm">
                <svg className="w-4 h-4 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                System Online &bull; IOE Thapathali Campus
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Dipesh Sapkota
              </h1>

              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-sky-600 dark:text-sky-400 h-12 flex items-center">
                I&apos;m a <span className="ml-2 sm:ml-3 text-inherit">{text}</span>
                <span className="animate-pulse">|</span>
              </div>

              <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                Computer Engineering student and AI/ML enthusiast blending analytical problem-solving with high-end creative execution in digital media.
              </p>

              {/* Social Media Links */}
              <div className="flex gap-4 sm:gap-5 mt-8 items-center flex-wrap">
                <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
                <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook Profile" className="text-slate-600 dark:text-slate-400 hover:text-sky-500 transition-colors">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="px-6 py-3.5 sm:px-8 sm:py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:-translate-y-1 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <span>&rarr;</span>
                </Link>
                <a
                  href="/my_cv.pdf"
                  download="Dipesh_Sapkota_CV.pdf"
                  className="px-6 py-3.5 sm:px-8 sm:py-4 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:-translate-y-1 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download CV</span>
                </a>
                <Link
                  href="/contact"
                  className="px-6 py-3.5 sm:px-8 sm:py-4 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:-translate-y-1"
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Avatar with spinning dashed ring */}
            <div className="order-1 md:order-2 flex justify-center items-center relative pt-10 md:pt-0 animate-slide-right">
              <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed border-sky-400/40 dark:border-sky-500/30 animate-[spin_20s_linear_infinite]"></div>
              <Image
                src="/dipesh-sapkota.jpg"
                id="primary-profile-image"
                itemProp="image"
                alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                width={380}
                height={380}
                priority
                className="relative z-10 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[380px] rounded-full shadow-2xl border-2 border-sky-500/50 transition-transform duration-500 hover:scale-105 cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* SITELINKS DIRECTORY GRID */}
        <FadeUp>
          <section className="py-20 px-6 sm:px-12 w-full max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
                Explore The Site
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Dedicated Sitelinks & Sections
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
                Explore each dedicated domain of my portfolio — from technical engineering competencies to verified certifications and direct collaboration channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SITELINK_HUBS.map((hub) => (
                <Link
                  key={hub.path}
                  href={hub.path}
                  className="group p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-300 hover:-translate-y-1.5 shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {hub.icon}
                      </div>
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                        {hub.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
                      <span>{hub.title}</span>
                      <span className="text-sky-500 transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                      {hub.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold">
                    <span>Open {hub.title} Page</span>
                    <span>&rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </FadeUp>

        {/* FEATURED APPS PREVIEW TEASER */}
        <FadeUp>
          <section className="py-16 px-6 sm:px-12 w-full max-w-7xl mx-auto mb-16">
            <div className="p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-8 shadow-lg">
              <div>
                <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
                  Flagship Engineering Work
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                  Sportivo, IOE Guide & Git Visualizer
                </h2>
                <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                  Interactive real-time web applications and developer tools built with Next.js, live scraping architectures, and dynamic visual diagrams.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 flex-shrink-0">
                <Link
                  href="/projects"
                  className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-lg transition-all"
                >
                  View All Projects &rarr;
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Collaborate
                </Link>
              </div>
            </div>
          </section>
        </FadeUp>
      </main>

      {/* FOOTER WITH COMPLETE SITELINKS */}
      <footer className="py-12 text-center font-mono text-xs sm:text-sm border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950 text-slate-600 dark:text-slate-400 w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
          </div>

          {/* Sitelinks Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            <Link href="/about" className="hover:text-sky-500 transition-colors">About</Link>
            <Link href="/skills" className="hover:text-sky-500 transition-colors">Skills</Link>
            <Link href="/resume" className="hover:text-sky-500 transition-colors">Resume</Link>
            <Link href="/projects" className="hover:text-sky-500 transition-colors">Projects</Link>
            <Link href="/gallery" className="hover:text-sky-500 transition-colors">Gallery</Link>
            <Link href="/certificates" className="hover:text-sky-500 transition-colors">Certificates</Link>
            <Link href="/experience" className="hover:text-sky-500 transition-colors">Experience</Link>
            <Link href="/blog" className="hover:text-sky-500 transition-colors">Articles</Link>
            <Link href="/contact" className="hover:text-sky-500 transition-colors">Contact</Link>
          </nav>

          <p className="font-semibold">
            &copy; {new Date().getFullYear()} <Link href="/" className="hover:text-sky-500 underline transition-colors">Dipesh Sapkota</Link>. All rights reserved.
          </p>
        </div>
      </footer>

      <ScrollToTopButton />
    </div>
  );
}

