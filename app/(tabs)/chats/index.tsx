import { StyleSheet, ScrollView, View, FlatList } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles';
import chats from '@/assets/data/chats.json'
import Chats from '@/components/chatComponent';

const chatss = () => {

  return (
      <ScrollView style={{ flex: 1, backgroundColor:'#fff' , marginTop:10}} contentInsetAdjustmentBehavior="automatic">
        <FlatList 
          data={chats}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
          renderItem={({ item }) => <Chats{...item}/>} />
      </ScrollView>
  )
}

export default chatss

const styles = StyleSheet.create({})