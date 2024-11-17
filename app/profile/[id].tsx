import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Profile = ({ route }: any) => {
  const { id } = route.params; // Directly destructure `id` from route props

  console.log('Profile ID:', id); // Log the `id`

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Text>ID: {id}</Text> {/* Display the ID for verification */}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
