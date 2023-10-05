import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {Divider, Searchbar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {color} from 'react-native-reanimated';
import {getFilterdByChoice, getSearchbarFilter} from '../redux1/APIs';
import Card from '../components/Card';
const PropertySearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [AreaSelect, setAreaSelect] = useState('');
  const [plotType, setplotType] = useState('');

  const [CategorySelect, setCategorySelect] = useState('');
  const [searchBySelect, setSearchBySelect] = useState('');
  const [Price, setPrice] = useState('');

  const [isVisible, setIsVisible] = useState(false);
  const [dataOfFilterd, setdataOfFilterd] = useState();
  const [dataOfFilterdItems, setdataOfFilterdItems] = useState();

  const navigation = useNavigation();
  const filterDataSend = async () => {
    setIsVisible(false);
    const dataRecieved = await getFilterdByChoice(
      AreaSelect,
      CategorySelect,
      plotType,
      Price,
      searchBySelect,
    );
    setdataOfFilterd(dataRecieved);

    const serchbarFiltered = await getSearchbarFilter(searchQuery);
    setdataOfFilterdItems(serchbarFiltered);
    setAreaSelect('');
    setCategorySelect('');
    setSearchBySelect('');
    setPrice('');
    setplotType('');
  };

  const filterDataSends = async () => {
    const serchbarFiltered = await getSearchbarFilter(searchQuery);
    setdataOfFilterdItems(serchbarFiltered);
    setAreaSelect('');
    setCategorySelect('');
    setSearchBySelect('');
    setPrice('');
    setplotType('');
  };
  const data = ({item, index}) => {
    return (
      <View style={{marginBottom: 10}}>
        <Card
          index={index}
          item={item?.Plots}
          image={item?.Plots?.plotImage}
          title={item?.Plots?.plotTitle}
          location={item?.Plots?.area}
          price={item?.Plots?.price}
          des={item?.Plots?.plotDescription}
          userName={item?.userPosted?.userName}
          userRole={item?.userPosted?.role}
          userProfile={item?.userPosted?.image}
          noOfComment={item?.Plots?.noOfComment}
          plotId={item?.Plots?._id}
          role={item?.Plots?.role}
          MsId={item?.userPosted?.MSID}
          createdAt={item?.Plots?.createdAt}
          itemUser={item?.userPosted}
         views={item?.Plots?.views}

        />
      </View>
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
          padding: 15,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={25} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '600',
            color: '#000',
            marginLeft: 10,
          }}>
          Property Search
        </Text>
      </View>

      <View style={{flexDirection: 'row', height: 42, marginTop: 20}}>
        <Searchbar
          style={{flex: 1, marginHorizontal: 5}}
          placeholder="Search.."
          placeholderTextColor={'black'}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={() => filterDataSends()}
          // onEndEditing={()=>filterDataSends()}
        />
        <TouchableOpacity
          style={{marginHorizontal: 6}}
          onPress={() => setIsVisible(!isVisible)}>
          <Ionicons name="filter" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <Modal isVisible={isVisible}>
        <View
          style={{
            backgroundColor: 'white',
            paddingHorizontal: 10,
            borderRadius: 12,
          }}>
          <TouchableOpacity
            onPress={() => setIsVisible(false)}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingTop: 10,
            }}>
            <Entypo name="cross" size={30} color="#000" />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
              marginVertical: 5,
            }}>
            Search By Area
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => setAreaSelect('Bahira Town')}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 30,
                // width: 90,
                paddingHorizontal: 7,
                backgroundColor:
                  AreaSelect == 'Bahira Town' ? '#144272' : '#2C74B3',
                borderRadius: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                Bahria Town
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAreaSelect('DHA')}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                marginHorizontal: 6,
                justifyContent: 'center',
                height: 30,
                paddingHorizontal: 7,

                // width: 80,
                backgroundColor: AreaSelect == 'DHA' ? '#144272' : '#2C74B3',

                borderRadius: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                DHA
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setAreaSelect('DHA city')}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 30,
                // width: 90,
                paddingHorizontal: 7,
                backgroundColor:
                  AreaSelect == 'DHA city' ? '#144272' : '#2C74B3',

                borderRadius: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                DHA city
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAreaSelect('Clifton')}
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 30,
                // width: 80,
                paddingHorizontal: 7,

                marginHorizontal: 6,

                backgroundColor:
                  AreaSelect == 'Clifton' ? '#144272' : '#2C74B3',

                borderRadius: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                Clifton
              </Text>
            </TouchableOpacity>
          </View>
          <Divider
            style={{height: 1, backgroundColor: 'grey', marginTop: 20}}
          />

          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
                marginVertical: 10,
              }}>
              Search By Category
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setCategorySelect('Commercial')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 30,
                  paddingHorizontal: 10,
                  backgroundColor:
                    CategorySelect == 'Commercial' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  Commercial
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCategorySelect('Residential')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginHorizontal: 6,
                  justifyContent: 'center',
                  height: 30,
                  paddingHorizontal: 10,

                  backgroundColor:
                    CategorySelect == 'Residential' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  Residential
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCategorySelect('Plot')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 30,
                  paddingHorizontal: 10,

                  backgroundColor:
                    CategorySelect == 'Plot' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  Plot
                </Text>
              </TouchableOpacity>
            </View>

            <Divider
              style={{height: 1, backgroundColor: 'grey', marginTop: 20}}
            />

            <View style={{marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                  marginVertical: 10,
                }}>
                Search By Rent/Sell
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setSearchBySelect('Rent')}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      searchBySelect == 'Rent' ? '#144272' : '#2C74B3',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                    Rent
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSearchBySelect('Sell')}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      searchBySelect == 'Sell' ? '#144272' : '#2C74B3',
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                    Sell
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{height: 1, backgroundColor: 'grey', marginTop: 20}}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
                marginVertical: 5,
              }}>
              Search By Plot Type
            </Text>
            <View>
              <TextInput
                placeholder="Search by plot type "
                keyboardType="number-pad"
                placeholderTextColor={'black'}
                onChangeText={text => setPrice(text)}
                style={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                  width: '50%',
                  borderColor: 'grey',
                  borderWidth: 1,
                  marginHorizontal: 10,
                  height: 40,
                  color: 'black',
                  borderRadius: 12,
                }}
              />
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setplotType('Houses')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 30,
                  width: 90,
                  backgroundColor: plotType == 'Houses' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  House
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setplotType('Office')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginHorizontal: 6,
                  justifyContent: 'center',
                  height: 30,
                  width: 80,
                  backgroundColor: plotType == 'Office' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  Office
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setplotType('Apartment')}
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  height: 30,
                  width: 90,
                  backgroundColor:
                    plotType == 'Apartment' ? '#144272' : '#2C74B3',
                  borderRadius: 5,
                }}>
                <Text
                  style={{color: '#fff', fontSize: 15, alignSelf: 'center'}}>
                  Apartment
                </Text>
              </TouchableOpacity>
            </View> */}
            <Divider
              style={{height: 1, backgroundColor: 'grey', marginTop: 20}}
            />
          </View>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
            Search By Price
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
              }}>
              {/* <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  marginVertical: 10,
                  fontWeight: '600',
                }}>
                Maximum Price
              </Text> */}
              <TextInput
                placeholder="Maximum Price"
                keyboardType="number-pad"
                placeholderTextColor={'black'}
                onChangeText={text => setPrice(text)}
                style={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                  width: '50%',
                  borderColor: 'grey',
                  borderWidth: 1,
                  marginHorizontal: 10,
                  height: 40,
                  color: 'black',
                  borderRadius: 12,
                }}
              />
            </View>
          </View>
          <Divider
            style={{height: 1, backgroundColor: 'grey', marginTop: 15}}
          />

          <TouchableOpacity
            onPress={() => filterDataSend()}
            style={{
              marginVertical: 20,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              height: 40,
              width: 200,
              backgroundColor: '#2C74B3',
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                alignSelf: 'center',
                fontWeight: '600',
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View
        style={{marginVertical: 10, marginHorizontal: 10, marginBottom: 20}}>
        <FlatList
          // numColumns={2}

          contentContainerStyle={{paddingBottom: '20%'}}
          showsVerticalScrollIndicator={false}
          // keyExtractor={Linkers.id}
          data={searchQuery ? dataOfFilterdItems : dataOfFilterd}
          renderItem={data}
        />
      </View>
    </View>
  );
};

export default PropertySearch;
