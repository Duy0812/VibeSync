import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, Animated } from 'react-native';

const SkeletonLibraryItem = () => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  return (
    <View style={styles.libraryItem}>
      <Animated.View style={[styles.skeletonImage, { opacity: pulseAnim }]} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animated.View style={[styles.skeletonText, { opacity: pulseAnim, width: '70%' }]} />
        <Animated.View style={[styles.skeletonText, { opacity: pulseAnim, width: '40%', marginTop: 8 }]} />
      </View>
    </View>
  );
};

const LibraryScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    // Giả lập tải dữ liệu thư viện cá nhân
    setTimeout(() => {
      setPlaylists([
        { id: '1', title: 'Bài hát đã thích', count: '128 bài hát', image: 'https://picsum.photos/201' },
        { id: '2', title: 'Chill Vibes 2024', count: '45 bài hát', image: 'https://picsum.photos/202' },
        { id: '3', title: 'Nhạc tập Gym', count: '60 bài hát', image: 'https://picsum.photos/203' }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatarPlaceholder}><Text style={{ color: '#fff' }}>V</Text></View>
          <Text style={styles.headerTitle}>Thư viện của bạn</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('PlaylistModal')}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterChipActive}><Text style={styles.filterTextActive}>Playlist</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}><Text style={styles.filterText}>Nghệ sĩ</Text></TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}><Text style={styles.filterText}>Album</Text></TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {[1, 2, 3, 4].map(key => <SkeletonLibraryItem key={key} />)}
        </View>
      ) : (
        <FlatList
          data={playlists}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.libraryItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>Playlist • {item.count}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  headerTop: { flexDirection: 'row', alignItems: 'center' },
  avatarPlaceholder: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#c026d3', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerTitle: { color: '#ffffff', fontSize: 24, fontWeight: 'bold' },
  addBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
  addBtnText: { color: '#ffffff', fontSize: 32, fontWeight: '300', marginTop: -10 },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
  filterChipActive: { backgroundColor: '#1f2937', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 12 },
  filterChip: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#374151', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginRight: 12 },
  filterTextActive: { color: '#ffffff', fontSize: 13, fontWeight: 'bold' },
  filterText: { color: '#9ca3af', fontSize: 13 },
  libraryItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  itemImage: { width: 64, height: 64, borderRadius: 8, marginRight: 16 },
  itemInfo: { flex: 1 },
  itemTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemDesc: { color: '#9ca3af', fontSize: 13 },
  skeletonImage: { width: 64, height: 64, borderRadius: 8, backgroundColor: '#1f2937', marginRight: 16 },
  skeletonText: { height: 12, borderRadius: 6, backgroundColor: '#1f2937' }
});

export default LibraryScreen;