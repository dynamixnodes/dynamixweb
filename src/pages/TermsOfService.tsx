import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing and using DynamixNodes services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.",
  },
  {
    title: "2. Services",
    content:
      "DynamixNodes provides cloud hosting services including VPS Hosting, Game Server Hosting, Bot Hosting, and Domain Hosting. We reserve the right to modify, suspend, or discontinue any part of our services at any time with reasonable notice.",
  },
  {
    title: "3. User Responsibilities",
    content:
      "You are responsible for all activity under your account. You agree not to use our services for any illegal, abusive, or unauthorized purposes. This includes but is not limited to: distributing malware, launching attacks on other servers, hosting illegal content, or violating intellectual property rights.",
  },
  {
    title: "4. Payment & Billing",
    content:
      "All services are billed according to the plan selected at the time of purchase. Payments are processed securely. Failure to pay may result in suspension or termination of your services. Prices are subject to change with prior notice.",
  },
  {
    title: "5. Refund Policy",
    content:
      "We offer a refund within the first 48 hours of purchase if you are unsatisfied with our services. Refund requests must be submitted via our Discord support tickets. Refunds are not available for domain registrations, custom configurations, or services used beyond the 48-hour window. Abuse of the refund policy may result in account suspension.",
  },
  {
    title: "6. Service Level Agreement",
    content:
      "DynamixNodes strives to maintain 99.9% uptime for all services. In the event of unscheduled downtime exceeding 1 hour, eligible customers may receive service credits. Scheduled maintenance windows are excluded from uptime calculations.",
  },
  {
    title: "7. Account Termination",
    content:
      "We reserve the right to suspend or terminate accounts that violate these terms. Upon termination, your data may be deleted after a 7-day grace period. You may request account deletion at any time through our support channels.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "DynamixNodes is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you in the last 12 months.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "We may update these Terms of Service from time to time. Continued use of our services after changes constitutes acceptance of the updated terms. We will notify users of significant changes via email or Discord.",
  },
];

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="gradient-text">Terms</span> of Service
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

export default TermsOfService;
