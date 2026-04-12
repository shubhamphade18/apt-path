import React, { createContext, useContext, useState, ReactNode } from "react";
import { QuizResult, DomainMapping, calculateResults, detectDomains } from "@/data/quizData";

interface QuizContextType {
  answers: Record<number, number>;
  setAnswer: (questionId: number, score: number) => void;
  results: QuizResult[] | null;
  primaryDomain: DomainMapping | null;
  secondaryDomain: DomainMapping | null;
  submitQuiz: () => void;
  isCompleted: boolean;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [results, setResults] = useState<QuizResult[] | null>(null);
  const [primaryDomain, setPrimaryDomain] = useState<DomainMapping | null>(null);
  const [secondaryDomain, setSecondaryDomain] = useState<DomainMapping | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const setAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const submitQuiz = () => {
    const quizResults = calculateResults(answers);
    const { primary, secondary } = detectDomains(quizResults);
    setResults(quizResults);
    setPrimaryDomain(primary);
    setSecondaryDomain(secondary);
    setIsCompleted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setResults(null);
    setPrimaryDomain(null);
    setSecondaryDomain(null);
    setIsCompleted(false);
  };

  return (
    <QuizContext.Provider value={{ answers, setAnswer, results, primaryDomain, secondaryDomain, submitQuiz, isCompleted, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
}
