import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Divider, Switch } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get("window")




const Notification = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={15} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Notifications</Text>
            </View>

            <View style={{ width: width,  justifyContent:'center', padding: 20,}}>
                <Text style={{fontSize:21,fontWeight:'600',color:'#000'}}>Notification</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{ color: 'grey', fontSize: 18, fontWeight: '500', marginTop: 15 }}>Receive Notification based on{'\n'}your activity</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color="#000" />
                </View>
                
            </View>

            <Divider style={{ height: 1, backgroundColor: 'grey' }} />
            


         

         
        </View>
    )
}

export default Notification