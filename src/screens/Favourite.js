import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Linkers } from '../Data/AssetsData';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FavListDisplay, makePlotfavourite } from '../redux1/APIs';
import { Colors, Shadows } from '../config';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const Favourite = ({ title, userProjects }) => {
  const navigation = useNavigation();
  const userActive = useSelector(state => state?.reducer?.user);

  const House = ({
    index,
    item,
    image,
    name,
    Location,
    Price,
    itemUser,
    createdAt,
  }) => {
    console.log('==============ghghg======================');
    console.log(itemUser);
    console.log('====================================');
    var myProjects = false;
    var hiddenBottom = true
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate('Detail', { item, myProjects, itemUser, hiddenBottom })
        }
        style={{
          backgroundColor: '#fff',
          ...Shadows.shadow5,

          width: width / 2.1,
          height: 240,
          borderRadius: 5,
          elevation: 5,
          marginTop: 12,
          alignItems: 'center',
          marginLeft: 6,
        }}>
        <View
          style={{
            width: '100%',
            height: '50%',
            borderRadius: 5,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: `http://173.249.10.7:8066/${image}` }}
            style={{ width: '90%', height: '90%', borderRadius: 5 }}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '50%',
            borderRadius: 5,
            padding: 6,
          }}>
          <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
            {name}
          </Text>
          <Text style={{ color: '#000', fontSize: 13, fontWeight: '400' }}>
            {Location}
          </Text>
          <Text
            style={{ color: Colors.timerColor, fontSize: 10, fontWeight: '600' }}>
            Posted: {createdAt?.slice(0, 10)}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 13,
              fontWeight: '500',
              marginTop: 5,
            }}>
            {Price}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              // justifyContent: 'space-between',
              // marginTop: 10,
              flex: 1,
            }}>
            <TouchableOpacity
              key={index}
              activeOpacity={0.6}
              style={{}}
              onPress={async () => {
                await makePlotfavourite(item?._id, userActive?.role, false);
                await gets();
              }}>
              <FontAwesome name="heart" size={20} color="red" />
            </TouchableOpacity>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <EvilIcons name="eye" size={30} color="#000" />

              <Text>100 Views</Text>
            </View> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const data = ({ item, index }) => {
    console.log('============ssssss========================');
    console.log(item);
    console.log('====================================');
    return (
      <House
        index={index}
        item={item}
        image={item.plotImage[0]}
        name={item.plotTitle}
        Location={item.area}
        Price={item.price}
        itemUser={item?.userPosted}
        createdAt={item?.createdAt}
      />
    );
  };
  const [favList, setFavList] = useState();
  const gets = async () => {
    const data = await FavListDisplay();
    setFavList(data);
  };

  useEffect(() => {
    const focusListner = navigation.addListener('focus', async () => {
      const data = await FavListDisplay();
      console.log("Data in Favourate", data)
      setFavList(data);
    });
    return focusListner;
  }, []);
  useEffect(() => {
    gets();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
          {title ? title : 'MY Favourites'}{' '}
        </Text>
      </View>
      <View style={{ justifyContent: 'center' }}>

        <FlatList
          contentContainerStyle={{ paddingBottom: ' 20%' }}
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
          data={title ? userProjects : favList}
          renderItem={data}
        />

      </View>
    </View>
  );
};

export default Favourite;
