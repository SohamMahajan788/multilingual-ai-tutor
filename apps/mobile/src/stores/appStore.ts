import { create } from 'zustand';

export interface AppState {
  isOnboardingComplete: boolean;
  selectedLanguage: string;
  studentName: string;
  studentGrade: number;
  isLowLiteracyMode: boolean;
  textSize: 'normal' | 'large' | 'xlarge';
  xp: number;
  level: number;
  streakDays: number;
  completedTopics: string[];
  subjectProgress: Record<string, number>;

  setOnboardingComplete: (val: boolean) => void;
  setSelectedLanguage: (lang: string) => void;
  setStudentName: (name: string) => void;
  setStudentGrade: (grade: number) => void;
  setLowLiteracyMode: (val: boolean) => void;
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setXP: (xp: number) => void;
  addXP: (amount: number) => void;
  setLevel: (level: number) => void;
  setStreakDays: (days: number) => void;
  markTopicComplete: (topicId: string, subjectId: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  isOnboardingComplete: false,
  selectedLanguage: 'English',
  studentName: '',
  studentGrade: 8,
  isLowLiteracyMode: false,
  textSize: 'normal',
  xp: 0,
  level: 1,
  streakDays: 0,
  completedTopics: [],
  subjectProgress: {},

  setOnboardingComplete: (val) => set({ isOnboardingComplete: val }),
  setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
  setStudentName: (name) => set({ studentName: name }),
  setStudentGrade: (grade) => set({ studentGrade: grade }),
  setLowLiteracyMode: (val) => set({ isLowLiteracyMode: val }),
  setTextSize: (size) => set({ textSize: size }),
  setXP: (xp) => set({ xp }),
  setLevel: (level) => set({ level }),
  setStreakDays: (days) => set({ streakDays: days }),

  addXP: (amount) => {
    const newXP = get().xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;
    set({ xp: newXP, level: newLevel });
  },

  markTopicComplete: (topicId, subjectId) => {
    const completed = get().completedTopics;
    if (!completed.includes(topicId)) {
      const newCompleted = [...completed, topicId];
      const subjectTopicsCompleted = newCompleted.filter(id =>
        id.startsWith(subjectId)
      ).length;
      set({
        completedTopics: newCompleted,
        subjectProgress: {
          ...get().subjectProgress,
          [subjectId]: subjectTopicsCompleted,
        },
      });
      get().addXP(20);
    }
  },
}));