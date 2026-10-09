"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("Sending message...");
    setIsSuccess(false);

    const form = event.target;
    const formData = new FormData(form);

    // Honeypot spam filter
    if (formData.get("botcheck")) {
      setFormStatus("Thank you! Your message has been sent.");
      setIsSuccess(true);
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
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus("Thank you! Your message has been sent successfully.");
        setIsSuccess(true);
        form.reset();
      } else {
        setFormStatus("Something went wrong. Please try again or reach out via email.");
        setIsSuccess(false);
      }
    } catch {
      setFormStatus("Network error. Please try again later or email directly.");
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-400" htmlFor="contact-name">
            Your Name *
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            placeholder="John Doe"
            autoComplete="name"
            className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-400" htmlFor="contact-email">
            Your Email *
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            placeholder="john@example.com"
            autoComplete="email"
            className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-mono uppercase tracking-wider mb-2 text-slate-600 dark:text-slate-400" htmlFor="contact-message">
          Your Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about your project, idea, or collaboration..."
          className="w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all resize-none"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 px-8 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <span>Send Message &rarr;</span>
        )}
      </button>

      {formStatus && (
        <div
          role="status"
          aria-live="polite"
          className={`text-center font-mono text-xs sm:text-sm py-3 px-4 rounded-xl border transition-all ${
            isSuccess
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400'
          }`}
        >
          {formStatus}
        </div>
      )}
    </form>
  );
}

