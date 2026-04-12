import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Clock, ArrowRight, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface YouTubeCourse {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  description: string;
  url: string;
  publishedAt: string;
}

async function fetchYouTubeCourses(domain: string): Promise<YouTubeCourse[]> {
  const { data, error } = await supabase.functions.invoke("youtube-courses", {
    body: { domain, maxResults: 8 },
  });
  if (error) throw error;
  return data.courses || [];
}

function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3 mt-3" />
      </div>
    </div>
  );
}

function CoursesSection({ domainId, domainLabel, isPrimary }: { domainId: string; domainLabel: string; isPrimary: boolean }) {
  const { data: courses, isLoading, isError, refetch } = useQuery({
    queryKey: ["youtube-courses", domainId],
    queryFn: () => fetchYouTubeCourses(domainId),
    staleTime: 1000 * 60 * 30, // 30 min cache
    retry: 1,
  });

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3">
        <h2 className="font-display text-xl font-semibold text-foreground">{domainLabel}</h2>
        {isPrimary && <span className="rounded-full gradient-hero px-3 py-0.5 text-xs font-medium text-primary-foreground">Primary</span>}
        {!isLoading && (
          <button onClick={() => refetch()} className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <RefreshCw className="h-3 w-3" /> Refresh
          </button>
        )}
      </div>

      {isLoading && (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <CourseCardSkeleton key={i} />)}
        </div>
      )}

      {isError && (
        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-destructive font-medium">Failed to load courses</p>
          <button onClick={() => refetch()} className="mt-2 text-sm text-muted-foreground hover:text-foreground underline">Try again</button>
        </div>
      )}

      {courses && courses.length > 0 && (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, i) => (
            <motion.a
              key={course.id}
              href={course.url}
              target="_blank"
              rel="noopener noreferrer"
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
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold text-foreground text-sm">{course.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{course.channel}</p>
                <div className="mt-3 flex items-center justify-end">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {courses && courses.length === 0 && (
        <p className="mt-4 text-muted-foreground text-sm">No courses found for this domain.</p>
      )}
    </section>
  );
}

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

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-bold text-foreground">Recommended Courses</h1>
        <p className="mt-2 text-muted-foreground">Real YouTube courses curated for your career interests</p>

        <CoursesSection
          domainId={primaryId}
          domainLabel={`${primaryDomain?.icon} ${primaryDomain?.domain}`}
          isPrimary={true}
        />
        <CoursesSection
          domainId={secondaryId}
          domainLabel={`${secondaryDomain?.icon} ${secondaryDomain?.domain}`}
          isPrimary={false}
        />
      </div>
    </div>
  );
}
