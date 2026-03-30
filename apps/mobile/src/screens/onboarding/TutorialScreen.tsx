import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppStore } from '../../stores/appStore';

/**
 * Final onboarding step; finishing opens the main tab experience.
 */
export default function TutorialScreen(): React.ReactElement {
  const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TutorialScreen</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => setOnboardingComplete(true)}
      >
        <Text style={styles.buttonLabel}>Get started</Text>
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
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8720C',
    marginBottom: 24,
  },
  button: {
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
