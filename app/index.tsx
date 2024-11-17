import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'

const index = () => {
    const openLink = () =>{
        Linking.openURL('https://galaxies.dev')
      }

  return (
    <View style={styles.container}>
    <Image
        source={require('@/assets/images/welcome.png')} style={styles.welcome}
      />
      <Text style={styles.headline}>Welcome to WhatsApp Clone</Text>
      <Text style={styles.description}>Read our{' '}
        <Text style={styles.link} onPress={openLink}>Privacy Policy</Text>
        .{'Tap "Agree & Continue" to accept the '}
        <Text style={styles.link} onPress={openLink}>Terms of service</Text>
        .
      </Text>
      <Link href={"/otp"} replace asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
      </Link>
  </View>
  )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
      },
      welcome:{
        width:300,
        height:300,
        marginBottom: 80,
      },
      headline:{
        fontSize:24,
        fontWeight:'bold'
      },
      description:{
        fontSize:16,
        textAlign:'center',
        marginBottom:80,
        color: Colors.gray
      },
      link:{
        color: Colors.primary
      },
      button:{
        width:'100%',
        alignItems:'center'
      },
      buttonText:{
        fontSize:22,
        color:Colors.primary,
        fontWeight:'bold'
      }
})