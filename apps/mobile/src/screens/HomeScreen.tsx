import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useAppStore } from '../stores/appStore';

const GREETINGS: Record<
  string,
  { morning: string; afternoon: string; evening: string }
> = {
  hi: { morning: 'सुप्रभात', afternoon: 'नमस्ते', evening: 'शुभ संध्या' },
  mr: { morning: 'सुप्रभात', afternoon: 'नमस्कार', evening: 'शुभ संध्याकाळ' },
  ta: {
    morning: 'காலை வணக்கம்',
    afternoon: 'வணக்கம்',
    evening: 'மாலை வணக்கம்',
  },
  te: {
    morning: 'శుభోదయం',
    afternoon: 'నమస్కారం',
    evening: 'శుభ సాయంత్రం',
  },
  kn: {
    morning: 'ಶುಭೋದಯ',
    afternoon: 'ನಮಸ್ಕಾರ',
    evening: 'ಶುಭ ಸಂಜೆ',
  },
  bn: {
    morning: 'সুপ্রভাত',
    afternoon: 'নমস্কার',
    evening: 'শুভ সন্ধ্যা',
  },
};

const getTimeOfDay = (): 'morning' | 'afternoon' | 'evening' => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

const SUBJECTS = [
  {
    id: 'science',
    name: 'विज्ञान',
    englishName: 'Science',
    emoji: '🔬',
    color: '#E8F4EE',
    accentColor: '#1A5C3A',
  },
  {
    id: 'math',
    name: 'गणित',
    englishName: 'Mathematics',
    emoji: '📐',
    color: '#E6EEF8',
    accentColor: '#1A4A7A',
  },
  {
    id: 'social',
    name: 'सामाजिक',
    englishName: 'Social Studies',
    emoji: '🌍',
    color: '#FDF5E0',
    accentColor: '#7A4F00',
  },
  {
    id: 'english',
    name: 'अंग्रेज़ी',
    englishName: 'English',
    emoji: '📖',
    color: '#F5ECF8',
    accentColor: '#5C1A7A',
  },
  {
    id: 'hindi',
    name: 'हिन्दी',
    englishName: 'Hindi',
    emoji: '✍️',
    color: '#FDF0E6',
    accentColor: '#E8720C',
  },
  {
    id: 'computer',
    name: 'कंप्यूटर',
    englishName: 'Computer',
    emoji: '💻',
    color: '#E8F4EE',
    accentColor: '#0F6E56',
  },
] as const;

const CONTINUE_SUBJECT = SUBJECTS[0];

const screenWidth = Dimensions.get('window').width;
const CONTINUE_CARD_WIDTH = screenWidth - 80;
const SUBJECT_CARD_WIDTH = (screenWidth - 48) / 2;

/**
 * Main home dashboard: greeting, continue learning, subjects, and daily challenge.
 */
