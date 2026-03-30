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
  setOnboardingComplete: (val: boolean) => void;
  setSelectedLanguage: (lang: string) => void;
  setStudentName: (name: string) => void;
  setStudentGrade: (grade: number) => void;
  setLowLiteracyMode: (val: boolean) => void;
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => void;
  setXP: (xp: number) => void;
  setLevel: (level: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isOnboardingComplete: false,
  selectedLanguage: '',
  studentName: '',
  studentGrade: 0,
  isLowLiteracyMode: false,
  textSize: 'normal',
  xp: 240,
  level: 3,
  streakDays: 5,
  setOnboardingComplete: (val: boolean) => set({ isOnboardingComplete: val }),
  setSelectedLanguage: (lang: string) => set({ selectedLanguage: lang }),
  setStudentName: (name: string) => set({ studentName: name }),
  setStudentGrade: (grade: number) => set({ studentGrade: grade }),
  setLowLiteracyMode: (val: boolean) => set({ isLowLiteracyMode: val }),
  setTextSize: (size: 'normal' | 'large' | 'xlarge') => set({ textSize: size }),
  setXP: (xp: number) => set({ xp }),
  setLevel: (level: number) => set({ level }),
}));
