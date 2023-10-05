import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {Avatar} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {Colors} from '../config';


const {width, height} = Dimensions.get('window');
const AccountCard = ({item,detail,img,designation,name, state,userData,MsId,id}) => {
console.log(item,"ITEM++>><><");
    const navigation = useNavigation(); 
     
    return (
      <View>
     

    <View
      style={{
        flexDirection: 'row',
        // marginTop: 10,
        flex:1,
        justifyContent:'space-around',
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: width / 4}}>
        <TouchableOpacity onPress={()=> navigation.navigate("Profile",id)}>
        <Image
            style={{width: 80, height: 80, borderRadius: 100}}
            source={  img?   {uri: `http://173.249.10.7:8066/${img}`} : require('../../assets/profile.jpg')}
          />
        </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'center'}}>
          {
            item?.item?.role=='seller' ? null : 
<Text style={{fontSize: 20, fontWeight: '500', color: '#000'}}>
          {(item?.item?.stateName!==null || item?.item?.stateName=='null') ? item?.item?.stateName : item?.item?.firmName}
          </Text>
          }
          
          <Text style={{fontSize: 17, fontWeight: item?.item?.role=='seller' ?'600' : '400', color: '#000' ,marginBottom:item?.item?.role=='seller' && 15}}>
          {name? name : "User"}
          </Text>
          <TouchableOpacity
            // onPress={() => navigation.navigate('EditProfile')}
            style={{
              backgroundColor: Colors.primary,
              width: 100,
              alignItems: 'center',
              paddingVertical: 4,
              borderRadius: 5,
              paddingHorizontal: 10,
            }}>
            <Text style={{color: Colors.white, fontSize: 14}}>{designation}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#000', textDecorationLine: 'underline' }}>View and edit Profile</Text>
      </TouchableOpacity> */}
        </View>
      </View>
      
        <View style={{justifyContent: 'space-evenly'}}>
        <Text style={{color: 'black', fontWeight: '700'}}>MS# {MsId}</Text>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} 
        onPress={()=> navigation.navigate('UserProfile', item,userData)}
        >
          <Text style={{color: Colors.primary}}> View Projects</Text>
          <MaterialIcons name="arrow-forward-ios" size={15} color={'black'} />
        </TouchableOpacity>

        {/* //change after client feedback 
        {
            (detail=='builder' || item?.item?.designation=='Consultant') && 

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} 
        onPress={()=> navigation.navigate('UserProfile', item)}
        >
          <Text style={{color: Colors.primary}}> View Projects</Text>
          <MaterialIcons name="arrow-forward-ios" size={15} color={'black'} />
        </TouchableOpacity>
        } */}

      </View>
     
     
    </View>
    <Divider
              style={{
                height: 1,
                marginHorizontal: 10,
                backgroundColor: 'lightgrey',
                marginVertical:10,
              }}
            />
      </View>
  );
};

export default AccountCard;

const styles = StyleSheet.create({});
