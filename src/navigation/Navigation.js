import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from '../screens/GetStarted';
import Login from '../screens/Authentication/login';
import Signup from '../screens/Authentication/SIgnup';
import Splash from '../screens/Splash';
import Dash from '../screens/Dash/Home';
import ForgetPassword from '../screens/Authentication/ForgetPassword';
import ChangePassword from '../screens/Authentication/ChangePassword';
import Post from '../screens/Post/Post';
import Otp from '../screens/Authentication/Otp';
import MyProfile from '../screens/Profile/MyProfile';
import PostDetail from '../screens/Dash/PostDetail';
import UserProfileDetail from '../screens/Dash/UserProfileDetail';
import EditProfile from '../screens/Profile/EditProfile';
import Favourite from '../screens/Favourite/Favourite';


const Stack = createNativeStackNavigator();


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
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={Otp}
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
          name="Post"
          component={Post}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetail"
          component={PostDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserProfileDetail"
          component={UserProfileDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

