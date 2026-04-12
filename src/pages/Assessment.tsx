import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { quizSections } from "@/data/quizData";
import { useQuiz } from "@/contexts/QuizContext";
import { Progress } from "@/components/ui/progress";

export default function Assessment() {
  const navigate = useNavigate();
  const { answers, setAnswer, submitQuiz } = useQuiz();
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const section = quizSections[currentSection];
  const question = section.questions[currentQuestion];
  const totalQuestions = quizSections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const goNext = () => {
    if (currentQuestion < section.questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else if (currentSection < quizSections.length - 1) {
      setCurrentSection((s) => s + 1);
      setCurrentQuestion(0);
    } else {
      submitQuiz();
      navigate("/dashboard");
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((q) => q - 1);
    } else if (currentSection > 0) {
      setCurrentSection((s) => s - 1);
      setCurrentQuestion(quizSections[currentSection - 1].questions.length - 1);
    }
  };

  const isFirst = currentSection === 0 && currentQuestion === 0;
  const isLast = currentSection === quizSections.length - 1 && currentQuestion === section.questions.length - 1;
  const selectedScore = answers[question.id];

  return (
    <div className="min-h-screen px-4 py-10">
      <div className="container mx-auto max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{section.icon} {section.title}</span>
            <span>{answeredCount}/{totalQuestions} answered</span>
          </div>
          <Progress value={progress} className="mt-2 h-2" />
          <div className="mt-3 flex gap-1.5">
            {quizSections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setCurrentSection(i); setCurrentQuestion(0); }}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i === currentSection ? "gradient-hero" : i < currentSection ? "bg-primary/30" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-8 shadow-card md:p-12"
          >
            <div className="mb-2 text-sm font-medium text-muted-foreground">
              Question {currentQuestion + 1} of {section.questions.length}
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {question.question}
            </h2>

            <div className="mt-8 space-y-3">
              {question.options.map((option) => {
                const isSelected = selectedScore === option.score;
                return (
                  <button
                    key={option.label}
                    onClick={() => setAnswer(question.id, option.score)}
                    className={`flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-card"
                        : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-display font-bold ${
                        isSelected ? "gradient-hero text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isSelected ? <Check className="h-5 w-5" /> : option.label}
                    </div>
                    <span className={`font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={isFirst}
            className="flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" /> Previous
          </button>
          <button
            onClick={goNext}
            disabled={!selectedScore}
            className="flex items-center gap-2 rounded-xl gradient-hero px-8 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            {isLast ? "See Results" : "Next"} <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
