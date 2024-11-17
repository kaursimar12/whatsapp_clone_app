import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export type CircularIconProps = {
    name: typeof Ionicons.defaultProps;
    backgroundColor: string;
}

const CircularIcon = ({ name, backgroundColor }: CircularIconProps) => {
  return (
    <View style={{backgroundColor, padding: 10, borderRadius: 100, alignItems:'center', justifyContent:'center' }}>
        <Ionicons name={name} size={22} color="white" />
    </View>
  )
}

export default CircularIcon

const styles = StyleSheet.create({})