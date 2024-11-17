import { StyleSheet } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useSegments } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';

const Layout = () => {
  const segments = useSegments();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs screenOptions={{
            tabBarStyle: {
                backgroundColor: Colors.background
            },
            tabBarActiveTintColor: Colors.green,
            tabBarInactiveBackgroundColor: Colors.background,
            tabBarActiveBackgroundColor: Colors.background,
            headerStyle: {
              backgroundColor: Colors.background,
              alignContent: 'center'
          },
          headerShadowVisible: false,
          headerTitleAlign: 'center'
        }}>
          <Tabs.Screen
            name="chats"
            options={{
              title: 'Chats',
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="chatbubbles" size={size} color={color} />
              ),
              tabBarStyle: {
                backgroundColor: Colors.background,
                display: segments[2] === '[id]' ? 'none' : 'flex'
              }
            }}
          />
          <Tabs.Screen
            name="updates"
            options={{
              title: 'Updates',
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="update" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="calls"
            options={{
              title: 'Calls',
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <MaterialIcons name="phone" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <Ionicons name="cog" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({});
