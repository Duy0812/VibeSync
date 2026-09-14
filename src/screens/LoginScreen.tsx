import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  if (email && password) {
    navigation.replace('Main');
  } else {
    Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
  }
};

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={[styles.backIcon, { color: theme.text }]}>◀</Text>
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: theme.text }]}>Chào mừng trở lại!</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Đăng nhập để tiếp tục đắm chìm trong âm nhạc của bạn.</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            placeholder="Nhập email của bạn"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={[styles.label, { color: theme.text, marginTop: 16 }]}>Mật khẩu</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
            placeholder="Nhập mật khẩu"
            placeholderTextColor={theme.textSecondary}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotText, { color: theme.primary }]}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.loginBtn, { backgroundColor: theme.primary }]} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginBtnText}>ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>Chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.registerText, { color: theme.primary }]}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 20, left: 24, zIndex: 10 },
  backIcon: { fontSize: 24 },
  headerContainer: { marginTop: 60, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 14, lineHeight: 22 },
  formContainer: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginLeft: 4 },
  input: { borderWidth: 1, borderRadius: 12, height: 54, paddingHorizontal: 16, fontSize: 16 },
  forgotPassword: { alignSelf: 'flex-end', marginTop: 12, marginBottom: 24 },
  forgotText: { fontSize: 14, fontWeight: '600' },
  loginBtn: { height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', shadowColor: '#d946ef', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  loginBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { fontSize: 14 },
  registerText: { fontSize: 14, fontWeight: 'bold' }
});

export default LoginScreen;