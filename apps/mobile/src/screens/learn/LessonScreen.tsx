import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { LearnStackParamList } from '../../navigation/types';

type Props = StackScreenProps<LearnStackParamList, 'Lesson'>;

/**
 * Placeholder lesson view; ends the learn flow back to the topic list.
 */
export default function LessonScreen({
  navigation,
  route,
}: Props): React.ReactElement {
  const { topicName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topicName}</Text>
      <Text style={styles.body}>
        Lesson content will load here (offline-first curriculum).
      </Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonLabel}>Back to topics</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 16,
    backgroundColor: '#FDFBF7',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8720C',
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: '#2C2C2C',
    lineHeight: 22,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8720C',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
