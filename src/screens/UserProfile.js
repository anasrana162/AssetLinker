import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Favourite from './Favourite';
import {getUserProjectsById} from '../redux1/APIs';
import moment from 'moment';
const {width, height} = Dimensions.get('window');
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {FavListDisplay} from '../redux1/APIs';
import {Shadows} from '../config';

const UserProfile = ({route}) => {
  const userAccountData = route?.params;
  const userAccountDataFromDetail = route?.params?.PlotDetailUser;

  const navigation = useNavigation();
  const [userProjects, setUserProjects] = useState([]);

  const getUsers = async () => {
    const data = await getUserProjectsById(userAccountData?.item?._id);
    if (data) {
      setUserProjects(data?.availablePlots);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const House = ({
    index,
    item,
    image,
    name,
    Location,
    Price,
    createdAt,
    plotCategory,
  }) => {
    console.log('==============USER ACC DATA======================');
    console.log(userAccountData);
    console.log('====================================');
    var itemUser = {
      phone: userAccountData?.item?.phone,
      _id: userAccountData?.item?._id,
      image: userAccountData?.item?.image,
      userName: userAccountData?.item?.userName,
      createdAt: userAccountData?.item?.createdAt,
    };
    var myProjects = true;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Detail', {item, myProjects, itemUser})
        }
        style={{
          backgroundColor: '#fff',
          ...Shadows.shadow5,
          width: width * 0.94,
          height: 250,
          borderRadius: 5,
          elevation: 5,
          marginTop: 12,
          alignSelf: 'center',
          // alignItems: 'center',
          // marginLeft: 6,
        }}>
        <View
          style={{
            width: '100%',
            height: 140,
            borderRadius: 5,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            resizeMode="cover"
            source={image ?  {uri: `http://173.249.10.7:8066/${image}`} : require('../../assets/bgw.jpg')}
            style={{width: '90%', height: '100%', borderRadius: 5}}
          />
        </View>

        <View
          style={{
            marginHorizontal: 20,
          }}>
          <Text style={{color: '#000', fontSize: 18, fontWeight: '700'}}>
            {Location}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '500',
              marginTop: 5,
            }}>
            {plotCategory ? `Plot Category: ${plotCategory}` : ''}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '500',
              marginTop: 5,
            }}>
            Posted: {createdAt?.slice(0, 10)}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // justifyContent: 'space-between',

              flex: 1,
            }}>
            {/* <TouchableOpacity key={index} activeOpacity={0.6} style={{}}>
              <FontAwesome name="heart" size={20} color="red" />
            </TouchableOpacity> */}
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <EvilIcons name="eye" size={30} color="#000" />

              <Text>100 Views</Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: width,
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
          <AntDesign name="left" size={15} color="#000" />
        </TouchableOpacity>
        {/* <Entypo name="dots-three-vertical" size={15} color="#000" /> */}
      </View>

      <View
        style={{
          width: width,
          flexDirection: 'row',
          marginTop: 20,
          padding: 20,
        }}>
        <View style={{width: width / 4.5, justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', userAccountData?.item?._id)
            }>
            <Image
              source={
                userAccountData?.item?.image
                  ? {
                      uri: `http://173.249.10.7:8066/${userAccountData?.item?.image}`,
                    }
                  : require('../../assets/profile.jpg')
              }
              style={{height: 90, width: 90, borderRadius: 50}}
            />
          </TouchableOpacity>
        </View>

        <View style={{width: width / 2, marginHorizontal: 20}}>
          <Text
            style={{
              color: '#000',
              fontSize: 21,
              fontWeight: '900',
              marginTop: 10,
            }}>
            {userAccountData?.item?.userName}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: '700',
            }}>
            {userAccountData?.item?.role == 'consultant' &&
              userAccountData?.item?.stateName}

            {userAccountData?.item?.role == 'builder' &&
              userAccountData?.item?.firmName}

            {userAccountData?.item?.role == 'seller' && 'Seller'}
          </Text>

          <Text style={{color: 'grey', fontSize: 15, fontWeight: '700'}}>
            Member Since {userAccountData?.item?.createdAt?.slice(0, 10)}
          </Text>
        </View>

        <Divider style={{height: 1, backgroundColor: 'grey', marginTop: 10}} />
      </View>

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
          <Text
            style={{
              fontSize: 19,
              fontWeight: '600',
              color: '#000',
              marginLeft: 10,
            }}>
            {'Projects'}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          {/* {userProjects ||
          (userProjects && (
            <FlatList
              contentContainerStyle={{paddingBottom: ' 20%'}}
              numColumns={2}
              ListEmptyComponent={
                <Text
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                  }}>
                  {' '}
                  No Data found
                </Text>
              }
              showsVerticalScrollIndicator={false}
              // keyExtractor={Linkers.id}
              data={ userProjects }
              renderItem={data}
            />
          ))} */}
          <ScrollView contentContainerStyle={{paddingBottom: '20%'}}>
            <View style={{}}>
              {userProjects?.length ? (
                userProjects?.map((item, index) => (
                  <House
                    index={index}
                    item={item}
                    image={item?.plotImage?.length ? item?.plotImage[0] : null}
                    name={item?.plotTitle}
                    Location={item?.area}
                    Price={item?.price}
                    createdAt={item?.createdAt}
                    plotCategory={item?.plotCategory}
                  />
                ))
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginVertical: 20,
                    justifyContent: 'center',
                    fontSize: 18,
                    color: 'black',
                  }}>
                  {' '}
                  No Data Found
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
