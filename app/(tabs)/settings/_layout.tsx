// Layout.js
import React from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <CustomHeader
              title="Settings"
              icons={[
                { name: 'camera', color: 'gray', onPress: () => console.log('Camera pressed') },
                { name: 'search', color: 'gray', onPress: () => console.log('Search pressed') },
                { name: 'ellipsis-vertical', color: 'gray', onPress: () => console.log('Menu pressed') },
              ]}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default Layout;
