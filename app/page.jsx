"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const ROLES = ["Computer Engineer", "Video Editor", "Graphics Designer", "AI/ML Explorer"];

function HeroCanvas({ isDark }) {
  const canvasRef = useRef(null);

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
      
      const densityDivider = 16000;
      let numberOfParticles = (canvas.height * canvas.width) / densityDivider;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.7) - 0.35;
        let directionY = (Math.random() * 0.7) - 0.35;
        let color = isDark ? 'rgba(52, 211, 153, 0.22)' : 'rgba(4, 120, 87, 0.2)';
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
            ctx.strokeStyle = isDark ? `rgba(52, 211, 153, ${opacityValue * 0.12})` : `rgba(4, 120, 87, ${opacityValue * 0.18})`;
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
            ctx.strokeStyle = isDark ? `rgba(110, 231, 183, ${opacityValue * 0.65})` : `rgba(4, 120, 87, ${opacityValue * 0.55})`;
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
        const glowRadius = 260;
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRadius);
        gradient.addColorStop(0, isDark ? 'rgba(52, 211, 153, 0.15)' : 'rgba(4, 120, 87, 0.12)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
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

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function Home() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = 100;

  useEffect(() => {
    let timer;
    const currentRole = ROLES[loopNum % ROLES.length];

    if (isDeleting) {
      timer = setTimeout(() => setText(currentRole.substring(0, text.length - 1)), typingSpeed / 2);
    } else {
      timer = setTimeout(() => setText(currentRole.substring(0, text.length + 1)), typingSpeed);
    }

    if (!isDeleting && text === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && text === '') {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }, typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <SiteLayout>
      {({ theme, isDark }) => (
        <>
          <HomePageJsonLd />

          <style>{`
            @keyframes slideFromLeft {
              0% { opacity: 0; transform: translateX(-40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            @keyframes slideFromRight {
              0% { opacity: 0; transform: translateX(40px); }
              100% { opacity: 1; transform: translateX(0); }
            }
            .animate-slide-left {
              animation: slideFromLeft 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-slide-right {
              animation: slideFromRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}</style>

          <section id="home" className={`pt-28 sm:pt-32 pb-20 px-6 sm:px-12 min-h-[92vh] flex items-center w-full relative overflow-hidden ${theme.bg}`}>
            <HeroCanvas isDark={isDark} />

            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center w-full relative z-10">
              <div className="order-2 md:order-1 opacity-0 animate-slide-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#047857]/30 bg-[#047857]/10 dark:border-[#34D399]/30 dark:bg-[#34D399]/10 text-[#047857] dark:text-[#34D399] font-mono text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] dark:bg-[#34D399] animate-pulse"></span>
                  System Online &bull; Open for Opportunities
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]">
                  Dipesh Sapkota
                </h1>
                
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#047857] dark:text-[#34D399] h-12 flex items-center">
                  <span>I&apos;m a </span>
                  <span className="ml-2 sm:ml-3 text-inherit">{text}</span>
                  <span className="animate-pulse ml-0.5">|</span>
                </div>
                
                <p className={`mt-6 max-w-xl text-base sm:text-lg leading-relaxed ${theme.muted}`}>
                  Computer Engineering student at IOE Thapathali Campus and AI/ML explorer. Blending technical engineering logic with professional creative media production.
                </p>

                <div className="flex gap-4 sm:gap-5 mt-8 items-center flex-wrap">
                  <a 
                    href="https://github.com/dszae" 
                    target="_blank" 
                    rel="me noreferrer" 
                    aria-label="GitHub Profile" 
                    className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399] transition-colors p-1"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a 
                    href="https://linkedin.com/in/dszae" 
                    target="_blank" 
                    rel="me noreferrer" 
                    aria-label="LinkedIn Profile" 
                    className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399] transition-colors p-1"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a 
                    href="https://instagram.com/dsz.ae" 
                    target="_blank" 
                    rel="me noreferrer" 
                    aria-label="Instagram Profile" 
                    className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399] transition-colors p-1"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a 
                    href="https://facebook.com/dsz.ae" 
                    target="_blank" 
                    rel="me noreferrer" 
                    aria-label="Facebook Profile" 
                    className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399] transition-colors p-1"
                  >
                    <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                </div>

                <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
                  <a 
                    href="/my_cv.pdf" 
                    download="Dipesh_Sapkota_CV.pdf" 
                    className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] font-semibold rounded-xl hover:bg-[#065F46] dark:hover:bg-[#6EE7B7] transition-all hover:-translate-y-1 flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download CV
                  </a>
                  <Link 
                    href="/contact" 
                    className={`px-6 py-3.5 sm:px-8 sm:py-4 border font-semibold rounded-xl transition-all hover:-translate-y-1 cursor-pointer ${isDark ? 'border-[#26352F] hover:bg-[#16221D] bg-[#111B17] text-[#F9FAFB]' : 'border-[#E2E8F0] hover:bg-[#F1F5F9] bg-[#FFFFFF] text-[#111827]'}`}
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>

              <div className="order-1 md:order-2 flex justify-center items-center relative pt-6 md:pt-0 animate-slide-right">
                <div className={`absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] rounded-full border border-dashed animate-[spin_25s_linear_infinite] ${isDark ? 'border-[#26352F]' : 'border-[#E2E8F0]'}`}></div>
                <div className={`absolute w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-[#047857]/10 dark:border-[#34D399]/10`}></div>
                <Image
                  src="/dipesh-sapkota.jpg"
                  id="primary-profile-image"
                  itemProp="image"
                  alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                  width={380}
                  height={380}
                  fetchPriority="high"
                  priority
                  className={`relative z-10 w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[380px] rounded-full shadow-xl border-2 transition-transform duration-500 hover:scale-105 cursor-pointer ${isDark ? 'border-[#34D399]/60' : 'border-[#047857]/50'}`}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
