import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../config';
import Slideshow from 'react-native-image-slider-show';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { postConversationId } from '../redux1/APIs';
const { width, height } = Dimensions.get('window');

const DetailScreen = props => {
  const userActive = useSelector(({ reducer: { user } }) => user);

  var fromDetail = true;
  const navigation = useNavigation();
  const [heartSelect, setheartSelect] = useState();
  const [position, setPosition] = useState(0);

  const myProfile = props.route.params?.myProjects;
  const PlotDetail = props.route.params.item;
  const PlotDetailUser = props.route.params.itemUser;
  const hiddenBottom = props?.route?.params?.hiddenBottom;
  console.log(PlotDetail?.userId, userActive?._id, '12345++++++++');
  let phoneNumber = `tel:${PlotDetailUser?.phone}`;
  var lengthImages = PlotDetail?.plotImage?.length;
  var imageSet = [];
  for (var i = 0; i < lengthImages; i++) {
    imageSet.push({
      url: `http://173.249.10.7:8066/${PlotDetail?.plotImage[i]}`,
    });
  }
  const MemberScince = PlotDetail?.userPosted?.createdAt;
  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === imageSet.length - 1 ? 0 : position + 1);
    }, 2000);

    return () => clearInterval(toggle);
  });
  const onShare = async () => {
    Linking.openURL(`https://assetslinkers.com`);
  };
  const sendToWhatsApp = () => {
    let msg = 'Hello! This Message is from Asset Linker';

    let mobile = PlotDetailUser?.phone;
    if (mobile) {
      if (msg) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log('WhatsApp Opened');
          })
          .catch(() => {
            alert('Make sure WhatsApp installed on your device');
          });
      } else {
        alert('Please insert message to send');
      }
    } else {
      alert('Please insert mobile no');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#fff',
          width: width,
          height: '100%',
          elevation: 5,
        }}>
        <View style={{ position: 'absolute', top: 0, zIndex: 999 }}>
          <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0) 35%)']}>
            <View
              style={{
                width: width,
                height: 80,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.goBack()}
                activeOpacity={0.5}>
                <MaterialIcons
                  name="keyboard-arrow-left"
                  size={30}
                  color={'#fff'}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.4} onPress={() => onShare()}>
                <Feather name="share-2" size={25} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ width: width,  alignItems: 'center' }}>
            {/* <Image source={{ uri: image, }} style={{ width: width, height: height / 2.5, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }} /> */}
            {imageSet?.length ? (
              <Slideshow position={position} dataSource={imageSet} />
            ) : (
              <Image
                source={require('../../assets/bgw.jpg')}
                style={{ width: '100%', height: 350 }}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={{ width: width, padding: 15, marginTop: 5 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#000', fontSize: 23, fontWeight: '700' }}>
                {PlotDetail?.plotType}
              </Text>
            </View>

            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: '500',
                marginTop: 5,
              }}>
              {PlotDetail?.price && PlotDetail?.price !== ' ' ? `Price: ${PlotDetail?.price} PKR` : ''}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                fontWeight: '500',
                marginTop: 5,
              }}>
              Posted : {PlotDetail?.createdAt?.slice(0, 10)}
            </Text>

            {
              !PlotDetail?.plotTitle || PlotDetail?.plotTitle == '' || PlotDetail?.plotTitle == ' ' ?
                null
                :
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontWeight: '500',
                    marginTop: 5,
                  }}>Main Features : {PlotDetail?.plotTitle}
                </Text>
            }
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginLeft: -5,
                marginTop: 5,
              }}>
              <TouchableOpacity activeOpacity={0.4}>
                <EvilIcons name="location" size={25} color={'#000'} />
              </TouchableOpacity>
              <Text style={{ color: '#000', fontSize: 17, fontWeight: '400' }}>
                {PlotDetail?.area}
              </Text>
            </View>

            {/* Pattern Start   */}

            <View
              style={{
                marginTop: 10,
                paddingHorizontal: 20,
                borderWidth: 1,
                borderColor: '#000',
                borderTopLeftRadius: 20,
                borderBottomRightRadius: 20,
                padding: 5,
              }}>
              <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>
                More Detail
              </Text>
              <View style={{ justifyContent: 'center', marginTop: 5 }}>
                {
                  (PlotDetail?.plotCategory !== 'Apartment') ? null : (

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: Colors.primary, fontWeight: '400' }}>
                        {PlotDetail?.furnished == true
                          ? 'Furnished'
                          : 'UnFurnished'}
                      </Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        Furnished
                      </Text>
                    </View>)}
                {!PlotDetail?.bedrooms || PlotDetail?.bedrooms == '' || PlotDetail?.bedrooms == ' ' ? null : (
                  <>


                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: '#000', fontWeight: '400' }}>
                        {PlotDetail?.bedrooms}
                      </Text>
                      <Text style={{ color: '#000', fontWeight: '600' }}>
                        Bedrooms
                      </Text>
                    </View>


                  </>
                )}
                {!PlotDetail?.bathrooms || PlotDetail?.bathrooms == '' || PlotDetail?.bathrooms == ' ' ? null : (

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.bathrooms}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Bathrooms
                    </Text>
                  </View>)}
                {PlotDetail?.plotCategory == '' || PlotDetail?.plotCategory == ' ' ||
                  !PlotDetail?.plotCategory ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.plotCategory}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Plot Category
                    </Text>
                  </View>
                )}
                {PlotDetail?.saleRent == '' || PlotDetail?.saleRent == ' ' ||
                  !PlotDetail?.saleRent ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.saleRent}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Sale/Rent
                    </Text>
                  </View>
                )}
                {PlotDetail?.areaUnit == '' || PlotDetail?.areaUnit == ' ' ||
                  PlotDetail?.areaUnit == ' ' ||
                  !PlotDetail?.areaUnit ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.areaUnit}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Area unit
                    </Text>
                  </View>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={{ color: '#000', fontWeight: '400' }}>
                    {PlotDetail?.area}
                  </Text>
                  <Text style={{ color: '#000', fontWeight: '600' }}>
                    Location
                  </Text>
                </View>
                {PlotDetail?.locationtype == '' ||
                  PlotDetail?.locationtype == ' ' ||
                  !PlotDetail?.locationtype ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.locationtype}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Sub Location
                    </Text>
                  </View>
                )}
                {PlotDetail?.yard == '' ||
                  PlotDetail?.yard == ' ' ||
                  !PlotDetail?.yard ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.yard}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Yard{' '}
                    </Text>
                  </View>
                )}
                {PlotDetail?.yardNumber == '' ||
                  PlotDetail?.yardNumber == ' ' ||
                  !PlotDetail?.yardNumber ? null : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.yardNumber}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Yard Detail
                    </Text>
                  </View>
                )}
                {PlotDetail?.constructionState &&
                  PlotDetail?.constructionState !== ' ' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.constructionState}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Construction Status
                    </Text>
                  </View>
                ) : null}
                {PlotDetail?.phase && PlotDetail?.phase !== ' ' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{ color: '#000', fontWeight: '400' }}>
                      {PlotDetail?.phase}
                    </Text>
                    <Text style={{ color: '#000', fontWeight: '600' }}>
                      Phase
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            {PlotDetail?.plotDescription && (
              <>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontWeight: '700',
                    marginTop: 10,
                  }}>
                  Description
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    fontWeight: '400',
                    marginTop: 10,
                  }}>
                  {PlotDetail?.plotDescription}
                </Text>
              </>
            )}
            {console.log("props", props?.route?.params?.MsId)}
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '500',
                marginTop: 10,
              }}>
              MSID: {props?.route?.params?.MsId}
            </Text>

            {props?.route?.params?.userRole != undefined && <TouchableOpacity
                onPress={() => navigation.navigate('UserProfile')}
                style={{
                  backgroundColor: Colors.primary,
                  // width: 70,
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 6,
                  marginTop: 10
                }}>
                {console.log("userRole",props?.route?.params?.userRole)}
                <Text
                  style={{ color: Colors.white, fontWeight: '600', fontSize: 15 }}>
                  {props?.route?.params?.userRole}
                </Text>
              </TouchableOpacity>}

            <View style={{ justifyContent: 'center', marginTop: 5 }}>
              {/* <Text style={{ color: "#000", fontSize: 15, fontWeight: "700", }} >Features</Text> */}

              {/* <View style={{ width: width / 1.8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400' }}>Drawing Room</Text>
                                <Text style={{ color: '#000', fontWeight: '400' }}>Dining Room</Text>
                            </View>

                            <View style={{ width: width / 1.8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400' }}>kitchen</Text>
                                <Text style={{ color: '#000', fontWeight: '400' }}>Study Room</Text>
                            </View>

                            <View style={{ width: width / 1.8, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: '#000', fontWeight: '400' }}>Prayer room</Text>
                                <Text style={{ color: '#000', fontWeight: '400' }}>Store Room</Text>
                            </View> */}
              {PlotDetail?.location == ' ' ||
                PlotDetail?.location == '' ? null : (
                <View
                  style={{
                    marginVertical: 5,
                    width: width / 1.8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{ color: '#000', fontWeight: '400' }}>
                    Address
                  </Text>

                  <Text style={{ color: '#000', fontWeight: '400' }}>
                    {PlotDetail?.location}
                  </Text>
                </View>
              )}
            </View>

            <View style={{ flexDirection: 'row' }}>
              {myProfile && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Profile', PlotDetailUser?._id)
                  }>
                  <View>
                    <View
                      style={{ width: width / 4.5, justifyContent: 'center' }}>
                      <Image
                        source={
                          PlotDetailUser?.image
                            ? {
                              uri: `http://173.249.10.7:8066/${PlotDetailUser?.image}`,
                            }
                            : require('../../assets/profile.jpg')
                        }
                        style={{ height: 70, width: 70, borderRadius: 50 }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {myProfile && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      'UserProfile',

                      { item: PlotDetailUser },
                    )
                  }
                  style={{ width: width, flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ width: width / 2, marginTop: -20 }}>
                    <Text
                      style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>
                      {PlotDetailUser?.userName}
                    </Text>
                    <Text
                      style={{ color: 'black', fontSize: 15, fontWeight: '700' }}>
                      Member Since {PlotDetailUser?.createdAt?.slice(0, 10)}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: width / 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <AntDesign name="right" size={15} color="#000" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            {myProfile && (
              <TouchableOpacity
                style={{ marginLeft: 90, marginTop: -30 }}
                onPress={() =>
                  navigation.navigate('Profile', PlotDetailUser?._id)
                }>
                <View activeOpacity={0.6}>
                  <Text
                    style={{
                      color: '#2C74B3',
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    SEE PROFILE
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* Pattern End */}
        </ScrollView>

        {/** chat whatsapp call buttons */}
        {hiddenBottom ? (
          <View style={{ backgroundColor: 'black', paddingVertical: 10 }}></View>
        ) : (
          <View
            style={{
              height: height / 9.5,
              width: width,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderTopWidth: 1,
              borderTopColor: 'grey',
            }}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('Messages', PlotDetail)
                // postConversationId(userActive?._id, PlotDetail?.userId)
              }

              }
              style={{
                flexDirection: 'row',
                height: 45,
                width: 115,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Fontisto name="email" size={20} color={'#fff'} />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: 15,
                  left: 5,
                }}>
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => sendToWhatsApp()}
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                height: 45,
                flex: 0.4,

                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <FontAwesome name="whatsapp" size={20} color={'#fff'} />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: 15,
                  left: 5,
                }}>
                WhatsApp
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL(phoneNumber)}
              activeOpacity={0.5}
              style={{
                flexDirection: 'row',
                height: 45,
                flex: 0.4,
                backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <Feather name="phone-call" size={20} color={'#fff'} />
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '400',
                  fontSize: 15,
                  left: 5,
                }}>
                Call
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailScreen;
