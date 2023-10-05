// import React from 'react';
// import {Entypo} from '@expo/vector-icons';
// import {MaterialIcons} from '@expo/vector-icons';
// import {MaterialCommunityIcons} from '@expo/vector-icons';
// import {FontAwesome5} from '@expo/vector-icons';
// import {useNavigation} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Notification from '../screens/notification';
// import Header from './Header';
// import Addnew from '../screens/Addnew';
// import Msg from '../screens/Messages';
// import Profile from '../screens/profile';
// import Stack from './Stack';
// const Tab = createBottomTabNavigator();
// export default function App() {
//   const navigation = useNavigation();
//   return (
//     <Tab.Navigator screenOptions={{backgroundColor: '#f8f8ff'}}>
//       <Tab.Screen
//         name="Home"
//         component={Stack}
//         options={{
//           tabBarIcon: () => <Entypo name="home" size={28} color="#D2691E" />,
//           headerShown: false,
//           tabBarInactiveTintColor: '#D2691E',
//         }}
//       />
//       {/* <Tab.Screen name='Home' component={Home} options={{tabBarIcon:()=> <Entypo name="home" size={28} color="#D2691E"/>,header:()=><Header/>}}/> */}

//       <Tab.Screen
//         name="Notification"
//         component={Notification}
//         options={{
//           tabBarIcon: () => (
//             <MaterialIcons
//               name="notifications-none"
//               size={35}
//               color="#D2691E"
//             />
//           ),
//           header: () => <Header />,
//           tabBarInactiveTintColor: '#D2691E',
//         }}
//       />

//       <Tab.Screen
//         name="Add New"
//         component={Addnew}
//         options={{
//           tabBarIcon: () => (
//             <MaterialCommunityIcons name="plus" size={33} color="#D2691E" />
//           ),
//           header: () => <Header />,
//           tabBarInactiveTintColor: '#D2691E',
//         }}
//       />

//       <Tab.Screen
//         name="Messages"
//         component={Msg}
//         options={{
//           tabBarIcon: () => (
//             <MaterialCommunityIcons
//               name="email-outline"
//               size={35}
//               color="#D2691E"
//             />
//           ),
//           header: () => <Header />,
//           tabBarInactiveTintColor: '#D2691E',
//         }}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: () => (
//             <FontAwesome5 name="user" size={25} color="#D2691E" />
//           ),
//           headerShown: false,
//           tabBarInactiveTintColor: '#D2691E',
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
