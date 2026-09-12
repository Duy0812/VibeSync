import TrackPlayer, { Capability } from 'react-native-track-player';

// Hàm khởi tạo Player và cài đặt các nút điều khiển trên màn hình khóa
export async function setupPlayer() {
  let isSetup = false;
  try {
    // Kiểm tra xem player đã chạy chưa để tránh khởi tạo lại gây lỗi
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
    isSetup = true;
  }
  return isSetup;
}

// Hàm nạp một bài hát MP3 mẫu vào danh sách phát
export async function addTrack() {
  await TrackPlayer.add([
    {
      id: '1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Link nhạc MP3 mẫu miễn phí
      title: 'Bản nhạc VibeSync Test',
      artist: 'Unknown Artist',
      artwork: 'https://picsum.photos/200', // Ảnh bìa ngẫu nhiên
    }
  ]);
}