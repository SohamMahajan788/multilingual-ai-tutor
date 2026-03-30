import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { useAppStore } from '../stores/appStore';
import MainTabNavigator from './MainTabNavigator';
import OnboardingNavigator from './OnboardingNavigator';

/**
 * Root navigation: onboarding stack until complete, then main tabs.
 */
export default function RootNavigator(): React.ReactElement {
  const isOnboardingComplete = useAppStore((s) => s.isOnboardingComplete);

  return (
    <NavigationContainer>
      {isOnboardingComplete ? (
        <MainTabNavigator />
      ) : (
        <OnboardingNavigator />
      )}
    </NavigationContainer>
  );
}
