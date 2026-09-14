import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const { theme, toggleTheme } = useTheme();
  
  const [isDataSaver, setIsDataSaver] = useState(false);
  const [isHighQuality, setIsHighQuality] = useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={[styles.backButton, { color: theme.text }]}>◀</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Cài đặt</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>V</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.text }]}>VibeSync User</Text>
            <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>Gói Miễn phí</Text>
          </View>
          <TouchableOpacity style={[styles.editBtn, { backgroundColor: theme.isDark ? '#1f2937' : '#e5e7eb' }]}>
            <Text style={[styles.editBtnText, { color: theme.text }]}>Sửa</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Nâng cấp Premium */}
        <TouchableOpacity 
          style={[styles.premiumBanner, { borderColor: theme.primary, backgroundColor: theme.isDark ? 'rgba(217, 70, 239, 0.1)' : 'rgba(217, 70, 239, 0.05)' }]} 
          onPress={() => navigation.navigate('Premium')} 
          activeOpacity={0.8}
        >
          <Text style={styles.premiumIcon}>👑</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.premiumTitle, { color: theme.primary }]}>Nâng cấp Premium</Text>
            <Text style={[styles.premiumDesc, { color: theme.textSecondary }]}>Nghe nhạc không quảng cáo, chất lượng cao.</Text>
          </View>
          <Text style={[styles.arrowIcon, { color: theme.primary }]}>▶</Text>
        </TouchableOpacity>

        {/* Section: Ứng dụng */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Ứng dụng</Text>
        
        <View style={[styles.settingsGroup, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>{theme.isDark ? '🌙' : '☀️'}</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>Giao diện tối (Dark Mode)</Text>
            </View>
            <Switch 
              value={theme.isDark} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#d1d5db', true: theme.primary }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>📶</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>Tiết kiệm dữ liệu mạng</Text>
            </View>
            <Switch 
              value={isDataSaver} 
              onValueChange={setIsDataSaver} 
              trackColor={{ false: '#d1d5db', true: theme.primary }}
              thumbColor={'#ffffff'}
            />
          </View>

          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>🎧</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>Âm thanh chất lượng cao</Text>
            </View>
            <Switch 
              value={isHighQuality} 
              onValueChange={setIsHighQuality} 
              trackColor={{ false: '#d1d5db', true: theme.primary }}
              thumbColor={'#ffffff'}
            />
          </View>
        </View>

        {/* Section: Hỗ trợ & Khác */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 24 }]}>Khác</Text>
        
        <View style={[styles.settingsGroup, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>🔔</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>Thông báo</Text>
            </View>
            <Text style={[styles.arrowIcon, { color: theme.textSecondary }]}>▶</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>📜</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>Điều khoản dịch vụ</Text>
            </View>
            <Text style={[styles.arrowIcon, { color: theme.textSecondary }]}>▶</Text>
          </TouchableOpacity>

          {/* Nút Đăng xuất */}
          <TouchableOpacity 
            style={[styles.settingRow, { borderBottomWidth: 0 }]} 
            onPress={() => navigation.replace('Onboarding')}
          >
            <View style={styles.settingLabel}>
              <Text style={styles.settingIcon}>🚪</Text>
              <Text style={[styles.settingText, { color: '#ef4444', fontWeight: 'bold' }]}>Đăng xuất</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 20, paddingBottom: 20 },
  backButton: { fontSize: 20 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { paddingHorizontal: 24, paddingBottom: 100 },
  
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 16, marginBottom: 24, borderWidth: 1 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#c026d3', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  avatarText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  profileEmail: { fontSize: 14 },
  editBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  editBtnText: { fontSize: 12, fontWeight: 'bold' },
  
  premiumBanner: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 16, borderRadius: 16, marginBottom: 32 },
  premiumIcon: { fontSize: 32, marginRight: 16 },
  premiumTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  premiumDesc: { fontSize: 12 },
  
  sectionTitle: { fontSize: 13, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 12, marginLeft: 8 },
  settingsGroup: { borderRadius: 16, borderWidth: 1, paddingHorizontal: 16, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(156, 163, 175, 0.2)' },
  settingLabel: { flexDirection: 'row', alignItems: 'center' },
  settingIcon: { fontSize: 20, marginRight: 16, width: 24, textAlign: 'center' },
  settingText: { fontSize: 16, fontWeight: '500' },
  arrowIcon: { fontSize: 12 }
});

export default SettingsScreen;