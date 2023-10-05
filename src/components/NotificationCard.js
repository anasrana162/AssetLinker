import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, size, WP } from '../config';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const NotificationCard = ({ name = '', des = '', tim = '', img = '' }) => {
  console.log('====================================');
  console.log(tim);
  console.log('====================================');
  const navigation = useNavigation()
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        marginVertical: 10,

        padding: 10,
        // marginBottom: 15,
        marginHorizontal: 12,
        borderRadius: 12,
        marginTop: 10,

        flexDirection: 'row',
      }}>
      <TouchableOpacity activeOpacity={0.9}      >


        <Image
          source={ img? {uri:`http://173.249.10.7:8066/${img}`} : require('../../assets/profile.jpg')}
          style={{
            width: 60,
            height: 60,
            borderWidth: 3,
            borderColor: Colors.primary,
            borderRadius: 100,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          width: WP('70%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'space-between',
        }}>
        <View style={{ flexDirection: 'column', width: WP('50%') }}>
          <Text
            style={{
              marginHorizontal: 10,
              color: Colors.black,
              fontSize: size.large,
              fontWeight: '700',
            }}
            numberOfLines={2}>
            {name}
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              color: Colors.DarkGrey,
              fontSize: size.small,
            }}
            numberOfLines={2}>
            {des}
          </Text>
        </View>
        <Text
          style={{
            color: Colors.DarkGrey,
            fontSize: size.tiny,
          }}> 
          {tim?.slice(0,10)}
        </Text>
      </View>

      {/* <Text
          style={{
            marginHorizontal: 10,
            color: Colors.gray,
            fontSize: size.small,
          }}>
          Description
        </Text> */}
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});