import { Ionicons } from '@expo/vector-icons';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { LearnStackParamList } from '../../navigation/types';

type MessageType = 'user' | 'ai' | 'quiz' | 'analogy';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
  quizData?: {
    question: string;
    options: string[];
    correct: number;
    answered?: number;
  };
  analogyData?: {
    concept: string;
    analogy: string;
    emoji: string;
  };
}

const MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "That's a great question! Let me explain this concept clearly.",
    "I understand what you're asking. Here is a simple explanation:",
    'Great! Let me break this down step by step for you.',
  ],
  photosynthesis: [
    "Photosynthesis is how plants make their own food using sunlight. Think of it like a kitchen where the plant is the chef, sunlight is the stove, water and CO2 are the ingredients, and glucose is the meal being cooked! 🌱",
  ],
  water: [
    "The water cycle is nature's way of recycling water. Imagine water as a traveler — it evaporates from lakes and oceans, forms clouds, falls as rain, and flows back to start the journey again! 💧",
  ],
  force: [
    'Force is a push or pull on an object. Think about when you kick a football — your foot applies force to the ball, changing its motion. The harder you kick, the greater the force! ⚽',
  ],
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'ai',
    text: "नमस्ते! 👋 I'm your VidyaBot AI tutor. I'm here to help you understand this topic. What would you like to learn today?",
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'analogy',
    text: '',
    timestamp: new Date(),
    analogyData: {
      concept: 'Photosynthesis',
      analogy:
        'Think of a plant like a solar-powered kitchen. The leaves are solar panels (capturing sunlight), water and CO2 are ingredients, and glucose (sugar) is the food being cooked!',
      emoji: '🌿',
    },
  },
];

const LETTERS = ['A', 'B', 'C', 'D'] as const;

const screenWidth = Dimensions.get('window').width;

type Props = StackScreenProps<LearnStackParamList, 'Lesson'>;

function StreamingCursor({ active }: { active: boolean }): React.ReactElement | null {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!active) {
      return;
    }
    const t = setInterval(() => setVisible((v) => !v), 500);
    return () => clearInterval(t);
  }, [active]);

  if (!active) {
    return null;
  }
  return <Text style={styles.streamCursor}>{visible ? '▊' : ' '}</Text>;
}

function TypingIndicator(): React.ReactElement {
  const d1 = useRef(new Animated.Value(0.3)).current;
  const d2 = useRef(new Animated.Value(0.3)).current;
  const d3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const pulse = (v: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.sequence([
            Animated.timing(v, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(v, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
        ])
      );

    const a1 = pulse(d1, 0);
    const a2 = pulse(d2, 200);
    const a3 = pulse(d3, 400);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [d1, d2, d3]);

  return (
    <View style={styles.aiRow}>
      <View style={styles.aiAvatar}>
        <Text style={styles.aiAvatarText}>V</Text>
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDotsRow}>
          <Animated.View style={[styles.typingDot, { opacity: d1 }]} />
          <Animated.View style={[styles.typingDot, { opacity: d2 }]} />
          <Animated.View style={[styles.typingDot, { opacity: d3 }]} />
        </View>
      </View>
    </View>
  );
}

/**
 * Offline-first AI tutor chat for a single lesson topic.
 */
