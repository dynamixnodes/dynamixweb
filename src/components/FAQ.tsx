import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast can I get my server running?",
    a: "Your server will be deployed within seconds of payment. Our automated system handles provisioning instantly, so you can start using your server right away.",
  },
  {
    q: "Do you offer DDoS protection?",
    a: "Yes! All our plans include enterprise-grade DDoS protection at no extra cost. We filter malicious traffic to ensure your server stays online.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately with prorated billing.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and cryptocurrency payments for maximum flexibility.",
  },
  {
    q: "Where are your servers located?",
    a: "We have data centers across multiple regions to ensure low latency for your users, no matter where they are.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, we offer a 48-hour money-back guarantee on all plans. If you're not satisfied, contact our support team for a full refund.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          Got questions? We've got answers.
        </p>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-sm font-medium hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
