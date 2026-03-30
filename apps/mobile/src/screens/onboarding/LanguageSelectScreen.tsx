import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

type Nav = StackNavigationProp<OnboardingStackParamList, 'LanguageSelect'>;

/**
 * Lets the learner pick a primary language and continue to profile setup.
 */
export default function LanguageSelectScreen(): React.ReactElement {
  const navigation = useNavigation<Nav>();
  const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LanguageSelectScreen</Text>
      <Pressable
        style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
        onPress={() => setSelectedLanguage('hi')}
      >
        <Text style={styles.chipLabel}>Hindi (example)</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('ProfileSetup')}
      >
        <Text style={styles.buttonLabel}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FDFBF7',
    gap: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8720C',
    marginBottom: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#E8E4DC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  chipPressed: {
    opacity: 0.9,
  },
  chipLabel: {
    color: '#2C2C2C',
    fontSize: 15,
  },
  button: {
    marginTop: 8,
    backgroundColor: '#E8720C',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
