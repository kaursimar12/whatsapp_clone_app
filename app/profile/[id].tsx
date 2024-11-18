import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import ContactHeader from '@/components/contactHeader';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import BoxedIcon from '@/components/BoxedIcon';

const Profile = () => {
  const { id, name, img } = useLocalSearchParams();
  const displayId = Array.isArray(id) ? id[0] : id;
  const displayName = name as string || "Unknown";
  const displayImg = img as string | undefined;

  const items = [
    {
      name: 'Media, Links and Docs',
      icon: 'key',
      backgroundColor : Colors.primary,
    },
    {
      name: 'Starred Messages',
      icon: 'lock-closed',
      backgroundColor : '#33A5D1',
    },
    {
      name: 'Chat Search',
      icon: 'logo-whatsapp',
      backgroundColor : Colors.green,
    },
    {
      name: 'Mute',
      icon: 'notifications',
      backgroundColor : Colors.red,
    }
  ];

  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const handleItemPress = (index: number) => {
    setSelectedItem(index === selectedItem ? null : index);
  };

  return (
    <>
    <ContactHeader
      id={displayId}
      name={displayName}
      img={displayImg}
    />
    <View style={styles.container}>
      <Image source={{ uri: displayImg }} style={styles.profileImage}  />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.number}>+91 78896541235</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Ionicons name='card' color='#00AB66' style={styles.icons} size={24} />
          <Ionicons name='videocam' color='#00AB66' style={styles.icons} size={24} />
          <Ionicons name='call' color='#00AB66' style={styles.icons} size={24} />
        </View>
      </View>
      <View style={styles.status}>
        <Text style={styles.statusText}>This is a sample description of the contact.</Text>
      </View>
      <View style={styles.itemContainer}>
      <FlatList
            data={items}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => handleItemPress(index)}
                style={[
                  styles.item,
                  { backgroundColor: index === selectedItem ? '#f0f0f0' : '#fff' },
                ]}
              >
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemname}>{item.name}</Text>
                <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
              </TouchableOpacity>
            )}
          />
        </View>
    </View>
    </>
  );
};


export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:Colors.background
  },
  profileImage: {
    width: '100%',
    height: 370,
  },
  infoContainer:{
    flexDirection:'row',
    width: '100%',
    backgroundColor:'#fff',
    justifyContent:'space-between',
    paddingHorizontal:20,
    height:70,
    alignItems:'center'
  },
  iconsContainer:{
    flexDirection:'row',
    gap:6
  },
  icons:{
    backgroundColor:'#ACE1AF',
    padding:6,
    borderRadius:50
  },
  name:{
    fontSize:20,
    fontWeight:'800',
  },
  number:{
    fontSize:12,
    color:Colors.gray
  },
  status:{
    backgroundColor:'#fff',
    width:'100%',
    paddingVertical:10,
    paddingHorizontal:20,
    marginTop:2,
    height:50,
    justifyContent:'center'
  },
  statusText:{
    color:'black',
    fontSize:12,
    fontWeight:'400'
  },
  item:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    gap: 10,
    marginBottom:4,
    backgroundColor:'#fff'
  },
  itemname:{
    fontSize: 18,
    flex: 1,
  },
  itemContainer:{
    width:'100%',
    marginTop:20
  }
});
