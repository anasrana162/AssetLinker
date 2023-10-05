import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Colors, size, WP } from '../config';
import { useNavigation } from '@react-navigation/native';


const ChatListCard = ({ item }) => {
  console.log('===ITEMSSS=================================');
  console.log(item);
  console.log('====================================');
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation?.navigate('Messages',{plotData:item?.plotId,conversation_id:item?._id})}
      style={{
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 15,
        // marginBottom: 15,
        marginHorizontal: 15,
        marginTop: 3,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        marginVertical: 10,
      }}>
      <Image
        source={item?.receiver?.image ? {uri:`http://173.249.10.7:8066/${item?.receiver?.image}`} : require('../../assets/profile.jpg')}
        style={{
          width: 60,
          height: 60,
          borderWidth: 3,
          borderColor: Colors.primary,
          borderRadius: 100,
        }}
        resizeMode="contain"
      />
      <View
        style={{
          flexDirection: 'column',
          alignContent: 'center',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            alignContent: 'center',
            width: WP('75%'),
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginHorizontal: 8,
              color: Colors.black,
              fontSize: 20,
              fontWeight: '600',
            }}
            numberOfLines={2}>
            {item?.receiver?.userName}
          </Text>
          <Text
            style={{
              marginRight: 25,
              color: Colors.gray,
              fontSize: size.tiny,
            }}>
            {item?.createdAt?.slice(0,11)} ago
          </Text>
        </View>

        {/* <Text
          style={{
            marginHorizontal: 8,

            color: Colors.gray,
            fontSize: 14,
            fontWeight: '600',
            width: WP('70%'),
          }}
          numberOfLines={2}>
          {item.description}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ChatListCard;

const styles = StyleSheet.create({});
