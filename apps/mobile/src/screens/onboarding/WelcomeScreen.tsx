import type { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { OnboardingStackParamList } from '../../navigation/types';

type Props = StackScreenProps<OnboardingStackParamList, 'Welcome'>;

const FEATURES = [
  {
    icon: '🗣️',
    title: '22 भाषाओं में सीखें',
    subtitle: 'Learn in your mother tongue',
  },
  {
    icon: '📵',
    title: 'बिना इंटरनेट के',
    subtitle: 'Works fully offline',
  },
  {
    icon: '🧠',
    title: 'AI टीचर',
    subtitle: 'Personal AI tutor for every student',
  },
] as const;

/**
 * Branded first screen: value props and entry into language selection.
 */
export default function WelcomeScreen({
  navigation,
}: Props): React.ReactElement {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.root}>
        <View style={styles.topSection}>
          <View style={styles.circleDecoration} />
          <View style={styles.topContent}>
            <Text style={styles.logoEmoji} accessibilityRole="text">
              📚
            </Text>
            <Text style={styles.brandLatin}>VidyaBot</Text>
            <Text style={styles.brandDevanagari}>विद्याबॉट</Text>
            <Text style={styles.tagline}>
              Multilingual AI Tutor for Rural India
            </Text>
          </View>
        </View>

        <View style={styles.middleSection}>
          {FEATURES.map((item) => (
            <View key={item.title} style={styles.featureRow}>
              <View style={styles.featureIconWrap}>
                <Text style={styles.featureIconEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.featureTextCol}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSection}>
          <Pressable
            onPress={() => navigation.navigate('LanguageSelect')}
            style={({ pressed }) => [
              styles.cta,
              pressed && styles.ctaPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Get started"
          >
            <Text style={styles.ctaLabel}>शुरू करें  •  Get Started</Text>
          </Pressable>
          <Text style={styles.footerNote}>निःशुल्क • Free Forever</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  root: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  topSection: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circleDecoration: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FDF0E6',
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  logoEmoji: {
    fontSize: 80,
    textAlign: 'center',
  },
  brandLatin: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E8720C',
    letterSpacing: -1,
    marginTop: 4,
  },
  brandDevanagari: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E8720C',
    opacity: 0.7,
    marginTop: 4,
  },
  tagline: {
    fontSize: 15,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FDF0E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureIconEmoji: {
    fontSize: 22,
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#6B6B6B',
    marginTop: 2,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  cta: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerNote: {
    fontSize: 12,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 12,
  },
});
