import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CURRICULUM, getSubjectsForClass } from '../data/curriculum';
import { t } from '../data/translations';
import { useAppStore } from '../stores/appStore';

export default function HomeScreen(): React.ReactElement {
  const navigation = useNavigation<any>();
  const { studentName, studentGrade, selectedLanguage, xp, level, streakDays, completedTopics } = useAppStore();
  const lang = selectedLanguage as any || 'English';
  const subjects = getSubjectsForClass(studentGrade || 8);

  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t(lang, 'greeting')} {studentName || 'Student'}!</Text>
            <Text style={styles.subGreeting}>{timeGreeting} • Class {studentGrade || 8}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakCount}>{streakDays}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{xp}</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{completedTopics.length}</Text>
            <Text style={styles.statLabel}>Topics Done</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{subjects.length}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
        </View>

        {/* Today's Challenge */}
        <View style={styles.challengeCard}>
          <Text style={styles.challengeLabel}>⚡ {t(lang, 'todayChallenge')}</Text>
          <Text style={styles.challengeText}>
            Complete 3 topics today to earn bonus XP!
          </Text>
          <TouchableOpacity
            style={styles.challengeBtn}
            onPress={() => navigation.navigate('Practice')}
          >
            <Text style={styles.challengeBtnText}>{t(lang, 'practice')} →</Text>
          </TouchableOpacity>
        </View>

        {/* Subjects Grid */}
        <Text style={styles.sectionTitle}>{t(lang, 'chooseSubject')}</Text>
        <View style={styles.subjectsGrid}>
          {subjects.map(subject => {
            const done = completedTopics.filter(id => id.startsWith(subject.id)).length;
            const total = subject.topics.length;
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            return (
              <TouchableOpacity
                key={subject.id}
                style={styles.subjectCard}
                onPress={() => navigation.navigate('Learn')}
                activeOpacity={0.85}
              >
                <Text style={styles.subjectEmoji}>{subject.emoji}</Text>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectProgress}>{done}/{total} topics</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: subject.color }]} />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Continue Learning */}
        <Text style={styles.sectionTitle}>{t(lang, 'continueLearn')}</Text>
        {subjects.slice(0, 3).map(subject => (
          <TouchableOpacity
            key={subject.id}
            style={styles.continueCard}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.continueEmoji}>{subject.emoji}</Text>
            <View style={styles.continueInfo}>
              <Text style={styles.continueName}>{subject.name}</Text>
              <Text style={styles.continueSub}>{subject.topics[0]?.name}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B6B6B" />
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFBF7' },
  scroll: { padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { fontSize: 22, fontWeight: '800', color: '#2C2C2C' },
  subGreeting: { fontSize: 13, color: '#6B6B6B', marginTop: 2 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FDF0E6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  streakFire: { fontSize: 18 },
  streakCount: { fontSize: 16, fontWeight: '700', color: '#E8720C', marginLeft: 4 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E8E4DC' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#1A5C3A' },
  statLabel: { fontSize: 11, color: '#6B6B6B', marginTop: 2 },
  challengeCard: { backgroundColor: '#1A5C3A', borderRadius: 16, padding: 16, marginBottom: 20 },
  challengeLabel: { fontSize: 13, fontWeight: '700', color: '#A8D5B8', marginBottom: 6 },
  challengeText: { fontSize: 15, color: '#FFFFFF', fontWeight: '600', marginBottom: 12 },
  challengeBtn: { backgroundColor: '#FFFFFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  challengeBtnText: { fontSize: 13, fontWeight: '700', color: '#1A5C3A' },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#2C2C2C', marginBottom: 12 },
  subjectsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  subjectCard: { width: '47%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#E8E4DC' },
  subjectEmoji: { fontSize: 28, marginBottom: 6 },
  subjectName: { fontSize: 14, fontWeight: '700', color: '#2C2C2C' },
  subjectProgress: { fontSize: 11, color: '#6B6B6B', marginTop: 2, marginBottom: 6 },
  progressBar: { height: 4, backgroundColor: '#F0F0F0', borderRadius: 2 },
  progressFill: { height: 4, borderRadius: 2 },
  continueCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#E8E4DC' },
  continueEmoji: { fontSize: 24, marginRight: 12 },
  continueInfo: { flex: 1 },
  continueName: { fontSize: 14, fontWeight: '700', color: '#2C2C2C' },
  continueSub: { fontSize: 12, color: '#6B6B6B', marginTop: 2 },
});