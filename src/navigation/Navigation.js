import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "../screens/GetStarted";
import Login from "../screens/Authentication/login";
import Signup from "../screens/Authentication/SIgnup";
import Splash from "../screens/Splash";
import Dash from "../screens/Dash/Home";
import ForgetPassword from "../screens/Authentication/ForgetPassword";
import ChangePassword from "../screens/Authentication/ChangePassword";
import Post from "../screens/Post/Post";
import Otp from "../screens/Authentication/Otp";
import MyProfile from "../screens/Profile/MyProfile";
import PostDetail from "../screens/Dash/PostDetail";
import EditProfile from "../screens/Profile/EditProfile";
import Favourite from "../screens/Favourite/Favourite";
import Account from "../screens/Account/Account";
import { Colors } from "../config";
import AccountsList from "../screens/Account/AccountsList";
import AccountDetail from "../screens/Account/AccountDetail";
import UserProfileDetail from "../screens/Account/UserProfileDetail";
import ChatScreen from "../screens/Chat/ChatScreen";

const Stack = createNativeStackNavigator();

export default Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Splash"}
        screenOptions={{
          contentStyle: { backgroundColor: "transparent" },
          headerShown: false,
          // options: {
          //   headerTitleAlign: "center",
          //   headerStyle: { backgroundColor: Colors.blue },
          //   headerTintColor: "#fff",
          //   animation: "slide_from_right",
          // },
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Forgot" component={ForgetPassword} />
        <Stack.Screen name="OTP" component={Otp} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />

        <Stack.Screen name="Dash" component={Dash} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="PostDetail" component={PostDetail} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Favourite" component={Favourite} />
        <Stack.Screen name="AccountsList" component={AccountsList} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="AccountDetail" component={AccountDetail} />
        <Stack.Screen name="UserProfileDetail" component={UserProfileDetail} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
