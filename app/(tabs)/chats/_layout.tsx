// Layout.js
import React from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import { Href } from 'expo-router';
import { Image, View, Text, } from 'react-native';
import ProfileHeader from '@/components/profileHeader';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <CustomHeader
              title="Chats"
              icons={[
                { name: 'camera', color: 'gray', onPress: () => console.log('Camera pressed') },
                { name: 'add-circle', color: 'gray', href: '/(modals)/new-chat' as Href },
                { name: 'ellipsis-vertical', color: 'gray', onPress: () => console.log('Menu pressed') },
              ]}
            />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false, // Disable the default header
        }}
      />
    </Stack>
  );
};

export default Layout;
