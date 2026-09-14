import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlaylistModalScreen = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={() => navigation.goBack()} />
      
      <View style={styles.modalContainer}>
        <View style={styles.dragHandle} />
        <Text style={styles.modalTitle}>Tạo Danh Sách Phát Mới</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên danh sách phát..."
            placeholderTextColor="#6b7280"
            autoFocus
          />
        </View>

        <TouchableOpacity style={styles.createBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.createBtnText}>TẠO MỚI</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBtnText}>HỦY</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.6)' },
  // Đã thay thế StyleSheet.absoluteFillObject bằng các thuộc tính tuyệt đối
  backdrop: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  modalContainer: { backgroundColor: '#111827', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  dragHandle: { width: 40, height: 4, backgroundColor: '#374151', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  inputContainer: { backgroundColor: '#1f2937', borderRadius: 12, paddingHorizontal: 16, marginBottom: 24 },
  input: { color: '#ffffff', fontSize: 16, height: 50 },
  createBtn: { backgroundColor: '#d946ef', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  createBtnText: { color: '#ffffff', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  cancelBtn: { paddingVertical: 12, alignItems: 'center' },
  cancelBtnText: { color: '#9ca3af', fontSize: 14, fontWeight: 'bold' }
});

export default PlaylistModalScreen;