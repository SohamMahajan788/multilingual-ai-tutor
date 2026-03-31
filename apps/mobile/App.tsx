import React, { useEffect, useState } from 'react';
import { NativeModules, View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system/legacy';

import RootNavigator from './src/navigation/RootNavigator';

const { LlamaModule } = NativeModules;

async function initModel(): Promise<boolean> {
  if (!LlamaModule) {
    console.log('LlamaModule not available');
    return false;
  }
  try {
    const isLoaded = await LlamaModule.isLoaded();
    if (isLoaded) {
      console.log('Model already loaded');
      return true;
    }
    console.log('Starting model load...');
    const result = await LlamaModule.loadModelAsync('model.gguf');
    console.log('Model loaded:', result);
    return result;
  } catch (e) {
    console.error('Model init error:', e);
    return false;
  }
}

export default function App(): React.ReactElement {
  const [modelStatus, setModelStatus] = useState<'loading' | 'ready' | 'mock'>('loading');

  useEffect(() => {
    console.log('=== NATIVE MODULES TEST ===');
    console.log('LlamaModule exists:', !!LlamaModule);

    initModel().then(ready => {
      setModelStatus(ready ? 'ready' : 'mock');
      console.log('AI Status:', ready ? 'REAL ON-DEVICE AI 🚀' : 'Mock mode');
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {modelStatus === 'loading' && (
          <View style={styles.loadingBar}>
            <Text style={styles.loadingText}>⚡ Loading AI model...</Text>
          </View>
        )}
        {modelStatus === 'ready' && (
          <View style={styles.readyBar}>
            <Text style={styles.readyText}>🧠 On-device AI ready</Text>
          </View>
        )}
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loadingBar: {
    backgroundColor: '#FDF0E6',
    padding: 6,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 12,
    color: '#E8720C',
    fontWeight: '600',
  },
  readyBar: {
    backgroundColor: '#E8F4EE',
    padding: 6,
    alignItems: 'center',
  },
  readyText: {
    fontSize: 12,
    color: '#1A5C3A',
    fontWeight: '600',
  },
});