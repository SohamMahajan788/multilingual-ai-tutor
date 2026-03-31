import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getQuizzesForClass } from '../data/curriculum';
import { t } from '../data/translations';
import { useAppStore } from '../stores/appStore';

export default function PracticeScreen(): React.ReactElement {
  const { studentGrade, selectedLanguage, addXP } = useAppStore();
  const lang = selectedLanguage as any || 'English';

  const allQuizzes = useMemo(() =>
    getQuizzesForClass(studentGrade || 8).sort(() => Math.random() - 0.5).slice(0, 10),
    [studentGrade]
  );

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState<string>('all');

  const subjects = useMemo(() => {
    const ids = [...new Set(allQuizzes.map(q => q.subject.id))];
    return [{ id: 'all', name: 'All', emoji: '📚' }, ...ids.map(id => {
      const q = allQuizzes.find(q => q.subject.id === id)!;
      return { id, name: q.subject.name, emoji: q.subject.emoji };
    })];
  }, [allQuizzes]);

  const filtered = useMemo(() =>
    subjectFilter === 'all' ? allQuizzes : allQuizzes.filter(q => q.subject.id === subjectFilter),
    [allQuizzes, subjectFilter]
  );

  const currentQ = filtered[current];

  const handleAnswer = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === currentQ.quiz.correct) {
      setScore(s => s + 1);
      addXP(10);
    }
  }, [selected, currentQ, addXP]);

  const handleNext = useCallback(() => {
    if (current + 1 >= filtered.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  }, [current, filtered.length]);

  const handleRestart = useCallback(() => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }, []);

  if (finished) {
    const pct = Math.round((score / filtered.length) * 100);
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{pct >= 70 ? '🏆' : pct >= 40 ? '👍' : '💪'}</Text>
          <Text style={styles.resultTitle}>{t(lang, 'score')}: {score}/{filtered.length}</Text>
          <Text style={styles.resultPct}>{pct}%</Text>
          <Text style={styles.resultMsg}>
            {pct >= 70 ? 'Excellent! Keep it up!' : pct >= 40 ? 'Good effort! Practice more.' : 'Keep trying, you will improve!'}
          </Text>
          <Pressable style={styles.restartBtn} onPress={handleRestart}>
            <Text style={styles.restartText}>Practice Again</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQ) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>📚</Text>
          <Text style={styles.resultTitle}>No questions available</Text>
          <Pressable style={styles.restartBtn} onPress={() => setSubjectFilter('all')}>
            <Text style={styles.restartText}>Show All</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const LETTERS = ['A', 'B', 'C', 'D'];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(lang, 'practice')}</Text>
        <Text style={styles.progress}>{current + 1}/{filtered.length}</Text>
      </View>

      {/* Subject Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {subjects.map(s => (
          <Pressable
            key={s.id}
            style={[styles.filterChip, subjectFilter === s.id && styles.filterActive]}
            onPress={() => { setSubjectFilter(s.id); setCurrent(0); setSelected(null); }}
          >
            <Text style={styles.filterText}>{s.emoji} {s.name}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Subject Tag */}
        <View style={styles.tagRow}>
          <Text style={styles.subjectTag}>{currentQ.subject.emoji} {currentQ.subject.name}</Text>
          <Text style={styles.topicTag}>{currentQ.topic.name}</Text>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.question}>{currentQ.quiz.question}</Text>
        </View>

        {/* Options */}
        {currentQ.quiz.options.map((opt, idx) => {
          const isCorrect = idx === currentQ.quiz.correct;
          const isSelected = idx === selected;
          let optStyle = styles.option;
          if (selected !== null) {
            if (isCorrect) optStyle = styles.optionCorrect;
            else if (isSelected) optStyle = styles.optionWrong;
          }
          return (
            <Pressable key={idx} style={[styles.optionBase, optStyle]} onPress={() => handleAnswer(idx)}>
              <View style={styles.letterCircle}>
                <Text style={styles.letter}>{LETTERS[idx]}</Text>
              </View>
              <Text style={styles.optionText}>{opt}</Text>
              {selected !== null && isCorrect && <Text>✅</Text>}
              {selected !== null && isSelected && !isCorrect && <Text>❌</Text>}
            </Pressable>
          );
        })}

        {/* Explanation */}
        {selected !== null && (
          <View style={styles.explanationCard}>
            <Text style={styles.explanationLabel}>💡 Explanation</Text>
            <Text style={styles.explanationText}>{currentQ.quiz.explanation}</Text>
          </View>
        )}

        {/* Next Button */}
        {selected !== null && (
          <Pressable style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextText}>
              {current + 1 >= filtered.length ? 'See Results' : t(lang, 'nextQuestion')} →
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFBF7' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 24, fontWeight: '800', color: '#2C2C2C' },
  progress: { fontSize: 14, fontWeight: '600', color: '#6B6B6B' },
  filterRow: { maxHeight: 48, marginBottom: 8 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', marginRight: 8 },
  filterActive: { backgroundColor: '#1A5C3A' },
  filterText: { fontSize: 13, fontWeight: '600', color: '#2C2C2C' },
  scroll: { padding: 16, paddingBottom: 40 },
  tagRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  subjectTag: { backgroundColor: '#E8F4EE', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontSize: 12, fontWeight: '600', color: '#1A5C3A' },
  topicTag: { backgroundColor: '#FDF0E6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, fontSize: 12, fontWeight: '600', color: '#E8720C' },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E8E4DC' },
  question: { fontSize: 17, fontWeight: '600', color: '#2C2C2C', lineHeight: 26 },
  optionBase: { flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, borderWidth: 1, borderColor: '#E8E4DC', backgroundColor: '#FDFBF7', marginBottom: 10, gap: 10 },
  option: {},
  optionCorrect: { backgroundColor: '#E8F4EE', borderColor: '#1A5C3A' },
  optionWrong: { backgroundColor: '#FCF0F0', borderColor: '#E24B4A' },
  letterCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
  letter: { fontSize: 13, fontWeight: '700', color: '#2C2C2C' },
  optionText: { flex: 1, fontSize: 14, color: '#2C2C2C' },
  explanationCard: { backgroundColor: '#FFFBEA', borderRadius: 12, padding: 14, marginTop: 8, borderWidth: 1, borderColor: '#F0D060' },
  explanationLabel: { fontSize: 13, fontWeight: '700', color: '#7A5C00', marginBottom: 6 },
  explanationText: { fontSize: 13, color: '#2C2C2C', lineHeight: 20 },
  nextBtn: { backgroundColor: '#E8720C', borderRadius: 14, padding: 16, alignItems: 'center', marginTop: 16 },
  nextText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  resultContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  resultEmoji: { fontSize: 64, marginBottom: 16 },
  resultTitle: { fontSize: 24, fontWeight: '800', color: '#2C2C2C', marginBottom: 8 },
  resultPct: { fontSize: 48, fontWeight: '800', color: '#1A5C3A', marginBottom: 8 },
  resultMsg: { fontSize: 16, color: '#6B6B6B', textAlign: 'center', marginBottom: 24 },
  restartBtn: { backgroundColor: '#1A5C3A', borderRadius: 14, paddingHorizontal: 32, paddingVertical: 14 },
  restartText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});