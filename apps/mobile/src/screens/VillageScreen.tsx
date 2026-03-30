import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppStore } from '../stores/appStore';

const BUILDINGS = [
  {
    id: 'school',
    name: 'School',
    emoji: '🏫',
    unlocked: true,
    level: 2,
    milestone: 'Complete 5 lessons',
    description: 'The heart of your village learning',
    xpRequired: 0,
  },
  {
    id: 'well',
    name: 'Water Well',
    emoji: '🪣',
    unlocked: true,
    level: 1,
    milestone: 'Understand Water Cycle',
    description: 'Clean water for your village',
    xpRequired: 100,
  },
  {
    id: 'farm',
    name: 'Farm',
    emoji: '🌾',
    unlocked: true,
    level: 1,
    milestone: 'Complete Photosynthesis topic',
    description: 'Grows food using science knowledge',
    xpRequired: 200,
  },
  {
    id: 'bridge',
    name: 'Bridge',
    emoji: '🌉',
    unlocked: false,
    level: 0,
    milestone: 'Learn Force & Pressure',
    description: 'Connects parts of your village',
    xpRequired: 350,
  },
  {
    id: 'windmill',
    name: 'Windmill',
    emoji: '💨',
    unlocked: false,
    level: 0,
    milestone: 'Complete Electricity chapter',
    description: 'Generates power for your village',
    xpRequired: 500,
  },
  {
    id: 'hospital',
    name: 'Hospital',
    emoji: '🏥',
    unlocked: false,
    level: 0,
    milestone: 'Complete Human Body topic',
    description: 'Keeps your villagers healthy',
    xpRequired: 650,
  },
  {
    id: 'market',
    name: 'Market',
    emoji: '🏪',
    unlocked: false,
    level: 0,
    milestone: 'Master Fractions & Percentages',
    description: 'Trade and commerce hub',
    xpRequired: 800,
  },
  {
    id: 'library',
    name: 'Library',
    emoji: '📚',
    unlocked: false,
    level: 0,
    milestone: 'Reach 80% mastery overall',
    description: 'Unlocks advanced topics',
    xpRequired: 1000,
  },
] as const;

type Building = (typeof BUILDINGS)[number];

const XP_TO_NEXT_LEVEL = 500;

const XP_REWARDS = [
  { action: 'Complete a lesson', xp: '50', icon: '📖' },
  { action: 'Perfect quiz score', xp: '100', icon: '🎯' },
  { action: 'Daily streak bonus', xp: '10×days', icon: '🔥' },
  { action: 'Help a classmate', xp: '75', icon: '🤝' },
  { action: 'Contribute analogy', xp: '150', icon: '💡' },
] as const;

const screenWidth = Dimensions.get('window').width;
const BUILDING_CARD_WIDTH = (screenWidth - 48) / 2;

/**
 * Village map gamification: buildings, XP, streak, and detail sheet.
 */
