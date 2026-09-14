import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TrackPlayer, { usePlaybackState, useActiveTrack, useProgress, State } from 'react-native-track-player';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Import các màn hình
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import LibraryScreen from './src/screens/LibraryScreen';
import NowPlayingScreen from './src/screens/NowPlayingScreen';
import LyricsScreen from './src/screens/LyricsScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PlaylistModalScreen from './src/screens/PlaylistModalScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
  } catch (error) {
    console.log("TrackPlayer đã được khởi tạo", error);
  }
};

const MiniPlayer = () => {
  const { theme } = useTheme(); // <-- Kéo ThemeContext vào
  const navigation = useNavigation<any>();
  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();
  const progress = useProgress();

  const isPlaying = playbackState.state === State.Playing;

  const togglePlayback = async () => {
    if (activeTrack != null) {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    }
  };

  const progressPercent = progress.duration > 0 ? (progress.position / progress.duration) * 100 : 0;

  if (!activeTrack) return null;

  return (
    <View style={[styles.miniPlayerWrapper, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
      <View style={[styles.progressBarBg, { backgroundColor: theme.border }]}>
        <View style={[styles.progressBarActive, { width: `${progressPercent}%`, backgroundColor: theme.primary }]} />
      </View>
      <TouchableOpacity style={styles.miniPlayerContainer} activeOpacity={0.9} onPress={() => navigation.navigate('NowPlaying')}>
        <Image source={{ uri: activeTrack.artwork || 'https://picsum.photos/100' }} style={styles.miniPlayerImage} />
        <View style={styles.miniPlayerInfo}>
          <Text style={[styles.miniPlayerTitle, { color: theme.text }]} numberOfLines={1}>{activeTrack.title}</Text>
          <Text style={[styles.miniPlayerArtist, { color: theme.textSecondary }]}>{activeTrack.artist}</Text>
        </View>
        <View style={styles.miniPlayerControls}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={{ fontSize: 16 }}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.playBtn, { backgroundColor: theme.primary }]} onPress={togglePlayback}>
            <Text style={{ fontSize: 12, color: 'white' }}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const MainTabs = () => {
  const { theme } = useTheme(); // <-- Kéo ThemeContext vào

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Tab.Navigator 
        screenOptions={{ 
          headerShown: false, 
          tabBarStyle: { 
            backgroundColor: theme.card, 
            borderTopWidth: 1, 
            borderTopColor: theme.border, 
            height: 60, 
            paddingBottom: 8, 
            paddingTop: 8 
          }, 
          tabBarActiveTintColor: theme.primary, 
          tabBarInactiveTintColor: theme.textSecondary 
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>, tabBarLabel: 'Home' }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>🔍</Text>, tabBarLabel: 'Search' }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarIcon: () => <Text style={{ fontSize: 20 }}>📚</Text>, tabBarLabel: 'Library' }} />
      </Tab.Navigator>
      <MiniPlayer />
    </View>
  );
};

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <>
      {/* Bỏ qua cảnh báo TypeScript cho thuộc tính đặc thù của Android */}
      {/* @ts-ignore */}
      <StatusBar barStyle={theme.isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.background} />
      
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Premium" component={PremiumScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="Lyrics" component={LyricsScreen} />
          <Stack.Screen name="NowPlaying" component={NowPlayingScreen} options={{ presentation: 'fullScreenModal', animation: 'slide_from_bottom' }} />
          <Stack.Screen name="PlaylistModal" component={PlaylistModalScreen} options={{ presentation: 'transparentModal', animation: 'fade' }} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default function App() {
  useEffect(() => {
    setupPlayer();
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  miniPlayerWrapper: { position: 'absolute', bottom: 60, left: 0, right: 0, borderBottomWidth: 1 },
  progressBarBg: { height: 2, width: '100%' },
  progressBarActive: { height: '100%' },
  miniPlayerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10 },
  miniPlayerImage: { width: 44, height: 44, borderRadius: 10, marginRight: 12 },
  miniPlayerInfo: { flex: 1 },
  miniPlayerTitle: { fontSize: 13, fontWeight: 'bold' },
  miniPlayerArtist: { fontSize: 10 },
  miniPlayerControls: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { padding: 8 },
  playBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginLeft: 8 }
});