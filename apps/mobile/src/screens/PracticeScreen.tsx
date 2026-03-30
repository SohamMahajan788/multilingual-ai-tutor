import React, { useCallback, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUESTIONS = [
  {
    id: 'q1',
    subject: 'Science',
    topic: 'Photosynthesis',
    question: 'Which gas do plants absorb during photosynthesis?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correct: 1,
    explanation:
      'Plants absorb Carbon Dioxide (CO2) and release Oxygen during photosynthesis.',
  },
  {
    id: 'q2',
    subject: 'Mathematics',
    topic: 'Fractions',
    question: 'What is 3/4 + 1/4?',
    options: ['1/2', '4/8', '1', '2'],
    correct: 2,
    explanation:
      '3/4 + 1/4 = 4/4 = 1. When denominators are same, add numerators.',
  },
  {
    id: 'q3',
    subject: 'Science',
    topic: 'Water Cycle',
    question: 'What is the process of water turning into vapor called?',
    options: ['Condensation', 'Precipitation', 'Evaporation', 'Infiltration'],
    correct: 2,
    explanation:
      'Evaporation is when liquid water turns into water vapor due to heat.',
  },
  {
    id: 'q4',
    subject: 'Mathematics',
    topic: 'Algebra',
    question: 'If x + 5 = 12, what is x?',
    options: ['5', '6', '7', '8'],
    correct: 2,
    explanation: 'x + 5 = 12, so x = 12 - 5 = 7.',
  },
  {
    id: 'q5',
    subject: 'Social Studies',
    topic: 'Indian History',
    question: 'In which year did India gain independence?',
    options: ['1945', '1947', '1950', '1952'],
    correct: 1,
    explanation:
      'India gained independence from British rule on August 15, 1947.',
  },
] as const;

const LETTERS = ['A', 'B', 'C', 'D'] as const;

function getSubjectBadgeColors(subject: string): {
  bg: string;
  text: string;
} {
  switch (subject) {
    case 'Science':
      return { bg: '#E8F4EE', text: '#1A5C3A' };
    case 'Mathematics':
      return { bg: '#E6EEF8', text: '#1A4A7A' };
    case 'Social Studies':
      return { bg: '#FDF5E0', text: '#7A4F00' };
    default:
      return { bg: '#F5F5F5', text: '#2C2C2C' };
  }
}

/**
 * Practice tab: multiple-choice quiz with explanations and results summary.
 */
export default function PracticeScreen(): React.ReactElement {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const question = QUESTIONS[currentIndex];
  const progressPct = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsComplete(false);
  }, []);

  const handleSelectOption = useCallback(
    (index: number) => {
      if (isAnswered) {
        return;
      }
      setSelectedOption(index);
      setIsAnswered(true);
      if (index === question.correct) {
        setScore((s) => s + 1);
      }
    },
    [isAnswered, question.correct]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex]);

  const resultsMeta = useMemo(() => {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    if (pct >= 80) {
      return {
        pct,
        circleBg: '#E8F4EE',
        circleBorder: '#1A5C3A',
        circleText: '#1A5C3A',
        message: "Excellent! You're mastering this topic! 🌟",
      };
    }
    if (pct >= 60) {
      return {
        pct,
        circleBg: '#FDF5E0',
        circleBorder: '#E8720C',
        circleText: '#E8720C',
        message: 'Good job! Keep practicing! 💪',
      };
    }
    return {
      pct,
      circleBg: '#FCF0F0',
      circleBorder: '#E24B4A',
      circleText: '#E24B4A',
      message: "Keep trying! You'll get better! 🌱",
    };
  }, [score]);

  if (isComplete) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScrollView
          contentContainerStyle={styles.resultsScroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.resultsEmoji}>🏆</Text>
          <Text style={styles.resultsTitle}>Quiz Complete!</Text>
          <Text style={styles.resultsSubtitle}>
            {score} out of {QUESTIONS.length} correct
          </Text>
          <View
            style={[
              styles.percentCircle,
              {
                backgroundColor: resultsMeta.circleBg,
                borderColor: resultsMeta.circleBorder,
              },
            ]}
          >
            <Text style={[styles.percentText, { color: resultsMeta.circleText }]}>
              {resultsMeta.pct}%
            </Text>
          </View>
          <Text style={styles.resultsMessage}>{resultsMeta.message}</Text>
          <Pressable
            onPress={resetQuiz}
            style={({ pressed }) => [
              styles.tryAgainBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Text style={styles.tryAgainLabel}>Try Again</Text>
          </Pressable>
          <Pressable
            onPress={resetQuiz}
            style={({ pressed }) => [
              styles.nextQuizBtn,
              pressed && styles.btnPressed,
            ]}
          >
            <Text style={styles.nextQuizLabel}>Next Quiz →</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const badgeColors = getSubjectBadgeColors(question.subject);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✏️ Practice</Text>
          <Text style={styles.headerSub}>Test your knowledge</Text>
        </View>

        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>
            Question {currentIndex + 1} of {QUESTIONS.length}
          </Text>
          <View style={styles.scoreBadge}>
            <Text style={styles.scoreBadgeText}>⭐ {score}</Text>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
        </View>

        <View style={styles.questionCard}>
          <View
            style={[styles.subjectBadge, { backgroundColor: badgeColors.bg }]}
          >
            <Text style={[styles.subjectBadgeText, { color: badgeColors.text }]}>
              {question.subject} · {question.topic}
            </Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {question.options.map((opt, index) => {
          const answered = isAnswered;
          const isCorrect = index === question.correct;
          const isSelected = selectedOption === index;
          const showAsCorrect = answered && isCorrect;
          const showAsWrong = answered && isSelected && !isCorrect;

          let btnStyle = styles.optionDefault;
          let letterWrapStyle = styles.letterDefault;
          let letterTextStyle = styles.letterTextDefault;

          if (showAsCorrect) {
            btnStyle = styles.optionCorrect;
            letterWrapStyle = styles.letterCorrect;
            letterTextStyle = styles.letterTextOnAccent;
          } else if (showAsWrong) {
            btnStyle = styles.optionWrong;
            letterWrapStyle = styles.letterWrong;
            letterTextStyle = styles.letterTextOnAccent;
          }

          return (
            <Pressable
              key={`${question.id}-${index}`}
              onPress={() => handleSelectOption(index)}
              disabled={isAnswered}
              style={({ pressed }) => [
                styles.optionBtn,
                btnStyle,
                pressed && !isAnswered && styles.optionPressed,
              ]}
            >
              <View style={[styles.letterCircle, letterWrapStyle]}>
                <Text style={[styles.letterText, letterTextStyle]}>
                  {LETTERS[index]}
                </Text>
              </View>
              <Text style={styles.optionLabel}>{opt}</Text>
            </Pressable>
          );
        })}

        {isAnswered ? (
          <>
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>💡 Explanation</Text>
              <Text style={styles.explanationBody}>{question.explanation}</Text>
            </View>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextBtn,
                currentIndex >= QUESTIONS.length - 1
                  ? styles.nextBtnResults
                  : styles.nextBtnMore,
                pressed && styles.btnPressed,
              ]}
            >
              <Text style={styles.nextBtnText}>
                {currentIndex < QUESTIONS.length - 1
                  ? 'Next Question →'
                  : 'See Results 🎉'}
              </Text>
            </Pressable>
          </>
        ) : null}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C2C2C',
  },
  headerSub: {
    fontSize: 13,
    color: '#6B6B6B',
    marginTop: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  scoreBadge: {
    backgroundColor: '#FDF0E6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  scoreBadgeText: {
    color: '#E8720C',
    fontSize: 14,
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8E4DC',
    marginHorizontal: 16,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8720C',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    margin: 16,
    padding: 20,
  },
  subjectBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  subjectBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 16,
    lineHeight: 26,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 14,
  },
  optionDefault: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E4DC',
  },
  optionCorrect: {
    backgroundColor: '#E8F4EE',
    borderColor: '#1A5C3A',
  },
  optionWrong: {
    backgroundColor: '#FCF0F0',
    borderColor: '#E24B4A',
  },
  optionPressed: {
    opacity: 0.92,
  },
  letterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  letterDefault: {
    backgroundColor: '#F5F5F5',
  },
  letterCorrect: {
    backgroundColor: '#1A5C3A',
  },
  letterWrong: {
    backgroundColor: '#E24B4A',
  },
  letterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  letterTextDefault: {
    color: '#6B6B6B',
  },
  letterTextOnAccent: {
    color: '#FFFFFF',
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  explanationBox: {
    backgroundColor: '#E8F4EE',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  explanationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A5C3A',
    marginBottom: 6,
  },
  explanationBody: {
    fontSize: 14,
    color: '#2C2C2C',
    lineHeight: 22,
  },
  nextBtn: {
    marginHorizontal: 16,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextBtnMore: {
    backgroundColor: '#E8720C',
  },
  nextBtnResults: {
    backgroundColor: '#1A5C3A',
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 24,
  },
  resultsScroll: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 100,
    backgroundColor: '#FDFBF7',
  },
  resultsEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C2C2C',
    marginTop: 16,
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 18,
    color: '#6B6B6B',
    marginTop: 8,
    textAlign: 'center',
  },
  percentCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  percentText: {
    fontSize: 20,
    fontWeight: '800',
  },
  resultsMessage: {
    fontSize: 16,
    color: '#2C2C2C',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    paddingHorizontal: 8,
  },
  tryAgainBtn: {
    marginTop: 32,
    width: '100%',
    maxWidth: 320,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tryAgainLabel: {
    color: '#E8720C',
    fontSize: 17,
    fontWeight: '700',
  },
  nextQuizBtn: {
    marginTop: 12,
    width: '100%',
    maxWidth: 320,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextQuizLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  btnPressed: {
    opacity: 0.9,
  },
});
