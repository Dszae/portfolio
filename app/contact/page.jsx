"use client";

import React, { useState } from 'react';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

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
            <section id="contact" className={`pt-32 pb-24 px-6 sm:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className={`p-6 sm:p-8 md:p-14 rounded-[2rem] sm:rounded-[2.5rem] border backdrop-blur-md ${theme.card}`}>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Let&apos;s Connect</h1>
                      <p className={`mb-10 text-base sm:text-lg ${theme.muted}`}>Open for freelance projects, collaborations, and technical discussions.</p>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          </div>
                          <div>
                            <h2 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Location</h2>
                            <p className="font-semibold text-sm sm:text-lg">Kathmandu, Nepal</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          </div>
                          <div>
                            <h2 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Phone</h2>
                            <a href="tel:+9779764685307" className="font-semibold text-sm sm:text-lg hover:text-sky-500 transition-colors block">9764685307</a>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 text-lg sm:text-xl flex-shrink-0">
                            <svg className="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <div>
                            <h2 className={`font-mono text-[11px] sm:text-xs uppercase ${theme.muted}`}>Email</h2>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm sm:text-lg hover:text-sky-500 transition-colors block">dsz.ae18@gmail.com</a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit} aria-busy={isSubmitting}>
                      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <label className="sr-only" htmlFor="contact-name">Your Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          aria-label="Your Name"
                          autoComplete="name"
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
                          autoComplete="email"
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
                        disabled={isSubmitting}
                        className="px-6 py-4 sm:px-10 sm:py-5 bg-sky-700 text-white font-semibold rounded-xl hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60 transition-colors w-full shadow-md cursor-pointer"
                      >
                        Send Message
                      </button>

                      {formStatus && (
                        <p role="status" aria-live="polite" className={`text-sm text-center font-semibold mt-4 ${formStatus.includes("wrong") || formStatus.includes("error") ? "text-red-500" : "text-emerald-500"}`}>
                          {formStatus}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
