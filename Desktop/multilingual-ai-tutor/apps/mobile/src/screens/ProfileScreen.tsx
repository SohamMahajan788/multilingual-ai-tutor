import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.cream },
  text: { fontSize: 24, fontWeight: '600', color: COLORS.slate },
});
