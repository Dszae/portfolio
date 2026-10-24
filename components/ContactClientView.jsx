"use client";

import React, { useState } from 'react';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';
import { siteUrl, personId, websiteId } from './JsonLdSchema';

const contactPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${siteUrl}/contact#contactpage`,
  url: `${siteUrl}/contact`,
  name: 'Contact | Dipesh Sapkota',
  description: 'Reach out to Dipesh Sapkota for freelance video editing, motion graphics, or computer engineering collaborations in Kathmandu, Nepal.',
  mainEntity: { '@id': personId },
  isPartOf: {
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

export default function ContactClientView() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("Sending message...");

    const form = event.target;
    const formData = new FormData(form);

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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, botcheck: formData.get("botcheck") })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormStatus("Thank you! Your message has been sent.");
        form.reset();
      } else {
        setFormStatus(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      try {
        const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76";
        formData.set("access_key", accessKey);
        const fbRes = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
        const fbData = await fbRes.json();
        if (fbData.success) {
          setFormStatus("Thank you! Your message has been sent.");
          form.reset();
        } else {
          setFormStatus("Something went wrong. Please try again.");
        }
      } catch {
        setFormStatus("Network error. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
          />

          <FadeUp>
            <section id="contact" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className={`p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border backdrop-blur-md ${theme.card}`}>
                  <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                        <span className="text-[#065F46] dark:text-[#34D399]">/</span> Contact
                      </h1>
                      <p className="mb-10 text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE]">Open for freelance projects, technical collaborations, and select creative media engagements.</p>

                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Location</h2>
                            <p className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB]">Kathmandu, Nepal</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Phone</h2>
                            <a href="tel:+9779764685307" className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block">9764685307</a>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">Email</h2>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block">dsz.ae18@gmail.com</a>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399] flex-shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.031 0C5.398 0 .023 5.375.023 12.008c0 2.115.553 4.181 1.604 6.002L.004 24l6.167-1.617c1.76 1.002 3.774 1.53 5.86 1.53 6.633 0 12.008-5.375 12.008-12.005C24.039 5.375 18.664 0 12.031 0zm.005 21.905c-1.8 0-3.564-.484-5.1-1.396l-.365-.217-3.79 1.002.997-3.69-.238-.38a9.907 9.907 0 01-1.52-5.216c0-5.467 4.453-9.92 9.92-9.92 2.65 0 5.14 1.033 7.012 2.905s2.906 4.362 2.906 7.012c0 5.467-4.453 9.92-9.922 9.92zm5.438-7.433c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.672.15-.2.298-.77 1-.945 1.2-.175.2-.349.224-.647.075-.298-.15-1.258-.464-2.396-1.48-1.077-.96-1.804-2.147-2.015-2.51-.21-.362-.022-.558.127-.706.134-.134.298-.349.447-.524.15-.175.2-.298.3-.497.1-.2.05-.373-.025-.523-.075-.15-.672-1.62-.92-2.22-.242-.584-.488-.505-.671-.514-.174-.009-.373-.01-.572-.01-.2 0-.523.075-.796.373-.274.298-1.045 1.02-1.045 2.487s1.07 2.885 1.22 3.085c.15.2 2.106 3.216 5.103 4.51.713.308 1.27.493 1.704.63.716.228 1.368.196 1.883.119.574-.086 1.764-.72 2.013-1.416.248-.696.248-1.293.174-1.416-.075-.124-.274-.2-.572-.349z"/></svg>
                          </div>
                          <div>
                            <h2 className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">WhatsApp</h2>
                            <a href="https://wa.me/9779764685307" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block">+977 9764685307</a>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#CBD5E1]/60 dark:border-[#222933]">
                          <div className="flex flex-wrap gap-2" aria-label="Social profiles">
                            <a href="https://github.com/dszae" target="_blank" rel="me noopener noreferrer" title="GitHub" aria-label="My GitHub profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            </a>
                            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noopener noreferrer" title="LinkedIn" aria-label="My LinkedIn profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                            <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" title="DEV Community" aria-label="My DEV Community profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H5.34v4.36h1.22c.4 0 .69-.08.87-.25.18-.17.28-.46.28-.86v-2.16c0-.4-.1-.69-.29-.86zM20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.94 13.08c0 .73-.24 1.3-.72 1.7-.48.4-1.16.6-2.04.6H3.6V8.62h2.58c.88 0 1.56.2 2.04.6.48.4.72.97.72 1.7v2.16zm5.12-3.26h-2.58v1.65h2.2v1.18h-2.2v1.73h2.58v1.2h-2.58V8.62h4.26v1.2z" /></svg>
                            </a>
                            <a href="https://x.com/DszAe18" target="_blank" rel="me noopener noreferrer" title="X" aria-label="My X profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noopener noreferrer" title="Instagram" aria-label="My Instagram profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noopener noreferrer" title="Facebook" aria-label="My Facebook profile" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.114C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" /></svg>
                            </a>
                            <a href="https://wa.me/9779764685307" target="_blank" rel="me noopener noreferrer" title="WhatsApp (+977 9764685307)" aria-label="Chat on WhatsApp" className="w-10 h-10 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.031 0C5.398 0 .023 5.375.023 12.008c0 2.115.553 4.181 1.604 6.002L.004 24l6.167-1.617c1.76 1.002 3.774 1.53 5.86 1.53 6.633 0 12.008-5.375 12.008-12.005C24.039 5.375 18.664 0 12.031 0zm.005 21.905c-1.8 0-3.564-.484-5.1-1.396l-.365-.217-3.79 1.002.997-3.69-.238-.38a9.907 9.907 0 01-1.52-5.216c0-5.467 4.453-9.92 9.92-9.92 2.65 0 5.14 1.033 7.012 2.905s2.906 4.362 2.906 7.012c0 5.467-4.453 9.92-9.922 9.92zm5.438-7.433c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.672.15-.2.298-.77 1-.945 1.2-.175.2-.349.224-.647.075-.298-.15-1.258-.464-2.396-1.48-1.077-.96-1.804-2.147-2.015-2.51-.21-.362-.022-.558.127-.706.134-.134.298-.349.447-.524.15-.175.2-.298.3-.497.1-.2.05-.373-.025-.523-.075-.15-.672-1.62-.92-2.22-.242-.584-.488-.505-.671-.514-.174-.009-.373-.01-.572-.01-.2 0-.523.075-.796.373-.274.298-1.045 1.02-1.045 2.487s1.07 2.885 1.22 3.085c.15.2 2.106 3.216 5.103 4.51.713.308 1.27.493 1.704.63.716.228 1.368.196 1.883.119.574-.086 1.764-.72 2.013-1.416.248-.696.248-1.293.174-1.416-.075-.124-.274-.2-.572-.349z"/></svg>
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
                        className="px-6 py-4 sm:px-10 sm:py-4.5 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold rounded-xl disabled:cursor-not-allowed disabled:opacity-60 transition-all w-full shadow-md cursor-pointer hover:-translate-y-0.5"
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
