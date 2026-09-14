import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, onSnapshot } from '@react-native-firebase/firestore';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '../context/ThemeContext';

const SearchScreen = ({ navigation }: any) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [allSongs, setAllSongs] = useState<any[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Danh sách từ khóa gợi ý (Bạn có thể tùy chỉnh)
  const trendingKeywords = ['Pop', 'Chill', 'Acoustic', 'Sơn Tùng M-TP', 'Rap Việt'];

  useEffect(() => {
    const db = getFirestore();
    const subscriber = onSnapshot(collection(db, 'Songs'), (querySnapshot) => { 
      const songsData: any[] = [];
      querySnapshot.forEach((doc) => songsData.push({ id: doc.id, ...doc.data() }));
      setAllSongs(songsData);
      setLoading(false);
    });
    return () => subscriber();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs([]);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredSongs(allSongs.filter(song => 
        (song.title && song.title.toLowerCase().includes(query)) ||
        (song.artist && song.artist.toLowerCase().includes(query))
      ));
    }
  }, [searchQuery, allSongs]);

  const playSelectedSong = async (selectedIndex: number, currentList: any[]) => {
    await TrackPlayer.reset();
    
    const trackQueue = currentList.map(song => ({
      id: song.id,
      url: song.audio_url || song.url,
      title: song.title,
      artist: song.artist,
      artwork: song.artwork_url || song.artwork,
      syncLyrics: song.syncLyrics
    }));

    await TrackPlayer.add(trackQueue);
    await TrackPlayer.skip(selectedIndex);
    await TrackPlayer.play();
    navigation.navigate('NowPlaying');
  };

  // Nút Xóa (Clear) trên thanh tìm kiếm
  const clearSearch = () => setSearchQuery('');

  // Header chứa Gợi ý tìm kiếm (chỉ hiện khi chưa gõ gì)
  const renderSuggestions = () => {
    if (searchQuery.trim() !== '') return null;

    return (
      <View style={styles.suggestionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Tìm kiếm phổ biến</Text>
        <View style={styles.keywordWrapper}>
          {trendingKeywords.map((keyword, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.keywordChip, { borderColor: theme.border, backgroundColor: theme.card }]}
              onPress={() => setSearchQuery(keyword)}
            >
              <Text style={[styles.keywordText, { color: theme.textSecondary }]}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.sectionTitle, { color: theme.text, marginTop: 24, marginBottom: 16 }]}>Gợi ý cho bạn</Text>
      </View>
    );
  };

  // Dữ liệu hiển thị: Nếu chưa gõ gì thì lấy 5 bài đầu tiên làm gợi ý, nếu gõ rồi thì lấy kết quả lọc
  const listData = searchQuery.trim() === '' ? allSongs.slice(0, 5) : filteredSongs;

  const renderSongItem = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
      style={[styles.songItem, { backgroundColor: theme.card, borderColor: theme.border }]} 
      activeOpacity={0.7} 
      onPress={() => playSelectedSong(index, listData)}
    >
      <Image source={{ uri: item.artwork_url || 'https://picsum.photos/100' }} style={styles.songArtwork} />
      <View style={styles.songInfo}>
        <Text style={[styles.songTitle, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.songArtist, { color: theme.textSecondary }]} numberOfLines={1}>{item.artist}</Text>
      </View>
      <Text style={{ fontSize: 16, color: theme.primary }}>▶</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Tìm kiếm</Text>
        <View style={[styles.searchBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Bạn muốn nghe gì?"
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={{ color: theme.textSecondary, fontSize: 16, paddingHorizontal: 8 }}>✖</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 40 }} />
      ) : listData.length > 0 ? (
        <FlatList
          data={listData}
          keyExtractor={(item) => item.id}
          renderItem={renderSongItem}
          ListHeaderComponent={renderSuggestions} // Tự động gắn phần gợi ý lên đầu danh sách
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 40, marginBottom: 12 }}>🤔</Text>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Không tìm thấy bài hát nào cho "{searchQuery}"
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: '900', marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 16, height: 50 },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  
  // Style cho phần Gợi ý
  suggestionContainer: { marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  keywordWrapper: { flexDirection: 'row', flexWrap: 'wrap' },
  keywordChip: { borderWidth: 1, borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16, marginRight: 10, marginBottom: 10 },
  keywordText: { fontSize: 14, fontWeight: '500' },
  
  // Style cho danh sách & trạng thái trống
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyText: { fontSize: 15, textAlign: 'center' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 100 },
  songItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, padding: 10, borderRadius: 12, borderWidth: 1 },
  songArtwork: { width: 50, height: 50, borderRadius: 8, marginRight: 12 },
  songInfo: { flex: 1, justifyContent: 'center' },
  songTitle: { fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  songArtist: { fontSize: 13 }
});

export default SearchScreen;