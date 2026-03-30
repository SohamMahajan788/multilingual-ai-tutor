import { Ionicons } from '@expo/vector-icons';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

const GRADES = [6, 7, 8, 9, 10] as const;

const REGIONS = [
  'उत्तर भारत',
  'दक्षिण भारत',
  'पूर्वी भारत',
  'पश्चिम भारत',
  'मध्य भारत',
  'उत्तर-पूर्व',
] as const;

type Props = StackScreenProps<OnboardingStackParamList, 'ProfileSetup'>;

/**
 * Collects learner name, grade, and region before the tutorial step.
 */
export default function ProfileSetupScreen({
  navigation,
}: Props): React.ReactElement {
  const setStudentName = useAppStore((s) => s.setStudentName);
  const setStudentGrade = useAppStore((s) => s.setStudentGrade);

  const [name, setName] = useState('');
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState('');

  const canContinue = name.trim().length > 0 && selectedGrade !== 0;

  const onContinue = useCallback(() => {
    if (!canContinue) {
      return;
    }
    setStudentName(name.trim());
    setStudentGrade(selectedGrade);
    navigation.navigate('Tutorial');
  }, [canContinue, name, navigation, selectedGrade, setStudentGrade, setStudentName]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="arrow-back" size={24} color="#2C2C2C" />
            </Pressable>
            <Text style={styles.headerTitle}>अपना परिचय दें</Text>
            <Text style={styles.headerSubtitle}>Tell us about yourself</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>आपका नाम / Your Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#6B6B6B"
              style={styles.nameInput}
              autoCorrect={false}
              autoCapitalize="words"
              accessibilityLabel="Your name"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>आपकी कक्षा / Your Grade</Text>
            <View style={styles.gradeRow}>
              {GRADES.map((g) => {
                const selected = selectedGrade === g;
                return (
                  <Pressable
                    key={g}
                    onPress={() => setSelectedGrade(g)}
                    style={({ pressed }) => [
                      styles.gradeBtn,
                      selected && styles.gradeBtnSelected,
                      pressed && styles.gradeBtnPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Grade ${g}`}
                  >
                    <Text
                      style={[
                        styles.gradeBtnText,
                        selected && styles.gradeBtnTextSelected,
                      ]}
                    >
                      {g}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.sectionRegion}>
            <Text style={styles.label}>आपका क्षेत्र / Your Region</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.regionScrollContent}
            >
              {REGIONS.map((region) => {
                const selected = selectedRegion === region;
                return (
                  <Pressable
                    key={region}
                    onPress={() => setSelectedRegion(region)}
                    style={({ pressed }) => [
                      styles.chip,
                      selected && styles.chipSelected,
                      pressed && styles.chipPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={region}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        selected && styles.chipTextSelected,
                      ]}
                    >
                      {region}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <Pressable
            onPress={onContinue}
            disabled={!canContinue}
            style={({ pressed }) => [
              styles.continueBtn,
              !canContinue && styles.continueBtnDisabled,
              pressed && canContinue && styles.continueBtnPressed,
            ]}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canContinue }}
          >
            <Text style={styles.continueLabel}>आगे बढ़ें  •  Continue</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 8,
    marginLeft: -8,
  },
  backPressed: {
    opacity: 0.6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2C2C2C',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionRegion: {
    marginBottom: 32,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 8,
  },
  nameInput: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#2C2C2C',
  },
  gradeRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  gradeBtn: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeBtnSelected: {
    backgroundColor: '#E8720C',
    borderColor: '#E8720C',
  },
  gradeBtnPressed: {
    opacity: 0.9,
  },
  gradeBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  gradeBtnTextSelected: {
    color: '#FFFFFF',
  },
  regionScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    backgroundColor: '#E8720C',
    borderColor: '#E8720C',
  },
  chipPressed: {
    opacity: 0.9,
  },
  chipText: {
    fontSize: 14,
    color: '#2C2C2C',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  continueBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  continueBtnDisabled: {
    backgroundColor: '#F4A96A',
  },
  continueBtnPressed: {
    opacity: 0.9,
  },
  continueLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
