// src/services/lyricsService.ts
export const fetchLyricsAutomatically = async (title: string, artist: string) => {
  try {
    // Làm sạch chuỗi tìm kiếm (loại bỏ khoảng trắng thừa)
    const cleanTitle = encodeURIComponent(title.trim());
    const cleanArtist = encodeURIComponent(artist.trim());

    // Gọi LRCLIB API công khai miễn phí
    const response = await fetch(`https://lrclib.net/api/get?track_name=${cleanTitle}&artist_name=${cleanArtist}`);
    
    if (!response.ok) {
      throw new Error('Không tìm thấy lời bài hát');
    }

    const data = await response.json();
    
    // API trả về 2 dạng: syncedLyrics (có mốc thời gian) hoặc plainLyrics (lời thô)
    if (data.syncedLyrics) {
      return parseSyncedLyrics(data.syncedLyrics);
    } else if (data.plainLyrics) {
      // Nếu chỉ có lời thô, tự chuyển thành mảng dòng đơn giản
      return data.plainLyrics.split('\n').map((text: string, index: number) => ({
        time: index * 4, // giả định cách đều mỗi dòng 4 giây nếu không có sync time
        text: text
      }));
    }
    
    return null;
  } catch (error) {
    console.log("Lỗi tự động fetch lời bài hát:", error);
    return null;
  }
};

// Hàm phụ trợ để chuyển đổi định dạng [00:12.34] thành số giây
const parseSyncedLyrics = (lrcString: string) => {
  const lines = lrcString.split('\n');
  const result = [];
  
  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10) / (match[3].length === 3 ? 1000 : 100);
      const time = minutes * 60 + seconds + milliseconds;
      const text = match[4].trim();
      if (text) {
        result.push({ time, text });
      }
    }
  }
  return result;
};