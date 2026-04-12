import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { mockCourses } from "@/data/coursesData";

export default function Courses() {
  const { primaryDomain, secondaryDomain, isCompleted, results } = useQuiz();

  if (!isCompleted || !results) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="text-6xl">📚</div>
        <h2 className="mt-6 font-display text-2xl font-bold text-foreground">Complete Assessment First</h2>
        <p className="mt-3 max-w-md text-muted-foreground">We need your assessment results to recommend personalized courses.</p>
        <Link to="/assessment" className="mt-8 flex items-center gap-2 rounded-xl gradient-hero px-8 py-4 font-semibold text-primary-foreground">
          Take Assessment <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  const sorted = [...results].sort((a, b) => b.score - a.score);
  const primaryId = sorted[0].sectionId;
  const secondaryId = sorted[1].sectionId;
  const primaryCourses = mockCourses[primaryId] || [];
  const secondaryCourses = mockCourses[secondaryId] || [];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-bold text-foreground">Recommended Courses</h1>
        <p className="mt-2 text-muted-foreground">Curated learning resources based on your career interests</p>

        {[{ title: `${primaryDomain?.icon} ${primaryDomain?.domain}`, courses: primaryCourses, isPrimary: true },
          { title: `${secondaryDomain?.icon} ${secondaryDomain?.domain}`, courses: secondaryCourses, isPrimary: false }
        ].map(({ title, courses, isPrimary }) => (
          <section key={title} className="mt-10">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
              {isPrimary && <span className="rounded-full gradient-hero px-3 py-0.5 text-xs font-medium text-primary-foreground">Primary</span>}
            </div>
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
                      <Play className="h-10 w-10 text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <span className="absolute right-2 top-2 rounded-md bg-foreground/70 px-2 py-0.5 text-xs font-medium text-primary-foreground">{course.level}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold text-foreground">{course.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{course.channel}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" />{course.duration}</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
