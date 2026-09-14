import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Tạm thời chuyển thẳng vào Main.
    // Dùng Firebase: await auth().createUserWithEmailAndPassword(email, password)
    if (name && email && password) {
      navigation.replace('Main');
    } else {
      alert("Vui lòng điền đủ thông tin!");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
            <Text style={[styles.backIcon, { color: theme.text }]}>◀</Text>
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: theme.text }]}>Tạo tài khoản</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Tham gia VibeSync để cá nhân hóa gu âm nhạc của riêng bạn.</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Tên hiển thị</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }]}
              placeholder="VD: Nguyễn Văn A"
              placeholderTextColor={theme.textSecondary}
              value={name}
              onChangeText={setName}
            />

            <Text style={[styles.label, { color: theme.text, marginTop: 16 }]}>Email</Text>
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
              placeholder="Tạo mật khẩu (ít nhất 6 ký tự)"
              placeholderTextColor={theme.textSecondary}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={[styles.registerBtn, { backgroundColor: theme.primary }]} onPress={handleRegister} activeOpacity={0.8}>
              <Text style={styles.registerBtnText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: theme.textSecondary }]}>Đã có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.loginText, { color: theme.primary }]}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 40 },
  backBtn: { marginBottom: 20 },
  backIcon: { fontSize: 24 },
  headerContainer: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 14, lineHeight: 22 },
  formContainer: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 8, marginLeft: 4 },
  input: { borderWidth: 1, borderRadius: 12, height: 54, paddingHorizontal: 16, fontSize: 16 },
  registerBtn: { height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', marginTop: 32, shadowColor: '#d946ef', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  registerBtnText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  footerText: { fontSize: 14 },
  loginText: { fontSize: 14, fontWeight: 'bold' }
});

export default RegisterScreen;