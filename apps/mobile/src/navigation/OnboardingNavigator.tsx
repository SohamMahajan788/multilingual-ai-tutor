import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LanguageSelectScreen from '../screens/onboarding/LanguageSelectScreen';
import ProfileSetupScreen from '../screens/onboarding/ProfileSetupScreen';
import TutorialScreen from '../screens/onboarding/TutorialScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createStackNavigator<OnboardingStackParamList>();

/**
 * First-run flow: welcome through tutorial before entering the main app.
 */
export default function OnboardingNavigator(): React.ReactElement {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="Tutorial" component={TutorialScreen} />
    </Stack.Navigator>
  );
}
