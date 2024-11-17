import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors'

const updates = () => {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.iconStatus}>
          <View style={styles.myStatus}>
            <View style={styles.statusIconContainer}>
              <Ionicons name="ellipse" size={50} color="#cccccc" />
              <Ionicons name="ellipse" size={16} color="#4CBB17" style={styles.notificationIndicator} />
            </View>
            <View>
              <Text style={styles.statusText}>My Status</Text>
              <Text style={styles.addStatus}>Add to my status</Text>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <Ionicons name={'camera'} size={22} style={styles.icons} />
            <Ionicons name={'pencil'} size={22} style={styles.icons} />
          </View>
        </View>
      </View>
      <View style={styles.noRecentContainer}>
        <Text style={styles.noRecentText}>No recent updates to show right now</Text>
      </View>
    </View>
  )
}

export default updates

const styles = StyleSheet.create({
  main:{
    flex: 1,
    backgroundColor: Colors.background
  },
  container:{
    backgroundColor: '#fff',
    marginTop:10,
    padding:8,
  },
  iconStatus:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  myStatus:{
    flexDirection: 'row',
    alignItems:'center',
    gap:4
  },
  statusText:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  addStatus:{
    fontSize: 12,
    color:Colors.gray
  },
  iconsContainer:{
    flexDirection: 'row',
    gap:10,
  },
  icons:{
    color:'#4CBB17',
    backgroundColor: Colors.lightGray,
    borderRadius:100,
    padding:6,
    alignSelf:'center'
  },
  noRecentContainer:{
    backgroundColor:'#fff',
    marginTop:20,
    alignItems:'center',
    justifyContent:'center'
  },
  noRecentText:{
    color: Colors.gray,
    fontSize: 16,
    padding:8
  },
  statusIconContainer: {
    position: 'relative', // Container for positioning
    width: 50,
    height: 50,
  },
  notificationIndicator: {
    position: 'absolute',
    top: 6,   // Adjust this value as needed
    left: 4,  // Adjust this value as needed
  },
})