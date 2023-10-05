import { View, Text, Dimensions, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get("window")


const DeleteAccount = () => {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={15} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Delete Account</Text>
            </View>

            <View style={{ height: 200, width: width, marginLeft: 20, marginTop: 20 }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '500' }}>After deleting your account:</Text>
                <Text style={{ fontSize: 15, color: '#000', fontWeight: '300', paddingRight: 40 }}>All Your ads will be Inactive and will not be showing to the user.</Text>
                <Text style={{ fontSize: 15, color: '#000', fontWeight: '300', paddingRight: 40 }}>All You can reactive your account at any time with in 90 days.</Text>
                <Text style={{ fontSize: 15, color: '#000', fontWeight: '300', paddingRight: 40 }}>After 90 days the account will be permanently deleted along with the associated personal data..</Text>
            </View>

            <TouchableOpacity
                onPress={() => Alert.alert("Are You sure you want to delete this account?")}
                activeOpacity={0.8}
                style={{ alignItems: 'center' }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#023661', height: 45, width: width / 1.1, borderRadius: 5 }}>
                    <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>Delete Account</Text>
                </View>

            </TouchableOpacity>


        </View>
    )
}


export default DeleteAccount