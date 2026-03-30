import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../stores/appStore';

const ACHIEVEMENTS = [
  {
    id: 'a1',
    emoji: '🔥',
    title: 'Week Warrior',
    desc: '7 day streak',
    earned: true,
  },
  {
    id: 'a2',
    emoji: '🧠',
    title: 'Quick Learner',
    desc: 'Completed 10 lessons',
    earned: true,
  },
  {
    id: 'a3',
    emoji: '🎯',
    title: 'Perfect Score',
    desc: 'Got 100% in a quiz',
    earned: true,
  },
  {
    id: 'a4',
    emoji: '🤝',
    title: 'Team Player',
    desc: 'Help a classmate',
    earned: false,
  },
  {
    id: 'a5',
    emoji: '🌟',
    title: 'Star Student',
    desc: 'Master 5 topics',
    earned: false,
  },
  {
    id: 'a6',
    emoji: '📚',
    title: 'Bookworm',
    desc: 'Read 50 lessons',
    earned: false,
  },
] as const;

const STATS = [
  { label: 'Lessons Done', value: '24', emoji: '📖' },
  { label: 'Quiz Score', value: '78%', emoji: '🎯' },
  { label: 'Day Streak', value: '5', emoji: '🔥' },
  { label: 'XP Earned', value: '240', emoji: '⭐' },
] as const;

const LANGUAGE_NAMES: Record<string, string> = {
  hi: 'Hindi',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  kn: 'Kannada',
  bn: 'Bengali',
  gu: 'Gujarati',
  ml: 'Malayalam',
  or: 'Odia',
  pa: 'Punjabi',
  en: 'English',
};

const screenWidth = Dimensions.get('window').width;
const STAT_CARD_WIDTH = (screenWidth - 48) / 2;

const TEXT_SIZE_OPTIONS: Array<{
  key: 'normal' | 'large' | 'xlarge';
  label: string;
  fontSize: number;
}> = [
  { key: 'normal', label: 'A', fontSize: 12 },
  { key: 'large', label: 'A', fontSize: 15 },
  { key: 'xlarge', label: 'A', fontSize: 18 },
];

/**
 * Student profile: stats, achievements, and accessibility settings.
 */
