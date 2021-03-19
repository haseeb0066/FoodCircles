import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Easing, Animated, Dimensions } from "react-native";


// drawer
import CustomDrawerContent from "./../Menu";

import HomeStack from "./HomeStack"
import AuthStack from "./AuthStack"

const { width } = Dimensions.get("screen");
const Drawer = createDrawerNavigator();




export default function  PublicAppStack(props) {
    return (
      <Drawer.Navigator
        style={{ flex: 1 }}
        drawerContent={props => <CustomDrawerContent {...props} screens={[
          {"title":"Home",'link':"Home"},
          {"title":"Login",'link':"Login"},
        ]} />}
        drawerStyle={{
          backgroundColor: "white",
          width: width * 0.8
        }}
        drawerContentOption={{
          activeTintcolor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.75,
            backgroundColor: "transparent",
            paddingVertical: 16,
            paddingHorizonal: 12,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            marginLeft: 12,
            fontWeight: "normal"
          }
        }}
        initialRouteName="Home"
      >
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="Login" component={AuthStack} />
      </Drawer.Navigator>
    );
  }