export default function HomeScreen(): React.ReactElement {
  const studentName = useAppStore((s) => s.studentName);
  const studentGrade = useAppStore((s) => s.studentGrade);
  const selectedLanguage = useAppStore((s) => s.selectedLanguage);

  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>(
    () => getTimeOfDay()
  );

  useEffect(() => {
    setTimeOfDay(getTimeOfDay());
    const id = setInterval(() => setTimeOfDay(getTimeOfDay()), 60_000);
    return () => clearInterval(id);
  }, []);

  const greetingPack =
    GREETINGS[selectedLanguage] ?? GREETINGS.hi;
  const greetingWord = greetingPack[timeOfDay];
  const displayName = studentName.trim() || 'स्टूडेंट';
  const displayGrade = studentGrade > 0 ? String(studentGrade) : '—';

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoLetter}>V</Text>
          </View>
        </View>
        <Text style={styles.headerTitle} numberOfLines={1}>
          VidyaBot
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            hitSlop={12}
          >
            <Ionicons name="notifications-outline" size={24} color="#2C2C2C" />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Settings"
            hitSlop={12}
          >
            <Ionicons name="settings-outline" size={24} color="#2C2C2C" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingCard}>
          <Text style={styles.greetingTime}>{greetingWord}</Text>
          <Text style={styles.greetingName}>
            नमस्ते, {displayName}! 👋
          </Text>
          <Text style={styles.greetingMeta}>
            कक्षा {displayGrade} • आज का लक्ष्य: 2 पाठ
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statCell}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>5 दिन</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statEmoji}>⭐</Text>
              <Text style={styles.statValue}>240 XP</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statCell}>
              <Text style={styles.statEmoji}>📚</Text>
              <Text style={styles.statValue}>3 पाठ</Text>
              <Text style={styles.statLabel}>Today</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>जारी रखें</Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.sectionLink}>सब देखें →</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.continueScrollContent}
        >
          <View style={[styles.continueCard, { width: CONTINUE_CARD_WIDTH }]}>
            <View
              style={[
                styles.continueEmojiCircle,
                { backgroundColor: CONTINUE_SUBJECT.color },
              ]}
            >
              <Text style={styles.continueEmoji}>{CONTINUE_SUBJECT.emoji}</Text>
            </View>
            <View style={styles.continueTextCol}>
              <Text style={styles.continueSubject}>{CONTINUE_SUBJECT.name}</Text>
              <Text style={styles.continueTopic}>प्रकाश और परावर्तन</Text>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressLabel}>65% पूर्ण</Text>
            </View>
          </View>
        </ScrollView>

        <Text style={[styles.sectionTitle, styles.subjectsSectionTitle]}>
          विषय चुनें
        </Text>
        <View style={styles.subjectsGrid}>
          {SUBJECTS.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              activeOpacity={0.85}
              style={[
                styles.subjectCard,
                {
                  width: SUBJECT_CARD_WIDTH,
                  backgroundColor: subject.color,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`${subject.englishName}`}
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.subjectEmoji}>{subject.emoji}</Text>
              <Text style={styles.subjectName}>{subject.name}</Text>
              <Text style={styles.subjectEnglish}>{subject.englishName}</Text>
              <View style={styles.subjectArrow} pointerEvents="none">
                <Ionicons
                  name="arrow-forward"
                  size={14}
                  color={subject.accentColor}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.challengeCard}>
          <View style={styles.challengeLeft}>
            <Text style={styles.challengeEyebrow}>🎯 दैनिक चुनौती</Text>
            <Text style={styles.challengeTitle}>आज का सवाल</Text>
            <Text style={styles.challengeQuestion}>
              प्रकाश संश्लेषण क्या है?
            </Text>
            <TouchableOpacity
              style={styles.challengeBtn}
              activeOpacity={0.9}
              accessibilityRole="button"
              accessibilityLabel="Solve daily challenge"
              onPress={() => navigation.navigate('Learn')}
            >
              <Text style={styles.challengeBtnLabel}>हल करें →</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.challengeEmoji}>🌱</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FDFBF7',
  },
  headerLeft: {
    width: 44,
    alignItems: 'flex-start',
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '800',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  headerRight: {
    width: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  greetingCard: {
    backgroundColor: '#E8720C',
    borderRadius: 20,
    margin: 16,
    padding: 20,
  },
  greetingTime: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  greetingName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  greetingMeta: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  statCell: {
    flex: 1,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 16,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  sectionLink: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E8720C',
  },
  continueScrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    padding: 16,
    marginHorizontal: 4,
  },
  continueEmojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  continueEmoji: {
    fontSize: 26,
  },
  continueTextCol: {
    flex: 1,
  },
  continueSubject: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  continueTopic: {
    fontSize: 13,
    color: '#6B6B6B',
    marginTop: 2,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E8E4DC',
    marginTop: 10,
    overflow: 'hidden',
  },
  progressFill: {
    width: '65%',
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#E8720C',
  },
  progressLabel: {
    fontSize: 12,
    color: '#E8720C',
    marginTop: 4,
    fontWeight: '600',
  },
  subjectsSectionTitle: {
    marginLeft: 16,
    marginBottom: 12,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
  },
  subjectCard: {
    height: 100,
    borderRadius: 16,
    margin: 6,
    padding: 16,
    overflow: 'hidden',
  },
  subjectEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  subjectEnglish: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 2,
  },
  subjectArrow: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  challengeCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#1A5C3A',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  challengeLeft: {
    flex: 1,
    paddingRight: 8,
  },
  challengeEyebrow: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 4,
  },
  challengeQuestion: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    lineHeight: 20,
  },
  challengeBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  challengeBtnLabel: {
    color: '#1A5C3A',
    fontSize: 14,
    fontWeight: '700',
  },
  challengeEmoji: {
    fontSize: 64,
  },
});
