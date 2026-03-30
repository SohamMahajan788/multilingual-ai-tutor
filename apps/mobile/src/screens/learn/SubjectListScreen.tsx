import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { LearnStackParamList } from '../../navigation/types';

type Props = StackScreenProps<LearnStackParamList, 'SubjectList'>;

/**
 * Lists subjects; choosing one opens topics for that subject.
 */
export default function SubjectListScreen({
  navigation,
}: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Subjects</Text>
      <Pressable
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
        onPress={() =>
          navigation.navigate('TopicList', {
            subjectId: 'stem-1',
            subjectName: 'Science',
          })
        }
      >
        <Text style={styles.rowLabel}>Science</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#FDFBF7',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
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
