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
  href?: Href;
};

type CustomHeaderProps = {
  id: string;
  name: string;
  img?: string;
  icons?: IconProps[];
};


const ContactHeader: React.FC<CustomHeaderProps> = ({ id, name, img, icons = [] }) => {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
      }

      const handlePress = () => {
        router.push({
          pathname: '/profile/[id]',
          params: {
            id: id,
            name,
            img,
          },
        });
      };


  return (
    <TouchableOpacity onPress={handlePress} style={styles.headerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width:'100%', justifyContent:'space-between' }}>
        <TouchableOpacity onPress={handleBackPress} style={{ marginRight: 10 }}>
            <Ionicons name="chevron-back" size={30} color={Colors.gray} />
        </TouchableOpacity>
        <View>
            <Text style={styles.headerTitle}>Contact Info</Text>
        </View>
          <View>
            <Text style={styles.LeftHeaderTitle}>Edit</Text>
          </View>
      </View>
    </TouchableOpacity>
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  LeftHeaderTitle:{
    color:Colors.green,
    fontWeight: '800',
    fontSize: 18,
    paddingRight:10
  }
});

export default ContactHeader;
