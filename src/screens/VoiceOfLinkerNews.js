import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import VoiceOfLinkerCard from '../components/VoiceOfLinkerCard'
const { width, height } = Dimensions.get("window")




const VoiceOfLinkerNews = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}>
                    <Entypo name="cross" size={25} color='#000' />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Voice of Linker News</Text>
            </View>
            <VoiceOfLinkerCard />
            <VoiceOfLinkerCard />
            <VoiceOfLinkerCard />



        </View>
    )
}

export default VoiceOfLinkerNews