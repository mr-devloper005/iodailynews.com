import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContactForm } from './contact-form'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

export function ContactPageOverride() {
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
        <div className="rounded-2xl border border-[#eadfda] bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
