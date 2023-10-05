import {
  Text,
  View,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Linkers } from '../Data/AssetsData';
import LocationView from '../components/LocationView';
import MyCarousel from '../components/MyCarousel';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '../components/Slider';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import TextTicker from 'react-native-text-ticker';
import Card from '../components/Card';
import Slideshow from 'react-native-image-slider-show';
import { getAllFavList, getPlotData, postConversationId } from '../redux1/APIs';
import { loaderStop } from '../redux1/actions';
import { HP } from '../config';
import { useSelector } from 'react-redux';
import { Colors, Shadows } from '../config';
const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const images = [
    { url: require('../../assets/property_images/B1.jpg') },
    {
      url: require('../../assets/property_images/B3.jpg'),
    },
    {
      url: require('../../assets/property_images/B5.jpg'),
    },
  ];

  const navigate = useNavigation();
  const userActive = useSelector(({ reducer: { user } }) => user);

  const [selectHeart, setSelectHeart] = useState();
  const [plotAvailabledata, setPlotAvailabledata] = useState();
  const [plotSearchdata, setPlotSearchdata] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [heart, setHeart] = useState();

  const [favPlotsList, setfavPlotList] = useState();
  const [favPlotsList2, setfavPlotList2] = useState();
  const [heartFavourites, setheartFavourites] = useState();
  var favlistingArr = []

  const [position, setPosition] = useState(0);
  const get = async () => {
    const data = await getPlotData();
    setPlotAvailabledata(data?.newArr);

  };
  const onRefresh = () => {
    setIsRefreshing(true);
    get();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };
  const gets = async () => {
    const datafav = await getAllFavList();
    setfavPlotList(datafav?.userfavlist);
    for (var i = 0; i < favPlotsList?.length; i++) {
      setfavPlotList2(favPlotsList);
    }
  };

  useEffect(() => {
    get();

    gets();
    loaderStop();
  }, []);

  useEffect(() => {
    const focusListner = navigation.addListener('focus', async () => {
      get();
      gets();
    });
    return focusListner;
  }, []);
  useEffect(() => {
    const toggle = setInterval(() => {
      setPosition(position === images.length - 1 ? 0 : position + 1);
    }, 2000);

    return () => clearInterval(toggle);
  });
  // console.log(plotAvailabledata); 
  // const House = ({ index, item, image, name, Location, Price }) => {
  //   console.log(index);
  //   return (
  //     <Text>Seema</Text>
  //     // <TouchableOpacity
  //     //   activeOpacity={0.6}
  //     //   onPress={() => navigation.navigate('Detail', {item})}
  //     //   style={{
  //     //     backgroundColor: '#fff',
  //     //     width: width / 2.1,
  //     //     height: 240,
  //     //     borderRadius: 5,
  //     //     elevation: 5,
  //     //     marginTop: 12,
  //     //     alignItems: 'center',
  //     //     marginLeft: 6,
  //     //   }}>
  //     //   <View
  //     //     style={{
  //     //       width: '100%',
  //     //       height: '50%',
  //     //       borderRadius: 5,
  //     //       overflow: 'hidden',
  //     //       justifyContent: 'center',
  //     //       alignItems: 'center',
  //     //     }}>
  //     //     <Image
  //     //       source={{uri: image}}
  //     //       style={{width: '90%', height: '90%', borderRadius: 5}}
  //     //     />
  //     //   </View>

  //     //   <View
  //     //     style={{
  //     //       flexDirection: 'column',
  //     //       width: '100%',
  //     //       height: '50%',
  //     //       borderRadius: 5,
  //     //       padding: 10,
  //     //     }}>
  //     //     <Text style={{color: '#000', fontSize: 16, fontWeight: '600'}}>
  //     //       {name}
  //     //     </Text>
  //     //     <Text style={{color: '#000', fontSize: 13, fontWeight: '400'}}>
  //     //       {Location}
  //     //     </Text>
  //     //     <Text
  //     //       style={{
  //     //         color: '#000',
  //     //         fontSize: 13,
  //     //         fontWeight: '500',
  //     //         marginTop: 5,
  //     //       }}>
  //     //       {Price}
  //     //     </Text>
  //     //     <View
  //     //       style={{
  //     //         flexDirection: 'row',
  //     //         justifyContent: 'flex-end',
  //     //         marginTop: 10,
  //     //       }}>
  //     //       <TouchableOpacity
  //     //         key={index}
  //     //         activeOpacity={0.6}
  //     //         style={{marginLeft: 50}}
  //     //         onPress={() => setSelectHeart(!selectHeart)}>
  //     //         {selectHeart ? (
  //     //           <EvilIcons name="heart" size={30} color="#000" />
  //     //         ) : (
  //     //           <EvilIcons name="heart" size={30} color="#000" />
  //     //         )}
  //     //         {/* <FontAwesome name="heart" size={22} color="#000" /> */}
  //     //       </TouchableOpacity>
  //     //     </View>
  //     //   </View>
  //     // </TouchableOpacity>
  //   );
  // };

  const data = ({ item, index }) => {
    // console.log('============ssssss========================');
    // console.log(item);
    // console.log('====================================');
    return (
      <View
        style={{ marginHorizontal: 5 }}
      >
        <TouchableOpacity onPress={async () => {
          const conversation_id = await postConversationId(userActive?._id, item?.Plots?.userId, item?.Plots?._id)
          console.log('====================================');
          console.log(conversation_id);
          console.log('===============cob=====================');
          setTimeout(() => {
            navigation.navigate('Messages', { plotData: item?.Plots, conversation_id: conversation_id })

          }, 500);

        }}>
          <Text>Inbox</Text>
        </TouchableOpacity>


        {/* <House
          index={index}
          item={item?.Plots}
          image={item?.Plots?.plotImage[0]}
          name={item?.Plots?.plotTitle}
          Location={item?.Plots?.area}
          Price={item?.Plots?.price}
          itemUser={item?.Plots?.userPosted}
          createdAt={item?.Plots?.createdAt}
        /> */}

        <Card
          index={index}
          item={item}
          itemUser={item?.userPosted}
          image={item?.Plots?.plotImage}
          title={item?.Plots?.plotCategory}
          type={item?.Plots?.plotType}

          location={item?.Plots?.area}
          price={item?.Plots?.price}
          des={item?.Plots?.plotDescription}
          userName={item?.userPosted?.userName}
          userId={item?.userPosted?._id}
          userRole={item?.userPosted?.role}
          userProfile={item?.userPosted?.image}
          noOfComment={item?.Plots?.noOfComment}
          plotId={item?.Plots?._id}
          role={item?.Plots?.role}
          favPlotsList2={favPlotsList2}
          MsId={item?.userPosted?.MSID}
          createdAt={item?.Plots?.createdAt}
          isFavourite={item?.Plots?.isFavourited}
          views={item?.Plots?.views}
          myProjects={true}
        />
      </View>
    );
  };

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

          width: width / 2.3,
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
              <FontAwesome name="heart-o" size={20} color="black" />
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
  // const data = ({ item, index }) => {
  //   console.log('============ssssss========================');
  //   console.log(item);
  //   console.log('====================================');
  //   return (
  //     <House
  //       index={index}
  //       item={item}
  //       image={item.plotImage[0]}
  //       name={item.plotTitle}
  //       Location={item.area}
  //       Price={item.price}
  //       itemUser={item?.userPosted}
  //       createdAt={item?.createdAt}
  //     />
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="#023661" />

      <View
        style={{
          width: width,
          height: 50,
          backgroundColor: '#023661',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text style={{ color: '#fff', fontSize: 25, fontWeight: '600' }}>
          Assets Linkers
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigate.navigate('PropertySearch')}>
          <EvilIcons name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>


      <LocationView setPlotSearchdata={setPlotSearchdata} />

      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Feather name="book-open" size={20} color="black" style={{}} />
        <TouchableOpacity
          style={{ marginHorizontal: 8, }}
          activeOpacity={0.7}
          onPress={() =>
            Linking.openURL(
              `https://assetslinkers.com`,
            )
          }>
          <TextTicker
            style={{ fontSize: 15, color: 'black' }}
            duration={8000}
            loop
            repeatSpacer={50}
            marqueeDelay={1000}
            scrollSpeed={5000}>
            Super long piece of text is long. The quick brown fox jumps over the
            lazy dog.
          </TextTicker>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'center', zIndex: 10, width: "100%", flex: 1, alignSelf: "center", marginLeft: 10 }}>
        <FlatList
          numColumns={2}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }

          ListHeaderComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
                //height: 280,
                alignSelf: 'center',
                paddingTop: 5,
              }}>
              <Slideshow position={position} dataSource={images} />
            </View>
          }
          ListEmptyComponent={
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                marginVertical: 20,
                alignSelf: 'center',
              }}>
              {' '}
              No Data Found
            </Text>
          }
          contentContainerStyle={{ paddingBottom: '40%' }}
          showsVerticalScrollIndicator={false}
          // keyExtractor={Linkers.id}
          data={plotSearchdata?.length ? plotSearchdata : plotAvailabledata}
          renderItem={data}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default Home;
