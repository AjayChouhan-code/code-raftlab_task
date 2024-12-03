import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HOME, PROPERTY_BOOK, USER } from '@/assets/svg';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HOME width={28} height={28} fill={color} />
          ),
        }}
      />

      {/* Booking Tab */}
      <Tabs.Screen
        name="bookingScreen"
        options={{
          title: 'Booking', 
          tabBarIcon: ({ color }) => (
            <PROPERTY_BOOK width={28} height={28} fill={color} />
          ),
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <USER width={30} height={30} fill={color} />
          ),
        }}
      />
    </Tabs>
  );
}
