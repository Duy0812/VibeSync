import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CheckoutScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedMethod, setSelectedMethod] = useState('momo');

  const handlePayment = () => {
    Alert.alert(
      "Thanh toán thành công!",
      "Chào mừng bạn đến với VibeSync Premium. Khởi động lại ứng dụng để cập nhật quyền lợi.",
      [{ text: "Hoàn tất", onPress: () => navigation.navigate('Main') }]
    );
  };

  const PaymentMethod = ({ id, name, icon }: { id: string, name: string, icon: string }) => (
    <TouchableOpacity 
      style={[styles.methodCard, selectedMethod === id && styles.methodCardActive]} 
      onPress={() => setSelectedMethod(id)}
      activeOpacity={0.8}
    >
      <View style={styles.methodIconWrapper}><Text style={styles.methodIcon}>{icon}</Text></View>
      <Text style={styles.methodName}>{name}</Text>
      <View style={[styles.radio, selectedMethod === id && styles.radioActive]}>
        {selectedMethod === id && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
          <Text style={styles.backButton}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh Toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Gói Premium 1 Tháng</Text>
          <Text style={styles.summaryPrice}>59.000 ₫</Text>
          <View style={styles.divider} />
          <Text style={styles.summaryDesc}>Tài khoản của bạn sẽ tự động gia hạn sau 30 ngày.</Text>
        </View>

        <Text style={styles.sectionTitle}>Phương thức thanh toán</Text>
        
        <PaymentMethod id="momo" name="Ví MoMo" icon="🌸" />
        <PaymentMethod id="zalopay" name="ZaloPay" icon="🛡️" />
        <PaymentMethod id="card" name="Thẻ tín dụng / Ghi nợ" icon="💳" />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={handlePayment} activeOpacity={0.9}>
          <Text style={styles.payBtnText}>THANH TOÁN 59.000 ₫</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f19' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 10 : 20, paddingBottom: 20 },
  backButton: { fontSize: 20, color: '#ffffff' },
  headerTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' },
  content: { paddingHorizontal: 24, flex: 1 },
  summaryCard: { backgroundColor: '#111827', borderRadius: 16, padding: 24, marginBottom: 32, borderWidth: 1, borderColor: '#374151' },
  summaryTitle: { color: '#ffffff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  summaryPrice: { color: '#fbbf24', fontSize: 32, fontWeight: '900', marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#374151', marginBottom: 16 },
  summaryDesc: { color: '#9ca3af', fontSize: 12, lineHeight: 18 },
  sectionTitle: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  methodCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111827', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#1f2937' },
  methodCardActive: { borderColor: '#d946ef', backgroundColor: 'rgba(217, 70, 239, 0.05)' },
  methodIconWrapper: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#1f2937', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  methodIcon: { fontSize: 20 },
  methodName: { flex: 1, color: '#ffffff', fontSize: 15, fontWeight: '500' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#4b5563', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: '#d946ef' },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#d946ef' },
  footer: { padding: 24, paddingBottom: Platform.OS === 'ios' ? 40 : 24, backgroundColor: '#111827', borderTopWidth: 1, borderTopColor: '#1f2937' },
  payBtn: { backgroundColor: '#fbbf24', paddingVertical: 18, borderRadius: 12, alignItems: 'center' },
  payBtnText: { color: '#000000', fontSize: 16, fontWeight: '900', letterSpacing: 1 }
});

export default CheckoutScreen;