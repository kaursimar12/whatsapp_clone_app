import { FlatList,  FlatListComponent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors';
import { useAuth } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BoxedIcon from '@/components/BoxedIcon';
import CircularIcon from '@/components/CircularIcon';

const settings = () => {
  const user = [
    {
      name: 'Simardeep Kaur',
      description: 'Full Stack Web and Mobile Developer',
      icon: 'person',
      backgroundColor : Colors.gray,
    },
  ];

  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor : Colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor : Colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor : Colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor : Colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor : '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor : Colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor : Colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor : Colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor : Colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor : Colors.red,
    },
  ];

  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={defaultStyles.block}>
          <FlatList 
            data={user}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <View style={styles.iconname}>
                  <CircularIcon name={item.icon} backgroundColor={item.backgroundColor} />
                  <View style={styles.namecontainer}>
                    <Text style={styles.username}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
          )} />
        </View>

        <View style={defaultStyles.block}>
          <FlatList 
            data={devices}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemname}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
          )} />
        </View>

        <View style={defaultStyles.block}>
          <FlatList 
            data={items}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemname}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
          )} />
        </View>

        <View style={defaultStyles.block}>
          <FlatList 
            data={support}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemname}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </View>
          )} />
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <Text 
            style={{
              color: Colors.primary,
              fontSize: 18,
              textAlign: 'center',
              paddingVertical: 14
            }}>
            Log Out
            </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>

    
  )
}

export default settings

const styles = StyleSheet.create({
  itemname:{
    fontSize: 18,
    flex: 1
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
})