export default function LessonScreen({
  navigation,
  route,
}: Props): React.ReactElement {
  const { topicName } = route.params;

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(t);
  }, [messages, isTyping]);

  const sendMessage = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) {
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const lower = trimmed.toLowerCase();
      let responseText =
        MOCK_RESPONSES.default[
          Math.floor(Math.random() * MOCK_RESPONSES.default.length)
        ];
      if (lower.includes('photo') || lower.includes('plant')) {
        responseText = MOCK_RESPONSES.photosynthesis[0];
      } else if (lower.includes('water') || lower.includes('cycle')) {
        responseText = MOCK_RESPONSES.water[0];
      } else if (lower.includes('force') || lower.includes('push')) {
        responseText = MOCK_RESPONSES.force[0];
      }

      const aiMsg: Message = {
        id: `${Date.now() + 1}`,
        type: 'ai',
        text: responseText,
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsg.id ? { ...m, isStreaming: false } : m
          )
        );
      }, 2000);
    }, 1500);
  }, [inputText]);

  const toggleListening = useCallback(() => {
    setIsListening((v) => !v);
  }, []);

  const selectQuizOption = useCallback((messageId: string, optionIndex: number) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId || m.type !== 'quiz' || !m.quizData) {
          return m;
        }
        if (m.quizData.answered !== undefined) {
          return m;
        }
        return {
          ...m,
          quizData: { ...m.quizData, answered: optionIndex },
        };
      })
    );
  }, []);

  const renderMessage: ListRenderItem<Message> = useCallback(
    ({ item }) => {
      if (item.type === 'user') {
        return (
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{item.text}</Text>
          </View>
        );
      }

      if (item.type === 'ai') {
        return (
          <View style={styles.aiRow}>
            <View style={styles.aiAvatar}>
              <Text style={styles.aiAvatarText}>V</Text>
            </View>
            <View style={styles.aiBubble}>
              <Text style={styles.aiText}>
                {item.text}
                <StreamingCursor active={Boolean(item.isStreaming)} />
              </Text>
            </View>
          </View>
        );
      }

      if (item.type === 'analogy' && item.analogyData) {
        const a = item.analogyData;
        return (
          <View style={styles.analogyCard}>
            <Text style={styles.analogyEmoji}>{a.emoji}</Text>
            <View style={styles.analogyBody}>
              <Text style={styles.analogyLabel}>💡 Cultural Analogy</Text>
              <Text style={styles.analogyConcept}>{a.concept}</Text>
              <Text style={styles.analogyText}>{a.analogy}</Text>
            </View>
          </View>
        );
      }

      if (item.type === 'quiz' && item.quizData) {
        const q = item.quizData;
        const answered = q.answered;
        return (
          <View style={styles.quizCard}>
            <Text style={styles.quizLabel}>🎯 Quick Check</Text>
            <Text style={styles.quizQuestion}>{q.question}</Text>
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.correct;
              const isWrongPick =
                answered !== undefined &&
                answered === idx &&
                idx !== q.correct;
              let optStyle = styles.quizOption;
              if (answered !== undefined) {
                if (isCorrect) {
                  optStyle = styles.quizOptionCorrect;
                } else if (isWrongPick) {
                  optStyle = styles.quizOptionWrong;
                }
              }
              return (
                <TouchableOpacity
                  key={`${item.id}-opt-${idx}`}
                  style={[styles.quizOptionBase, optStyle]}
                  onPress={() => selectQuizOption(item.id, idx)}
                  disabled={answered !== undefined}
                  activeOpacity={0.85}
                >
                  <View style={styles.quizLetterCircle}>
                    <Text style={styles.quizLetterText}>{LETTERS[idx]}</Text>
                  </View>
                  <Text style={styles.quizOptionText}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }

      return null;
    },
    [selectQuizOption]
  );

  const keyExtractor = useCallback((m: Message) => m.id, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          hitSlop={12}
          style={({ pressed }) => [styles.headerIconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#2C2C2C" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTopic} numberOfLines={1}>
            {topicName}
          </Text>
          <View style={styles.offlineRow}>
            <View style={styles.greenDot} />
            <Text style={styles.offlineText}>AI Tutor • Offline</Text>
          </View>
        </View>
        <Pressable
          hitSlop={12}
          style={({ pressed }) => [styles.headerIconBtn, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="More options"
        >
          <Ionicons name="ellipsis-horizontal" size={24} color="#6B6B6B" />
        </Pressable>
      </View>

      <KeyboardAvoidingView
        style={styles.kav}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderMessage}
          inverted={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={
            isTyping ? (
              <View style={styles.footerTyping}>
                <TypingIndicator />
              </View>
            ) : null
          }
        />

        <View style={styles.inputBar}>
          <Pressable
            onPress={toggleListening}
            style={[
              styles.circleBtn,
              isListening ? styles.circleBtnListening : styles.circleBtnIdle,
            ]}
            accessibilityRole="button"
            accessibilityLabel={isListening ? 'Stop voice' : 'Voice input'}
          >
            <Ionicons
              name={isListening ? 'mic' : 'mic-off'}
              size={22}
              color={isListening ? '#FFFFFF' : '#6B6B6B'}
            />
          </Pressable>
          <TextInput
            style={styles.textInput}
            placeholder="Ask your question..."
            placeholderTextColor="#9CA3AF"
            value={inputText}
            onChangeText={setInputText}
            multiline={false}
            returnKeyType="send"
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />
          <Pressable
            onPress={sendMessage}
            disabled={inputText.trim().length === 0}
            style={[
              styles.circleBtn,
              inputText.trim().length > 0
                ? styles.circleBtnSend
                : styles.circleBtnIdle,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim().length > 0 ? '#FFFFFF' : '#6B6B6B'}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E4DC',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.65,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headerTopic: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C2C2C',
    textAlign: 'center',
  },
  offlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#1A5C3A',
    marginRight: 4,
  },
  offlineText: {
    fontSize: 11,
    color: '#1A5C3A',
    fontWeight: '600',
  },
  kav: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  footerTyping: {
    paddingBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    maxWidth: '75%',
    backgroundColor: '#E8720C',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1A5C3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  aiAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  aiBubble: {
    maxWidth: screenWidth * 0.72,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  aiText: {
    fontSize: 15,
    color: '#2C2C2C',
    lineHeight: 22,
  },
  streamCursor: {
    fontSize: 15,
    color: '#2C2C2C',
    fontWeight: '700',
  },
  typingBubble: {
    maxWidth: screenWidth * 0.72,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  typingDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B6B6B',
  },
  analogyCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#E8F4EE',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(26,92,58,0.2)',
  },
  analogyEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  analogyBody: {
    flex: 1,
  },
  analogyLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1A5C3A',
    letterSpacing: 0.5,
  },
  analogyConcept: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C2C2C',
    marginTop: 2,
  },
  analogyText: {
    fontSize: 13,
    color: '#2C2C2C',
    lineHeight: 20,
    marginTop: 6,
  },
  quizCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#E8720C',
  },
  quizLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E8720C',
    marginBottom: 8,
  },
  quizQuestion: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C2C2C',
  },
  quizOptionBase: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E4DC',
    backgroundColor: '#FDFBF7',
  },
  quizOption: {},
  quizOptionCorrect: {
    backgroundColor: '#E8F4EE',
    borderColor: '#1A5C3A',
  },
  quizOptionWrong: {
    backgroundColor: '#FCF0F0',
    borderColor: '#E24B4A',
  },
  quizLetterCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  quizLetterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  quizOptionText: {
    flex: 1,
    fontSize: 14,
    color: '#2C2C2C',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E4DC',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  circleBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnIdle: {
    backgroundColor: '#F5F5F5',
  },
  circleBtnListening: {
    backgroundColor: '#E8720C',
  },
  circleBtnSend: {
    backgroundColor: '#E8720C',
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#2C2C2C',
  },
});
