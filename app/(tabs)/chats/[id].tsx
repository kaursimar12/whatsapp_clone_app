import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Bubble, GiftedChat, IMessage, InputToolbar, Send, SystemMessage,  } from 'react-native-gifted-chat'
import messageData from '@/assets/data/messages.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';
import ChatMessageBox from '@/components/ChatMessageBox';
import ReplyMessageBar from '@/components/ReplyMessageBar';

interface Message {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
}


const Page = () => {
  const [message, setMessage] = useState<IMessage[]>([]);
  const insets = useSafeAreaInsets();
  const [text, setText] = useState('');
  const swipeableRowRef = useRef<Swipeable | null>(null);
  const [replyMessage, setReplyMessage] = useState<IMessage  | null>();

  useEffect(() => {
    setMessage([
      ...messageData.map((message) => ({
        _id: message.id,
        text: message.msg,
        createdAt: new Date(message.date),
        user: {
          _id: message.from,
          name: message.from ? 'You' : 'Bob',
        },
      }),
    {
      _id:0,
      system: true,
      text: 'All your base are elong to us',
      createdAt: new Date(),
      user: {
        _id: 0,
        name:'Bot'
      }
    }
    ),
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessage(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);



  return (
    <ImageBackground source ={require('@/assets/images/pattern.png')} style={{ flex:1, marginBottom: 4 }}>
      <GiftedChat
        messages={message}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        textInputProps={styles.composer}
        renderSystemMessage={(props) => ( <SystemMessage {...props} textStyle={{color: Colors.gray}} />)}
        renderBubble={(props) => {
          return (
            <Bubble {...props} textStyle={{
              right:{
                color: '#000',
              },
            }}
            wrapperStyle={{
              left:{
                backgroundColor:'#fff',
              },
              right:{
                backgroundColor: Colors.lightGreen
              }
            }} />
          )
        }}
        renderSend={(props) => (
          <View style={{ flexDirection: 'row', height: 44, alignItems: 'center', justifyContent: 'center', gap: 14, paddingHorizontal: 14}}>
            {text.length > 0 && (
              <Send {...props} containerStyle={{
                justifyContent: 'center'
              }}>
                <Ionicons name="send" color={Colors.green} size={24} />
              </Send>
            )}
            {text.length === 0 && (
              <>
                <Ionicons name="camera-outline" color={Colors.green} size={28} />
                <Ionicons name="mic-outline" color={Colors.green} size={28} />
              </>
            )}
          </View>
        )}
        renderAvatar={null}
        onInputTextChanged={setText}
        maxComposerHeight={100}
        renderInputToolbar={(props) => (
          <InputToolbar {...props} containerStyle={{ backgroundColor: Colors.background}} renderActions={() => (
            <View style={{height: 44, justifyContent:'center', alignItems:'center', marginLeft:4}}>
              <Ionicons name="add" color={Colors.green} size={28} />
            </View>
          )} />
        )}
        renderMessage={(props) => (
          <ChatMessageBox {...props} 
            setReplyOnSwipeOpen={setReplyMessage}
            updateRowRef={updateRowRef}
          />
        )}
        renderChatFooter={() => (
          <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage ?? null} />
        )}        
      />
    </ImageBackground>
  )
}

export default Page

const styles = StyleSheet.create({
  composer: {
    backgroundColor:'#fff',
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize:16,
    marginVertical: 4,
    paddingTop: 2 
  }
})