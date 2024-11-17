import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link, Href } from 'expo-router';
import { useRouter } from 'expo-router';

type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
  href?: Href; // Use Href type directly
};

type CustomHeaderProps = {
  name: string;
  icons?: IconProps[];
};


const ProfileHeader: React.FC<CustomHeaderProps> = ({ name, icons = [] }) => {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
      };


  return (
    <View style={styles.headerContainer}>
        <View style={{ flexDirection: 'row', alignItems:'center'}}>
            <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 10 }}>
                <Ionicons name="chevron-back" size={30} color={Colors.gray} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 10}}>
                <Image source = {{ uri : 'https://i.pravatar.cc/150?u=aguilarduke@marketoid.com'}} style={{width:40 , height: 40 , borderRadius: 50}}/>
                <View style={styles.profileContainer}>
                    <Text style={{ fontSize: 16, fontWeight: '800'}}>{name}</Text>
                    <Text style={{ fontSize: 12, color:Colors.gray}}>tap here for more info</Text>
                </View>
            </View>
        </View>
        <View style={styles.iconContainer}>
            {icons.map((icon, index) => (
                <TouchableOpacity key={index} onPress={icon.onPress} style={{ marginHorizontal: 8}}>
                <Ionicons name={icon.name} color={Colors.green} size={30} />
                </TouchableOpacity>
            ))}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#006400',
    fontWeight: 'bold',
    fontSize: 24,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  profileContainer:{
  }
});

export default ProfileHeader;
