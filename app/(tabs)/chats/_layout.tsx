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
          header: () => (
            <ProfileHeader
              name="Simardeep Kaur"
              icons={[
                { name: 'videocam' },
                { name: 'call' },
              ]}
            />
          ),
        }}
      />
      {/* <Stack.Screen name="[id]" options={{
        title:'',
        headerBackTitleVisible: false,
        headerStyle: {
          height: 80, // Adjust the height of the header
          backgroundColor: 'transparent', // Make background transparent if you want
          elevation: 0, // Remove shadow on Android
          borderBottomWidth: 0, // Remove bottom border
        },
        headerTitle: () =>(
          <View style={{ flexDirection: 'row', gap: 10}}>
            <Image source = {{ uri : 'https://i.pravatar.cc/150?u=aguilarduke@marketoid.com'}} style={{width:40 , height: 40 , borderRadius: 50}}/>
            <Text style={{ fontSize: 16, fontWeight: '500'}}>Simardeep Kaur</Text>
          </View>
        )
       }}/> */}
    </Stack>
  );
};

export default Layout;
