import React, {Component, useState, useEffect} from 'react';
import moment from 'moment';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';

import {Colors, HP, size, WP} from '../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {getMessages, sendMessage} from '../redux1/APIs';

const {width} = Dimensions.get('window');

const Messages = ({route}) => {
  const itemRoute = route.params;
  const conversation_id = itemRoute?.conversation_id;
  const plotData = itemRoute?.plotData;
  console.log('============MESSAGES========================', conversation_id);
  console.log(plotData);
  var userLoggedIn = useSelector(state => state.reducer.user);

  const [message, setMessage] = useState('');
  const [messageDisplay, setMessageDisplay] = useState();

  const sendTextMessage = async () => {
    if (!message) {
      Toast.show({
        text1: 'Please enter message',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      const paramData = {
        receiver:userLoggedIn?._id == plotData?.userId ? messageDisplay[0]?.sender : plotData?.userId,
        sender: userLoggedIn?._id,
        plotId: plotData?._id,
        text: message,
        ConversationId: conversation_id,
      };
      await sendMessage(paramData);
    }
    gets();
    setMessage('');
  };

  const gets = async () => {
    const data = await getMessages(conversation_id);
    console.log(messageDisplay);
    console.log('====================================');
    setMessageDisplay(data);
  };
  // setTimeout(() => {
  //   gets();
  // }, 5000);
  useEffect(() => {
    setMessageDisplay('')
    gets();
   
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: width,
          height: 60,
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          padding: 15,
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width,
            height: 60,
            backgroundColor: '#D3D3D3',
            flexDirection: 'row',
            padding: 15,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: '#000',
              marginLeft: 10,
            }}>
            {plotData?.userName}
          </Text>
        </View>
      </View>

      <FlatList
        data={messageDisplay && messageDisplay}
        // inverted
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 10}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 3,
          marginHorizontal: 20,
        }}
        renderItem={({item}) => (
          <MessageList
            item={item}
            receiverData={item?.receiver}
            sender={item?.sender}
            text={item?.text}
          />
        )}
      />

      <View style={styles.textContainer}>
        <TextInput
          style={styles.txtInput}
          placeholder={'Type a message'}
          placeholderTextColor={Colors.DarkGrey}
          value={message}
          onChangeText={text => setMessage(text)}
        />
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          activeOpacity={0.8}
          onPress={() => {
            // messages.unshift({
            //   message,
            //   createdAt: moment().format('h:mm a'),
            //   isMine: true,
            // });
            // this.setState({ message: '', key: !key });
          }}>
          {/* <ImagePicker
              onImageChange={(path, mime) => {
                messages.unshift({
                  message: path,
                  type: 'image',
                  createdAt: moment().format('h:mm a'),
                  isMine: true,
                });
                this.setState({ key: !key });
              }}>
              <Image
                source={appIcons.clip}
                style={styles.clip}
                resizeMode="contain"
              />
            </ImagePicker> */}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginTop: 10}}
          onPress={() => {
            sendTextMessage();
          }}>
          <FontAwesome
            name={'send'}
            style={styles.send}
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// export default withTranslation()(Message);
export default Messages;
const styles = StyleSheet.create({
  textContainer: {
    height: 55,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 30,
    // paddingBottom: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  txtInput: {flex: 1, height: '100%', color: Colors.black},
  clip: {tintColor: Colors.timerColor, width: 25, height: 25},
  send: {width: 40, height: 40},
  listContainer: {marginBottom: 15, marginTop: 5},
  userImage: {
    borderWidth: 0,

    width: 50,
    height: 50,
    borderWidth: 3,
    borderRadius: 100,
  },
  listCard: {
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginVertical: 15,
    width: width - 160,
    padding: 15,
    // ...Shadows.shadow3,
  },
  ImageUpload: {height: WP('40%'), width: WP('50%')},
  messagetxt: {fontSize: 12, marginTop: 5},
  timeContainer: {
    marginBottom: 10,

    alignItems: 'center',

    position: 'absolute',
  },
});
const MessageList = ({item, receiverData, sender, text}) => {
  var userLoggedIn = useSelector(state => state.reducer.user);

  const {createdAt, isMine = sender, type} = item;
console.log(receiverData);
  return (
    <View
      style={[
        styles.listContainer,
        {
          flexDirection: isMine == userLoggedIn?._id ? 'row-reverse' : 'row',
        },
      ]}>
      <Image
        source={
          isMine == userLoggedIn?._id
            ? {uri: `http://173.249.10.7:8066/${receiverData?.image}`}
            : {uri: `http://173.249.10.7:8066/${userLoggedIn?.image}`}
        }
        style={[
          styles.userImage,
          {
            marginRight: isMine == userLoggedIn?._id ? 0 : 10,
            marginLeft: isMine == userLoggedIn?._id ? 10 : 0,
            borderColor:
              isMine == userLoggedIn?._id ? Colors.primary : Colors.blue,
          },
        ]}
      />
      <View
        style={[
          {
            paddingHorizontal: 20,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              isMine == userLoggedIn?._id ? Colors.primary : Colors.blue,
            borderTopRightRadius: isMine == userLoggedIn?._id ? 0 : 50,
            borderBottomRightRadius: isMine == userLoggedIn?._id ? 40 : 50,
            borderBottomLeftRadius: isMine == userLoggedIn?._id ? 40 : 40,
            borderTopLeftRadius: isMine == userLoggedIn?._id ? 40 : 0,
          },
        ]}>
        {/* <Text style={{color:'white'}}>{isMine !== userLoggedIn?._id ? receiverData?.userName : userLoggedIn?.userName}</Text> */}

        <Text
          style={{
            color: isMine == userLoggedIn?._id ? Colors.white : Colors.white,
            fontSize: size.small,
          }}>
          {text}
        </Text>
      </View>
      <View
        style={[
          styles.timeContainer,
          {
            bottom: -25,

            left: isMine == userLoggedIn?._id ? '20%' : '20%',
          },
        ]}>
        <Text
          style={[
            styles.messagetxt,
            {
              color: Colors.gray,
            },
          ]}>
          {createdAt?.slice(0, 10)}
        </Text>
      </View>
    </View>
  );
};
