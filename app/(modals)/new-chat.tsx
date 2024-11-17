import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import contacts from '@/assets/data/contacts.json'
import { AlphabetList } from "react-native-section-alphabet-list";
import Colors from '@/constants/Colors';
import { ScrollView } from 'react-native';
import { defaultStyles } from '@/constants/Styles';


const NewChat = () => {
  const data= contacts.map((contact, index) => ({
    value: `${contact.first_name} ${contact.last_name}`,
    name: `${contact.first_name} ${contact.last_name}`,
    img: contact.img,
    desc: contact.desc,
    key: `${contact.first_name} ${contact.last_name}-${index}`
  }));

  return (
    <View style={{ flex:1, backgroundColor: Colors.background}}>
      <AlphabetList
        data={data}
        indexLetterStyle={{ 
          color: 'blue', 
          fontSize: 12,
        }}
        indexContainerStyle={{
          width:10,
          backgroundColor:Colors.background
        }}
        style={{ marginLeft: 10}}
        renderCustomSectionHeader={(section) =>(
          <View style={styles.sectionHeaderContainer}>
            <Text>{section.title}</Text>
          </View>
        )}
        renderCustomItem={(item:any) => (
          <>
            <View style={styles.listItemContainer}>
              <Image source={{uri : item.img}} style={{width: 40, height:40, borderRadius: 20}}/>
              <View style={styles.itemContainer}>
                <Text style={styles.name}>{item.value}</Text>
                <Text style={styles.desc}>
                  {item.desc.length > 40 ? `${item.desc.substring(0,40)}...` : item.desc}
                </Text>
              </View>
            </View>
            <View style={defaultStyles.separator} />
          </>
        )}
      />
    </View>
  )
}

export default NewChat

const styles = StyleSheet.create({
  itemContainer:{
    flexDirection: 'column'
  },
  listItemContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    height: 50,
    padding:10,
    backgroundColor:'#fff'
  },
  sectionHeaderContainer:{
    height: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal:10
  },
  name:{
    color: '#000',
    fontSize: 14,
  },
  desc:{
    color: Colors.gray,
    fontSize: 12
  }
})