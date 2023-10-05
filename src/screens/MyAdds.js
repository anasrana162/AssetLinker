import { View, Text,Dimensions,TouchableOpacity } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get("window")


const MyAdds = () => {
  return (
    <View style={{flex:1}}>
      <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
        <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>MY Ads</Text>
      </View>
    </View>
  )
}

export default MyAdds;