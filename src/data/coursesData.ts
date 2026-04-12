export interface Course {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  domain: string;
  url: string;
}

export const mockCourses: Record<string, Course[]> = {
  technology: [
    { id: "t1", title: "Python for Beginners - Full Course", channel: "Programming with Mosh", thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop", duration: "6h 14m", level: "Beginner", domain: "technology", url: "#" },
    { id: "t2", title: "Web Development Bootcamp 2024", channel: "Traversy Media", thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop", duration: "12h 30m", level: "Beginner", domain: "technology", url: "#" },
    { id: "t3", title: "Data Structures & Algorithms", channel: "freeCodeCamp", thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=400&h=225&fit=crop", duration: "8h 45m", level: "Intermediate", domain: "technology", url: "#" },
    { id: "t4", title: "Machine Learning Full Course", channel: "Stanford Online", thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop", duration: "15h", level: "Advanced", domain: "technology", url: "#" },
  ],
  business: [
    { id: "b1", title: "Business Fundamentals", channel: "Harvard Business Review", thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop", duration: "4h 30m", level: "Beginner", domain: "business", url: "#" },
    { id: "b2", title: "Digital Marketing Masterclass", channel: "HubSpot Academy", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop", duration: "8h", level: "Intermediate", domain: "business", url: "#" },
    { id: "b3", title: "Financial Analysis & Modeling", channel: "Wall Street Prep", thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop", duration: "10h", level: "Advanced", domain: "business", url: "#" },
  ],
  creative: [
    { id: "c1", title: "UI/UX Design Fundamentals", channel: "Google Design", thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=225&fit=crop", duration: "5h", level: "Beginner", domain: "creative", url: "#" },
    { id: "c2", title: "Figma Complete Guide", channel: "DesignCourse", thumbnail: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=225&fit=crop", duration: "7h 20m", level: "Intermediate", domain: "creative", url: "#" },
    { id: "c3", title: "Motion Graphics & Animation", channel: "School of Motion", thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop", duration: "9h", level: "Advanced", domain: "creative", url: "#" },
  ],
  healthcare: [
    { id: "h1", title: "Human Anatomy Basics", channel: "Khan Academy", thumbnail: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=225&fit=crop", duration: "6h", level: "Beginner", domain: "healthcare", url: "#" },
    { id: "h2", title: "Medical Terminology Course", channel: "Osmosis", thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=225&fit=crop", duration: "4h 45m", level: "Beginner", domain: "healthcare", url: "#" },
  ],
  science: [
    { id: "s1", title: "Introduction to Physics", channel: "MIT OpenCourseWare", thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=225&fit=crop", duration: "10h", level: "Beginner", domain: "science", url: "#" },
    { id: "s2", title: "Chemistry Fundamentals", channel: "CrashCourse", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=225&fit=crop", duration: "8h", level: "Beginner", domain: "science", url: "#" },
  ],
  social: [
    { id: "so1", title: "Public Speaking Mastery", channel: "TED Talks", thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=225&fit=crop", duration: "3h 30m", level: "Beginner", domain: "social", url: "#" },
    { id: "so2", title: "Educational Psychology", channel: "Coursera", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=225&fit=crop", duration: "6h", level: "Intermediate", domain: "social", url: "#" },
  ],
};

export const roadmaps: Record<string, { step: number; title: string; description: string; duration: string }[]> = {
  technology: [
    { step: 1, title: "Learn Programming Fundamentals", description: "Master a programming language like Python or JavaScript", duration: "2-3 months" },
    { step: 2, title: "Build Real Projects", description: "Create portfolio projects to apply your skills", duration: "2-3 months" },
    { step: 3, title: "Learn Data Structures & Algorithms", description: "Understand core CS concepts for problem solving", duration: "2-3 months" },
    { step: 4, title: "Practice Coding Challenges", description: "Solve problems on LeetCode, HackerRank", duration: "Ongoing" },
    { step: 5, title: "Apply for Internships", description: "Start applying to companies and building experience", duration: "1-2 months" },
  ],
  business: [
    { step: 1, title: "Study Business Fundamentals", description: "Learn accounting, marketing, and management basics", duration: "2-3 months" },
    { step: 2, title: "Develop Leadership Skills", description: "Take on leadership roles in clubs or projects", duration: "3-6 months" },
    { step: 3, title: "Learn Financial Analysis", description: "Master spreadsheets, budgeting, and forecasting", duration: "2 months" },
    { step: 4, title: "Build a Business Plan", description: "Create a comprehensive plan for a venture", duration: "1-2 months" },
    { step: 5, title: "Seek Mentorship & Networking", description: "Connect with industry professionals", duration: "Ongoing" },
  ],
  creative: [
    { step: 1, title: "Master Design Principles", description: "Learn color theory, typography, and layout", duration: "1-2 months" },
    { step: 2, title: "Learn Design Tools", description: "Master Figma, Adobe XD, or Sketch", duration: "2-3 months" },
    { step: 3, title: "Build a Design Portfolio", description: "Create case studies and showcase projects", duration: "2-3 months" },
    { step: 4, title: "Study User Research", description: "Learn UX research methods and user testing", duration: "1-2 months" },
    { step: 5, title: "Apply for Design Roles", description: "Start freelancing or applying to companies", duration: "1-2 months" },
  ],
  healthcare: [
    { step: 1, title: "Study Biology & Chemistry", description: "Build a strong foundation in sciences", duration: "3-6 months" },
    { step: 2, title: "Learn Human Anatomy", description: "Deep dive into body systems and physiology", duration: "3-6 months" },
    { step: 3, title: "Get Certified in First Aid", description: "Complete basic life support certification", duration: "1 month" },
    { step: 4, title: "Gain Clinical Experience", description: "Volunteer at hospitals or clinics", duration: "6+ months" },
    { step: 5, title: "Apply to Medical Programs", description: "Prepare for and apply to medical schools", duration: "3-6 months" },
  ],
  science: [
    { step: 1, title: "Master Mathematics", description: "Build strong math skills for scientific analysis", duration: "3-6 months" },
    { step: 2, title: "Learn Research Methods", description: "Understand experimental design and data analysis", duration: "2-3 months" },
    { step: 3, title: "Conduct Experiments", description: "Start your own research projects", duration: "3-6 months" },
    { step: 4, title: "Publish & Present Findings", description: "Write papers and present at conferences", duration: "Ongoing" },
    { step: 5, title: "Apply for Research Positions", description: "Seek lab positions or graduate programs", duration: "2-3 months" },
  ],
  social: [
    { step: 1, title: "Develop Communication Skills", description: "Practice public speaking and writing", duration: "2-3 months" },
    { step: 2, title: "Study Psychology & Sociology", description: "Understand human behavior and social dynamics", duration: "3-6 months" },
    { step: 3, title: "Gain Teaching Experience", description: "Tutor, mentor, or teach workshops", duration: "3-6 months" },
    { step: 4, title: "Get Certified", description: "Obtain relevant teaching or coaching certifications", duration: "2-3 months" },
    { step: 5, title: "Build Your Network", description: "Connect with educational institutions and NGOs", duration: "Ongoing" },
  ],
};
