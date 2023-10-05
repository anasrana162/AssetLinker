// import React from 'react';
// import { View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Styles } from '../styles/globlestyle'
// import { Ionicons } from '@expo/vector-icons';

// export default function App() {
//   const navigation = useNavigation()
//   return (
//     <View style={Styles.header}>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <View style={{
//           width: 35,
//           height: 35,
//           borderRadius: 20,
//           backgroundColor: '#fff',
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginRight: 10
//         }}>
//           <Ionicons name="arrow-back-sharp" size={30} color="brown" />
//         </View>
//       </TouchableOpacity>

//       <TextInput
//         style={Styles.searchbar}
//         placeholder='البحث'></TextInput>

//       <TouchableOpacity
//         onPress={() => navigation.navigate('Whatsapp')}>

//         <View
//           style={{
//             width: 38,
//             height: 38,
//             borderRadius: 20,
//             backgroundColor: '#fff',
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginLeft: 10,
//             marginBottom: 5
//           }}>

//           <Ionicons
//             name="md-arrow-redo"
//             size={24}
//             color="brown" />

//         </View>
//       </TouchableOpacity>
//     </View>
//   )
// }
