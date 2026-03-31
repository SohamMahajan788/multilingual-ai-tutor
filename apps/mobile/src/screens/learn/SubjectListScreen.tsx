import { Ionicons } from '@expo/vector-icons';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getSubjectsForClass } from '../../data/curriculum';
import { t } from '../../data/translations';
import type { LearnStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

type Props = StackScreenProps<LearnStackParamList, 'SubjectList'>;

export default function SubjectListScreen({ navigation }: Props): React.ReactElement {
  const { studentGrade, selectedLanguage, completedTopics } = useAppStore();
  const lang = selectedLanguage as any || 'English';
  const subjects = getSubjectsForClass(studentGrade || 8);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>{t(lang, 'learn')}</Text>
        <Text style={styles.subtitle}>Class {studentGrade || 8} • {subjects.length} Subjects</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {subjects.map(subject => {
          const isExpanded = expandedId === subject.id;
          const done = completedTopics.filter(id => id.startsWith(subject.id)).length;
          const total = subject.topics.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;

          return (
            <View key={subject.id} style={styles.subjectCard}>
              <TouchableOpacity
                style={styles.subjectHeader}
                onPress={() => setExpandedId(isExpanded ? null : subject.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.emojiBox, { backgroundColor: subject.color + '33' }]}>
                  <Text style={styles.emoji}>{subject.emoji}</Text>
                </View>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectName}>{subject.name}</Text>
                  <Text style={styles.subjectMeta}>{done}/{total} {t(lang, 'topics')} • {pct}%</Text>
                  <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: subject.color }]} />
                  </View>
                </View>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color="#6B6B6B" />
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.topicsList}>
                  {subject.topics.map(topic => {
                    const isComplete = completedTopics.includes(topic.id);
                    return (
                      <TouchableOpacity
                        key={topic.id}
                        style={styles.topicRow}
                        onPress={() => navigation.navigate('Lesson', {
                          topicName: topic.name,
                          topicId: topic.id,
                          subjectId: subject.id,
                          subjectName: subject.name,
                        } as any)}
                        activeOpacity={0.8}
                      >
                        <View style={[styles.topicIcon, { backgroundColor: isComplete ? '#E8F4EE' : '#F5F5F5' }]}>
                          <Ionicons
                            name={isComplete ? 'checkmark-circle' : 'book-outline'}
                            size={18}
                            color={isComplete ? '#1A5C3A' : '#6B6B6B'}
                          />
                        </View>
                        <View style={styles.topicInfo}>
                          <Text style={styles.topicName}>{topic.name}</Text>
                          <Text style={styles.topicMeta}>
                            {topic.duration} • {t(lang, topic.difficulty.toLowerCase() as any)}
                          </Text>
                        </View>
                        <View style={[
                          styles.diffBadge,
                          topic.difficulty === 'Easy' && styles.diffEasy,
                          topic.difficulty === 'Medium' && styles.diffMedium,
                          topic.difficulty === 'Hard' && styles.diffHard,
                        ]}>
                          <Text style={styles.diffText}>{t(lang, topic.difficulty.toLowerCase() as any)}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFBF7' },
  header: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: '800', color: '#2C2C2C' },
  subtitle: { fontSize: 13, color: '#6B6B6B', marginTop: 2 },
  scroll: { padding: 16, paddingBottom: 32 },
  subjectCard: { backgroundColor: '#FFFFFF', borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E8E4DC', overflow: 'hidden' },
  subjectHeader: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  emojiBox: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  emoji: { fontSize: 24 },
  subjectInfo: { flex: 1 },
  subjectName: { fontSize: 15, fontWeight: '700', color: '#2C2C2C' },
  subjectMeta: { fontSize: 12, color: '#6B6B6B', marginTop: 2, marginBottom: 4 },
  progressBar: { height: 4, backgroundColor: '#F0F0F0', borderRadius: 2 },
  progressFill: { height: 4, borderRadius: 2 },
  topicsList: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingHorizontal: 12, paddingBottom: 8 },
  topicRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  topicIcon: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  topicInfo: { flex: 1 },
  topicName: { fontSize: 14, fontWeight: '600', color: '#2C2C2C' },
  topicMeta: { fontSize: 11, color: '#6B6B6B', marginTop: 2 },
  diffBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  diffEasy: { backgroundColor: '#E8F4EE' },
  diffMedium: { backgroundColor: '#FDF0E6' },
  diffHard: { backgroundColor: '#FCF0F0' },
  diffText: { fontSize: 11, fontWeight: '600', color: '#2C2C2C' },
});