import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import React, {createRef, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomImagePicker from '../components/CustomImagePicker';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import {Colors} from '../config';
import {updateUserDetails} from '../redux1/APIs';

const {width, height} = Dimensions.get('window');
const EditProfile = () => {
  const userActive = useSelector(state => state?.reducer?.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setusername] = useState(userActive?.userName);
  const [image, setimage] = useState();
  const [email, setEmail] = useState(userActive?.email);
  const [experience, setExperience] = useState(
    userActive?.experience == 'undefined' ||
      userActive?.experience == undefined ||
      userActive?.experience == null ||
      userActive?.experience == 'null'
      ? ''
      : userActive?.experience,
  );
  const [previousWork, setPreviousWork] = useState(
    userActive?.previousWork == 'undefined' ||
      userActive?.previousWork == undefined ||
      userActive?.previousWork == null ||
      userActive?.previousWork == 'null'
      ? ''
      : userActive?.previousWork,
  );
  const [details, setDetails] = useState(
    userActive?.description == 'undefined' ||
      userActive?.description == undefined ||
      userActive?.description == null ||
      userActive?.description == 'null'
      ? ''
      : userActive?.description,
  );
  const [officeName, setofficeName] = useState(
    userActive?.officeName == 'undefined' ||
      userActive?.officeName == undefined ||
      userActive?.officeName == null ||
      userActive?.officeName == 'null'
      ? ''
      : userActive?.officeName,
  );
  const [location, setlocation] = useState(
    userActive?.location == 'undefined' ||
      userActive?.location == undefined ||
      userActive?.location == null ||
      userActive?.location == 'null'
      ? ''
      : userActive?.location,
  );

  console.log('====================================');
  console.log(userActive);
  console.log('====================================');
  const [mime, setmime] = useState();
  const [StateName, setStateName] = useState(userActive?.stateName);
  const [firmName, setfirmName] = useState(userActive?.firmName);

  const [role, setrole] = useState(userActive?.role);
  const [area, setarea] = useState(userActive?.area);
  const [landline, setLandline] = useState(userActive?.landline);
  const navigation = useNavigation();
  const actionSheetAreaRef = createRef();

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

  const modalOpener = () => {
    setModalVisible(true);
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
          alignItems: 'center',
          padding: 15,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <Entypo name="cross" size={25} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            updateUserDetails(
              userName,
              email,
              StateName,
              firmName,
              area,
              landline,
              image,
              mime,
              previousWork,
              details,
              officeName,
              experience,
              location,
            )
          }>
          <Text style={{color: 'black'}}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{width: width / 1.1, marginLeft: 20, marginTop: 10}}>
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 120,
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              backgroundColor: 'white',
            }}>
            <Image
              source={{
                uri: !image
                  ? `http://173.249.10.7:8066/${userActive?.image}`
                  : image,
              }}
              // source={require('../../assets/profile.jpg')}
              style={{
                width: 120,
                height: 120,
                borderRadius: 100,
                borderColor: Colors.primary,
                borderWidth: 5,
              }}
            />
          </View>
          <CustomImagePicker
            style={{
              marginTop: -30,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              right: 120,
            }}
            onImageChange={(path, mime) => {
              setimage(path);
              setmime(mime);
            }}>
            {/* <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                      marginTop: -30,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      left: -80,
                    }}
                    onPress={()=> console.log("LKKKLK")}
                    
                    > */}
            <FontAwesome
              name="camera"
              style={{
                backgroundColor: 'white',
                padding: 6,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: 'black',
              }}
              size={20}
              color={Colors.primary}
            />
            {/* </TouchableOpacity> */}
          </CustomImagePicker>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{width: width / 1.5}}>
              <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                User Name
              </Text>
              <TextInput
                editable={true}
                placeholderTextColor="black"
                placeholder="User Name"
                value={userName}
                onChangeText={text => setusername(text)}
                style={{
                  height: 50,
                  color: 'black',
                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                  paddingLeft: 20,
                }}
              />
            </View>
          </View>
          {/*  */}
          <View style={{marginTop: 10}}>
            <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
              Email
            </Text>
            <TextInput
              editable={true}
              placeholderTextColor="black"
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                height: 50,
                width: 320,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 5,
                paddingLeft: 20,
                color: 'black',
              }}
            />
          </View>
          {userActive?.role == 'seller' ? null : (
            <>
              <View style={{marginTop: 10}}>
                <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                  Previous Work
                </Text>
                <TextInput
                  editable={true}
                  placeholderTextColor="black"
                  placeholder="Previous Work"
                  value={previousWork}
                  onChangeText={text => setPreviousWork(text)}
                  style={{
                    height: 50,
                    width: 320,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 5,
                    paddingLeft: 20,
                    color: 'black',
                  }}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                  Experience
                </Text>
                <TextInput
                  editable={true}
                  placeholderTextColor="black"
                  placeholder="Experience"
                  value={experience}
                  onChangeText={text => setExperience(text)}
                  style={{
                    height: 50,
                    width: 320,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 5,
                    paddingLeft: 20,
                    color: 'black',
                  }}
                />
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                  Office Name
                </Text>
                <TextInput
                  editable={true}
                  placeholderTextColor="black"
                  placeholder="Office Name"
                  value={officeName}
                  onChangeText={text => setofficeName(text)}
                  style={{
                    height: 50,
                    width: 320,
                    borderWidth: 1,
                    borderColor: '#000',
                    borderRadius: 5,
                    paddingLeft: 20,
                    color: 'black',
                  }}
                />
              </View>
            </>
          )}

          <View style={{marginTop: 10}}>
            <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
              Address
            </Text>
            <TextInput
              editable={true}
              placeholderTextColor="black"
              placeholder="Address"
              value={location == undefined ? '' : location}
              onChangeText={text => setlocation(text)}
              style={{
                height: 50,
                width: 320,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 5,
                paddingLeft: 20,
                color: 'black',
              }}
            />
          </View>

          <View style={{marginTop: 10}}>
            <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
              Description
            </Text>
            <TextInput
              editable={true}
              multiline={true}
              placeholderTextColor="black"
              placeholder="Details"
              value={details}
              onChangeText={text => setDetails(text)}
              style={{
                height: 100,
                width: 320,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 5,
                paddingLeft: 20,
                color: 'black',
              }}
            />
          </View>

          {/* <View style={{marginTop: 10}}>
            <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
              About
            </Text>
            <TextInput
            editable={true}
              multiline={true}
              placeholderTextColor="black"
              placeholder="About"
              value={about}
              onChangeText={text => setAbout(text)}
              style={{
                height: 100,
                width: 320,
                borderWidth: 1,
                borderColor: '#000',
                borderRadius: 5,
                paddingLeft: 20,
                marginBottom: 10,
              }}
            />
          </View> */}

          {/*  */}
          {userActive?.role == 'builder' && firmName && (
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                Firm Name
              </Text>
              <TextInput
                editable={true}
                placeholderTextColor="#000"
                placeholder="Firm Name"
                value={firmName}
                onChangeText={text => setfirmName(text)}
                style={{
                  height: 50,

                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                  paddingLeft: 20,
                  color: 'black',
                }}
              />
            </View>
          )}
          {userActive?.role == 'consultant' && StateName && (
            <View style={{marginTop: 10}}>
              <Text style={{color: '#000', margin: 2, fontWeight: '500'}}>
                Real Estate Name
              </Text>
              <TextInput
                editable={true}
                placeholderTextColor="#000"
                placeholder="Real Estate Name"
                value={StateName}
                onChangeText={text => setStateName(text)}
                style={{
                  height: 50,
                  color: 'black',
                  width: 320,
                  borderWidth: 1,
                  borderColor: '#000',
                  borderRadius: 5,
                  paddingLeft: 20,
                }}
              />
            </View>
          )}

          <ActionSheet
            ref={actionSheetAreaRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
              <ActionSheetComponent
                title={'Select Area'}
                dataset={listOfArea}
                onPress={async item => {
                  actionSheetAreaRef.current.hide();
                  setarea(item?.name);
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
        </View>
        {userActive?.role == 'seller' ? null : (
          <View style={{marginTop: 10}}>
            <Text
              style={{
                color: '#000',
                margin: 2,
                fontWeight: '500',
                marginHorizontal: 20,
              }}>
              Area
            </Text>
            <TouchableOpacity
              onPress={() => actionSheetAreaRef.current.show()}
              activeOpacity={0.6}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: '#000',
                width: 320,
                marginHorizontal: 20,
                padding: 10,
              }}>
              <Text style={{color: 'black'}}> {area ? area : 'Area'}</Text>
              <AntDesign name="down" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const ActionSheetComponent = ({
  title = '',
  dataset = [],
  onPress = () => {},
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
      <ScrollView style={{maxHeight: 200}} showsVerticalScrollIndicator={true}>
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
              <Text style={{color: '#000', fontSize: 16}} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
export default EditProfile;
