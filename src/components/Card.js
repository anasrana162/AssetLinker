import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors, WP, Shadows } from '../config';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Common from '../config';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import GridImageView from 'react-native-grid-image-viewer';
import FbGrid from 'react-native-fb-image-grid';
import {
  getAllFavList,
  getratings,
  makePlotfavourite,
  postRating,
  patchViews
} from '../redux1/APIs';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
const Card = ({
  item,
  type,
  image,
  title,
  price,
  location,
  des,
  userName,
  userRole,
  userProfile,
  noOfComment,
  plotId,
  role,
  myProjects = false,
  favPlotsList2,
  itemUser,
  MsId,
  createdAt,
  isFavourite,
  userId,
  views
}) => {
  const [heart, setHeart] = useState(isFavourite);
  const userActive = useSelector(state => state?.reducer?.user);
  const navigation = useNavigation();
  var lengthImages = image?.length;
  var imageSet = [];
  for (var i = 0; i < lengthImages; i++) {
    imageSet.push(`http://173.249.10.7:8066/${image[i]}`);
  }
  const onPress = (url, index, event) => { };

  const get = async () => {
    const data = await getratings(plotId);
    setRating(data?.rating);
  };
  // console.log('====================================');
  // console.log("THIS IS CARD OF PLOTS");
  // console.log('====================================');

  useEffect(() => {
    get();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [defaultRating, setDefaultRating] = useState(1);
  const [rating, setRating] = useState();

  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const startFilled = require('../../assets/star_filled.png');
  const startCorner = require('../../assets/star_corner.png');
  const functionSubmitRating = () => {
    setModalVisible(!modalVisible);
    if (userId !== userActive?._id) {

      postRating(userActive?._id, defaultRating, plotId);
    }
  };
  // console.log("item Cards", item)
  return (
    <TouchableOpacity
      key={item?.Plots}
      activeOpacity={0.8}
      onPress={async () => {
        await patchViews(plotId)
        navigation.navigate('Detail', { item: item?.Plots, myProjects, itemUser, MsId, userName, userRole }
        )

      }
      }
      style={{
        ...Shadows.shadow5,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: "hidden",
        width: width / 2.2
      }}>
      {/* <GridImageView data={imageSet} /> */}
      {/* <FbGrid
         style={{height:'60%'}}
            images={imageSet}
            onPress={onPress}
          />  */}
      <Image
        source={image?.length ? { uri: `http://173.249.10.7:8066/${image[0]}` } : require('../../assets/bgw.jpg')}
        style={{
          width: "100%",//WP('90%'),
          height: 150,
          // borderRadius: 10,
        }}
      />

      <View style={{ width: "95%", alignSelf: "center" }}>

        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 10,
            fontSize: 14,
            color: Colors.black,
          }}>
          {type}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontSize: 12,
            color: Colors.black,
          }}>
          Plot Category: {title}
        </Text>
        <Text
          style={{
           // marginTop: 5,
            fontSize: 13,
            color: Colors.black,
          }}>
          {des}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <EvilIcons name="location" size={15} color="#000" />
            <Text style={{ color: Colors.black, fontSize: 12 }}>{location}</Text>
          </View>

          <Text style={{ color: Colors.black, fontWeight: '600', fontSize: 12, marginRight: 10 }}>
            {price && price !== ' ' ? `Price:${price}` : ''}
          </Text>
        </View>
        <Text
          style={{ color: Colors.black, marginHorizontal: 5, fontWeight: '600', fontSize: 12,marginBottom:10 }}>
          Posted: {createdAt?.slice(0, 10)}
        </Text>

        {/* {!myProjects ? (
          <View style={{ marginVertical: 10 }}></View>
        ) : (
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Image
              source={
                userProfile
                  ? { uri: `http://173.249.10.7:8066/${userProfile}` }
                  : require('../../assets/profile.jpg')
              }
              style={{ width: 45, height: 45, borderRadius: 100 }}
            />
            <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
              {(userRole == 'consultant' || userRole == 'builder') && <Text style={{ fontWeight: '700', fontSize: 20, color: 'black' }}>
                {userRole == 'consultant' &&
                  item?.userPosted?.stateName}

                {userRole == 'builder' &&
                  item?.userPosted?.firmName}
              </Text>}
              <Text style={{ marginBottom: userRole == 'seller' ? 6 : 0, fontWeight: '400', fontSize: 16, color: 'black' }}>
                {userName}
              </Text>
              <Text style={{ marginBottom: userRole == 'seller' ? 2 : 0, fontWeight: '700', fontSize: 14, color: 'black' }}>
                MSID: {MsId}
              </Text>
              {userRole != undefined && <TouchableOpacity
                onPress={() => navigation.navigate('UserProfile')}
                style={{
                  backgroundColor: Colors.primary,
                  // width: 70,
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 6,
                  marginTop: 10
                }}>
                {console.log("userRole", userRole)}
                <Text
                  style={{ color: Colors.white, fontWeight: '600', fontSize: 15 }}>
                  {userRole}
                </Text>
              </TouchableOpacity>}
            </View>
          </View>
        )} */}
      </View>


      <View
        style={{ borderWidth: 0.5, borderColor: 'lightgrey', width: '100%' }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          paddingTop:5,
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={async () => {
            setHeart(!heart);
            await makePlotfavourite(item?.Plots?._id, item?.Plots?.role, heart);
          }}>
          <FontAwesome name="heart" size={20} color={heart ? 'red' : 'grey'} />

          {/* <FontAwesome name="heart" size={20} color={isFavourite && isFavourite==true? 'red' : 'grey'} /> */}

          {/* <Text style={{ marginHorizontal: 5, color: 'black' }}>Favourite</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center',}}>
          <EvilIcons name="eye" size={30} color="#000" />
          <Text style={{ color: 'black' }}>
            {views == 0 ? null : views}
            {/* View */}
          </Text>
        </TouchableOpacity>
        <Pressable
         
          onPress={() => {
            userId == userActive?._id ? null : setModalVisible(true);
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <EvilIcons name="star" size={25} color="#000" />
            <Text style={{ color: 'black' }}>{rating} </Text>
            {/* Rating */}
          </View>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}

          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              // style={{flexDirection:'row', marginLeft:'40%',justifyContent:'flex-end',  width:150}}
              >

                <EvilIcons name="close" size={20} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}> Rating</Text>


              <View style={{ flexDirection: 'row' }}>
                {maxRating.map(item => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={item}
                    onPress={() => setDefaultRating(item)}
                    style={{ flexDirection: 'row' }}>
                    <Image
                      source={item <= defaultRating ? startFilled : startCorner}
                      style={styles.ratingImage}
                    />
                  </TouchableOpacity>
                ))}
              </View>

              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                {defaultRating + ' / ' + maxRating.length}
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => functionSubmitRating()}>
                <Text style={styles.textStyle}> Submit </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    // height: 200,
    width: 230,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'white',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  ratingImage: {
    height: 30,
    width: 30,
  },
});
