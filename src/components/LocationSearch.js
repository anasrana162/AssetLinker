import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get("window")


const LocationSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}>
                    <Entypo name="cross" size={25} color='#000' />
                </TouchableOpacity>
                <Text style={{ color: '#000', marginLeft: 20, fontSize: 21, fontWeight: 'bold' }}>Location</Text>
            </View>

            <View style={{ height: 40, width: width / 1.1, backgroundColor: '#000', marginLeft: 20, marginTop: 20, justifyContent: "center" }}>
                <Searchbar
                    placeholder="Search area, city or country"
                    placeholderTextColor={"black"}
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                />
            </View>
        </View>
    )
}

export default LocationSearch