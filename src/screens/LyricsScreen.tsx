import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { useActiveTrack, useProgress } from 'react-native-track-player';
import { fetchLyricsAutomatically } from '../services/lyricsService'; // Import hàm gọi API ở trên

const LyricsScreen = () => {
  const navigation = useNavigation<any>();
  const activeTrack = useActiveTrack();
  const progress = useProgress();
  const flatListRef = useRef<FlatList>(null);
  
  const [lyrics, setLyrics] = useState<{time: number, text: string}[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Tự động fetch lời bài hát từ internet dựa vào title & artist của bài hát hiện tại
  useEffect(() => {
    let isMounted = true;

    const loadLyrics = async () => {
      if (!activeTrack?.title || !activeTrack?.artist) return;
      
      setLoading(true);
      
      // 1. Kiểm tra xem trên Firebase đã có sẵn chưa (đề phòng trường hợp bạn muốn ưu tiên override)
      if (activeTrack?.syncLyrics) {
        try {
          const parsed = typeof activeTrack.syncLyrics === 'string' 
            ? JSON.parse(activeTrack.syncLyrics) 
            : activeTrack.syncLyrics;
          if (isMounted) { setLyrics(parsed); setLoading(false); }
          return;
        } catch (e) { /* bỏ qua nếu parse lỗi */ }
      }

      // 2. Nếu không có trên Firebase, tự động gọi API lấy về
      const autoLyrics = await fetchLyricsAutomatically(activeTrack.title, activeTrack.artist);
      
      if (isMounted) {
        if (autoLyrics && autoLyrics.length > 0) {
          setLyrics(autoLyrics);
        } else {
          // Fallback nếu bài hát quá mới hoặc không tìm thấy trên hệ thống mở
          setLyrics([
            { time: 0, text: "(Không tìm thấy lời tự động)" },
            { time: 5, text: activeTrack.title },
            { time: 10, text: activeTrack.artist }
          ]);
        }
        setLoading(false);
      }
    };

    loadLyrics();

    return () => { isMounted = false; };
  }, [activeTrack]);

  // Logic đồng bộ thời gian thực (giống như phần trước)
  useEffect(() => {
    if (lyrics.length === 0) return;
    const currentPosition = progress.position;
    const index = lyrics.reduce((acc, current, idx) => {
      if (currentPosition >= current.time) return idx;
      return acc;
    }, 0);

    if (index !== activeIndex) {
      setActiveIndex(index);
      if (flatListRef.current && index >= 0) {
        flatListRef.current.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
      }
    }
  }, [progress.position, lyrics]);

  const renderLyricLine = ({ item, index }: { item: { time: number, text: string }, index: number }) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity style={styles.lyricLineContainer} onPress={() => TrackPlayer.seekTo(item.time)}>
        <Text style={[styles.lyricText, isActive ? styles.lyricTextActive : styles.lyricTextInactive]}>
          {item.text}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={styles.closeButton}>🔽</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lời bài hát (Tự động)</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.trackInfo}>
        <Text style={styles.title}>{activeTrack?.title || 'Đang tải...'}</Text>
        <Text style={styles.artist}>{activeTrack?.artist || 'Unknown Artist'}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#d946ef" />
          <Text style={styles.loadingText}>Đang tìm kiếm lời bài hát...</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={lyrics}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderLyricLine}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lyricsList}
          getItemLayout={(data, index) => ({ length: 60, offset: 60 * index, index })}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4c1d95' }, 
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 20, paddingBottom: 20 },
  closeButton: { fontSize: 18, color: '#ffffff' },
  headerTitle: { color: '#ffffff', fontSize: 14, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  trackInfo: { paddingHorizontal: 24, paddingBottom: 20 },
  title: { color: '#ffffff', fontSize: 24, fontWeight: '900', marginBottom: 4 },
  artist: { color: '#d8b4fe', fontSize: 16, fontWeight: '600' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#d8b4fe', marginTop: 12, fontSize: 14 },
  lyricsList: { paddingHorizontal: 24, paddingBottom: 200, paddingTop: 50 },
  lyricLineContainer: { height: 60, justifyContent: 'center' },
  lyricText: { fontSize: 28, fontWeight: 'bold' },
  lyricTextActive: { color: '#ffffff', opacity: 1 },
  lyricTextInactive: { color: '#a78bfa', opacity: 0.4 },
});

export default LyricsScreen;