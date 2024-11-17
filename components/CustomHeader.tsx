import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link, Href } from 'expo-router';

type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  onPress?: () => void;
  href?: Href; // Use Href type directly
};

type CustomHeaderProps = {
  title: string;
  icons?: IconProps[];
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, icons = [] }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.iconContainer}>
        {icons.map((icon, index) => (
          icon.href ? (
            <Link href={icon.href} key={index} style={{ marginHorizontal: 4 }}>
              <Ionicons name={icon.name} color={icon.color || Colors.gray} size={30} />
            </Link>
          ) : (
            <TouchableOpacity key={index} onPress={icon.onPress} style={{ marginHorizontal: 4}}>
              <Ionicons name={icon.name} color={icon.color || Colors.gray} size={30} />
            </TouchableOpacity>
          )
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
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: '#006400',
    fontWeight: 'bold',
    fontSize: 24,
  },
  iconContainer: {
    flexDirection: 'row',

  },
});

export default CustomHeader;
