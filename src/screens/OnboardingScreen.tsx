import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';


const OnboardingScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Bỏ qua (Skip) ở góc trên */}
      <View style={styles.header}>
        {/* Nút bấm đã được mở rộng vùng chạm (hitSlop) để dễ bấm hơn */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('Main')}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text style={styles.skipText}>Bỏ qua</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung minh họa ở giữa */}
      <View style={styles.contentContainer}>
        {/* Hộp Icon 3D */}
        <View style={styles.illustrationBox}>
          <Text style={styles.headphoneIcon}>🎧</Text>
        </View>
        
        <Text style={styles.title}>Âm nhạc chuẩn Vibe của bạn</Text>
        <Text style={styles.subtitle}>
          Trải nghiệm Vibe Matching thông minh, tự động đồng bộ cảm xúc và gu âm nhạc mỗi giây.
        </Text>
        
        {/* Dấu chấm chuyển trang (Pagination) */}
        <View style={styles.pagination}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* Cụm nút Đăng nhập */}
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.btnGoogle} activeOpacity={0.8}>
          <Text style={styles.iconGoogle}>G</Text>
          <Text style={styles.textGoogle}>Tiếp tục với Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnApple} activeOpacity={0.8}>
          <Text style={styles.iconApple}></Text>
          <Text style={styles.textApple}>Tiếp tục với Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnFacebook} activeOpacity={0.8}>
          <Text style={styles.iconFacebook}>f</Text>
          <Text style={styles.textFacebook}>Tiếp tục với Facebook</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Bằng việc đăng nhập, bạn đồng ý với Điều khoản dịch vụ của VibeSync.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1b4b',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    // 👇 Đã tăng paddingTop lên 60 (hoặc lấy linh hoạt theo thanh trạng thái) để đẩy nút xuống
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 20 : 20,
  },
  skipText: {
    color: '#9ca3af',
    fontSize: 16, // Phóng to chữ lên một chút cho dễ nhìn
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  illustrationBox: {
    width: 120,
    height: 120,
    borderRadius: 32,
    backgroundColor: '#c026d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#c026d3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  headphoneIcon: {
    fontSize: 56,
    color: '#ffffff',
  },
  title: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#d1d5db',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4b5563',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 24,
    backgroundColor: '#d946ef',
  },
  loginContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconGoogle: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: '900',
    marginRight: 10,
  },
  textGoogle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnApple: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  iconApple: {
    color: '#ffffff',
    fontSize: 20,
    marginRight: 10,
    marginTop: -4,
  },
  textApple: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  iconFacebook: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textFacebook: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  termsText: {
    color: '#6b7280',
    fontSize: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});

export default OnboardingScreen;