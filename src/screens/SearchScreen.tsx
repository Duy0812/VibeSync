import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import TrackPlayer from 'react-native-track-player';
// @ts-ignore
import firestore from '@react-native-firebase/firestore';

const SearchScreen = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chỉ gọi trực tiếp firestore() vì chúng ta đã import đích danh nó ở trên
    const subscriber = firestore()
      .collection('Songs')
      .onSnapshot((querySnapshot: any) => { 
        const songsData: any[] = [];
        querySnapshot.forEach((documentSnapshot: any) => { 
          songsData.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
            url: documentSnapshot.data().audio_url,
            artwork: documentSnapshot.data().artwork_url, 
          });
        });
        setSongs(songsData);
        setLoading(false);
      }, (error: any) => { 
        console.error("Lỗi khi tải dữ liệu từ Firebase: ", error);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const handlePlaySong = async (song: any) => {
    await TrackPlayer.reset();
    await TrackPlayer.add([song]);
    await TrackPlayer.play();
  };

  const renderSongItem = ({ item, index }: any) => (
    <TouchableOpacity style={styles.songCard} onPress={() => handlePlaySong(item)}>
      <Text style={styles.songRank}>{index + 1}</Text>
      <Image source={{ uri: item.artwork || 'https://picsum.photos/400' }} style={styles.songArtwork} />
      <View style={styles.songInfo}>
        <Text style={styles.songTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.songArtist} numberOfLines={1}>{item.artist}</Text>
      </View>
      <Text style={styles.playIcon}>▶️</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tìm kiếm</Text>
      
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Bài hát, nghệ sĩ hoặc podcast..." 
          placeholderTextColor="#B3B3B3"
        />
      </View>

      <Text style={styles.sectionTitle}>🔥 Thịnh hành hôm nay</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          renderItem={renderSongItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
    marginBottom: 30,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 10,
  },
  songRank: {
    color: '#1DB954',
    fontSize: 18,
    fontWeight: 'bold',
    width: 30,
    textAlign: 'center',
  },
  songArtwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  songArtist: {
    color: '#B3B3B3',
    fontSize: 14,
  },
  playIcon: {
    fontSize: 24,
    paddingHorizontal: 10,
  }
});

export default SearchScreen;