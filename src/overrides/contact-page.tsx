'use client'

import { useState } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const ORG_TYPES = [
  'Corporation',
  'Small Business',
  'Non-Profit Organization',
  'Government Agency',
  'Educational Institution',
  'Media / PR Agency',
  'Individual / Freelancer',
  'Other',
]

const SUBJECTS = [
  'General Inquiry',
  'Distribution Support',
  'Billing & Plans',
  'Editorial Correction',
  'Enterprise / Volume Pricing',
  'Partnership Opportunity',
  'Technical Support',
  'Other',
]

export function ContactPageOverride() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    orgType: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2b2b2b]">
      <NavbarShell />

      {/* Page header */}
      <div className="bg-white border-b border-[#eadfda] px-4 py-10 text-center sm:px-6">
        <h1 className="font-[family-name:var(--site-font-display)] text-4xl font-semibold tracking-[-0.03em] text-[#1f1530]">
          Contact Us
        </h1>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10">

          {/* ── Form card ── */}
          <div className="rounded-2xl border border-[#eadfda] bg-white p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4f1f]/10">
                  <svg className="h-7 w-7 text-[#ff4f1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-[#1f1530]">Message sent!</h2>
                <p className="mt-2 text-sm text-[#6a5b55]">
                  Thank you for reaching out. We'll get back to you within one business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', orgType: '', subject: '', message: '' }) }}
                  className="mt-6 rounded-full bg-[#1f1530] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2e1f45] transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Row 1: Name + Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#2b2b2b]">
                      Contact Name <span className="text-[#ff4f1f]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="mt-1.5 block w-full rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] placeholder-[#b0a49e] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20"
                      placeholder=""
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#2b2b2b]">
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="mt-1.5 block w-full rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] placeholder-[#b0a49e] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20"
                      placeholder=""
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-[#2b2b2b]">
                    Email <span className="text-[#ff4f1f]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1.5 block w-full rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] placeholder-[#b0a49e] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20"
                    placeholder=""
                  />
                </div>

                {/* Helper text */}
                <p className="mt-6 text-sm font-medium text-[#2b2b2b]">Help Us Understand Your Needs A Little More.</p>

                {/* Row 3: Org type + Subject */}
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="orgType" className="block text-sm font-medium text-[#2b2b2b]">
                      What type of organization are you? <span className="text-[#ff4f1f]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="orgType"
                        name="orgType"
                        required
                        value={form.orgType}
                        onChange={handleChange}
                        className="block w-full appearance-none rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20"
                      >
                        <option value="" disabled>Please Select</option>
                        {ORG_TYPES.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#9e8e88]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#2b2b2b]">
                      Subject: How may we help you? <span className="text-[#ff4f1f]">*</span>
                    </label>
                    <div className="relative mt-1.5">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="block w-full appearance-none rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20"
                      >
                        <option value="" disabled>Please Select</option>
                        {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#9e8e88]">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="mt-4">
                  <label htmlFor="message" className="block text-sm font-medium text-[#2b2b2b]">
                    Message / Comment <span className="text-[#ff4f1f]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="mt-1.5 block w-full rounded-lg border border-[#ddd0c8] bg-[#faf8f6] px-3.5 py-2.5 text-sm text-[#2b2b2b] placeholder-[#b0a49e] outline-none transition focus:border-[#ff4f1f] focus:ring-2 focus:ring-[#ff4f1f]/20 resize-y"
                    placeholder=""
                  />
                </div>

                {/* Submit */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="rounded-full bg-[#ff4f1f] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#f13f10] focus:outline-none focus:ring-2 focus:ring-[#ff4f1f]/50"
                  >
                    Submit Now
                  </button>
                </div>
              </form>
            )}
          </div>


        </div>
      </main>

      <Footer />
    </div>
  )
}
