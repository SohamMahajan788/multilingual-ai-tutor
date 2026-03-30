import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VidyaBot</Text>
      <Text style={styles.subtitle}>Multilingual AI Tutor</Text>
      <Text style={styles.tagline}>Offline STEM Education for Rural India</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#E8720C',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2C2C2C',
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 6,
    textAlign: 'center',
  },
});
