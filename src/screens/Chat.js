import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'

import ChatListCard from '../components/ChatListCard'
import { DummyData } from '../components/DummyData'
import { getAllChatList } from '../redux1/APIs'
import { useSelector } from 'react-redux'
const { width, height } = Dimensions.get("window")


const Chat = () => {
  const userActive = useSelector(({reducer: {user}}) => user);
  const[chatList,setChatList]=useState('')
  console.log('=======DTAAAA=============================');
  const gets=async()=>{
    const data = await getAllChatList(userActive?._id)
    console.log('===DTAA=================================',userActive?._id);
    console.log(data);
    setChatList(data)
  }
  useEffect(() => {
   gets()
  }, [])
  
  return (
    <View>
      <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
        <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Chats</Text>
      </View>
      <View style={{ marginTop: 20, backgroundColor: 'red' }} />
      <FlatList
        data={chatList}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          // flexGrow: 1,
          // paddingBottom: '20%',
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) =>
          <ChatListCard item={item}
          />
        }
      />
    </View>
  )
}

export default Chat

