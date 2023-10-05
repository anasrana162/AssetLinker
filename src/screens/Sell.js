import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { createRef, useState, useEffect } from 'react';
import { Divider } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';
import ActionSheet from 'react-native-actions-sheet';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MultipleimagePicker from '../components/MultipleimagePicker';
import Toast from 'react-native-toast-message';
import {
  Image as ImageCompressor,
  Video as VideoCompressor,
} from 'react-native-compressor';
import { Colors } from '../config';
import { plotAdd } from '../redux1/APIs';
import { useSelector } from 'react-redux';


const Sell = () => {

  // States

  const [color, setColor] = useState('');
  const [selectcategory, setSelectCategory] = useState('');
  const [multipleAssetsPost, setMultipleAssetsPost] = useState('');
  const [Bedroom, setBedroom] = useState('');
  const [Bathroom, setBathroom] = useState('');
  const [AreaUnit, setAreaUnit] = useState('');
  const [constructionState, setConstructionstate] = useState('');
  const [area, setArea] = useState('');
  const [furnished, setFurnished] = useState('');
  const [location, setLocation] = useState('');
  const [locationTypes, locationType] = useState('');

  const userActive = useSelector(({ reducer: { user } }) => user);

  const [image, setImage] = useState([]);
  const [mime, setmime] = useState();
  const [rentsale, setRentSale] = useState('');

  const [selectedCategoryType, setselectedCategoryType] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const actionSheetAreaRef = createRef();
  const [selectArea, setSelectArea] = useState('');
  const [selectSubArea, setSelectSubArea] = useState('');

  const [price, setPrice] = useState('');
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [yard, setYard] = useState('');
  const [yardbtn, setYardbtn] = useState('');
  const [marlabtn, setMarlabtn] = useState('');
  const [otherbtn, setOtherbtn] = useState('');
  const [bangalowbtn, setBangalowbtn] = useState('');
  const [formsbtn, setformsbtn] = useState('');
  const [townbtn, setTownbtn] = useState('');
  const [apartmentbtn, setApartmentbtn] = useState('');
  const [pentHousebtn, setpentHousebtn] = useState('');
  const [othersResbtn, setOthersResbtn] = useState('');

  const [bulidingbtn, setBulidingbtn] = useState('');
  const [Shopesbtn, setShopesbtn] = useState('');
  const [offficebtn, setOffficebtn] = useState('');
  const [basementbtn, setBasementbtn] = useState('');
  const [miseNinebtn, setMiseNinebtn] = useState('');
  const [wareHosebtn, setWareHousebtn] = useState('');
  const [pentHousesbtn, setpentHousesbtn] = useState('');
  const [otherCombtn, setOtherCombtn] = useState('');

  const [phase, setPhase] = useState('');

  // Arrays for UI

  const Plots = ['West Open', 'East Open', 'Corner', 'Non Corner'];
  const Shops = ['Corner', 'Non Corner'];

  const PropertyCategories = [
    'Bangalow',
    'FramHouse',
    'TownHouse',
    'Apartment',
    'PentHouse',
    'Others',
  ];

  const PropertyCommercialCategories = [
    'Building',
    'Shop',
    'Office',
    'Basement',
    'Mise.Nine',
    'WareHouse',
    'PentHouse',
    'Others',
  ];

  const listOfArea = [
    {
      name: 'Bahria Town',
    },
    {
      name: 'DHA city',
    },
    {
      name: 'DHA',
    },
    {
      name: 'Clifton',
    },
    {
      name: 'MDA',
    },
  ];

  //FunctionS

  const modalOpener = () => {
    setModalVisible(true);
  };
  const updateImageInGallery = async (path, mime, type) => {
    let multipleImages = [];
    if (multipleAssetsPost?.length < 5) {
      if (Array.isArray(path)) {
        const arr = path?.map(async item => {
          const result = await ImageCompressor.compress(item.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          let imageObject = {
            uri: result,
            name: `image${Date.now()}${item?.filename}.${item?.mime.slice(
              item?.mime.lastIndexOf('/') + 1,
            )}`,
            type: item?.mime,
            tempType: 'photo',
          };
          multipleImages.push(imageObject);
        });
        await Promise.all(arr);
        const mergeImagesWithExistingGalleryAssets = [
          ...multipleAssetsPost,
          ...multipleImages,
        ];
        setMultipleAssetsPost(mergeImagesWithExistingGalleryAssets);
      } else {
        const getExistingGalleryAssets = [...multipleAssetsPost];
        const imageObject = {
          uri: path,
          name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
          type: mime,
          tempType: type,
        };
        getExistingGalleryAssets.push(imageObject);
        setMultipleAssetsPost(getExistingGalleryAssets);
      }
    } else {
      Toast.show({
        text1: 'Images Limit exceed',
        type: 'error',
        visibilityTime: 2000,
      });
    }
  };
  const remmoveAsset = currentProduct => {
    const cloneMultipleAssets = [...multipleAssetsPost];
    const removeTheSelectedAsset = cloneMultipleAssets.filter(
      item => item !== currentProduct,
    );
    setMultipleAssetsPost(removeTheSelectedAsset);
  };
  const submitProperty = () => {
    const imagePlaceholder = [];

    console.log(
      '==============imagePlaceholder======================',
      imagePlaceholder,
    );
    console.log(multipleAssetsPost);
    console.log('====================================');
    if (!selectcategory) {
      Toast.show({
        text1: 'Property Type is required',
        type: 'success',
        visibilityTime: 3000,
      });
    }
    var areaSelected = selectArea?.name;
    console.log(areaSelected, 'areaSelected');
    if (selectcategory == 'Commercial') {
      if (!selectArea) {
        Toast.show({
          text1: 'Location is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (multipleAssetsPost?.length > 5) {
        Toast.show({
          text1: 'Upload only 5 images',
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (multipleAssetsPost?.length > 5) {
        Toast.show({
          text1: 'Upload only 5 images',
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        plotAdd(
          price,
          areaSelected,
          selectedCategoryType ? selectedCategoryType : '',
          furnished ? (furnished == 'Furnished' ? true : false) : false,
          Bedroom ? Bedroom : '',
          Bathroom ? Bathroom : '',
          area ? area : '',
          constructionState ? constructionState : '',
          des,
          title,
          selectcategory ? selectcategory : '',
          multipleAssetsPost ? multipleAssetsPost : imagePlaceholder,
          yard ? yard : '',
          yardbtn ? yardbtn : '',
          phase ? phase : '',
          location ? location : '',
          locationTypes,
          userActive?._id,
          rentsale
        );
        setSelectCategory('');
        setselectedCategoryType('');
        setTitle('');
        setPrice('');
        setDes('');
        setSelectArea('');
        setBathroom('');
        setBedroom('');
        setLocation('');
        setConstructionstate('');
        setYard('');
        setPhase('');
        setMultipleAssetsPost('');
        setFurnished('');
        setAreaUnit('');
        setColor('');
        locationType('');
        setYardbtn('');
      }
    }

    if (selectcategory == 'Residential') {
      if (!selectedCategoryType) {
        Toast.show({
          text1: 'Category is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (!area) {
        Toast.show({
          text1: 'Area unit is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (!constructionState) {
        Toast.show({
          text1: 'Construction Status is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (multipleAssetsPost?.length > 5) {
        Toast.show({
          text1: 'Upload only 5 images',
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        plotAdd(
          price,
          areaSelected,
          selectedCategoryType ? selectedCategoryType : '',
          furnished ? (furnished == 'Furnished' ? true : false) : false,
          Bedroom ? Bedroom : '',
          Bathroom ? Bathroom : '',
          area ? area : '',
          constructionState ? constructionState : '',
          des,
          title,
          selectcategory ? selectcategory : '',
          multipleAssetsPost ? multipleAssetsPost : imagePlaceholder,
          yard ? yard : '',
          yardbtn ? yardbtn : '',
          phase ? phase : '',
          location ? location : '',
          locationTypes,
          userActive?._id,
          rentsale
        );
        setSelectCategory('');
        setselectedCategoryType('');
        setTitle('');
        setPrice('');
        setDes('');
        setSelectArea('');
        setBathroom('');
        setBedroom('');
        setLocation('');
        setConstructionstate('');
        setYard('');
        setPhase('');
        setMultipleAssetsPost('');
        setFurnished('');
        setAreaUnit('');
        setColor('');
        setYardbtn('');
        locationType('');
      }
    }

    if (selectcategory == 'Plot') {
      if (!yard) {
        Toast.show({
          text1: 'Yard is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (!phase) {
        Toast.show({
          text1: 'Phase is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (!location) {
        Toast.show({
          text1: 'Location is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (!selectArea) {
        Toast.show({
          text1: 'Area is require',
          type: 'success',
          visibilityTime: 3000,
        });
      } else if (multipleAssetsPost?.length > 5) {
        Toast.show({
          text1: 'Upload only 5 images',
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        plotAdd(
          price,
          areaSelected,
          selectedCategoryType ? selectedCategoryType : '',
          furnished ? false : false,
          Bedroom ? Bedroom : '',
          Bathroom ? Bathroom : '',
          area ? area : '',
          constructionState ? constructionState : '',
          des,
          title,
          selectcategory ? selectcategory : '',
          multipleAssetsPost ? multipleAssetsPost : imagePlaceholder,
          yard ? yard : '',
          yardbtn ? yardbtn : '',
          phase ? phase : '',
          location ? location : '',
          locationTypes,
          userActive?._id,
          rentsale
        );
        setSelectCategory('');
        setselectedCategoryType('');
        setTitle('');
        setPrice('');
        setDes('');
        setSelectArea('');
        setBathroom('');
        setBedroom('');
        setLocation('');
        setConstructionstate('');
        setYard('');
        setPhase('');
        setMultipleAssetsPost('');
        setFurnished('');
        setAreaUnit('');
        setColor('');
        locationType('');
        setYardbtn('');
      }
    }
  };
  const onCatCommercialPress = () => {
    setSelectCategory('Commercial'),
      setselectedCategoryType('');
    setTitle('');
    setPrice('');
    setDes('');
    setSelectArea('');
    setBathroom('');
    setBedroom('');
    setLocation(' ');
    setConstructionstate('');
    setYard('');
    setPhase('');
    setMultipleAssetsPost('');
    setFurnished('');
    setAreaUnit('');
    setColor('');
  }
  const onCatResidentialPress = () => {
    setSelectCategory('Residential');
    setselectedCategoryType('');

    setTitle(' ');
    setPrice(' ');
    setDes(' ');
    setSelectArea(' ');
    setBathroom(' ');
    setBedroom(' ');
    setLocation(' ');
    setConstructionstate(' ');
    setYard('');
    setPhase('');
    setMultipleAssetsPost('');
    setFurnished('');
    setAreaUnit('');
    setColor('');
  }
  const onCatPlotPress = () => {
    setSelectCategory('Plot');
    setselectedCategoryType('');

    setTitle('');
    setPrice('');
    setDes('');
    setSelectArea('');
    setBathroom('');
    setBedroom('');
    setLocation(' ');

    setConstructionstate('');
    setYard('');
    setPhase('');
    setMultipleAssetsPost('');
    setFurnished('');
    setAreaUnit('');
    setColor('');
    setYardbtn('');
  }
  useEffect(() => {
    setSelectCategory('');
    setselectedCategoryType('');
    setTitle('');
    setPrice('');
    setDes('');
    setSelectArea('');
    setBathroom('');
    setBedroom('');
    setLocation('');
    setConstructionstate('');
    setYard('');
    setPhase('');
    setMultipleAssetsPost('');
    setFurnished('');
    setAreaUnit('');
    setColor('');
    setYardbtn('');
    locationType('');
  }, []);

  // main UI

  return (
    <View style={{ flex: 1 }}>

      {/** Header */}
      <View
        style={styles.header}>
        <Text style={styles.header_text}>
          POST{' '}
        </Text>
      </View>

      <View
        style={styles.include_some_details}>
        <Text style={styles.include_some_details_text}>
          Include some details
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/** Select type */}

        <View style={{ marginTop: 30, paddingLeft: 20 }}>
          <Text style={styles.select_type}>
            Select Type *
          </Text>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <View
              style={styles.home_icon_cont}>
              <Image
                source={require('../../assets/SvgHouse.png')}
                style={{ height: 35, width: 35 }}
              />
            </View>

            {/*Property Category START*/}

            <View style={{ flexDirection: 'column' }}>
              <Text style={{ paddingLeft: 10, fontSize: 16, color: "black" }}>
                Property For Sale
              </Text>
              <View
                style={{ flexDirection: 'row', flex: 1, marginHorizontal: 5 }}>

                {/** Commercial BTN */}
                <TouchableOpacity
                  onPress={() => onCatCommercialPress()}
                  style={[styles.type_btn, {
                    backgroundColor:
                      selectcategory == 'Commercial' ? '#144272' : '#2C74B3',
                  }]}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Commercial
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onCatResidentialPress()}
                  style={[styles.type_btn, {
                    marginHorizontal: 10,
                    backgroundColor:
                      selectcategory == 'Residential' ? '#144272' : '#2C74B3',
                  }]}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Residential
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onCatPlotPress()}
                  style={[styles.type_btn, {
                    backgroundColor:
                      selectcategory == 'Plot' ? '#144272' : '#2C74B3',
                  }]}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Plot
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity style={{ borderRadius: 10, marginTop: 5, marginLeft: 10 }}>
                <SelectDropdown
                  data={PropertyCategories}
                  defaultButtonText={"House"}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonStyle={{ height: 30, width: 110, backgroundColor: '#2C74B3', borderRadius: 5 }}
                  buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                  dropdownStyle={{ backgroundColor: '#eeee'}}
                  
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                  }}
                />
              </TouchableOpacity> */}
            </View>

            {/*Property Category END*/}
          </View>
        </View>

        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        />
        <View
          style={{
            height: 130,
            width: width / 1.1,
            backgroundColor: '#EEEEEE',
            marginLeft: 20,
            elevation: 2,
            marginBottom: 20,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{ color: '#000', fontSize: 15 }}>
              UPLOAD UP TO 5 PHOTOS
            </Text>
            <AntDesign name="right" size={15} color="#000" />
          </TouchableOpacity>

          <MultipleimagePicker
            style={{
              width: '100%',
              height: 120,
              backgroundColor: '#2C74B3',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onImageChange={(path, mime, type) => {
              updateImageInGallery(path, mime, type);
            }}
            uploadVideo={false}
            isMultiple={true}>
            <AntDesign
              name="pluscircleo"
              size={20}
              color="#fff"
              style={{ right: 10 }}
            />
            <Text style={{ color: '#fff', fontSize: 19, fontWeight: '600' }}>
              Add Images
            </Text>
          </MultipleimagePicker>
        </View>
        <View
          style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {multipleAssetsPost &&
                multipleAssetsPost?.map((item, index) => (
                  <View
                    style={{ position: 'relative', marginHorizontal: 5 }}
                    key={index + 1}>
                    <Image
                      style={{
                        height: Dimensions.get('window').height * 0.11,
                        width: Dimensions.get('window').height * 0.11,
                        borderRadius: 10,
                        resizeMode: 'contain',
                      }}
                      source={{ uri: item?.uri }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        remmoveAsset(item);
                      }}
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        x
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              <View></View>
            </View>
          </ScrollView>
        </View>

        {(selectcategory == 'Residential' ||
          selectcategory == 'Commercial') && (
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Sale/Rent *
              </Text>
              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity
                  onPress={() => {
                    setRentSale('Rent');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 20,

                    backgroundColor: rentsale == 'Rent' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Rent
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setRentSale('Sale');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 10,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 20,

                    backgroundColor: rentsale == 'Sale' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Sale
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
            Price
          </Text>
          <TextInput
            onChangeText={text => setPrice(text)}
            placeholderTextColor="#000"
            keyboardType="number-pad"
            value={price}
            style={{
              height: 40,
              width: 320,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
            }}
          />
        </View>

        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 30,
          }}
        />
        {selectcategory == 'Commercial' && (
          <>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: '500',
                marginHorizontal: 10,
                marginLeft: 25,
              }}>
              Category *
            </Text>

            <View style={{ margin: 10, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('BUILDING');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'BUILDING'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Building
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Shop');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Shop' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Shop
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Office');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Office' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Office
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('BASEMENT');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'BASEMENT'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Basement
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Mise.Nine');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Mise.Nine'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Mise.Nine
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('WAREHOUSE');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'WAREHOUSE'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Ware House
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('PENTHOUSES');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'PENTHOUSES'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    PentHouse
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('OTHER');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'OTHER' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <TouchableOpacity
              style={{ borderRadius: 10, marginTop: 5, marginLeft: 10 }}>
              <SelectDropdown
                data={PropertyCommercialCategories}
                defaultButtonText={'Select'}
                onSelect={(selectedItem, index) => {
                  setselectedCategoryType(selectedItem);
                }}
                buttonStyle={{
                  height: 30,
                  width: 150,
                  backgroundColor: '#2C74B3',
                  borderRadius: 5,
                }}
                buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                dropdownStyle={{ backgroundColor: '#eeee' }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </TouchableOpacity>  */}
          </>
        )}

        {selectcategory == 'Residential' ? (
          <>
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: '500',
                marginHorizontal: 25,
              }}>
              Category *
            </Text>

            <View style={{ margin: 10, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('BANGALOW');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'BANGALOW'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Bangalow
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Fram house');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Fram house'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Fram House
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('TownHouse');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'TownHouse'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    TownHouse
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Apartment');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Apartment'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Apartment
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('PentHouse');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'PentHouse'
                        ? '#144272'
                        : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    PentHouse
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setselectedCategoryType('Others');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor:
                      selectedCategoryType == 'Others' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Construction Status *
              </Text>

              <TouchableOpacity
                style={{ borderRadius: 10, marginTop: 5, marginLeft: 5 }}>
                <SelectDropdown
                  data={Plots}
                  defaultButtonText={'Plot'}
                  onSelect={(selectedItem, index) => {
                    setConstructionstate(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonStyle={{
                    height: 30,
                    width: 120,
                    backgroundColor: '#2C74B3',
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                  dropdownStyle={{ backgroundColor: '#eeee' }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              style={{ borderRadius: 10, marginTop: 5, marginLeft: 10 }}>
              <SelectDropdown
                data={PropertyCategories}
                defaultButtonText={'House'}
                onSelect={(selectedItem, index) => {
                  setselectedCategoryType(selectedItem);
                }}
                buttonStyle={{
                  height: 30,
                  width: 110,
                  backgroundColor: '#2C74B3',
                  borderRadius: 5,
                }}
                buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                dropdownStyle={{ backgroundColor: '#eeee' }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </TouchableOpacity>  */}
          </>
        ) : selectcategory == 'Plot' ? (
          <>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Yard *
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setYardbtn('ACRE');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: yardbtn == 'ACRE' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    ACRE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setYardbtn('KANAL');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: yardbtn == 'KANAL' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    KANAL
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setYardbtn('YARD');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: yardbtn == 'YARD' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    YARD
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setYardbtn('MARLA');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: yardbtn == 'MARLA' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    MARLA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setYardbtn('Other');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: yardbtn == 'Other' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 13, alignSelf: 'center' }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>

              {yardbtn && (
                <TextInput
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  onChangeText={text => setYard(text)}
                  value={yard}
                  style={{
                    marginTop: 10,
                    height: 40,
                    width: 320,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 5,
                  }}
                />
              )}
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Construction Status *
              </Text>

              <TouchableOpacity
                style={{ borderRadius: 10, marginTop: 5, marginLeft: 5 }}>
                <SelectDropdown
                  data={Plots}
                  defaultButtonText={'Plot'}
                  onSelect={(selectedItem, index) => {
                    setConstructionstate(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonStyle={{
                    height: 30,
                    width: 120,
                    backgroundColor: '#2C74B3',
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                  dropdownStyle={{ backgroundColor: '#eeee' }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Phase *
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    setPhase('Phase');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 15,

                    backgroundColor: phase == 'Phase' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Phase
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPhase('Precent');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 15,

                    backgroundColor: phase == 'Precent' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Precent
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPhase('Sector');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 15,

                    backgroundColor: phase == 'Sector' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Sector
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setPhase('Block');
                  }}
                  style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 10,

                    backgroundColor: phase == 'Block' ? '#144272' : '#2C74B3',

                    borderRadius: 5,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Block
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <TextInput
                placeholderTextColor="#000"
                onChangeText={text => setPhase(text)}
                value={phase}
                style={{
                  height: 40,
                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                }}
              /> */}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setPhase('Other');
                  }}
                  style={{
                    // alignItems: 'center',
                    // alignSelf: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    height: 30,
                    paddingHorizontal: 15,
                    backgroundColor: phase == 'Other' ? '#144272' : '#2C74B3',
                    borderRadius: 5,
                    width: 70,
                    marginTop: 10,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 15, alignSelf: 'center' }}>
                    Other
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Address *
              </Text>
              <TextInput
                onChangeText={text => setLocation(text)}
                value={location}
                placeholderTextColor="#000"
                style={{
                  height: 40,
                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                }}
              />
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />
          </>
        ) : selectcategory == 'Commercial' ? (
          <></>
        ) : null}

        {selectedCategoryType == 'Houses' ||
          selectedCategoryType == 'Apartment' ? (
          <>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Furnished *
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <TouchableOpacity
                  onPress={() => {
                    setColor(1), setFurnished('UnFurnished');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.btn,
                    color === 1
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>UnFurnished</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setColor(2), setFurnished('Furnished');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.btn,
                    color === 2
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>Furnished</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />

            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Bedrooms *
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                  marginLeft: -10,
                }}>
                <TouchableOpacity
                  onPress={() => setBedroom(1)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 1
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(2)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 2
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(3)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 3
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>3</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(4)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 4
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>4</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(5)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 5
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>5</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(6)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 6
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>6+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(7)}
                  activeOpacity={0.5}
                  style={[
                    styles.btnStudio,
                    Bedroom === 7
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>Studio</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />

            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Bathrooms *
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                  marginLeft: -15,
                }}>
                <TouchableOpacity
                  onPress={() => setBathroom(1)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 1
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(2)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 2
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(3)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 3
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>3</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(4)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 4
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>4</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(5)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 5
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>5</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(5)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 6
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>6+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBathroom(6)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bathroom === 7
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>7+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />

            {/* <View style={{marginTop: 20, marginLeft: 20}}>
              <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                Area Unit *
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-around',
                  paddingHorizontal: 20,
                  marginLeft: -30,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAreaUnit(1), setArea('ACRE');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.AreaUnitbtn,
                    AreaUnit === 1
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{color: '#fff', fontSize: 13}}>ACRE</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setAreaUnit(2), setArea('KANAL');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.AreaUnitbtn,
                    AreaUnit === 2
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{color: '#fff', fontSize: 13}}>KANAL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAreaUnit(3), setArea('MARLA');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.AreaUnitbtn,
                    AreaUnit === 3
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{color: '#fff', fontSize: 13}}>MARLA</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'space-evenly',
                  paddingHorizontal: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setAreaUnit(4), setArea('SQUARE YARD');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.AreaUnitbtn,
                    AreaUnit === 4
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{color: '#fff', fontSize: 12}}>SQUARE YARD</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAreaUnit(5), setArea('SQUARE FEET');
                  }}
                  activeOpacity={0.5}
                  style={[
                    styles.AreaUnitbtn,
                    AreaUnit === 5
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{color: '#fff', fontSize: 12}}>SQUARE FEET</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 20,
              }}
            /> */}

            {
              <>
                <View style={{ marginTop: 20, marginLeft: 20 }}>
                  <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                    Area Unit *
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-around',
                      paddingHorizontal: 20,
                      marginLeft: -30,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setAreaUnit(1), setArea('ACRE');
                      }}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        AreaUnit === 1
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>ACRE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setAreaUnit(2), setArea('KANAL');
                      }}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        AreaUnit === 2
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>KANAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAreaUnit(3), setArea('MARLA');
                      }}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        AreaUnit === 3
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>MARLA</Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-evenly',
                      paddingHorizontal: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setAreaUnit(4), setArea('SQUARE YARD');
                      }}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        AreaUnit === 4
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 12 }}>
                        SQUARE YARD
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setAreaUnit(5), setArea('SQUARE FEET');
                      }}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        AreaUnit === 5
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 12 }}>
                        SQUARE FEET
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Divider
                  style={{
                    height: 1,
                    marginHorizontal: 20,
                    backgroundColor: 'grey',
                    marginTop: 20,
                  }}
                />
              </>
            }
            {/* <View style={{marginTop: 20, marginLeft: 20}}>
              <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                Construction Status *
              </Text>

              <TouchableOpacity
                style={{borderRadius: 10, marginTop: 5, marginLeft: 5}}>
                <SelectDropdown
                  data={Plots}
                  defaultButtonText={'Plot'}
                  onSelect={(selectedItem, index) => {
                    setConstructionstate(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonStyle={{
                    height: 30,
                    width: 120,
                    backgroundColor: '#2C74B3',
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{color: '#fff', fontSize: 15}}
                  dropdownStyle={{backgroundColor: '#eeee'}}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </TouchableOpacity>
            </View>
            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 20,
              }}
            /> */}
          </>
        ) : selectedCategoryType == 'Office' ? (
          <>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Rooms *
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 5,
                  marginLeft: -10,
                }}>
                <TouchableOpacity
                  onPress={() => setBedroom(1)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 1
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(2)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 2
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>2</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(3)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 3
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>3</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(4)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 4
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>4</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(5)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 5
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>5</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setBedroom(6)}
                  activeOpacity={0.5}
                  style={[
                    styles.btn1,
                    Bedroom === 6
                      ? styles.btnChangeColor
                      : styles.btnChangeColor1,
                  ]}>
                  <Text style={{ color: '#fff' }}>6+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />
          </>
        ) : null}

        {/* <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
            Features *
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{color: '#000'}}>None</Text>
            <AntDesign name="right" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 10,
          }}
        /> */}

        <ActionSheet
          ref={actionSheetAreaRef}
          containerStyle={{ backgroundColor: 'transparent' }}>
          <View style={{ padding: 10, paddingBottom: 20 }}>
            <ActionSheetComponent
              title={'Select Location'}
              dataset={listOfArea}
              onPress={async item => {
                actionSheetAreaRef.current.hide();
                setSelectArea(item);
              }}
            />
            <TouchableOpacity
              onPress={() => actionSheetAreaRef.current.hide()}
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                paddingVertical: 12,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'rgb(0,88,200)',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
            Location *
          </Text>
          <TouchableOpacity
            onPress={() => actionSheetAreaRef.current.show()}
            activeOpacity={0.6}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
              justifyContent: 'space-between',
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
              height: 40,
              width: 320,
            }}>
            <EvilIcons name="location" size={20} color="black" />
            <Text style={{ color: 'black' }}>
              {selectArea ? selectArea?.name : 'Location'}
            </Text>
            <AntDesign name="down" size={20} color="grey" />
          </TouchableOpacity>
        </View>

        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        />

        {selectcategory == 'Commercial' && (
          <>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Construction Status *
              </Text>

              <TouchableOpacity
                style={{ borderRadius: 10, marginTop: 5, marginLeft: 5 }}>
                <SelectDropdown
                  data={Plots}
                  defaultButtonText={'Select'}
                  onSelect={(selectedItem, index) => {
                    setConstructionstate(selectedItem);
                    console.log(selectedItem, index);
                  }}
                  buttonStyle={{
                    height: 30,
                    width: 120,
                    backgroundColor: '#2C74B3',
                    borderRadius: 5,
                  }}
                  buttonTextStyle={{ color: '#fff', fontSize: 15 }}
                  dropdownStyle={{ backgroundColor: '#eeee' }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem;
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item;
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                Address *
              </Text>
              <TextInput
                onChangeText={text => setLocation(text)}
                value={location}
                placeholderTextColor="#000"
                style={{
                  height: 40,
                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                }}
              />
            </View>

            <Divider
              style={{
                height: 1,
                marginHorizontal: 20,
                backgroundColor: 'grey',
                marginTop: 30,
              }}
            />
          </>
        )}

        {/* <View style={{marginTop: 20, marginLeft: 20}}>
          <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
            Location *
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{color: '#000'}}>Choose</Text>
            <AntDesign name="right" size={15} color="#000" />
          </TouchableOpacity>
        </View>
        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        /> */}

        {selectcategory == 'Residential' ||
          (selectedCategoryType == 'Shop' && (
            <>
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                  Area Unit *
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-around',
                    paddingHorizontal: 20,
                    marginLeft: -50,

                    width: 250,
                    marginLeft: 50,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setAreaUnit(1), setArea('Sq. Feet');
                    }}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      AreaUnit === 1
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>Sq. Feet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setAreaUnit(2), setArea('Sq. Yard');
                    }}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      AreaUnit === 2
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>Sq. Yard</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ))}

        <>
          {selectArea?.name == 'Bahria Town' ? (
            <>
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                  Bahria Town
                </Text>

                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-around',
                      // marginLeft: -50,
                      marginLeft: 1,
                      width: 230,
                    }}>
                    <TouchableOpacity
                      onPress={() => locationType('Bahria Karachi')}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        locationTypes == 'Bahria Karachi'
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>
                        {' '}
                        Bahria karachi{' '}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => locationType('Bahria Pindi')}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        locationTypes == 'Bahria Pindi'
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>
                        Bahria Pindi{' '}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'space-around',
                      // marginLeft: -50,
                      marginLeft: 1,
                      width: 230,
                    }}>
                    <TouchableOpacity
                      onPress={() => locationType('Bahria Lahore')}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        locationTypes == 'Bahria Lahore'
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>
                        Bahria Lahore{' '}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => locationType('Bahria Industrial')}
                      activeOpacity={0.5}
                      style={[
                        styles.AreaUnitbtn,
                        locationTypes == 'Bahria Industrial'
                          ? styles.btnChangeColor
                          : styles.btnChangeColor1,
                      ]}>
                      <Text style={{ color: '#fff', fontSize: 13 }}>
                        {' '}
                        Bahria Industrial
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          ) : null}

          {selectArea?.name == 'DHA city' ? (
            <>
              <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
                  DHA City
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-around',
                    // marginLeft: -50,
                    marginLeft: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => locationType('Bahawalpur')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes === 'Bahawalpur'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>
                      {' '}
                      Bahawalpur{' '}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => locationType('Multan')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes == 'Multan'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}> Multan </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => locationType('Peshawar')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes == 'Peshawar'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>
                      {' '}
                      Peshawar{' '}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-around',
                    // marginLeft: -50,
                    marginLeft: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => locationType('Quetta')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes == 'Quetta'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}> Quetta </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => locationType('Gujranwala')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes == 'Gujranwala'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>
                      {' '}
                      Gujranwala{' '}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => locationType('Islamabad')}
                    activeOpacity={0.5}
                    style={[
                      styles.AreaUnitbtn,
                      locationTypes == 'Islamabad'
                        ? styles.btnChangeColor
                        : styles.btnChangeColor1,
                    ]}>
                    <Text style={{ color: '#fff', fontSize: 13 }}>
                      {' '}
                      Islamabad{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : null}
        </>

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
            Main Features *
          </Text>
          <TextInput
            onChangeText={text => setTitle(text)}
            placeholderTextColor="#000"
            value={title}
            style={{
              height: 40,
              width: 320,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
            }}
          />
        </View>

        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        />

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ color: '#000', margin: 2, fontWeight: '500' }}>
            Details *
          </Text>
          <TextInput
            onChangeText={text => setDes(text)}
            value={des}
            multiline={true}
            textAlignVertical="top"
            numberOfLines={6}
            placeholderTextColor="#000"
            style={{
              height: 120,
              width: 320,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
            }}
          />
        </View>

        <Divider
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: 'grey',
            marginTop: 20,
          }}
        />

        {/*--------MODAL START---------*/}
        <Modal animationType="slide" visible={modalVisible} transparent={true}>
          <TouchableOpacity
            activeOpacity={1}
            style={{ backgroundColor: '#000000aa', height: '100%' }}
            onPress={() => setModalVisible(false)}
          />
          <View
            style={{
              height: '25%',
              marginTop: 'auto',
              backgroundColor: '#fff',
              borderTopEndRadius: 20,
              borderTopStartRadius: 20,
              justifyContent: 'space-evenly',
              paddingLeft: 20,
            }}>
            <Text style={{ color: '#000', fontSize: 16 }}>Take a Photo</Text>
            <Text style={{ color: '#000', fontSize: 16 }}>Pick From Gallery</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#000', fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/*--------MODAL END---------*/}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => submitProperty()}
          style={{
            flex: 1,
            justifyContent: 'center',
            marginBottom: 20,
            alignSelf: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              backgroundColor: '#000',
              height: 40,
              width: 320,
              borderRadius: 5,
            }}>
            <Text style={{ fontSize: 15, color: '#fff', fontWeight: '500' }}>
              Submit
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const ActionSheetComponent = ({
  title = '',
  dataset = [],
  onPress = () => { },
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
        {dataset?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
              <Text style={{ color: '#000', fontSize: 16 }} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({

  select_type: {
    color: '#000',
    fontSize: 18,
    fontWeight: '500'
  },

  home_icon_cont: {
    height: 60,
    width: 60,
    backgroundColor: '#E8C4C4',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  type_btn: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  header: {
    width: width,
    height: 50,
    backgroundColor: '#023661',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header_text: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
  },

  include_some_details: {
    height: 50,
    width: width,
    backgroundColor: '#EEEEEE',
    alignItems: 'flex-start',
    paddingLeft: 20,
    justifyContent: 'center',
  },

  include_some_details_text: {
    fontSize: 19,
    fontWeight: '500',
    color: '#000',
  },

  btn: {
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  btnChangeColor: {
    backgroundColor: '#144272',
  },
  btnChangeColor1: {
    backgroundColor: '#2C74B3',
  },

  btn1: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },

  AreaUnitbtn: {
    height: 30,
    width: 100,
    left: 5,
    backgroundColor: '#2C74B3',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnStudio: {
    height: 30,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default Sell;
