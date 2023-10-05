import { View, Text, TouchableOpacity, Dimensions, TextInput} from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get("window")
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons';



const ChangeAccountpassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const navigation = useNavigation();
     
    return (
       
        <View style={{ flex: 1 }}>
            <View style={{ width: width, height: 60, backgroundColor: '#D3D3D3', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                <TouchableOpacity
                 onPress={() => navigation.goBack()}
                    activeOpacity={0.5}>
                    <AntDesign name="left" size={15} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 19, fontWeight: '600', color: '#000', marginLeft: 10 }}>Change Password</Text>
            </View>
          
            <View style={{ width: width, marginTop: 20, flexDirection:'row',alignItems:'center',marginLeft:20}}>
                <TextInput
                    placeholderTextColor="#000"
                    placeholder="Current Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={currentPassword}
                     onChangeText={(text) => setCurrentPassword(text)}
                    style={{ height: 40, width: 320, borderWidth: 1, borderColor: '#000', borderRadius: 5,paddingLeft:20 }}
                />
                 <TouchableOpacity style={{marginLeft:-30}}>
                    <Ionicons name="eye-outline" size={22} color="#000" />
                 </TouchableOpacity>
                 
            </View>

            <View style={{ width: width, marginTop: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <TextInput
                    placeholderTextColor="#000"
                    placeholder="New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={newPassword}
                     onChangeText={(text) => setNewPassword(text)}
                    style={{ height: 40, width: 320, borderWidth: 1, borderColor: '#000', borderRadius: 5, paddingLeft: 20 }}
                />
                <TouchableOpacity style={{ marginLeft: -30 }}>
                    <Ionicons name="eye-outline" size={22} color="#000" />
                </TouchableOpacity>

            </View>


            <View style={{ width: width, marginTop: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <TextInput
                    placeholderTextColor="#000"
                    placeholder="Confirm New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={confirmNewPassword}
                     onChangeText={(text) => setConfirmNewPassword(text)}
                    style={{ height: 40, width: 320, borderWidth: 1, borderColor: '#000', borderRadius: 5, paddingLeft: 20 }}
                />
                <TouchableOpacity style={{ marginLeft: -30 }}>
                    <Ionicons name="eye-outline" size={22} color="#000" />
                </TouchableOpacity>

            </View>


            <TouchableOpacity
                activeOpacity={0.8}
                style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, backgroundColor: '#D3D3D3', height: 45, width: width/1.1, borderRadius: 5 }}>
                    <Text style={{ fontSize: 15, color:'grey' ,fontWeight: '500' }}>Change password</Text>
                </View>
            </TouchableOpacity>


        </View>
    )
}

export default ChangeAccountpassword