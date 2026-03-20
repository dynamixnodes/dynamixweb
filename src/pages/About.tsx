import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CircuitBackground from "@/components/CircuitBackground";
import { Globe, Users, Shield, Zap, MapPin, Heart } from "lucide-react";

const teamMembers = [
  {
    name: "Dynamind OP",
    role: "Founder",
    avatar: "https://cdn.discordapp.com/avatars/1227522637056573512/48329531c6da50ab28581fcfe6d4dc03.png?size=1024",
  },
  {
    name: "Hamlo Legend",
    role: "Founder",
    avatar: "https://cdn.discordapp.com/avatars/1180471985143283742/4a7a094ab30e59ca8f729b0189887070.png?size=1024",
  },
  {
    name: "Rovex Cloud",
    role: "Alt-Owner",
    avatar: "https://cdn.discordapp.com/avatars/1438571341564612679/de4db0fffb062471e1f5e407f8bb951b.png?size=1024",
  },
  {
    name: "Hostel Buddy",
    role: "Chief Executive Officer",
    avatar: "https://cdn.discordapp.com/avatars/1099559470385872996/d0bb0c8f05884b793479bc87991d5a63.png?size=1024",
  },
  {
    name: "Ananad Satwik",
    role: "Chief Moderation Staff",
    avatar: "https://cdn.discordapp.com/avatars/1429065817227526195/778d45f90f3ce1d7ace53d6c0acdcceb.png?size=1024",
  },
  {
    name: "Shriman Nishit",
    role: "Chief Executive Staff",
    avatar: "https://cdn.discordapp.com/avatars/965219100693499956/a65da8149efe840b74ea357702879540.png?size=1024",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <CircuitBackground />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-primary/30 mb-8 glow-effect">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium gradient-text">About Us</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-2 leading-tight">
              <span className="text-foreground">ABOUT</span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="gradient-text">RYDENBYTE</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empowering developers, gamers, and creators with reliable, affordable hosting solutions — proudly made in India.
            </p>
          </div>

          {/* Story */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="p-10 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl font-bold mb-6">
                <span className="text-foreground">Our </span>
                <span className="gradient-text">Story</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RydenByte was founded by <span className="text-foreground font-semibold">Dynamind OP</span> and <span className="text-foreground font-semibold">Hamlo Legend</span> with a simple mission: to provide high-quality, affordable hosting solutions accessible to everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Built in India, RydenByte offers VPS Hosting, Game Server Hosting (specializing in Minecraft), and Bot Hosting for Discord bots and automation. We believe that powerful hosting shouldn't come with a hefty price tag.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team is passionate about delivering enterprise-grade infrastructure with the personal touch of a community-driven company. Every server we deploy is backed by DDoS protection, NVMe SSD storage, and 24/7 monitoring.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="text-foreground">What We </span>
              <span className="gradient-text">Stand For</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: MapPin, title: "Made in India", desc: "Proudly built and operated from India, serving customers worldwide with low-latency infrastructure." },
                { icon: Heart, title: "Community First", desc: "We're a community-driven hosting provider that listens to our users and builds what they need." },
                { icon: Shield, title: "Reliability", desc: "99.9% uptime SLA with enterprise-grade DDoS protection and automatic failover systems." },
                { icon: Zap, title: "Performance", desc: "AMD EPYC processors, NVMe SSD storage, and optimized network routes for blazing fast speeds." },
                { icon: Globe, title: "Accessibility", desc: "Affordable pricing across multiple currencies so everyone can access quality hosting." },
                { icon: Users, title: "Support", desc: "Active Discord community with fast ticket-based support from our dedicated team." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(20_90%_42%/0.2)]">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="text-foreground">Meet The </span>
              <span className="gradient-text">Team</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, i) => (
                <div key={i} className="p-8 rounded-2xl bg-card border border-border text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_hsl(20_90%_42%/0.2)]">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-primary/30"
                  />
                  <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
