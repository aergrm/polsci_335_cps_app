
export interface Week {
  id: number;
  dates: string;
  title: string;
  topics: string[];
  readings: string[];
  due?: string[];
}

export interface Assignment {
  id: string;
  name: string;
  weight: number; // percentage
  category: 'Participation' | 'Quiz' | 'Essay' | 'Exam' | 'Project' | 'Presentation';
  dueDate?: string;
}

export type DimensionCategory = 'executives-parties' | 'federal-unitary';

export interface DemocracyDimension {
  id: string;
  name: string;
  category: DimensionCategory;
  chapter: number;
  westminster: string;
  consensus: string;
  description: string;
}

export type ViewState = 'dashboard' | 'schedule' | 'concepts' | 'study';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: 'Concept' | 'Dimension';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizLevel {
  level: number;
  title: string;
  description: string;
  minScoreToUnlock: number; // Percentage
  questions: QuizQuestion[];
}

export interface LiveQuestion {
  id: string;
  text: string;
  timeLimit: number;
  explanation: string;
  options: {
    id: string;
    text: string;
    color: 'red' | 'blue' | 'yellow' | 'green';
    isCorrect: boolean;
  }[];
}

export interface LiveQuizSession {
  weekId: number;
  title: string;
  questions: LiveQuestion[];
  isLocked?: boolean;
}
