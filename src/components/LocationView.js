import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  Linking,
} from 'react-native';
import React, { createRef, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import { useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomSelector from '../components/TextWithActionSheet';
// import SelectDropdown from 'react-native-select-dropdown'
import { Dropdown } from 'react-native-element-dropdown';
import { logout, updateLocation } from '../redux1/APIs';
import { WP } from '../config';
const data = [
  { label: 'Profile', value: '2', icon: 'supervised-user-circle' },
  // {label: 'Notification', value: '1', icon: 'notifications-none'},
  { label: 'Logout', value: '2', icon: 'logout' },
];
const listOfArea = [
  {
    name: 'Bahira Town',
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
];

const LocationView = ({ setPlotSearchdata }) => {
  const navigation = useNavigation();
  const userActive = useSelector(state => state?.reducer?.user);
  const actionSheetAreaRef = createRef();
  const [selectArea, setSelectArea] = useState('');
  const [value, setValue] = useState(null);
  const [selected, setSelected] = useState('');

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          item?.label == 'Profile'
            ? navigation.navigate('MyProfile')
            : logout()
        }>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        {/* <MaterialIcons
          style={styles.icon}
          color="black"
          name={item?.icon}
          size={20}
        /> */}
      </TouchableOpacity>
    );
  };
  return (
    <View >
      <View
        style={{

          width: WP('100%'),
          height: 40,
          flexDirection: 'row',
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}>

        {/* <View style={{flexDirection:'row',flex:0.4}}> */}
        {/* <TouchableOpacity
          onPress={() => actionSheetAreaRef.current.show()}
          activeOpacity={0.6}
          style={{
            flex: WP(0.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <EvilIcons name="location" size={20} color="#fff" />
          <Text style={{color: '#fff', flex: 1, alignItems: 'center'}}>
            {selectArea ? selectArea : ''}
          </Text>
          <AntDesign name="down" size={20} color="#fff" />
        </TouchableOpacity> */}
        {/* <ActionSheet
          ref={actionSheetAreaRef}
          containerStyle={{backgroundColor: 'transparent'}}>
          <View style={{ paddingBottom: 20}}>
            <ActionSheetComponent
              title={'Select Area'}
              dataset={listOfArea}
              onPress={async item => {
                actionSheetAreaRef.current.hide();
                setSelectArea(item?.name);
                const data = await updateLocation(item?.name);
                setPlotSearchdata(data);
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
        </ActionSheet> */}
        {/* </View> */}


        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://assetslinkers.com`,
            )
          }
          activeOpacity={0.5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: '#fff', marginHorizontal: 6 }}>Magazine</Text>
          <MaterialCommunityIcons
            name="book-open-page-variant-outline"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>





        <TouchableOpacity
          onPress={() =>
            navigation.navigate('VoiceOfLinkerNews')
          }
          activeOpacity={0.5}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: '#fff', marginHorizontal: 6, }}>Association News</Text>

          <Feather name="mic" size={22} color={'#fff'} />


        </TouchableOpacity>




        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          activeOpacity={0.6}
          style={{
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 200,
            marginRight: 20,

          }}>
          <MaterialCommunityIcons
            name="bell"
            size={20}
            color="#fff"
            style={{}}
          />
        </TouchableOpacity>





        <TouchableOpacity
          onPress={() => setSelected(!selected)}
          activeOpacity={0.5}
        >
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderRightIcon={() => (
              <Ionicons name="menu" size={20} color="#fff" />
            )}
            renderItem={renderItem}
          />
        </TouchableOpacity>



      </View>

      {/* <View
        style={{
          justifyContent: 'space-evenly',
          width: WP('100%'),
          height: 40,
          flexDirection: 'row',
          backgroundColor: '#000',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <TouchableOpacity
          onPress={() => actionSheetAreaRef.current.show()}
          activeOpacity={0.6}
          style={{
            flex: WP(0.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <EvilIcons name="location" size={20} color="#fff" />
          <Text style={{color: '#fff', flex: 1, alignItems: 'center'}}>
            {selectArea ? selectArea : 'Area'}
          </Text>
          <AntDesign name="down" size={20} color="#fff" />
        </TouchableOpacity>
        <ActionSheet
          ref={actionSheetAreaRef}
          containerStyle={{backgroundColor: 'transparent'}}>
          <View style={{padding: 10, paddingBottom: 20}}>
            <ActionSheetComponent
              title={'Select Area'}
              dataset={listOfArea}
              onPress={async item => {
                actionSheetAreaRef.current.hide();
                setSelectArea(item?.name);
                const data = await updateLocation(item?.name);
                setPlotSearchdata(data);
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
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              `https://assetslinkers.com/wp-content/uploads/2023/02/18-Feb-2023.pdf`,
            )
          }
          activeOpacity={0.5}
          style={{
            flex: WP(0.5),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#fff', marginHorizontal: 6}}>Magzine</Text>
          <MaterialCommunityIcons
            name="book-open-page-variant-outline"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('VoiceOfLinkerNews')}
          activeOpacity={0.6}
          style={{
            flex: WP(0.4),
            marginLeft: WP('1.5'),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Text style={{color: '#fff', }}>VOL</Text>
          <MaterialCommunityIcons
            name="microphone-outline"
            size={20}
            color="#fff"
            style={{}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelected(!selected)}
          activeOpacity={0.5}
        >
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            // search
            maxHeight={300}
            labelField="label"
            valueField="value"
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderRightIcon={() => (
              <Ionicons name="menu" size={20} color="#fff" />
            )}
            renderItem={renderItem}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default LocationView;

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
        {dataset.map((item, index) => {
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
  container: { padding: 16 },
  dropdown: {
    //   height: 50,
    width: 120,
    //   padding: 12,
    // padding:20,
    top: -17,
    position: "absolute",
    right: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 1,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'black',
  },
  iconStyle: {
    width: 10,
    height: 10,
    tintColor: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  item: {
    width: WP('100'),
    paddingHorizontal: 4,
    zIndex: 1111,
    backgroundColor: 'white',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});