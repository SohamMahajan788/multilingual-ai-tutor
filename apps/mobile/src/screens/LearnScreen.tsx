import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SUBJECTS = [
  {
    id: 'science', name: 'Science', emoji: '🔬',
    color: '#E8F4EE', accentColor: '#1A5C3A',
    totalTopics: 24, completedTopics: 8,
    topics: [
      { id: 's1', name: 'Light & Shadow', mastery: 85 },
      { id: 's2', name: 'Water Cycle', mastery: 72 },
      { id: 's3', name: 'Photosynthesis', mastery: 45 },
      { id: 's4', name: 'Human Body', mastery: 0 },
    ],
  },
  {
    id: 'math', name: 'Mathematics', emoji: '📐',
    color: '#E6EEF8', accentColor: '#1A4A7A',
    totalTopics: 30, completedTopics: 12,
    topics: [
      { id: 'm1', name: 'Fractions', mastery: 90 },
      { id: 'm2', name: 'Decimals', mastery: 78 },
      { id: 'm3', name: 'Algebra', mastery: 55 },
      { id: 'm4', name: 'Geometry', mastery: 0 },
    ],
  },
  {
    id: 'social', name: 'Social Studies', emoji: '🌍',
    color: '#FDF5E0', accentColor: '#7A4F00',
    totalTopics: 20, completedTopics: 5,
    topics: [
      { id: 'ss1', name: 'Indian History', mastery: 60 },
      { id: 'ss2', name: 'Geography', mastery: 40 },
      { id: 'ss3', name: 'Civics', mastery: 0 },
    ],
  },
  {
    id: 'english', name: 'English', emoji: '📖',
    color: '#F5ECF8', accentColor: '#5C1A7A',
    totalTopics: 18, completedTopics: 6,
    topics: [
      { id: 'e1', name: 'Grammar', mastery: 70 },
      { id: 'e2', name: 'Vocabulary', mastery: 55 },
      { id: 'e3', name: 'Writing', mastery: 0 },
    ],
  },
];

export default function LearnScreen() {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Learn</Text>
          <Text style={styles.headerSub}>Choose your subject</Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Overall Progress — 34%</Text>
        </View>

        {SUBJECTS.map((subject) => (
          <View key={subject.id} style={styles.card}>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                setExpandedSubject(
                  expandedSubject === subject.id ? null : subject.id
                );
              }}
              style={styles.cardHeader}
            >
              <View style={[styles.emojiCircle, { backgroundColor: subject.color }]}>
                <Text style={styles.emoji}>{subject.emoji}</Text>
              </View>

              <View style={styles.cardMiddle}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.topicCount}>
                  {subject.completedTopics}/{subject.totalTopics} topics
                </Text>
              </View>

              <Ionicons
                name={expandedSubject === subject.id ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#6B6B6B"
              />
            </TouchableOpacity>

            {expandedSubject === subject.id && (
              <View>
                <View style={styles.divider} />
                {subject.topics.map((topic) => (
                  <View key={topic.id} style={styles.topicRow}>
                    <View style={[
                      styles.masteryCircle,
                      {
                        backgroundColor:
                          topic.mastery === 0 ? '#F5F5F5' :
                          topic.mastery >= 80 ? subject.accentColor :
                          subject.color,
                      },
                    ]}>
                      {topic.mastery === 0 ? (
                        <Ionicons name="lock-closed" size={14} color="#6B6B6B" />
                      ) : topic.mastery >= 80 ? (
                        <Ionicons name="checkmark" size={14} color="white" />
                      ) : (
                        <Text style={[styles.masteryText, { color: subject.accentColor }]}>
                          {topic.mastery}%
                        </Text>
                      )}
                    </View>

                    <View style={styles.topicMiddle}>
                      <Text style={styles.topicName}>{topic.name}</Text>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.actionBtn,
                        {
                          backgroundColor:
                            topic.mastery === 0 ? '#E8720C' :
                            topic.mastery >= 100 ? '#E8E4DC' : '#1A5C3A',
                        },
                      ]}
                    >
                      <Text style={[
                        styles.actionText,
                        { color: topic.mastery >= 100 ? '#6B6B6B' : 'white' },
                      ]}>
                        {topic.mastery === 0 ? 'Start' :
                         topic.mastery >= 100 ? 'Done' : 'Continue'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF7' },
  header: { padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#2C2C2C' },
  headerSub: { fontSize: 13, color: '#6B6B6B', marginTop: 2 },
  progressCard: {
    backgroundColor: '#E8720C', borderRadius: 16,
    margin: 16, padding: 16,
  },
  progressTitle: { fontSize: 14, fontWeight: '700', color: 'white' },
  card: {
    backgroundColor: 'white', borderRadius: 16,
    borderWidth: 1, borderColor: '#E8E4DC',
    marginHorizontal: 16, marginBottom: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', padding: 16,
  },
  emojiCircle: {
    width: 52, height: 52, borderRadius: 26,
    alignItems: 'center', justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  cardMiddle: { flex: 1, marginLeft: 12, marginRight: 8 },
  subjectName: { fontSize: 17, fontWeight: '700', color: '#2C2C2C' },
  topicCount: { fontSize: 11, color: '#6B6B6B', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#E8E4DC' },
  topicRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#F5F5F5',
  },
  masteryCircle: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  masteryText: { fontSize: 11, fontWeight: '700' },
  topicMiddle: { flex: 1, marginLeft: 12 },
  topicName: { fontSize: 15, fontWeight: '500', color: '#2C2C2C' },
  actionBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  actionText: { fontSize: 12, fontWeight: '600' },
});