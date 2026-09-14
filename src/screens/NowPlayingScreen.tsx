import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer, { usePlaybackState, useActiveTrack, useProgress, State } from 'react-native-track-player';

// Hàm hỗ trợ chuyển đổi giây sang phút:giây
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const NowPlayingScreen = () => {
  const navigation = useNavigation<any>();
  const activeTrack = useActiveTrack();
  const playbackState = usePlaybackState();
  const progress = useProgress();
  
  // Trạng thái cho thanh tiến trình và các nút điều khiển
  const [barWidth, setBarWidth] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: Tắt, 1: Lặp lại List, 2: Lặp lại 1 bài

  const isPlaying = playbackState.state === State.Playing;

  // Xử lý Play/Pause
  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  // Xử lý Tua nhạc khi bấm vào thanh tiến trình
  const handleSeek = async (event: any) => {
    if (barWidth === 0 || progress.duration === 0) return;
    
    // Lấy vị trí tọa độ X người dùng vừa chạm
    const x = event.nativeEvent.locationX;
    
    // Tính toán % so với tổng chiều dài thanh (giới hạn từ 0 đến 1)
    const percentage = Math.max(0, Math.min(1, x / barWidth));
    
    // Đổi % ra số giây tương ứng và tua nhạc
    const targetPosition = percentage * progress.duration;
    await TrackPlayer.seekTo(targetPosition);
  };

  const progressPercent = progress.duration > 0 ? (progress.position / progress.duration) * 100 : 0;

  if (!activeTrack) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.headerTitle}>Chưa có bài hát nào</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#d946ef', fontSize: 16 }}>Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Text style={styles.iconText}>🔽</Text>
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerSubtitle}>ĐANG PHÁT</Text>
          <Text style={styles.headerTitle} numberOfLines={1}>{activeTrack.artist}</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>⋮</Text>
        </TouchableOpacity>
      </View>

      {/* Ảnh bìa Album */}
      <View style={styles.albumContainer}>
        <Image 
          source={{ uri: activeTrack.artwork || 'https://picsum.photos/400' }} 
          style={styles.albumArt} 
        />
      </View>

      {/* Thông tin bài hát */}
      <View style={styles.songInfoContainer}>
        <View style={styles.songTextContainer}>
          <Text style={styles.songTitle} numberOfLines={1}>{activeTrack.title}</Text>
          <Text style={styles.songArtist} numberOfLines={1}>{activeTrack.artist}</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.heartIcon}>❤️</Text>
        </TouchableOpacity>
      </View>

      {/* Thanh tiến trình tương tác (Interactive Progress Bar) */}
      <View style={styles.progressContainer}>
        <TouchableOpacity 
          activeOpacity={1} 
          style={styles.progressBarWrapper} 
          onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
          onPress={handleSeek}
        >
          <View style={styles.progressBarBg} pointerEvents="none">
            <View style={[styles.progressBarActive, { width: `${progressPercent}%` }]} />
          </View>
          {/* Nút tròn di chuyển theo phần trăm bài hát */}
          <View style={[styles.progressKnob, { left: `${progressPercent}%` }]} pointerEvents="none" />
        </TouchableOpacity>

        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>
      </View>

      {/* Cụm nút điều khiển tinh chỉnh */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={() => setIsShuffled(!isShuffled)}>
          <Text style={[styles.controlIconSmall, isShuffled && styles.controlActive]}>🔀</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.controlIconMedium}>⏮</Text>
        </TouchableOpacity>
        
        {/* Nút Play/Pause thiết kế cao cấp */}
        <TouchableOpacity style={styles.playButton} activeOpacity={0.8} onPress={togglePlayback}>
          <Text style={[styles.playIcon, isPlaying ? styles.pauseIconAdjust : styles.playIconAdjust]}>
            {isPlaying ? '❚❚' : '►'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.controlIconMedium}>⏭</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setRepeatMode((prev) => (prev + 1) % 3)}>
          <Text style={[styles.controlIconSmall, repeatMode > 0 && styles.controlActive]}>
            {repeatMode === 2 ? '🔂' : '🔁'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nút tác vụ dưới cùng */}
      <View style={styles.bottomActionsContainer}>
        <TouchableOpacity style={styles.actionRow}>
          <Text style={styles.actionIcon}>🔊</Text>
          <Text style={styles.actionText}>Thiết bị hiện tại</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionRow} onPress={() => navigation.navigate('Lyrics')}>
          <Text style={styles.actionIcon}>🎤</Text>
          <Text style={styles.actionText}>Lời bài hát</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19', paddingHorizontal: 24, paddingTop: 40, justifyContent: 'space-between', paddingBottom: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  iconText: { color: '#fff', fontSize: 16 },
  headerTitleContainer: { alignItems: 'center', flex: 1, paddingHorizontal: 10 },
  headerSubtitle: { color: '#9ca3af', fontSize: 10, fontWeight: 'bold', letterSpacing: 2, marginBottom: 4 },
  headerTitle: { color: '#ffffff', fontSize: 14, fontWeight: '600' },
  
  albumContainer: { alignItems: 'center', justifyContent: 'center', flex: 1, maxHeight: width - 48 },
  albumArt: { width: width - 60, height: width - 60, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20, elevation: 15 },
  
  songInfoContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, marginTop: 10 },
  songTextContainer: { flex: 1, paddingRight: 20 },
  songTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  songArtist: { color: '#9ca3af', fontSize: 16 },
  heartIcon: { fontSize: 26 },
  
  progressContainer: { marginBottom: 20 },
  progressBarWrapper: { height: 30, justifyContent: 'center' }, // Vùng chạm rộng hơn để dễ bấm
  progressBarBg: { width: '100%', height: 4, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 2 },
  progressBarActive: { height: '100%', backgroundColor: '#ffffff', borderRadius: 2 },
  progressKnob: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#ffffff', position: 'absolute', marginLeft: -6 }, // Nút tròn
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  timeText: { color: '#9ca3af', fontSize: 12, fontWeight: '500' },
  
  controlsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, paddingHorizontal: 10 },
  controlIconSmall: { fontSize: 22, color: '#9ca3af', opacity: 0.8 },
  controlActive: { color: '#d946ef', opacity: 1 }, // Màu nổi bật khi bật Shuffle/Repeat
  controlIconMedium: { fontSize: 32, color: '#ffffff' },
  
  playButton: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  playIcon: { color: '#0b0f19', fontSize: 32 },
  playIconAdjust: { marginLeft: 6 }, // Căn giữa thủ công cho nút Play (hình tam giác thường bị lệch)
  pauseIconAdjust: { marginLeft: 0 },
  
  bottomActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
  actionRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  actionIcon: { fontSize: 16, marginRight: 8 },
  actionText: { color: '#ffffff', fontSize: 12, fontWeight: '600' }
});

export default NowPlayingScreen;