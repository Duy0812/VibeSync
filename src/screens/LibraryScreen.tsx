import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const libraryData = [
  { id: '1', title: 'Bài hát đã thích', subtitle: '248 bài hát', icon: '❤️', color: '#1DB954' },
  { id: '2', title: 'Nhạc Lofi Coding', subtitle: 'Danh sách phát • Bạn', icon: '🎧', color: '#282828' },
  { id: '3', title: 'Podcasts yêu thích', subtitle: 'Cập nhật hôm nay', icon: '🎙️', color: '#282828' },
  { id: '4', title: 'Nghệ sĩ đã theo dõi', subtitle: 'Sơn Tùng M-TP, Đen Vâu...', icon: '👤', color: '#282828' },
];

const LibraryScreen = () => {
  const renderLibraryItem = ({ item }: any) => (
    <TouchableOpacity style={styles.libraryCard}>
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Thư viện của bạn</Text>
        <TouchableOpacity>
          <Text style={styles.addIcon}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={libraryData}
        keyExtractor={(item) => item.id}
        renderItem={renderLibraryItem}
        showsVerticalScrollIndicator={false}
      />
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  addIcon: {
    fontSize: 24,
  },
  libraryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 65,
    height: 65,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    color: '#B3B3B3',
    fontSize: 14,
  }
});

export default LibraryScreen;