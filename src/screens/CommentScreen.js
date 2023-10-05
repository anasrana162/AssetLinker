import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, WP} from '../config';
import Toast from 'react-native-toast-message';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Slideshow from 'react-native-image-slider-show';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {CommentDisplay, CommentOnPost, getAllUser} from '../redux1/APIs';
const CommentScreen = ({route}) => {
  const item = route?.params;
  const [heart, setHeart] = useState('');
  const [comment, setComment] = useState('');
  const [commentsNew, setNewComments] = useState(false);
  const [Dummyuser, setDummyUser] = useState();

  const [commentUser, setNewCommentUser] = useState();

  const [position, setPosition] = useState(0);

  const [commentsDisplay, setCommentDisplay] = useState();
  var lengthImages = item?.plotImage?.length;
  var imageSet = [];
  for (var i = 0; i < lengthImages; i++) {
    imageSet.push({
      url: `http://173.249.10.7:8066/${item?.plotImage[i]}`,
    });
  }
  const navigation = useNavigation();
  const get = async () => {
    const itemdata = await CommentDisplay(item?._id);
    setCommentDisplay(itemdata);
    const userAvailable = await getAllUser();
    setDummyUser(userAvailable);
  };
  const SubmitComments = async () => {
    if (!comment) {
      Toast.show({
        text1: 'Comment is required',
        type: 'error',
        visibilityTime: 2000,
      });
    } else {
      await CommentOnPost(item?._id, comment);
      setNewComments(true);
    }

    setComment('');
  };
  useEffect(() => {
    const focusListner = navigation.addListener('focus', async () => {
      get();
    });
    return focusListner;
  }, []);
  useEffect(() => {
    get();
  }, [commentsNew]);

  // useEffect(() => {

  //   const toggle = setInterval(() => {
  //     setPosition(position === imageSet.length - 1 ? 0 : position + 1);
  //   }, 2000);

  //   return () => clearInterval(toggle);
  // });
  return (
    <>
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: '20%'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          //   onPress={() => navigation.navigate('Detail', {item})}
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 15,
          }}>
          <Slideshow position={position} dataSource={imageSet} />

          <Text
            style={{
              marginHorizontal: 10,
              fontWeight: 'bold',
              marginTop: 10,
              fontSize: 19,
              color: Colors.black,
            }}>
            {item?.plotTitle}
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              marginVertical: 10,
              fontSize: 15,
              color: Colors.black,
            }}>
            {item?.plotDescription}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <EvilIcons name="location" size={20} color="#000" />
              <Text style={{color: Colors.black}}>{item?.area}</Text>
            </View>

            <Text style={{color: Colors.black, fontWeight: '600'}}>
              Price: {item?.price}
            </Text>
          </View>
          <View style={{marginVertical: 10}} />
          {/* <View style={{flexDirection: 'row', marginVertical: 10}}>
            <Image
              source={
                item?.userPosted?.image
                  ? {uri: `http://173.249.10.7:8066/${item?.userPosted?.image}`}
                  : require('../../assets/profile.jpg')
              }
              style={{width: 45, height: 45, borderRadius: 100}}
            />
            <View style={{flexDirection: 'column', marginHorizontal: 10}}>
              <Text style={{fontWeight: '700', fontSize: 20, color: 'black'}}>
                {item?.userPosted?.role}
              </Text>
              <Text style={{fontWeight: '400', fontSize: 16, color: 'black'}}>
                {item?.userPosted?.name}
              </Text>
              <Text style={{fontWeight: '700', fontSize: 14, color: 'black'}}>
               {item?.userPosted?.MSID}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('UserProfile')}
                style={{
                  backgroundColor: Colors.primary,
                  width: 70,
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: '600',
                    fontSize: 15,
                  }}>
                  Est
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <View
            style={{borderWidth: 0.5, borderColor: 'lightgrey', width: '100%'}}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setHeart(!heart)}>
              <FontAwesome
                name="heart"
                size={20}
                color={heart ? 'grey' : 'red'}
              />

              <Text style={{marginHorizontal: 5, color: 'black'}}>
                Favourite
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              // onPress={() => navigation.navigate('CommentScreen', item)}
            >
              <EvilIcons name="comment" size={30} color="#000" />

              <Text style={{color: 'black'}}>
                {item?.noOfComment == 0 ? null : item?.noOfComment} Comment
              </Text>
            </TouchableOpacity>

            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <EvilIcons name="eye" size={30} color="#000" />

              <Text style={{color: 'black'}}>View</Text>
            </View> */}
          </View>
        </TouchableOpacity>

        {/* comment with users old code */}
        {/* <FlatList
          data={commentsDisplay[0]?.Comments}
          renderItem={(item, index) => {
            console.log(item, '121212++++');
            return (
              <>
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}>
                  <Image
                    source={
                      item?.item?.userPosted?.image
                        ? {
                            uri: `http://173.249.10.7:8066/${item?.item?.userPosted?.image}`,
                          }
                        : require('../../assets/profile.jpg')
                    }
                    style={{width: 60, height: 60, borderRadius: 100}}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      marginHorizontal: 15,
                      borderRadius: 12,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      {item?.item?.userPosted?.userName}
                    </Text>

                    <Text style={{color: 'black'}}>
                      {item?.item?.commentDes}{' '}
                    </Text>
                    <Text style={{color: Colors.timerColor, fontSize: 10}}>
                      {moment(
                        item?.item?.Comments?.createdAt,
                        'YYYYMMDD',
                      ).fromNow()}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        /> */}

        <FlatList
          data={commentsDisplay}
          renderItem={(item, index) => {
            console.log(
              item?.item.Comments[item?.index]?.commentDes,
              '121212++++',
            );
            return (
              <>
                <View
                  style={{
                    marginVertical: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 15,
                  }}>
                  <Image
                    source={
                      item?.item?.userPosted?.image
                        ? {
                            uri: `http://173.249.10.7:8066/${item?.item?.userPosted?.image}`,
                          }
                        : require('../../assets/profile.jpg')
                    }
                    style={{width: 60, height: 60, borderRadius: 100}}
                  />
                  <View
                    style={{
                      backgroundColor: 'white',
                      padding: 10,
                      marginHorizontal: 15,
                      borderRadius: 12,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      {item?.item?.userPosted?.userName}
                    </Text>

                    <Text style={{color: 'black'}}>
                      {item?.item?.Comments[item?.index]?.commentDes}
                    </Text>
                    <Text style={{color: Colors.timerColor, fontSize: 10}}>
                      {item?.item?.Comments[item?.index]?.createdAt?.slice(0,10)}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        />

        {/* {commentsDisplay && commentsDisplay?.map(items => {
          console.log(items?.Comments, 'log');
          // for(var i=0; i< commentsDisplay?.length;i++){

          //   setNewCommentUser(commentsDisplay[i]?.userPosted);
          // }
          var newUser= items?.userPosted
          console.log(newUser)
          return (
            <FlatList
              data={items?.Comments}
              renderItem={(item, index) => {
                return (
                  <>
                    <View
                      style={{
                        marginVertical: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 15,
                      }}>
                      <Image
                        source={
                          newUser?._id == item?.userId &&
                          newUser?.image
                            ? {
                                uri: `http://173.249.10.7:8066/${newUser?.image}`,
                              }
                            : require('../../assets/profile.jpg')
                        }
                        style={{width: 60, height: 60, borderRadius: 100}}
                      />

                      <View
                        style={{
                          backgroundColor: 'white',
                          padding: 10,
                          marginHorizontal: 15,
                          borderRadius: 12,
                        }}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 17,
                            fontWeight: '700',
                          }}>
                          {newUser?._id == item?.userId &&
                            newUser?.userName}
                        </Text>
                        <Text style={{color: 'black'}}>
                          {item?.commentDes}{' '}
                        </Text>
                      </View>
                    </View>
                  </>
                )
              }
              
              }
            />
          )
        })} */}
      </ScrollView>
      <View style={styles.textContainer}>
        <TextInput
          style={styles.txtInput}
          placeholder={'Write a comment'}
          onChangeText={text => setComment(text)}
          placeholderTextColor={Colors.DarkGrey}
          value={comment}
        />
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          activeOpacity={0.8}></TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={{marginTop: 10}}
          onPress={() => SubmitComments()}>
          <FontAwesome
            name={'send'}
            style={styles.send}
            size={25}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CommentScreen;

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
});
