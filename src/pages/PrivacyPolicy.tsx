import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, and payment details when you create an account or purchase services. We also automatically collect usage data, IP addresses, and browser information to improve our services.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "Your information is used to provide and maintain our services, process payments, send important updates, provide customer support, and improve our platform. We do not sell your personal information to third parties.",
  },
  {
    title: "3. Data Storage & Security",
    content:
      "We implement industry-standard security measures to protect your data, including encryption in transit and at rest. Your data is stored on secure servers with DDoS protection and regular backups. Access to personal data is restricted to authorized personnel only.",
  },
  {
    title: "4. Cookies & Tracking",
    content:
      "We use essential cookies to maintain your session and preferences. Analytics cookies help us understand how our services are used. You can control cookie preferences through your browser settings.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "We may use third-party services for payment processing, analytics, and communication. These services have their own privacy policies and we encourage you to review them. We only share the minimum data necessary for these services to function.",
  },
  {
    title: "6. Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data. You may request a copy of your data or ask for account deletion by contacting our support team via Discord. We will respond to data requests within 30 days.",
  },
  {
    title: "7. Data Retention",
    content:
      "We retain your data for as long as your account is active or as needed to provide services. After account deletion, personal data is removed within 30 days, except where retention is required by law.",
  },
  {
    title: "8. Refund Policy",
    content:
      "Refund requests are processed through our Discord support tickets. We offer refunds within 48 hours of purchase for most services. Domain registrations and fully consumed services are non-refundable. Approved refunds are processed within 5-10 business days to the original payment method.",
  },
  {
    title: "9. Children's Privacy",
    content:
      "Our services are not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.",
  },
  {
    title: "10. Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically. We will notify you of any significant changes via email or through our Discord server. Continued use of our services after changes constitutes acceptance.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Privacy</span> Policy
          </h1>
          <p className="text-muted-foreground text-center mb-12">
            Last updated: February 2026
          </p>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <h2 className="text-lg font-semibold mb-3 gradient-text">{s.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
