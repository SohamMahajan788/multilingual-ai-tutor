import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { type Language, TRANSLATIONS, t } from '../data/translations';
import { useAppStore } from '../stores/appStore';

const LANGUAGES = Object.keys(TRANSLATIONS) as Language[];
const GRADES = [6, 7, 8, 9, 10];

const ACHIEVEMENTS = [
  { id: 'a1', emoji: '🔥', title: 'Week Warrior', desc: '7 day streak', earned: true },
  { id: 'a2', emoji: '🧠', title: 'Quick Learner', desc: 'Complete 10 topics', earned: false },
  { id: 'a3', emoji: '🎯', title: 'Perfect Score', desc: '100% in a quiz', earned: false },
  { id: 'a4', emoji: '🌟', title: 'Star Student', desc: 'Master 5 topics', earned: false },
  { id: 'a5', emoji: '📚', title: 'Bookworm', desc: 'Study 7 days', earned: false },
];

export default function ProfileScreen(): React.ReactElement {
  const {
    studentName, studentGrade, selectedLanguage, xp, level, streakDays,
    completedTopics, setSelectedLanguage, setStudentGrade,
  } = useAppStore();

  const lang = selectedLanguage as Language || 'English';
  const [showLangModal, setShowLangModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);

  const initials = studentName ? studentName.slice(0, 2).toUpperCase() : 'ST';

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar + Name */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{studentName || 'Student'}</Text>
          <Text style={styles.subtitle}>Class {studentGrade} • {selectedLanguage}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { label: 'XP', value: xp },
            { label: 'Level', value: level },
            { label: 'Streak', value: `${streakDays}🔥` },
            { label: 'Topics', value: completedTopics.length },
          ].map(s => (
            <View key={s.label} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>{t(lang, 'settings')}</Text>

        {/* Language Selector */}
        <TouchableOpacity style={styles.settingRow} onPress={() => setShowLangModal(true)}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🌐</Text>
            <View>
              <Text style={styles.settingLabel}>{t(lang, 'language')}</Text>
              <Text style={styles.settingValue}>{selectedLanguage}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B6B6B" />
        </TouchableOpacity>

        {/* Grade Selector */}
        <TouchableOpacity style={styles.settingRow} onPress={() => setShowGradeModal(true)}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingIcon}>🎓</Text>
            <View>
              <Text style={styles.settingLabel}>{t(lang, 'grade')}</Text>
              <Text style={styles.settingValue}>Class {studentGrade}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#6B6B6B" />
        </TouchableOpacity>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ACHIEVEMENTS.map(a => (
            <View key={a.id} style={[styles.achievementCard, !a.earned && styles.achievementLocked]}>
              <Text style={styles.achievementEmoji}>{a.emoji}</Text>
              <Text style={styles.achievementTitle}>{a.title}</Text>
              <Text style={styles.achievementDesc}>{a.desc}</Text>
            </View>
          ))}
        </ScrollView>

      </ScrollView>

      {/* Language Modal */}
      <Modal visible={showLangModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{t(lang, 'selectLanguage')}</Text>
            <ScrollView style={{ maxHeight: 400 }}>
              {LANGUAGES.map(l => (
                <TouchableOpacity
                  key={l}
                  style={[styles.modalItem, selectedLanguage === l && styles.modalItemActive]}
                  onPress={() => { setSelectedLanguage(l); setShowLangModal(false); }}
                >
                  <Text style={styles.modalItemText}>{l}</Text>
                  {selectedLanguage === l && <Ionicons name="checkmark-circle" size={20} color="#1A5C3A" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowLangModal(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Grade Modal */}
      <Modal visible={showGradeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>{t(lang, 'selectGrade')}</Text>
            {GRADES.map(g => (
              <TouchableOpacity
                key={g}
                style={[styles.modalItem, studentGrade === g && styles.modalItemActive]}
                onPress={() => { setStudentGrade(g); setShowGradeModal(false); }}
              >
                <Text style={styles.modalItemText}>Class {g}</Text>
                {studentGrade === g && <Ionicons name="checkmark-circle" size={20} color="#1A5C3A" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowGradeModal(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FDFBF7' },
  scroll: { padding: 16, paddingBottom: 40 },
  avatarSection: { alignItems: 'center', paddingVertical: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1A5C3A', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#FFFFFF' },
  name: { fontSize: 22, fontWeight: '800', color: '#2C2C2C' },
  subtitle: { fontSize: 14, color: '#6B6B6B', marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E8E4DC' },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1A5C3A' },
  statLabel: { fontSize: 11, color: '#6B6B6B', marginTop: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#2C2C2C', marginBottom: 12 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E8E4DC' },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingIcon: { fontSize: 22 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#2C2C2C' },
  settingValue: { fontSize: 13, color: '#6B6B6B', marginTop: 2 },
  achievementCard: { width: 110, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginRight: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E8E4DC' },
  achievementLocked: { opacity: 0.4 },
  achievementEmoji: { fontSize: 28, marginBottom: 6 },
  achievementTitle: { fontSize: 12, fontWeight: '700', color: '#2C2C2C', textAlign: 'center' },
  achievementDesc: { fontSize: 10, color: '#6B6B6B', textAlign: 'center', marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#2C2C2C', marginBottom: 16 },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  modalItemActive: { backgroundColor: '#E8F4EE', paddingHorizontal: 8, borderRadius: 8 },
  modalItemText: { fontSize: 16, color: '#2C2C2C' },
  modalClose: { backgroundColor: '#F0F0F0', borderRadius: 12, padding: 14, alignItems: 'center', marginTop: 12 },
  modalCloseText: { fontSize: 15, fontWeight: '700', color: '#2C2C2C' },
});