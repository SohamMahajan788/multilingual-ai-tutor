import { Ionicons } from '@expo/vector-icons';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { OnboardingStackParamList } from '../../navigation/types';
import { useAppStore } from '../../stores/appStore';

const LANGUAGES = [
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', script: 'Devanagari' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', script: 'Devanagari' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', script: 'Tamil' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', script: 'Telugu' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', script: 'Kannada' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', script: 'Bengali' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', script: 'Gujarati' },
  { code: 'ml', name: 'മലയാളം', englishName: 'Malayalam', script: 'Malayalam' },
  { code: 'or', name: 'ଓଡ଼ିଆ', englishName: 'Odia', script: 'Odia' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', script: 'Gurmukhi' },
  { code: 'as', name: 'অসমীয়া', englishName: 'Assamese', script: 'Bengali' },
  { code: 'ur', name: 'اردو', englishName: 'Urdu', script: 'Nastaliq' },
  { code: 'sa', name: 'संस्कृतम्', englishName: 'Sanskrit', script: 'Devanagari' },
  { code: 'kok', name: 'कोंकणी', englishName: 'Konkani', script: 'Devanagari' },
  { code: 'mai', name: 'मैथिली', englishName: 'Maithili', script: 'Devanagari' },
  { code: 'doi', name: 'डोगरी', englishName: 'Dogri', script: 'Devanagari' },
  { code: 'mni', name: 'মৈতৈলোন্', englishName: 'Manipuri', script: 'Bengali' },
  { code: 'brx', name: 'बड़ो', englishName: 'Bodo', script: 'Devanagari' },
  { code: 'sat', name: 'ᱥᱟᱱᱛᱟᱲᱤ', englishName: 'Santhali', script: 'Ol Chiki' },
  { code: 'ks', name: 'کٲشُر', englishName: 'Kashmiri', script: 'Nastaliq' },
  { code: 'sd', name: 'سنڌي', englishName: 'Sindhi', script: 'Arabic' },
  { code: 'ne', name: 'नेपाली', englishName: 'Nepali', script: 'Devanagari' },
];

type LanguageItem = (typeof LANGUAGES)[number];

type Props = StackScreenProps<OnboardingStackParamList, 'LanguageSelect'>;

const SCREEN_WIDTH = Dimensions.get('window').width;
/** Per spec: (screenWidth - 48) / 2; row padding 12+12 fits two cards with margin 6 */
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

/**
 * Full-screen picker for one of 22 scheduled / regional languages with search.
 */
export default function LanguageSelectScreen({
  navigation,
}: Props): React.ReactElement {
  const setSelectedLanguage = useAppStore((s) => s.setSelectedLanguage);
  const [search, setSearch] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length === 0) {
      return LANGUAGES;
    }
    return LANGUAGES.filter((lang) => {
      const en = lang.englishName.toLowerCase();
      const native = lang.name.toLowerCase();
      return en.includes(q) || native.includes(q);
    });
  }, [search]);

  const onContinue = useCallback(() => {
    if (selectedCode === null) {
      return;
    }
    setSelectedLanguage(selectedCode);
    navigation.navigate('ProfileSetup');
  }, [navigation, selectedCode, setSelectedLanguage]);

  const renderItem: ListRenderItem<LanguageItem> = useCallback(
    ({ item }) => {
      const selected = item.code === selectedCode;
      return (
        <Pressable
          onPress={() => setSelectedCode(item.code)}
          style={({ pressed }) => [
            styles.card,
            selected && styles.cardSelected,
            pressed && styles.cardPressed,
          ]}
          accessibilityRole="button"
          accessibilityState={{ selected }}
          accessibilityLabel={`${item.englishName}, ${item.name}`}
        >
          {selected ? (
            <View style={styles.checkBadge} accessibilityElementsHidden>
              <Ionicons name="checkmark" size={14} color="#FFFFFF" />
            </View>
          ) : null}
          <Text style={styles.nativeName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.englishName} numberOfLines={1}>
            {item.englishName}
          </Text>
        </Pressable>
      );
    },
    [selectedCode]
  );

  const keyExtractor = useCallback((item: LanguageItem) => item.code, []);

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>No language found</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backBtn, pressed && styles.backPressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={28} color="#2C2C2C" />
        </Pressable>
        <View style={styles.headerTitles}>
          <Text style={styles.headerTitle}>अपनी भाषा चुनें</Text>
          <Text style={styles.headerSubtitle}>Choose your language</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.searchWrap}>
        <Ionicons
          name="search"
          size={20}
          color="#6B6B6B"
          style={styles.searchIcon}
        />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search language..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          accessibilityLabel="Search languages"
        />
      </View>

      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={listEmpty}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.footer}>
        <Pressable
          onPress={onContinue}
          disabled={selectedCode === null}
          style={({ pressed }) => [
            styles.continueBtn,
            selectedCode === null && styles.continueBtnDisabled,
            pressed && selectedCode !== null && styles.continueBtnPressed,
          ]}
          accessibilityRole="button"
          accessibilityState={{ disabled: selectedCode === null }}
        >
          <Text style={styles.continueLabel}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 4,
    paddingBottom: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  backPressed: {
    opacity: 0.6,
  },
  headerTitles: {
    flex: 1,
    alignItems: 'center',
  },
  headerSpacer: {
    width: 44,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 4,
    textAlign: 'center',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFEBE3',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C2C2C',
    paddingVertical: 0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  columnWrap: {
    paddingHorizontal: 12,
    justifyContent: 'flex-start',
  },
  card: {
    width: CARD_WIDTH,
    height: 90,
    margin: 6,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8E4DC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    overflow: 'hidden',
  },
  cardSelected: {
    borderColor: '#E8720C',
    backgroundColor: '#FDF0E6',
  },
  cardPressed: {
    opacity: 0.92,
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativeName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  englishName: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyWrap: {
    flex: 1,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E8E4DC',
    backgroundColor: '#FDFBF7',
  },
  continueBtn: {
    height: 56,
    borderRadius: 14,
    backgroundColor: '#E8720C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnDisabled: {
    backgroundColor: '#F4A96A',
  },
  continueBtnPressed: {
    opacity: 0.9,
  },
  continueLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