export default function VillageScreen(): React.ReactElement {
  const { xp: STUDENT_XP, level: STUDENT_LEVEL, streakDays: STREAK_DAYS } =
    useAppStore();

  const XP_FILL_PCT = Math.min(
    (STUDENT_XP / XP_TO_NEXT_LEVEL) * 100,
    100
  );

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  const unlockedCount = useMemo(
    () => BUILDINGS.filter((b) => b.unlocked).length,
    []
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>🏡 My Village</Text>
          <View style={styles.xpPill}>
            <Text style={styles.xpPillText}>⭐ {STUDENT_XP} XP</Text>
          </View>
        </View>
        <Text style={styles.levelLine}>
          Level {STUDENT_LEVEL} Village
        </Text>
        <View style={styles.xpTrack}>
          <View style={[styles.xpFill, { width: `${XP_FILL_PCT}%` }]} />
        </View>
        <Text style={styles.xpCaption}>
          {STUDENT_XP}/{XP_TO_NEXT_LEVEL} XP to Level {STUDENT_LEVEL + 1}
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValueOrange}>
              🔥 {STREAK_DAYS}
            </Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueGreen}>
              🏗️ {unlockedCount}
            </Text>
            <Text style={styles.statLabel}>Buildings</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValueBlue}>📚 31</Text>
            <Text style={styles.statLabel}>Topics Done</Text>
          </View>
        </View>

        <View style={styles.mapSectionHeader}>
          <Text style={styles.sectionTitle}>🗺️ Village Map</Text>
          <Text style={styles.sectionSub}>
            Tap a building to see details
          </Text>
        </View>

        <View style={styles.grid}>
          {BUILDINGS.map((building) => (
            <Pressable
              key={building.id}
              onPress={() => setSelectedBuilding(building)}
              style={({ pressed }) => [
                styles.buildingCard,
                {
                  width: BUILDING_CARD_WIDTH,
                  opacity: building.unlocked ? 1 : 0.7,
                  backgroundColor: building.unlocked ? '#FFFFFF' : '#F5F5F5',
                },
                pressed && styles.cardPressed,
              ]}
            >
              <View style={styles.buildingTopRow}>
                <Text style={styles.buildingEmoji}>{building.emoji}</Text>
                {building.level > 0 ? (
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>
                      Lv.{building.level}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text
                style={[
                  styles.buildingName,
                  !building.unlocked && styles.buildingNameLocked,
                ]}
              >
                {building.name}
              </Text>
              <Text style={styles.buildingMilestone}>{building.milestone}</Text>
              {building.unlocked ? (
                <View style={styles.unlockedFooter}>
                  <Text style={styles.unlockedFooterText}>✓ Unlocked</Text>
                </View>
              ) : (
                <Text style={styles.lockedFooter}>
                  🔒 {building.xpRequired} XP needed
                </Text>
              )}
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.xpRewardsTitle]}>
          💰 Earn XP
        </Text>
        {XP_REWARDS.map((row) => (
          <View key={row.action} style={styles.xpRewardRow}>
            <View style={styles.xpRewardIcon}>
              <Text style={styles.xpRewardEmoji}>{row.icon}</Text>
            </View>
            <Text style={styles.xpRewardAction}>{row.action}</Text>
            <View style={styles.xpRewardBadge}>
              <Text style={styles.xpRewardBadgeText}>+{row.xp} XP</Text>
            </View>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal
        visible={selectedBuilding !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBuilding(null)}
      >
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setSelectedBuilding(null)}
            accessibilityLabel="Dismiss"
          />
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />
            {selectedBuilding ? (
              <>
                <Text style={styles.modalEmoji}>{selectedBuilding.emoji}</Text>
                <Text style={styles.modalName}>{selectedBuilding.name}</Text>
                <Text style={styles.modalDesc}>
                  {selectedBuilding.description}
                </Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalMilestoneLabel}>
                  📋 Curriculum Milestone
                </Text>
                <Text style={styles.modalMilestoneText}>
                  {selectedBuilding.milestone}
                </Text>
                {selectedBuilding.unlocked ? (
                  <View style={styles.modalCompletedBadge}>
                    <Text style={styles.modalCompletedText}>✅ Completed!</Text>
                  </View>
                ) : (
                  <Text style={styles.modalXpNeeded}>
                    You need{' '}
                    {Math.max(
                      0,
                      selectedBuilding.xpRequired - STUDENT_XP
                    )}{' '}
                    more XP
                  </Text>
                )}
                <Pressable
                  onPress={() => setSelectedBuilding(null)}
                  style={({ pressed }) => [
                    styles.modalClose,
                    pressed && styles.modalClosePressed,
                  ]}
                >
                  <Text style={styles.modalCloseText}>Close</Text>
                </Pressable>
              </>
            ) : null}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    backgroundColor: '#1A5C3A',
    padding: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    flex: 1,
  },
  xpPill: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  levelLine: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  xpTrack: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 8,
    borderRadius: 4,
    marginTop: 10,
    overflow: 'hidden',
  },
  xpFill: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  xpCaption: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    backgroundColor: '#FFFFFF',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValueOrange: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E8720C',
  },
  statValueGreen: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A5C3A',
  },
  statValueBlue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A4A7A',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 2,
  },
  mapSectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  sectionSub: {
    fontSize: 13,
    color: '#6B6B6B',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'flex-start',
  },
  buildingCard: {
    margin: 6,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E4DC',
  },
  cardPressed: {
    opacity: 0.92,
  },
  buildingTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  buildingEmoji: {
    fontSize: 36,
  },
  levelBadge: {
    backgroundColor: '#E8720C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  buildingName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 8,
  },
  buildingNameLocked: {
    color: '#9CA3AF',
  },
  buildingMilestone: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 4,
    lineHeight: 15,
  },
  unlockedFooter: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  unlockedFooterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1A5C3A',
  },
  lockedFooter: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 8,
  },
  xpRewardsTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  xpRewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  xpRewardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FDF0E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpRewardEmoji: {
    fontSize: 20,
  },
  xpRewardAction: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#2C2C2C',
  },
  xpRewardBadge: {
    backgroundColor: '#E8F4EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  xpRewardBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A5C3A',
  },
  bottomSpacer: {
    height: 24,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E8E4DC',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalEmoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  modalName: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    color: '#2C2C2C',
    marginTop: 8,
  },
  modalDesc: {
    fontSize: 15,
    color: '#6B6B6B',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 22,
  },
  modalDivider: {
    height: 1,
    backgroundColor: '#E8E4DC',
    marginVertical: 16,
  },
  modalMilestoneLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    fontWeight: '600',
  },
  modalMilestoneText: {
    fontSize: 15,
    color: '#2C2C2C',
    marginTop: 4,
    lineHeight: 22,
  },
  modalCompletedBadge: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#E8F4EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalCompletedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A5C3A',
  },
  modalXpNeeded: {
    marginTop: 12,
    fontSize: 14,
    color: '#E8720C',
    textAlign: 'center',
    fontWeight: '600',
  },
  modalClose: {
    marginTop: 16,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalClosePressed: {
    opacity: 0.9,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
  },
});
