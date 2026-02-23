import { Link } from "react-router-dom";

const NeedHelp = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Need <span className="gradient-text">Help</span>?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Our support team is ready to assist you with any questions or issues.
        </p>
        <Link
          to="/support"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Get Support
        </Link>
      </div>
    </section>
  );
};

export default NeedHelp;
