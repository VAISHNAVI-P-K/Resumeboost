import { create } from 'zustand';

export interface ResumeAnalysis {
  currentScore: number;
  potentialScore: number;
  scoreBreakdown: Array<{
    category: string;
    score: number;
    weight: number;
    color: string;
  }>;
  improvements: Array<{
    issue: string;
    fix: string;
    scoreGain: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  matchedKeywords: string[];
  missingKeywords: string[];
  sections: Array<{
    name: string;
    status: 'complete' | 'incomplete' | 'missing';
  }>;
  resumeText: string;
  jobDescription: string;
}

interface ResumeStore {
  analysis: ResumeAnalysis | null;
  setAnalysis: (analysis: ResumeAnalysis) => void;
  clearAnalysis: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),
  clearAnalysis: () => set({ analysis: null }),
}));
