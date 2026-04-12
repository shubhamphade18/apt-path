import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { roadmaps } from "@/data/coursesData";

export default function Roadmap() {
  const { primaryDomain, isCompleted, results } = useQuiz();

  if (!isCompleted || !results || !primaryDomain) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl">🗺️</div>
        <h2 className="mt-6 font-display text-2xl font-bold text-foreground">No Roadmap Available</h2>
        <p className="mt-3 max-w-md text-muted-foreground">Complete the assessment to get your personalized career roadmap.</p>
        <Link to="/assessment" className="mt-8 flex items-center gap-2 rounded-xl gradient-hero px-8 py-4 font-semibold text-primary-foreground">
          Take Assessment <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  const sorted = [...results].sort((a, b) => b.score - a.score);
  const domainId = sorted[0].sectionId;
  const steps = roadmaps[domainId] || [];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">Your Career Roadmap</h1>
          <p className="mt-2 text-muted-foreground">
            {primaryDomain.icon} Path to becoming a <span className="font-semibold text-foreground">{primaryDomain.career}</span>
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-border md:left-8" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-6"
              >
                <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full gradient-hero text-lg font-bold text-primary-foreground shadow-card md:h-16 md:w-16">
                  {step.step}
                </div>
                <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                    <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{step.duration}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Completion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: steps.length * 0.15 + 0.2 }}
            className="relative mt-8 flex items-center gap-6"
          >
            <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-card md:h-16 md:w-16">
              <CheckCircle2 className="h-6 w-6 md:h-8 md:w-8" />
            </div>
            <div className="rounded-2xl gradient-warm p-6 text-secondary-foreground">
              <h3 className="font-display text-lg font-bold">🎉 Career Ready!</h3>
              <p className="mt-1 text-sm opacity-90">You've completed all steps. Time to launch your career as a {primaryDomain.career}!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
