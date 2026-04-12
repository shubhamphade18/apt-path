export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; text: string; score: number }[];
}

export interface QuizSection {
  id: string;
  title: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  sectionId: string;
  sectionTitle: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface DomainMapping {
  domain: string;
  career: string;
  description: string;
  icon: string;
}

export const domainMappings: Record<string, DomainMapping> = {
  technology: { domain: "Software Development", career: "Software Developer", description: "Build applications, websites, and software solutions", icon: "💻" },
  business: { domain: "Entrepreneurship & Management", career: "Business Analyst", description: "Lead teams, manage projects, and drive business growth", icon: "📊" },
  creative: { domain: "UI/UX Design & Creative Arts", career: "UI/UX Designer", description: "Design beautiful experiences and creative solutions", icon: "🎨" },
  healthcare: { domain: "Healthcare & Medical Sciences", career: "Healthcare Professional", description: "Improve lives through medical science and care", icon: "🏥" },
  science: { domain: "Research & Innovation", career: "Research Scientist", description: "Discover new knowledge and push boundaries", icon: "🔬" },
  social: { domain: "Education & Communication", career: "Educator / Communicator", description: "Inspire and educate others through effective communication", icon: "🎓" },
};

export const quizSections: QuizSection[] = [
  {
    id: "technology",
    title: "Technology & Engineering",
    icon: "💻",
    color: "domain-tech",
    questions: [
      { id: 1, question: "Do you enjoy solving logical problems or puzzles?", options: [{ label: "A", text: "Yes, very much", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 2, question: "Are you interested in how computers and software work?", options: [{ label: "A", text: "Absolutely", score: 3 }, { label: "B", text: "A little bit", score: 2 }, { label: "C", text: "Not at all", score: 1 }] },
      { id: 3, question: "Do you like building or fixing things?", options: [{ label: "A", text: "Love it", score: 3 }, { label: "B", text: "Occasionally", score: 2 }, { label: "C", text: "Prefer not to", score: 1 }] },
      { id: 4, question: "Would you enjoy learning a programming language?", options: [{ label: "A", text: "Definitely", score: 3 }, { label: "B", text: "Maybe", score: 2 }, { label: "C", text: "Not interested", score: 1 }] },
      { id: 5, question: "Do you enjoy working with data and numbers?", options: [{ label: "A", text: "Yes, I find it exciting", score: 3 }, { label: "B", text: "It's okay", score: 2 }, { label: "C", text: "Not my thing", score: 1 }] },
    ],
  },
  {
    id: "business",
    title: "Business & Management",
    icon: "📊",
    color: "domain-business",
    questions: [
      { id: 6, question: "Do you enjoy leading group projects or teams?", options: [{ label: "A", text: "Yes, I'm a natural leader", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "I prefer following", score: 1 }] },
      { id: 7, question: "Are you interested in how businesses make money?", options: [{ label: "A", text: "Very interested", score: 3 }, { label: "B", text: "Somewhat", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 8, question: "Do you enjoy planning and organizing events?", options: [{ label: "A", text: "Love it", score: 3 }, { label: "B", text: "It's okay", score: 2 }, { label: "C", text: "Not my strength", score: 1 }] },
      { id: 9, question: "Would you like to start your own business someday?", options: [{ label: "A", text: "Absolutely", score: 3 }, { label: "B", text: "Maybe", score: 2 }, { label: "C", text: "Not interested", score: 1 }] },
      { id: 10, question: "Do you enjoy negotiating or persuading others?", options: [{ label: "A", text: "Yes, it comes naturally", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "I avoid it", score: 1 }] },
    ],
  },
  {
    id: "creative",
    title: "Creative & Design",
    icon: "🎨",
    color: "domain-creative",
    questions: [
      { id: 11, question: "Do you enjoy drawing, painting, or creating visual art?", options: [{ label: "A", text: "Yes, I love it", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 12, question: "Are you interested in design, colors, and aesthetics?", options: [{ label: "A", text: "Very much", score: 3 }, { label: "B", text: "A little", score: 2 }, { label: "C", text: "Not at all", score: 1 }] },
      { id: 13, question: "Do you enjoy creating content like videos or stories?", options: [{ label: "A", text: "Absolutely", score: 3 }, { label: "B", text: "Occasionally", score: 2 }, { label: "C", text: "Not my thing", score: 1 }] },
      { id: 14, question: "Would you like to design websites or mobile apps?", options: [{ label: "A", text: "That sounds amazing", score: 3 }, { label: "B", text: "Maybe", score: 2 }, { label: "C", text: "Not interested", score: 1 }] },
      { id: 15, question: "Do you notice design details others might miss?", options: [{ label: "A", text: "All the time", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "Rarely", score: 1 }] },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Medical",
    icon: "🏥",
    color: "domain-health",
    questions: [
      { id: 16, question: "Do you enjoy learning about the human body and health?", options: [{ label: "A", text: "Fascinated by it", score: 3 }, { label: "B", text: "Somewhat", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 17, question: "Would you like to help people recover from illness?", options: [{ label: "A", text: "Yes, it's my calling", score: 3 }, { label: "B", text: "Maybe", score: 2 }, { label: "C", text: "Not interested", score: 1 }] },
      { id: 18, question: "Are you comfortable in hospital or lab environments?", options: [{ label: "A", text: "Very comfortable", score: 3 }, { label: "B", text: "It's okay", score: 2 }, { label: "C", text: "Not at all", score: 1 }] },
      { id: 19, question: "Do you have patience for long and detailed study?", options: [{ label: "A", text: "Yes, I'm dedicated", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "I prefer quick learning", score: 1 }] },
      { id: 20, question: "Does the idea of saving lives motivate you?", options: [{ label: "A", text: "Absolutely", score: 3 }, { label: "B", text: "Somewhat", score: 2 }, { label: "C", text: "Not particularly", score: 1 }] },
    ],
  },
  {
    id: "science",
    title: "Science & Research",
    icon: "🔬",
    color: "domain-science",
    questions: [
      { id: 21, question: "Do you enjoy conducting experiments?", options: [{ label: "A", text: "Love it", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 22, question: "Are you curious about how the universe works?", options: [{ label: "A", text: "Extremely curious", score: 3 }, { label: "B", text: "A little", score: 2 }, { label: "C", text: "Not much", score: 1 }] },
      { id: 23, question: "Do you enjoy reading scientific articles or journals?", options: [{ label: "A", text: "Frequently", score: 3 }, { label: "B", text: "Occasionally", score: 2 }, { label: "C", text: "Never", score: 1 }] },
      { id: 24, question: "Would you like to discover something new in science?", options: [{ label: "A", text: "That's my dream", score: 3 }, { label: "B", text: "Maybe", score: 2 }, { label: "C", text: "Not interested", score: 1 }] },
      { id: 25, question: "Do you enjoy math and analytical thinking?", options: [{ label: "A", text: "Very much", score: 3 }, { label: "B", text: "It's okay", score: 2 }, { label: "C", text: "Not my strength", score: 1 }] },
    ],
  },
  {
    id: "social",
    title: "Social & Communication",
    icon: "🎓",
    color: "domain-social",
    questions: [
      { id: 26, question: "Do you enjoy teaching or explaining things to others?", options: [{ label: "A", text: "Yes, I love it", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "Not really", score: 1 }] },
      { id: 27, question: "Are you a good listener and communicator?", options: [{ label: "A", text: "Definitely", score: 3 }, { label: "B", text: "Usually", score: 2 }, { label: "C", text: "I struggle with it", score: 1 }] },
      { id: 28, question: "Do you enjoy public speaking or presentations?", options: [{ label: "A", text: "Love it", score: 3 }, { label: "B", text: "It's okay", score: 2 }, { label: "C", text: "I avoid it", score: 1 }] },
      { id: 29, question: "Would you like to make a positive impact on society?", options: [{ label: "A", text: "It's my purpose", score: 3 }, { label: "B", text: "Somewhat", score: 2 }, { label: "C", text: "Not a priority", score: 1 }] },
      { id: 30, question: "Do you enjoy working with people from diverse backgrounds?", options: [{ label: "A", text: "Very much", score: 3 }, { label: "B", text: "Sometimes", score: 2 }, { label: "C", text: "I prefer working alone", score: 1 }] },
    ],
  },
];

export function calculateResults(answers: Record<number, number>): QuizResult[] {
  return quizSections.map((section) => {
    const score = section.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const maxScore = section.questions.length * 3;
    return {
      sectionId: section.id,
      sectionTitle: section.title,
      score,
      maxScore,
      percentage: Math.round((score / maxScore) * 100),
    };
  });
}

export function detectDomains(results: QuizResult[]) {
  const sorted = [...results].sort((a, b) => b.score - a.score);
  const primary = domainMappings[sorted[0].sectionId];
  const secondary = domainMappings[sorted[1].sectionId];
  return { primary, secondary, results: sorted };
}
