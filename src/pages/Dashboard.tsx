import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Map, TrendingUp, Target, BarChart3 } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { results, primaryDomain, secondaryDomain, isCompleted } = useQuiz();

  if (!isCompleted || !results || !primaryDomain) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl">🧭</div>
        <h2 className="mt-6 font-display text-2xl font-bold text-foreground">No Assessment Results Yet</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Take the career interest assessment to discover your ideal domain and get personalized recommendations.
        </p>
        <Link
          to="/assessment"
          className="mt-8 flex items-center gap-2 rounded-xl gradient-hero px-8 py-4 font-semibold text-primary-foreground"
        >
          Start Assessment <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground">Your Learning Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Based on your career assessment results</p>
        </motion.div>

        {/* Domain Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl gradient-hero p-6 text-primary-foreground"
          >
            <div className="text-sm font-medium opacity-80">Primary Domain</div>
            <div className="mt-1 text-4xl">{primaryDomain.icon}</div>
            <h3 className="mt-2 font-display text-xl font-bold">{primaryDomain.domain}</h3>
            <p className="mt-1 text-sm opacity-80">{primaryDomain.description}</p>
            <div className="mt-4 text-sm font-medium">Recommended Career: {primaryDomain.career}</div>
          </motion.div>
          {secondaryDomain && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-sm font-medium text-muted-foreground">Secondary Domain</div>
              <div className="mt-1 text-4xl">{secondaryDomain.icon}</div>
              <h3 className="mt-2 font-display text-xl font-bold text-foreground">{secondaryDomain.domain}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{secondaryDomain.description}</p>
              <div className="mt-4 text-sm font-medium text-foreground">Alt. Career: {secondaryDomain.career}</div>
            </motion.div>
          )}
        </div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">Score Breakdown</h3>
          </div>
          <div className="mt-6 space-y-4">
            {results.map((r) => (
              <div key={r.sectionId}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{r.sectionTitle}</span>
                  <span className="text-muted-foreground">{r.score}/{r.maxScore} ({r.percentage}%)</span>
                </div>
                <Progress value={r.percentage} className="h-3" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { to: "/courses", icon: BookOpen, label: "View Courses", desc: "Recommended for you" },
            { to: "/roadmap", icon: Map, label: "Career Roadmap", desc: "Your step-by-step plan" },
            { to: "/assessment", icon: Target, label: "Retake Quiz", desc: "Update your results" },
          ].map((action, i) => (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link
                to={action.to}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <action.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{action.label}</div>
                  <div className="text-sm text-muted-foreground">{action.desc}</div>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
