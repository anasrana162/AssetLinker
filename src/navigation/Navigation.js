import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GetStarted from '../screens/GetStarted';
// import Login from '../screens/Login';
import Login from '../screens/Authentication/login';
// import SignUp from '../screens/SignUp';
import Signup from '../screens/Authentication/SIgnup';
import Splash from '../screens/Splash';
// import Home from '../screens/Home';
// import Home from '../screens/Dash/Home';
import Dash from '../screens/Dash/Home';
import DetailScreen from '../screens/DetailScreen';
import ForgotPassword from '../screens/ForgotPassword';
import AccountScreen from '../screens/AccountScreen';
import Sell from '../screens/Sell';
import MyAdds from '../screens/MyAdds';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Chat from '../screens/Chat';
import ChangePassword from '../screens/ChangePassword';
import EditProfile from '../screens/EditProfile';
import Setting from '../screens/Setting';
import Privacy from '../screens/Privacy';
import ChangeAccountpassword from '../screens/ChangeAccountpassword';
import ManageAccount from '../screens/ManageAccount';
import Notification from '../screens/Notification';
import About from '../screens/About';
import UserProfile from '../screens/UserProfile';
import DeleteAccount from '../screens/DeleteAccount';
import Location from '../screens/Location';
import Notifications from '../screens/Notifications';
import LocationSearch from '../components/LocationSearch';
import VoiceOfLinkerNews from '../screens/VoiceOfLinkerNews';
import PropertySearch from '../screens/PropertySearch';
import Favourite from '../screens/Favourite';
import Messages from '../screens/Messages';
import { useNavigation } from '@react-navigation/native';
import ActionSheet from 'react-native-actions-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommentScreen from '../screens/CommentScreen';
import Post from '../screens/Post/Post';
import { NavService } from '../config';
import { useSelector } from 'react-redux';
import OTP from '../screens/OTP';
import MyProfile from '../screens/MyProfile';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();
// const NewTab = () => {
//   const navigation = useNavigation();


//   const data = [
//     { name: 'seller' },
//     { name: 'builder' },
//     { name: 'consultant' },
//     { name: 'all' },
//   ]



//   return (
//     <View style={{ flex: 1 }}>
//       <FlatList
//         data={data}
//         renderItem={(item) =>
//           <TouchableOpacity
//             style={{
//               justifyContent: 'space-between',
//               marginVertical: 6,
//               width: '100%',
//               height: 60,
//               backgroundColor: '#D3D3D3',
//               flexDirection: 'row',
//               padding: 15,
//               alignItems: 'center',
//             }}
//             onPress={() => navigation.navigate('AccountScreen', item?.item?.name)}>
//             <Text style={{ color: 'black', fontSize: 22 }}>{item?.item?.name?.toUpperCase()}</Text>
//             <AntDesign name="right" size={15} color="#000" />
//           </TouchableOpacity>
//         }
//       />




//     </View>
//   );
// };

// function MyTabs() {
//   const navigation = useNavigation();

//   return (
//     <>
//       <Tab.Navigator
//         initialRouteName="HOME"
//         screenOptions={({ route, index }) => ({
//           headerShown: false,
//           headerTitleStyle: { fontWeight: 'bold' },
//           tabBarActiveTintColor: '#FFB100',
//           tabBarInactiveTintColor: '#fff',
//           tabBarInactiveBackgroundColor: '#023661',
//           tabBarActiveBackgroundColor: '#023661',
//           tabBarLabelStyle: { fontSize: 11 },

//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === 'HOME') {
//               iconName = focused ? 'home' : 'home';
//             }
//             else if (route.name === 'CHAT') {
//               iconName = focused ? 'message-outline' : 'message-outline';
//             }
//             else if (route.name === 'POST') {
//               iconName = focused
//                 ? 'plus-circle-outline'
//                 : 'plus-circle-outline';
//             } else if (route.name === 'Favourite') {
//               iconName = focused ? 'heart-outline' : 'heart-outline';
//             } else if (route.name === 'ACCOUNT') {
//               iconName = focused
//                 ? 'account-settings-outline'
//                 : 'account-settings-outline';
//             }

//             return (
//               <MaterialCommunityIcons
//                 name={iconName}
//                 size={size}
//                 color={color}
//                 style={{ marginTop: 5 }}
//               />
//             );
//           },
//         })}>
//         <Tab.Screen
//           name="HOME"
//           component={Home}
//           options={{
//             tabBarLabel: 'Home',
//           }}
//         />

//         <Tab.Screen
//           name="CHAT"
//           component={Chat}
//           options={{
//             tabBarLabel: 'Chat',
//           }}
//         />

//         <Tab.Screen
//           name="POST"
//           component={Post}
//           options={{
//             tabBarLabel: 'Post',
//           }}
//         />
//         <Tab.Screen
//           name="Favourite"
//           component={Favourite}
//           options={{
//             tabBarLabel: 'Favourite',
//           }}
//         />
//         <Tab.Screen
//           name="ACCOUNT"
//           component={NewTab}
//           options={{
//             tabBarLabel: 'Accounts',
//           }}
//         />
//       </Tab.Navigator>
//     </>
//   );
// }

const Stack = createNativeStackNavigator();

// const AuthStack = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         contentStyle: { backgroundColor: 'transparent' },
//       }}
//       initialRouteName="Splash">
//       <Stack.Screen
//         name="Splash"
//         component={Splash}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="GetStarted"
//         component={GetStarted}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={Login}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={Signup}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Forgot"
//         component={ForgotPassword}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="OTP"
//         component={OTP}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="ChangePassword"
//         component={ChangePassword}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };
export default Navigation = () => {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GetStarted"
          component={GetStarted}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dash"
          component={Dash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          component={Messages}
          options={{ headerShown: false }}
        />


        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangeAccountpassword"
          component={ChangeAccountpassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageAccount"
          component={ManageAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={About}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DeleteAccount"
          component={DeleteAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Location"
          component={Location}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LocationSearch"
          component={LocationSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertySearch"
          component={PropertySearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VoiceOfLinkerNews"
          component={VoiceOfLinkerNews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommentScreen"
          component={CommentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default Navigation = () => {
//   const user = useSelector(({ reducer: { user } }) => user);
//   console.log("useruser", user);
//   // const [ready, setReady] = useState(false);
//   const [ready, setReady] = React.useState(true);
//   const [initialRouteName, setInitialRouteName] = React.useState('AuthStack');
//   // const [initialRouteName, setInitialRouteName] = useState('AppStack');
//   React.useEffect(() => {
//     setTimeout(() => {
//       if (user) {
//         setInitialRouteName('AppStack');
//       }
//       setReady(true);
//     }, 2000);
//   }, []);

//   if (!ready) return null;
//   return (

//     <NavigationContainer
//       ref={ref => NavService.setTopLevelNavigator(ref)}
//     >
//       <Stack.Navigator
//         screenOptions={{
//           contentStyle: { backgroundColor: 'transparent' },

//         }}
//         initialRouteName={initialRouteName}>

//         {
//           user ?
//             <Stack.Screen
//               name="AppStack"
//               component={AppStack}
//               options={{ headerShown: false }}
//             /> :
//             <Stack.Screen
//               name="AuthStack"
//               component={AuthStack}
//               options={{ headerShown: false }}
//             />

//         }

//       </Stack.Navigator>
//     </NavigationContainer>

//   );
// };



const ActionSheetComponent = ({
  title = '',
  dataset = [],
  onPress = () => { },
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
              <Text style={{ color: '#000', fontSize: 16 }} numberOfLines={1}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
