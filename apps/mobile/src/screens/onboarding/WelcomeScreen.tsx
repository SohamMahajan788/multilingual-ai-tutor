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

type Nav = StackNavigationProp<OnboardingStackParamList, 'Welcome'>;

/**
 * Entry onboarding step with call-to-action to choose language next.
 */
export default function WelcomeScreen(): React.ReactElement {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WelcomeScreen</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('LanguageSelect')}
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
