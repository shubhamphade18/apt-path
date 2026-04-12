import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Brain, BookOpen, TrendingUp, Target, Sparkles, Users, Compass } from "lucide-react";

const features = [
  { icon: Brain, title: "AI Career Detection", description: "Smart assessment identifies your strengths and ideal career path", color: "bg-primary/10 text-primary" },
  { icon: BookOpen, title: "Curated Courses", description: "Personalized YouTube course recommendations for your domain", color: "bg-secondary/10 text-secondary" },
  { icon: TrendingUp, title: "Progress Tracking", description: "Visual analytics to monitor your learning journey", color: "bg-accent/10 text-accent" },
  { icon: Target, title: "Career Roadmap", description: "Step-by-step guidance from beginner to professional", color: "bg-domain-health/10 text-domain-health" },
  { icon: Sparkles, title: "AI Guidance", description: "Intelligent suggestions that adapt to your performance", color: "bg-domain-creative/10 text-domain-creative" },
  { icon: Users, title: "Community", description: "Connect with learners on similar career paths", color: "bg-domain-social/10 text-domain-social" },
];

const stats = [
  { value: "10K+", label: "Students" },
  { value: "6", label: "Career Domains" },
  { value: "500+", label: "Courses" },
  { value: "95%", label: "Satisfaction" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-20 pt-20 md:pt-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
        </div>
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" /> AI-Powered Career Discovery
            </span>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              Discover Your{" "}
              <span className="gradient-text-hero">Perfect Career</span>{" "}
              Path
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Take our AI-powered assessment, get personalized course recommendations,
              and follow a clear roadmap to your dream career.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/assessment"
                className="group flex items-center gap-2 rounded-xl gradient-hero px-8 py-4 text-lg font-semibold text-primary-foreground shadow-elevated transition-all hover:scale-105"
              >
                Take Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-8 py-4 text-lg font-semibold text-foreground transition-colors hover:bg-muted"
              >
                View Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl font-bold text-primary md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 px-4 py-20">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our platform combines AI intelligence with curated learning resources to create
              a personalized path to your ideal career.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="container mx-auto">
          <div className="overflow-hidden rounded-3xl gradient-hero p-12 text-center md:p-20">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
              Ready to Find Your Path?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
              Join thousands of students who discovered their passion and built their dream career with PathFinder.
            </p>
            <Link
              to="/assessment"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-card px-8 py-4 text-lg font-semibold text-foreground shadow-elevated transition-all hover:scale-105"
            >
              Start Free Assessment <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
              <Compass className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">PathFinder</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 PathFinder. AI-Powered Career Discovery Platform.</p>
        </div>
      </footer>
    </div>
  );
}
