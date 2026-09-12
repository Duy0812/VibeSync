import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import TrackPlayer, { usePlaybackState, useProgress, useActiveTrack, State } from 'react-native-track-player';

// Lấy chiều rộng màn hình để tính toán kích thước ảnh bìa
const { width } = Dimensions.get('window');

const HomeScreen = () => {
  // Các "móc câu" (hooks) tự động lấy dữ liệu từ engine âm thanh
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const track = useActiveTrack(); // Lấy thông tin bài hát đang phát

  // Kiểm tra xem nhạc có đang chạy không
  const isPlaying = playbackState.state === State.Playing;

  // Hàm xử lý Play/Pause
  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  // Hàm biến đổi số giây thành định dạng phút:giây (VD: 03:45)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Tính toán phần trăm thanh tua nhạc
  const progressPercent = progress.duration > 0 
    ? (progress.position / progress.duration) * 100 
    : 0;

  return (
    <View style={styles.container}>
      {/* Tiêu đề trang */}
      <Text style={styles.headerTitle}>Đang phát 🎧</Text>

      {/* Khu vực ảnh bìa đĩa nhạc */}
      <View style={styles.artworkWrapper}>
        <Image 
          source={{ uri: track?.artwork || 'https://picsum.photos/400' }} 
          style={styles.artwork} 
        />
      </View>

      {/* Khu vực thông tin bài hát */}
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track?.title || 'Chưa có bài hát'}</Text>
        <Text style={styles.trackArtist}>{track?.artist || 'Đang tải...'}</Text>
      </View>

      {/* Khu vực thanh tiến trình (Progress Bar) */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(progress.position)}</Text>
          <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
        </View>
      </View>

      {/* Khu vực nút điều khiển */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} onPress={() => TrackPlayer.skipToPrevious()}>
          <Text style={styles.iconText}>⏮️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayback}>
          <Text style={styles.playIconText}>{isPlaying ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={() => TrackPlayer.skipToNext()}>
          <Text style={styles.iconText}>⏭️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Màu nền tối chuẩn Spotify
    alignItems: 'center',
    paddingTop: 50,
  },
  headerTitle: {
    color: '#1DB954',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 40,
    textTransform: 'uppercase',
  },
  artworkWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 40,
  },
  artwork: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
  },
  trackInfo: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  trackArtist: {
    color: '#B3B3B3',
    fontSize: 16,
  },
  progressContainer: {
    width: width * 0.85,
    marginBottom: 40,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#404040',
    borderRadius: 2,
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 2,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    gap: 30,
  },
  controlButton: {
    padding: 10,
  },
  iconText: {
    fontSize: 30,
  },
  playPauseButton: {
    backgroundColor: '#1DB954',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconText: {
    fontSize: 35,
    marginLeft: 4, // Căn giữa nhẹ cho icon Play
  }
});

export default HomeScreen;