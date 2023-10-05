import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get("window")
const Setting = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>

      <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={15} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Setting</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Privacy')}
        style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <View>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: '500' }}>Privacy</Text>
          <Text style={{ color: 'grey', fontWeight: '400' }}>Phone number visibilty</Text>
        </View>
        <AntDesign name="right" size={15} color="#000" />
      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey' }} />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Notification')}
        style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <View>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: '500' }}>Notification</Text>
          <Text style={{ color: 'grey', fontWeight: '400' }}>Recommendations and special{'\n'}communication</Text>
        </View>
        <AntDesign name="right" size={15} color="#000" />
      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey' }} />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>navigation.navigate('ManageAccount')}
        style={{ width: width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
        <View>
          <Text style={{ fontSize: 18, color: '#000', fontWeight: '500' }}>Manage account</Text>
          <Text style={{ color: 'grey', fontWeight: '400' }}>Take action on account</Text>
        </View>
        <AntDesign name="right" size={15} color="#000" />
      </TouchableOpacity>

      <Divider style={{ height: 1, backgroundColor: 'grey' }} />

    </View>
  )
}

export default Setting