import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

type Nav = StackNavigationProp<OnboardingStackParamList, 'ProfileSetup'>;

/**
 * Collects display name and grade before the guided tutorial.
 */
export default function ProfileSetupScreen(): React.ReactElement {
  const navigation = useNavigation<Nav>();
  const setStudentName = useAppStore((s) => s.setStudentName);
  const setStudentGrade = useAppStore((s) => s.setStudentGrade);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileSetupScreen</Text>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#6B6B6B"
        onChangeText={setStudentName}
        accessibilityLabel="Student name"
      />
      <TextInput
        style={styles.input}
        placeholder="Grade (number)"
        placeholderTextColor="#6B6B6B"
        keyboardType="number-pad"
        onChangeText={(t) => {
          const n = parseInt(t, 10);
          if (!Number.isNaN(n)) {
            setStudentGrade(n);
          }
        }}
        accessibilityLabel="Student grade"
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('Tutorial')}
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
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8720C',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#2C2C2C',
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 12,
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
