export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  LanguageSelect: undefined;
  ProfileSetup: undefined;
  Tutorial: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Learn: undefined;
  Practice: undefined;
  Village: undefined;
  Profile: undefined;
};

export type LearnStackParamList = {
  SubjectList: undefined;
  TopicList: { subjectId: string; subjectName: string };
  Lesson: { topicId: string; topicName: string };
};
