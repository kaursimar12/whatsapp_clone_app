import { StyleSheet, Text, TouchableHighlight, View,  Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'
import { format } from 'date-fns';
import { Dimensions } from 'react-native';
import ChatSwipeableRow from './swipeableRowChat';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

interface ChatItemProps {
    id: string;
    name: string;
    date: string;
    unseenCount: string;
    backgroundColor: string;
    img: string;
    message: string;
  }

  const Chats: React.FC<ChatItemProps> = ({ id, name, date, unseenCount, img, message }) => {
  return (
    <GestureHandlerRootView>
      <ChatSwipeableRow>
      <TouchableOpacity activeOpacity={0.6} style={{ flex: 1, width:'100%'}}>
        <Link
          href={{
            pathname: '/(tabs)/chats/[id]',
            params: { id: id, name: name, img: img },
          }}
          style={{ flex: 1, width: '100%' }}
        >
          <View style={styles.containerItems}>
              <View style={styles.itemContainer}>
                  <View style={styles.iconname}>
                  <Image source={{ uri: img }} style={styles.profileImage} />
                  <View style={styles.namecontainer}>
                  <Text 
                      style={styles.username}>{name}</Text>
                      <View style={styles.timeContainer}>
                      <Text style={styles.description}>
                      {message.split(' ').length > 10
                          ? message.split(' ').slice(0, 10).join(' ') + '...'
                          : message}
                      </Text>
                      </View>
                  </View>
                  </View>
                  <View style={styles.timeEllipse}>
                    <Text style={styles.description}>{format(date, 'MM.dd.yy')}</Text>
                    {unseenCount !== undefined && parseInt(unseenCount) > 0 && (
                        <Text style={styles.unseenCount}>{unseenCount}</Text>
                    )}
                  </View>
              </View>
          </View>
        </Link>
        </TouchableOpacity>
      </ChatSwipeableRow>
    </GestureHandlerRootView>
  )
}

export default Chats

const styles = StyleSheet.create({
    favorite:{
        backgroundColor: Colors.background,
        padding:8,
        marginLeft:10,
        color:Colors.gray,
      },
      containerItems:{
        // paddingLeft:12,
        // paddingRight:12,
      },
      profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
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
      iconText:{
        fontWeight:'bold',
        fontSize: 18,
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
        fontSize: 20,
      },
      description:{
        fontSize: 14,
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
        paddingRight:12,
        paddingLeft:14,
        paddingBottom:10,
        paddingTop:10,
        width: screenWidth,
      },
      timeContainer:{
        flexDirection: 'row',
        alignItems:'center',
        gap:4
      },
      timeEllipse:{
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap:4,
      },
      unseenCount:{
        backgroundColor: Colors.green,
        borderRadius: 100,
        padding:4,
        fontSize:10,
        width:20,
        height:20,
        textAlign:'center',
        marginTop:2
      }
})