export default function ProfileScreen(): React.ReactElement {
  const studentName = useAppStore((s) => s.studentName);
  const studentGrade = useAppStore((s) => s.studentGrade);
  const selectedLanguage = useAppStore((s) => s.selectedLanguage);
  const isLowLiteracyMode = useAppStore((s) => s.isLowLiteracyMode);
  const textSize = useAppStore((s) => s.textSize);
  const setLowLiteracyMode = useAppStore((s) => s.setLowLiteracyMode);
  const setTextSize = useAppStore((s) => s.setTextSize);
  const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);

  const initial =
    studentName.trim().length > 0
      ? studentName.trim().charAt(0).toUpperCase()
      : '?';
  const displayName = studentName.trim() || 'Student';
  const gradeLabel = studentGrade > 0 ? String(studentGrade) : '—';
  const langDisplay =
    LANGUAGE_NAMES[selectedLanguage] ??
    (selectedLanguage ? selectedLanguage.toUpperCase() : 'Not set');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{initial}</Text>
          </View>
          <Text style={styles.profileName}>{displayName}</Text>
          <Text style={styles.profileMeta}>
            Class {gradeLabel} • {langDisplay}
          </Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>🎓 Student</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>📍 Rural Learner</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>📊 My Stats</Text>
        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View
              key={stat.label}
              style={[styles.statCard, { width: STAT_CARD_WIDTH }]}
            >
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>🏆 Achievements</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.achievementsScroll}
        >
          {ACHIEVEMENTS.map((a) => (
            <View
              key={a.id}
              style={[
                styles.achievementCard,
                !a.earned && styles.achievementLocked,
              ]}
            >
              <Text style={styles.achievementEmoji}>{a.emoji}</Text>
              <Text style={styles.achievementTitle}>{a.title}</Text>
              <Text style={styles.achievementDesc}>{a.desc}</Text>
              {a.earned ? (
                <View style={styles.achievementCheck}>
                  <Text style={styles.achievementCheckText}>✓</Text>
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>⚙️ Settings</Text>
        <View style={styles.settingsCard}>
          <Pressable
            style={({ pressed }) => [styles.settingRow, pressed && styles.rowPressed]}
          >
            <Text style={styles.settingLeft}>
              🌐 <Text style={styles.settingLabel}>Language</Text>
            </Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{langDisplay}</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </Pressable>

          <View style={styles.settingRow}>
            <Text style={styles.settingLeft}>
              👁️ <Text style={styles.settingLabel}>Low Literacy Mode</Text>
            </Text>
            <Switch
              value={isLowLiteracyMode}
              onValueChange={setLowLiteracyMode}
              trackColor={{ false: '#E8E4DC', true: '#E8720C' }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E8E4DC"
            />
          </View>

          <View style={styles.settingRow}>
            <Text style={styles.settingLeft}>
              🔤 <Text style={styles.settingLabel}>Text Size</Text>
            </Text>
            <View style={styles.textSizeRow}>
              {TEXT_SIZE_OPTIONS.map((opt) => {
                const selected = textSize === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setTextSize(opt.key)}
                    style={[
                      styles.textSizeBtn,
                      selected && styles.textSizeBtnSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSizeBtnLetter,
                        { fontSize: opt.fontSize },
                        selected
                          ? styles.textSizeBtnLetterSelected
                          : styles.textSizeBtnLetterIdle,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <Pressable
            style={({ pressed }) => [styles.settingRow, pressed && styles.rowPressed]}
          >
            <Text style={styles.settingLeft}>
              ℹ️ <Text style={styles.settingLabel}>About VidyaBot</Text>
            </Text>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>v1.0.0</Text>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => setOnboardingComplete(false)}
            style={({ pressed }) => [
              styles.settingRowLast,
              pressed && styles.rowPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Reset onboarding"
          >
            <Text style={styles.resetRowText}>🔄 Reset Onboarding</Text>
          </Pressable>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerCard: {
    backgroundColor: '#E8720C',
    borderRadius: 24,
    margin: 16,
    padding: 24,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
  },
  profileMeta: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textAlign: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C2C2C',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'flex-start',
  },
  statCard: {
    margin: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    padding: 16,
  },
  statEmoji: {
    fontSize: 28,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C2C2C',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 2,
  },
  achievementsScroll: {
    paddingHorizontal: 10,
    paddingBottom: 8,
  },
  achievementCard: {
    position: 'relative',
    width: 110,
    marginHorizontal: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    padding: 12,
    alignItems: 'center',
    paddingBottom: 20,
  },
  achievementLocked: {
    opacity: 0.35,
  },
  achievementEmoji: {
    fontSize: 32,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 8,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 10,
    color: '#6B6B6B',
    marginTop: 2,
    textAlign: 'center',
  },
  achievementCheck: {
    position: 'absolute',
    bottom: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1A5C3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementCheckText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    marginHorizontal: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingRowLast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  rowPressed: {
    backgroundColor: '#FAFAFA',
  },
  settingLeft: {
    fontSize: 15,
    color: '#2C2C2C',
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    color: '#2C2C2C',
    fontWeight: '500',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingValue: {
    fontSize: 14,
    color: '#6B6B6B',
  },
  textSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textSizeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSizeBtnSelected: {
    backgroundColor: '#E8720C',
  },
  textSizeBtnLetter: {
    fontWeight: '700',
  },
  textSizeBtnLetterSelected: {
    color: '#FFFFFF',
  },
  textSizeBtnLetterIdle: {
    color: '#6B6B6B',
  },
  resetRowText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E24B4A',
  },
  bottomPad: {
    height: 100,
  },
});
