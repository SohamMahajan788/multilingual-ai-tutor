import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

const STEPS = [
  {
    emoji: '🗣️',
    title: 'अपनी भाषा में पूछो',
    subtitle: 'Ask in your language',
    description:
      'VidyaBot समझता है आपकी भाषा। हिंदी, मराठी, तमिल — किसी भी भाषा में सवाल पूछो।',
    descriptionEn:
      'Ask questions in Hindi, Marathi, Tamil or any of 22 Indian languages.',
    color: '#FDF0E6',
    accentColor: '#E8720C',
  },
  {
    emoji: '🧠',
    title: 'AI टीचर समझाएगा',
    subtitle: 'AI Teacher explains',
    description:
      'आपका AI टीचर हर concept को आसान भाषा में समझाएगा — गाँव की मिसालों के साथ।',
    descriptionEn:
      'Your AI tutor explains every concept with local analogies you understand.',
    color: '#E8F4EE',
    accentColor: '#1A5C3A',
  },
  {
    emoji: '🏆',
    title: 'गाँव बनाओ, आगे बढ़ो',
    subtitle: 'Build your village',
    description:
      'पढ़ाई करो, XP कमाओ, और अपना virtual गाँव बनाओ। जितना सीखोगे, उतना बनेगा।',
    descriptionEn:
      'Earn XP by learning and build your virtual village as you progress.',
    color: '#E6EEF8',
    accentColor: '#1A4A7A',
  },
] as const;

type Props = StackScreenProps<OnboardingStackParamList, 'Tutorial'>;

const DOT_SMALL = 8;
const DOT_LARGE = 24;

/**
 * Three-step product tour before entering the main app.
 */
export default function TutorialScreen({}: Props): React.ReactElement {
  const setOnboardingComplete = useAppStore((s) => s.setOnboardingComplete);
  const [currentStep, setCurrentStep] = useState(0);

  const dotWidths = useRef([
    new Animated.Value(DOT_LARGE),
    new Animated.Value(DOT_SMALL),
    new Animated.Value(DOT_SMALL),
  ]).current;

  useEffect(() => {
    const animations = dotWidths.map((anim, index) =>
      Animated.timing(anim, {
        toValue: currentStep === index ? DOT_LARGE : DOT_SMALL,
        duration: 280,
        useNativeDriver: false,
      })
    );
    Animated.parallel(animations).start();
  }, [currentStep, dotWidths]);

  const completeOnboarding = useCallback(() => {
    setOnboardingComplete(true);
  }, [setOnboardingComplete]);

  const step = STEPS[currentStep];
  const isLast = currentStep === 2;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.root}>
        <View style={styles.main}>
          <View style={styles.dotsRow}>
            {dotWidths.map((anim, index) => (
              <Animated.View
                key={STEPS[index].title}
                style={[
                  styles.dotBase,
                  {
                    width: anim,
                    backgroundColor:
                      currentStep === index
                        ? STEPS[currentStep].accentColor
                        : '#E8E4DC',
                  },
                ]}
              />
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: step.color }]}>
            <Text style={styles.emoji}>{step.emoji}</Text>
            <Text style={styles.title}>{step.title}</Text>
            <Text style={styles.subtitle}>{step.subtitle}</Text>
            <View style={styles.divider} />
            <Text style={styles.description}>{step.description}</Text>
            <Text style={styles.descriptionEn}>{step.descriptionEn}</Text>
          </View>
        </View>

        <View style={styles.bottom}>
          {!isLast ? (
            <View style={styles.actionsRow}>
              <Pressable
                onPress={completeOnboarding}
                style={({ pressed }) => [
                  styles.skipBtn,
                  pressed && styles.skipPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Skip tutorial"
              >
                <Text style={styles.skipLabel}>छोड़ें / Skip</Text>
              </Pressable>
              <Pressable
                onPress={() => setCurrentStep((s) => s + 1)}
                style={({ pressed }) => [
                  styles.nextBtn,
                  { backgroundColor: step.accentColor },
                  pressed && styles.nextPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel="Next step"
              >
                <Text style={styles.nextLabel}>अगला →</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={completeOnboarding}
              style={({ pressed }) => [
                styles.startBtn,
                pressed && styles.startPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Start VidyaBot"
            >
              <Text style={styles.startLabel}>VidyaBot शुरू करें! 🚀</Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 40,
  },
  dotBase: {
    height: 8,
    borderRadius: 4,
  },
  card: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 4,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    width: '60%',
    backgroundColor: '#E8E4DC',
    marginVertical: 20,
    alignSelf: 'center',
  },
  description: {
    fontSize: 15,
    color: '#2C2C2C',
    textAlign: 'center',
    lineHeight: 24,
  },
  descriptionEn: {
    fontSize: 13,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipBtn: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  skipPressed: {
    opacity: 0.6,
  },
  skipLabel: {
    color: '#6B6B6B',
    fontSize: 15,
  },
  nextBtn: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  nextPressed: {
    opacity: 0.9,
  },
  nextLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  startBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startPressed: {
    opacity: 0.9,
  },
  startLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
