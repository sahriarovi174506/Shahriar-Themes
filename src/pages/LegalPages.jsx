import { useAnimateOnScroll } from "../hooks";

export function PrivacyPage() {
  useAnimateOnScroll();
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="fade-up animated">Privacy Policy</h1>
          <p className="fade-up delay-1 animated">Last updated: January 1, 2025</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="legal-content fade-up animated">
            <p>This Privacy Policy describes how Shahriar Themes ("we", "us", or "our") collects, uses, and shares information about you when you use our website shahriar-themes.com.</p>
            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you fill out our contact form (name, email address, and message content). We also collect limited anonymous analytics data to understand how visitors use our site.</p>
            <ul>
              <li>Contact form submissions (name, email, message)</li>
              <li>Download events (anonymous, no personal data stored)</li>
              <li>Page views and general usage analytics</li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>We use the information collected to respond to your enquiries, process service requests, improve our website, and communicate with you about templates and services. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
            <h2>Data Storage</h2>
            <p>Contact form submissions are stored securely in MongoDB Atlas (hosted in the EU). We retain this data for up to 2 years or until you request deletion.</p>
            <h2>Cookies</h2>
            <p>We use only essential cookies required for site functionality. We do not use advertising or tracking cookies. No cookie consent banner is required as we only use strictly necessary cookies.</p>
            <h2>Your Rights</h2>
            <p>You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, contact us at privacy@shahriar-themes.com.</p>
            <h2>Contact</h2>
            <p>For privacy-related enquiries, email us at privacy@shahriar-themes.com. We will respond within 48 hours.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  useAnimateOnScroll();
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="fade-up animated">Terms & Conditions</h1>
          <p className="fade-up delay-1 animated">Last updated: January 1, 2025</p>
        </div>
      </div>
      <section style={{ paddingTop:"0" }}>
        <div className="container">
          <div className="legal-content fade-up animated">
            <p>By downloading templates or engaging our services, you agree to these Terms & Conditions. Please read them carefully.</p>
            <h2>Template Licence</h2>
            <p>All templates available on Shahriar Themes are released under an open-source MIT licence. You may use, copy, modify, and distribute any template for personal or commercial projects without restriction. Attribution is not required but is appreciated.</p>
            <ul>
              <li>✓ Use in personal and commercial projects</li>
              <li>✓ Modify the source code freely</li>
              <li>✓ Use for unlimited client projects</li>
              <li>✗ Resell unmodified templates as your own product</li>
              <li>✗ Claim original authorship without modification</li>
            </ul>
            <h2>Custom Development Services</h2>
            <p>Upon full payment, you receive complete ownership of all custom code written for your project. We retain the right to showcase anonymised screenshots of the work in our portfolio unless you request otherwise in writing.</p>
            <h2>Payment Terms</h2>
            <p>Custom projects require a 50% deposit before work begins, with the remainder due upon delivery. We accept payment via bank transfer or Stripe. All prices are quoted in USD unless otherwise agreed.</p>
            <h2>Refund Policy</h2>
            <p>Template downloads are free — no refund applies. For custom services, the deposit is non-refundable once development begins. If we fail to deliver the agreed scope within the agreed timeline, you may request a full refund of all payments made.</p>
            <h2>Limitation of Liability</h2>
            <p>Shahriar Themes and its owner shall not be liable for any indirect, incidental, or consequential damages arising from the use of our templates or services beyond the amount paid for the relevant service.</p>
            <h2>Governing Law</h2>
            <p>These terms are governed by the laws of the United Kingdom. Any disputes shall be resolved in courts of competent jurisdiction in England and Wales.</p>
            <h2>Contact</h2>
            <p>For questions about these terms, contact us at legal@shahriar-themes.com.</p>
          </div>
        </div>
      </section>
    </>
  );
}
