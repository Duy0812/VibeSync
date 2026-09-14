import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const subscriber = onSnapshot(collection(db, 'Songs'), (querySnapshot) => { 
      const songsData: any[] = [];
      querySnapshot.forEach((doc) => { 
        songsData.push({ id: doc.id, ...doc.data() });
      });
      setSongs(songsData);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  // Nạp toàn bộ playlist vào hàng đợi và nhảy đến bài được chọn
  const playSelectedSong = async (selectedIndex: number, currentList: any[]) => {
    await TrackPlayer.reset();
    
    // Chuyển đổi định dạng mảng dữ liệu cho TrackPlayer
    const trackQueue = currentList.map(song => ({
      id: song.id,
      url: song.audio_url || song.url,
      title: song.title,
      artist: song.artist,
      artwork: song.artwork_url || song.artwork,
      syncLyrics: song.syncLyrics
    }));

    await TrackPlayer.add(trackQueue);
    await TrackPlayer.skip(selectedIndex); // Nhảy đến đúng index bài hát được bấm
    await TrackPlayer.play();
    navigation.navigate('NowPlaying');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Chào buổi sáng</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 50 }} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Hàng ngang: Mới phát hành */}
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Mới Phát Hành</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {songs.map((song, index) => (
              <TouchableOpacity 
                key={`h-${song.id}`} 
                style={styles.songCard} 
                onPress={() => playSelectedSong(index, songs)}
              >
                <Image source={{ uri: song.artwork_url || 'https://picsum.photos/200' }} style={styles.songImage} />
                <Text style={[styles.songTitle, { color: theme.text }]} numberOfLines={1}>{song.title}</Text>
                <Text style={[styles.songArtist, { color: theme.textSecondary }]} numberOfLines={1}>{song.artist}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Danh sách dọc: Đề xuất cho bạn */}
          <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24 }]}>Đề xuất cho bạn</Text>
          <View style={styles.verticalList}>
            {songs.map((song, index) => (
              <TouchableOpacity 
                key={`v-${song.id}`} 
                style={styles.verticalSongItem} 
                onPress={() => playSelectedSong(index, songs)}
              >
                <Image source={{ uri: song.artwork_url || 'https://picsum.photos/200' }} style={styles.verticalImage} />
                <View style={styles.verticalInfo}>
                  <Text style={[styles.verticalTitle, { color: theme.text }]} numberOfLines={1}>{song.title}</Text>
                  <Text style={[styles.verticalArtist, { color: theme.textSecondary }]} numberOfLines={1}>{song.artist}</Text>
                </View>
                <Text style={styles.playIcon}>⋮</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  settingsIcon: { fontSize: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginBottom: 16 },
  horizontalScroll: { paddingLeft: 20 },
  songCard: { marginRight: 16, width: 140 },
  songImage: { width: 140, height: 140, borderRadius: 16, marginBottom: 12 },
  songTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  songArtist: { fontSize: 12 },
  verticalList: { paddingHorizontal: 20 },
  verticalSongItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  verticalImage: { width: 56, height: 56, borderRadius: 8, marginRight: 12 },
  verticalInfo: { flex: 1, justifyContent: 'center' },
  verticalTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  verticalArtist: { fontSize: 13 },
  playIcon: { fontSize: 20, color: '#9ca3af', paddingHorizontal: 10 }
});

export default HomeScreen;