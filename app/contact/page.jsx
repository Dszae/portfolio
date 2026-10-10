"use client";

import React, { useState } from 'react';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';
import PagePagination from '../../components/PagePagination';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("Sending message...");

    const form = event.target;
    const formData = new FormData(form);

    // Honeypot spam filter
    if (formData.get("botcheck")) {
      setFormStatus("Thank you! Your message has been sent.");
      form.reset();
      setIsSubmitting(false);
      return;
    }

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || name.length > 100) {
      setFormStatus("Please provide a valid name (up to 100 characters).");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      setFormStatus("Please provide a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!message || message.length > 5000) {
      setFormStatus("Please provide a message (up to 5,000 characters).");
      setIsSubmitting(false);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76";
    formData.set("access_key", accessKey);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />

          <FadeUp>
            <section id="contact" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className={`p-6 sm:p-8 md:p-14 rounded-[2rem] border backdrop-blur-md ${theme.card}`}>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                        <span className="text-[#065F46] dark:text-[#34D399]">/</span> Contact
                      </h1>
                      <p className="mb-10 text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE]">Open for freelance projects, technical collaborations, and software engineering opportunities.</p>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#16221D] border border-[#CBD5E1] dark:border-[#26352F] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Location</h2>
                            <p className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB]">Kathmandu, Nepal</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#16221D] border border-[#CBD5E1] dark:border-[#26352F] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Phone</h2>
                            <a href="tel:+9779764685307" className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block">9764685307</a>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#16221D] border border-[#CBD5E1] dark:border-[#26352F] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Email</h2>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block">dsz.ae18@gmail.com</a>
                          </div>
                        </div>

                        {/* Complete Social Links (7 profiles) */}
                        <div className="pt-4 border-t border-[#CBD5E1]/60 dark:border-[#26352F]">
                          <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold mb-3">
                            Connect Online (All Profiles)
                          </h2>
                          <div className="flex flex-wrap gap-2">
                            <a href="https://github.com/dszae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on GitHub (dszae)" aria-label="Dipesh Sapkota on GitHub" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              GitHub
                            </a>
                            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on LinkedIn (dszae)" aria-label="Dipesh Sapkota on LinkedIn" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              LinkedIn
                            </a>
                            <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on DEV Community (dszae)" aria-label="Dipesh Sapkota on DEV Community" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              DEV Community
                            </a>
                            <a href="https://www.youtube.com/@dszae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on YouTube (@dszae)" aria-label="Dipesh Sapkota on YouTube" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              YouTube
                            </a>
                            <a href="https://x.com/dsz_ae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on X (dsz_ae)" aria-label="Dipesh Sapkota on X (Twitter)" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              X (Twitter)
                            </a>
                            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on Instagram (dsz.ae)" aria-label="Dipesh Sapkota on Instagram" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              Instagram
                            </a>
                            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on Facebook (dsz.ae)" aria-label="Dipesh Sapkota on Facebook" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              Facebook
                            </a>
                            <a href="https://tiktok.com/@dsz_ae" target="_blank" rel="me noopener noreferrer" title="Dipesh Sapkota on TikTok (dsz_ae)" aria-label="Dipesh Sapkota on TikTok" className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] dark:border-[#26352F] text-xs font-mono font-medium hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              TikTok
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit} aria-busy={isSubmitting}>
                      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="sr-only" htmlFor="contact-name">Your Name</label>
                          <input
                            id="contact-name"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            aria-label="Your Name"
                            autoComplete="name"
                            className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#065F46]/30 dark:focus:ring-[#34D399]/30 transition-all ${theme.input}`}
                            required
                          />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="contact-email">Your Email</label>
                          <input
                            id="contact-email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            aria-label="Your Email"
                            autoComplete="email"
                            className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#065F46]/30 dark:focus:ring-[#34D399]/30 transition-all ${theme.input}`}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="sr-only" htmlFor="contact-message">Your Message</label>
                        <textarea
                          id="contact-message"
                          name="message"
                          placeholder="Your Message..."
                          aria-label="Your Message"
                          rows="5"
                          className={`w-full px-4 py-3 sm:px-6 sm:py-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#065F46]/30 dark:focus:ring-[#34D399]/30 transition-all resize-none ${theme.input}`}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-4 sm:px-10 sm:py-4.5 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl disabled:cursor-not-allowed disabled:opacity-60 transition-all w-full shadow-md cursor-pointer hover:-translate-y-0.5"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>

                      {formStatus && (
                        <p role="status" aria-live="polite" className={`text-sm text-center font-semibold mt-4 ${formStatus.includes("wrong") || formStatus.includes("error") ? "text-red-500" : "text-[#065F46] dark:text-[#34D399]"}`}>
                          {formStatus}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
                <PagePagination 
                  prev={{ label: 'Gallery & Visual Archive', path: '/gallery' }} 
                  next={{ label: 'Return Home', path: '/' }} 
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
