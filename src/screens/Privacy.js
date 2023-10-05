import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Switch, Divider} from 'react-native-paper';
const {width, height} = Dimensions.get('window');

const Privacy = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const navigation = useNavigation();

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
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
          <AntDesign name="left" size={15} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 19,
            fontWeight: '600',
            color: '#000',
            marginLeft: 10,
          }}>
          Privacy
        </Text>
      </View>

      <View
        style={{
          width: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <Text style={{color: '#000', fontSize: 18, fontWeight: '500'}}>
          Show my Phone number in ads
        </Text>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          color="#000"
        />
      </View>

      <Divider style={{height: 1, backgroundColor: 'grey'}} />

      <TouchableOpacity
        onPress={() => navigation.navigate('ChangeAccountpassword')}
        activeOpacity={0.6}
        style={{
          width: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#000', fontSize: 18, fontWeight: '500'}}>
          Change Password
        </Text>
        <AntDesign name="right" size={15} color="#000" style={{right: 20}} />
      </TouchableOpacity>

      <Divider style={{height: 1, backgroundColor: 'grey'}} />
    </View>
  );
};

export default Privacy;
