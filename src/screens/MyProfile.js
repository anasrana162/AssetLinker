import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, HP, NavService, size, WP} from '../config';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getMyProjects} from '../redux1/APIs';
import Card from '../components/Card';

const MyProfile = () => {
  const userActive = useSelector(state => state?.reducer?.user);
  const navigation = useNavigation();

  const [myAvailableProjects, setmyAvailableProjects] = useState();

  const dataList2 = [{text: 'abcd'}];
  const get = async () => {
    const data = await getMyProjects();
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    setmyAvailableProjects(data);
  };

  useEffect(() => {
    get();
  }, []);
  const data = ({item, index}) => {
    console.log('====================================');
    console.log(item);
    console.log('====================================');
    return (
      <View style={{marginHorizontal: 10}}>
        <Card
        //initialy was true 
        userId={item?.userPosted?._id}
          myProjects={false}
          index={index}
          item={item}
          image={item?.plotImage}
          title={item?.plotTitle}
          location={item?.area}
          price={item?.price}
          des={item?.plotDescription}
          userName={item?.userPosted?.userName}
          userRole={item?.userPosted?.role}
          userProfile={item?.userPosted?.image}
          noOfComment={item?.noOfComment}
          plotId={item?._id}
          role={item?.role}
          createdAt={item?.createdAt}
          MsId={item?.userPosted?.MSID}

        />
      </View>
    );
  };
  return (
    <>
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={15} color="#000" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() =>
            updateUserDetails(
              userName,
              phone,
              StateName,
              firmName,
              area,
              landline,
              image,
              mime,
            )
          }></TouchableOpacity> */}
      </View>

      <FlatList
        ListEmptyComponent={
          <Text style={{alignSelf: 'center', fontSize: 18, color: 'black'}}>
            No Data found
          </Text>
        }
        ListHeaderComponent={
          <>
            <View
              style={{
                marginVertical: 15,
                marginHorizontal: 5,
              }}>
              <View style={styles.img_Container}>
                <Image
                  style={styles.img}
                  source={
                    userActive?.image
                      ? {uri: `http://173.249.10.7:8066/${userActive?.image}`}
                      : require('../../assets/profile.jpg')
                  }
                />
              </View>
              <View style={styles.info_container}>
                <Text
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    fontSize: size.h4,
                    fontWeight: '700',
                    marginVertical: 10,
                    color: Colors.black,
                  }}>
                  {userActive?.userName}
                </Text>

                <View style={{alignSelf: 'center', marginBottom: 5}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Entypo name="phone" size={18} color={Colors.primary} />
                    <Text style={{color: 'black', fontSize: 16}}>
                      {userActive?.phone}
                    </Text>
                  </View>
                  {userActive?.area && userActive?.role!=='seller' && (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Entypo
                        name="location-pin"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={{color: 'black', fontSize: 16}}>
                        {userActive?.area}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[styles.btn, {marginHorizontal: 10}]}
                    onPress={() => NavService.navigate('EditProfile')}>
                    <Text style={styles.txt}>Edit Profile</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.hr} />
          </>
        }
        contentContainerStyle={{paddingBottom: 20}}
        data={myAvailableProjects}
        renderItem={data}
      />
    </>
  );
};

export default MyProfile;
const styles = StyleSheet.create({
  img_Container: {
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: 100,
    borderColor: Colors?.primary,
    borderWidth: 3,
    width: WP('35%'),
    height: WP('35%'),
  },
  btn: {
    width:WP('35'),
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors?.blue,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#96d2f2',
    alignItems:'center'
  },
  txt: {
    color: Colors?.primary,
    fontSize: size.normal,
    fontWeight: '800',
  },
  info_container: {
    alignSelf: 'center',
  },
  hrMid: {
    borderRightColor: Colors?.togglebg,
    height: HP('6%'),
    borderRightWidth: 2,
  },
  hr: {
    marginVertical: 20,
    borderTopColor: Colors?.togglebg,
    width: WP('100%'),
    borderTopWidth: 1,
  },
  txts: {
    color: Colors?.color1,
    fontSize: 25,
  },
  txtHeading: {
    fontSize: 18,
    color: Colors?.black,
    fontWeight: '600',
  },
  des: {
    fontSize: size.small,
    color: Colors?.black,
    marginHorizontal: 5,
  },
  img_icon: {
    width: 25,
    height: 25,
  },
  btnDateTime: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
    borderWidth: 1.5,
    borderColor: Colors?.black,
    borderRadius: 30,
    justifyContent: 'space-between',

    height: 60,
  },
});
