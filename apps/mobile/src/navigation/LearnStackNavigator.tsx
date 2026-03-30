import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LessonScreen from '../screens/learn/LessonScreen';
import SubjectListScreen from '../screens/learn/SubjectListScreen';
import TopicListScreen from '../screens/learn/TopicListScreen';
import type { LearnStackParamList } from './types';

const Stack = createStackNavigator<LearnStackParamList>();

/**
 * Nested stack for the Learn tab: subjects, topics, and lessons.
 */
export default function LearnStackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SubjectList"
        component={SubjectListScreen}
        options={{ title: 'Subjects' }}
      />
      <Stack.Screen
        name="TopicList"
        component={TopicListScreen}
        options={({ route }) => ({ title: route.params.subjectName })}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={({ route }) => ({ title: route.params.topicName })}
      />
    </Stack.Navigator>
  );
}
