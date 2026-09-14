import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PremiumScreen = () => {
  const navigation = useNavigation<any>();

  const features = [
    { icon: '🎧', title: 'Nghe nhạc chất lượng Lossless', desc: 'Trải nghiệm âm thanh studio chân thực nhất.' },
    { icon: '🚫', title: 'Không quảng cáo', desc: 'Nghe nhạc xuyên suốt, không bị gián đoạn.' },
    { icon: '⬇️', title: 'Tải xuống ngoại tuyến', desc: 'Nghe nhạc mọi lúc, mọi nơi không cần WiFi.' },
    { icon: '🔀', title: 'Chuyển bài không giới hạn', desc: 'Bỏ qua những bài bạn không thích.' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={styles.closeButton}>✖</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.superTitle}>VibeSync</Text>
          <Text style={styles.mainTitle}>PREMIUM</Text>
          <Text style={styles.subtitle}>Mở khóa toàn bộ sức mạnh của âm nhạc.</Text>
        </View>

        <View style={styles.featuresContainer}>
          {features.map((item, index) => (
            <View key={index} style={styles.featureRow}>
              <View style={styles.iconWrapper}>
                <Text style={styles.featureIcon}>{item.icon}</Text>
              </View>
              <View style={styles.featureTextWrapper}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Box Thanh toán chốt sale */}
      <View style={styles.bottomPurchase}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>59.000đ</Text>
          <Text style={styles.priceDuration}> / tháng</Text>
        </View>
        <Text style={styles.cancelText}>Hủy bất kỳ lúc nào. Chỉ áp dụng cho tài khoản mới.</Text>
        
        <TouchableOpacity style={styles.buyButton} activeOpacity={0.9} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.buyButtonText}>BẮT ĐẦU NGAY</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' }, // Đen tuyền tạo độ sâu
  header: { alignItems: 'flex-end', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 20 },
  closeButton: { fontSize: 20, color: '#9ca3af' },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  titleContainer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  superTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 3 },
  mainTitle: { color: '#fbbf24', fontSize: 42, fontWeight: '900', letterSpacing: 2, textShadowColor: 'rgba(251, 191, 36, 0.4)', textShadowOffset: { width: 0, height: 4 }, textShadowRadius: 10 },
  subtitle: { color: '#9ca3af', fontSize: 14, marginTop: 8 },
  featuresContainer: { backgroundColor: '#111827', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#374151' },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  iconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(251, 191, 36, 0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  featureIcon: { fontSize: 24 },
  featureTextWrapper: { flex: 1 },
  featureTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  featureDesc: { color: '#9ca3af', fontSize: 13, lineHeight: 18 },
  bottomPurchase: { padding: 24, backgroundColor: '#111827', borderTopLeftRadius: 32, borderTopRightRadius: 32, borderWidth: 1, borderColor: '#1f2937', borderBottomWidth: 0 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: 8 },
  priceText: { color: '#ffffff', fontSize: 32, fontWeight: '900' },
  priceDuration: { color: '#9ca3af', fontSize: 16, fontWeight: '600' },
  cancelText: { color: '#6b7280', fontSize: 12, textAlign: 'center', marginBottom: 20 },
  buyButton: { backgroundColor: '#fbbf24', paddingVertical: 18, borderRadius: 30, alignItems: 'center', shadowColor: '#fbbf24', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  buyButtonText: { color: '#000000', fontSize: 16, fontWeight: '900', letterSpacing: 1 }
});

export default PremiumScreen;