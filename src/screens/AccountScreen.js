import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {Colors} from '../config';
import AccountCard from '../components/AccountCard';
import {getAllUser, getMSIDFilter, getUserByRole} from '../redux1/APIs';
import {SearchBar} from '@rneui/themed';

const {width, height} = Dimensions.get('window');

const AccountScreen = ({route}) => {
  const selectedAccount = route.params;
  const [userData, setUserData] = useState();
  const [userAllData, setUserAllData] = useState();
  const [search, setSearch] = useState('');
  const [searchedData, setSearchedData] = useState('');


  console.log('selectedAccount', userData);
  const navigation = useNavigation();
 
  const getUsers = async () => {
    const data = await getUserByRole(selectedAccount);
    const dataAll = await getAllUser();
    setUserAllData(dataAll);
    setUserData(data);
  };

  const searchFunction = async () => {
    if (search) {
      const data = await getMSIDFilter(search)
      console.log('==================DATA MS ID ==================');
      console.log(data?.availableUser);
      if( data?.availableUser?.length){

        setSearchedData(data?.availableUser)
      }
      console.log('====================================');
     
    }
  };
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     searchFunction()
  //   }, 2000)

  //   return () => clearTimeout(delayDebounceFn)
  // }, [search])

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          width: width,
          height: 60,
          backgroundColor: '#D3D3D3',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
          alignItems: 'center',
        }}
        activeOpacity={0.6}
        onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={15} color="#000" />
      </TouchableOpacity>

      <SearchBar
        value={search}
        onChangeText={text => setSearch(text)}
        onSubmitEditing={()=> searchFunction()}
        placeholder="Type Here..."
        lightTheme={true}
        containerStyle={{backgroundColor: 'white'}}
      />

      <FlatList
        contentContainerStyle={{paddingBottom: ' 10%', marginTop: 20}}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text
            style={{
              color: 'black',
              marginVertical: 20,
              fontSize: 18,
              alignSelf: 'center',
            }}>
            {' '}
            No Data Found
          </Text>
        }
        data={searchedData? searchedData :  selectedAccount == 'all' ? userAllData : userData}
        renderItem={item => (
          <AccountCard
          id={item?.item?._id}
            userData={userData}
            item={item}
            detail={selectedAccount}
            name={item?.item?.userName}
            state={item?.state}
            img={item?.item?.image}
            designation={item?.item?.role}
            MsId={item?.item?.MSID}
          />
        )}
      />
      {/* 
      <TouchableOpacity
        onPress={() => navigation.navigate('About')}
        style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center', padding: 30 }}>
        <View
          activeOpacity={0.4}>
          <Feather name="info" size={20} color={'#000'} />
        </View>

        <View style={{ width: width / 1.7 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>About</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey', }}>About your descriptions</Text>
        </View>

        <AntDesign name="right" size={15} color="#000" />

      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey', marginTop: -10, marginHorizontal: 30 }} />



      <TouchableOpacity
        onPress={() => navigation.navigate('Setting')}
        style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30 }}>
        <View
          activeOpacity={0.4}>
          <AntDesign name="setting" size={25} color={'#000'} />
        </View>

        <View style={{ width: width / 1.7 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>Setting</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey', }}>Privacy and manage account</Text>
        </View>

        <AntDesign name="right" size={15} color="#000" />

      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey', marginTop: -10, marginHorizontal: 30 }} />



      <TouchableOpacity style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30 }}>
        <View
          activeOpacity={0.4}>
          <Image source={require('../../assets/logo.png')} style={{ height: 30, width: 30, borderRadius: 20 }} />
        </View>

        <View style={{ width: width / 1.7 }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>Help & Support</Text>
          <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey', }}>Help Center and Legal Center</Text>
        </View>

        <AntDesign name="right" size={15} color="#000" />

      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey', marginTop: -10, marginHorizontal: 30 }} /> */}
    </View>
  );
};

export default AccountScreen;
