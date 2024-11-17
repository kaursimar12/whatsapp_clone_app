import { StyleSheet, Text, ScrollView, View, FlatList, Image, Platform } from 'react-native'
import React, {useState} from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { defaultStyles } from '@/constants/Styles';
import SwipeableRow from '@/components/swipeableRow';
import * as Haptics from 'expo-haptics'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const calls = () => {

  const user = [
    {
      id: "1a2b3c4d5e",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=mcleanduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "6f7g8h9i0j",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=odessaduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "2k3l4m5n6o",
      name: 'Simardeep Kaur',
      callType: 'missed',
      timeIcon: 'arrow-down' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=schultzduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "7p8q9r0s1t",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=marcieduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "3u4v5w6x7y",
      name: 'Simardeep Kaur',
      callType: 'missed',
      timeIcon: 'arrow-down' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=ewingduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "8z9a0b1c2d",
      name: 'Simardeep Kaur',
      callType: 'missed',
      timeIcon: 'arrow-down' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=maynardduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "3e4f5g6h7i",
      name: 'Simardeep Kaur',
      callType: 'missed',
      timeIcon: 'arrow-down' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=claudineduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "9j0k1l2m3n",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=sandraduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "4o5p6q7r8s",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=barryduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "0t1u2v3w4x",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=mariaduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "5y6z7a8b9c",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=nicholsduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "1d2e3f4g5h",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=fitzgeraldduke@marketoid.com",
      callIcon: 'videocam-outline' as const,
    },
    {
      id: "6i7j8k9l0m",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=nettieduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
    {
      id: "2n3o4p5q6r",
      name: 'Simardeep Kaur',
      callType: 'incoming',
      timeIcon: 'arrow-up' as const,
      time: '47 mins ago',
      img: "https://i.pravatar.cc/150?u=lacyduke@marketoid.com",
      callIcon: 'call-outline' as const,
    },
  ];
  

  const [items, setItems] = useState(user);

  const removeCall = (item: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setItems(items.filter((i) => i.id !== item.id));
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.favorite}>
            <Text>Favorites</Text>
          </View>
          <View style={styles.favoriteContainer}>
            <Ionicons style={styles.favoriteIcon} name={'heart'} size={20} />
            <Text style={styles.iconText}>Add Favorite</Text>
          </View>
          <View style={styles.recent}>
            <Text>Recent</Text>
          </View>
          <View style={styles.containerItems}>
            <FlatList 
              data={items}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
              renderItem={({ item }) => (
                <SwipeableRow onDelete={() => removeCall(item)}>
                  <View style={styles.itemContainer}>
                    <View style={styles.iconname}>
                      <Image source={{ uri: item.img }} style={styles.profileImage} />
                      <View style={styles.namecontainer}>
                      <Text 
                        style={[styles.username, { color: item.callType === 'missed' ? Colors.red : Colors.gray }]}>{item.name}</Text>
                        <View style={styles.timeContainer}>
                        <Ionicons 
                            name={item.timeIcon}
                            size={14}
                            style={[
                              { color: item.callType === 'missed' ? Colors.red : Colors.green },
                              { transform: [{ rotate: '45deg' }] }
                            ]}
                          />
                          <Text style={styles.description}>{item.time}</Text>
                        </View>
                      </View>
                    </View>
                    <Ionicons name={item.callIcon} size={26} style={styles.icon} />
                  </View>
                </SwipeableRow>
              )} />
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  )
}

export default calls

const styles = StyleSheet.create({
  favorite:{
    backgroundColor: Colors.background,
    padding:8,
    marginLeft:10,
    color:Colors.gray,
  },
  containerItems:{
    paddingLeft:12,
    paddingRight:12,
    flex:1,
    backgroundColor:'#fff'
  },
  favoriteContainer:{
    flexDirection: 'row',
    backgroundColor: '#fff',
    gap:8,
    alignItems:'center',
    padding:12
  },
  favoriteIcon:{
    backgroundColor: Colors.background,
    color: Colors.green,
    borderRadius: 100,
    padding:6,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },
  iconText:{
    fontWeight:'bold',
    fontSize: 16,
    color: Colors.gray
  },
  recent:{
    backgroundColor: Colors.background,
    padding:8,
    marginLeft:10,
    color:Colors.gray
  },
  namecontainer:{
    flexDirection: 'column',
    marginLeft:10,
  },
  iconname:{
    flexDirection: 'row',
    alignItems:'center'
  },
  username:{
    fontWeight : 'bold',
    fontSize: 18,
  },
  description:{
    fontSize: 10,
    color: Colors.gray,
    marginTop: 2,
  },
  icon:{
    color:Colors.gray
  },
  itemContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingTop:8,
    paddingBottom:8,
    backgroundColor:'#fff'
  },
  timeContainer:{
    flexDirection: 'row',
    alignItems:'center',
    gap:4
  }
})