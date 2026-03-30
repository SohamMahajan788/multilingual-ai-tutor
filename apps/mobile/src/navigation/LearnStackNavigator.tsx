import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LessonScreen from '../screens/learn/LessonScreen';
import SubjectListScreen from '../screens/learn/SubjectListScreen';
import TopicListScreen from '../screens/learn/TopicListScreen';
import type { LearnStackParamList } from './types';

const Stack = createStackNavigator<LearnStackParamList>();

export default function LearnStackNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SubjectList" component={SubjectListScreen} />
      <Stack.Screen
        name="TopicList"
        component={TopicListScreen}
        options={({ route }) => ({ headerShown: true, title: route.params.subjectName })}
      />
      <Stack.Screen
        name="Lesson"
        component={LessonScreen}
        options={({ route }) => ({ headerShown: true, title: route.params.topicName })}
      />
    </Stack.Navigator>
  );
}