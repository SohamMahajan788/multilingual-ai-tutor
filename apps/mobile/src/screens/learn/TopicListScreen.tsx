import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { LearnStackParamList } from '../../navigation/types';

type Props = StackScreenProps<LearnStackParamList, 'TopicList'>;

/**
 * Topics for the selected subject; opens a lesson for the chosen topic.
 */
export default function TopicListScreen({
  navigation,
  route,
}: Props): React.ReactElement {
  const { subjectName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>{subjectName}</Text>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={() =>
          navigation.navigate('Lesson', {
            topicId: 'topic-intro',
            topicName: 'Introduction',
          })
        }
      >
        <Text style={styles.rowLabel}>Introduction</Text>
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
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 16,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E4DC',
  },
  rowPressed: {
    opacity: 0.92,
  },
  rowLabel: {
    fontSize: 16,
    color: '#2C2C2C',
    fontWeight: '600',
  },
});
