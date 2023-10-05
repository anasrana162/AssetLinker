import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get("window")


const ManageAccount = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={15} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Manage account</Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => navigation.navigate('Login')}
                style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: '#023661', height: 45, width: width / 1.1, borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, color: 'grey', fontWeight: '500', color: '#023661' }}>Logout</Text>
                </View>
            </TouchableOpacity>

            <Divider style={{ height: 1, backgroundColor: 'grey', marginTop: 30 }} />

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DeleteAccount')}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 }}>
                <Text style={{ fontSize: 18, color: '#000', fontWeight: '600' }}>Delete account</Text>
                <AntDesign name="right" size={15} color="#000" />
            </TouchableOpacity>
        </View>
    )
}

export default ManageAccount