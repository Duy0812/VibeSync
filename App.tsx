import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, PermissionsAndroid, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { setupPlayer, addTrack } from './src/services/playerService';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    async function setup() {
      // 1. Xin quyền hiển thị thông báo cho máy chạy Android 13/14 trở lên
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
        } catch (error) {
          console.warn("Lỗi khi xin quyền thông báo: ", error);
        }
      }

      // 2. Bắt đầu khởi tạo Audio Engine sau khi đã xin quyền
      let isSetup = await setupPlayer();
      if (isSetup) {
        await addTrack();
        setIsPlayerReady(true);
      }
    }
    setup();
  }, []);

  if (!isPlayerReady) {
    // Màn hình chờ siêu nhanh trong lúc nạp engine âm thanh
    return (
      <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#1DB954' }}>Đang tải âm thanh...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#121212" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;