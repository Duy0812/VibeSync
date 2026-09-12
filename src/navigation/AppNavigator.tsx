import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import thư viện Icon

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import LibraryScreen from '../screens/LibraryScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopWidth: 0,
          paddingBottom: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#1DB954', // Màu xanh Spotify khi chọn
        tabBarInactiveTintColor: '#B3B3B3', // Màu xám khi bỏ chọn
        // Cấu hình Icon động theo từng Tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'library' : 'library-outline';
          }

          return <Icon name={iconName} size={28} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Trang chủ' }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Tìm kiếm' }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: 'Thư viện' }} />
    </Tab.Navigator>
  );
};

export default AppNavigator;