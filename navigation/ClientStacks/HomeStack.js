import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// screens
import Home from "../../screens/Home";
import Cities from "../../screens/Cities";
import SelectAddress from '../../screens/SelectAddress';
import AddAddress from '../../screens/AddAddress';
import Payment from '../../screens/Payment';
import Items from '../../screens/Items';
import Item from "../../screens/Item";
import Cart from "../../screens/Cart";


import { Language } from '../../constants'
import config from '../../config';


// header for screens
import Header from "../../components/Header";


const Stack = createStackNavigator();

export default function  HomeStack(props) {
    const homeComponent=config.SINGLE_MODE?Items: config.MULTI_CITY?Cities:Home;
    const homeComponentName=config.SINGLE_MODE?config.SINGLE_MODE_NAME: config.MULTI_CITY?Language.selectYourCity:config.APP_NAME;
    const itemsComponentName=config.SINGLE_MODE?config.SINGLE_MODE_NAME: Language.items;

    return (
        <Stack.Navigator mode="card" headerMode="screen">
            <Stack.Screen
                name="Home"
                component={homeComponent}
                options={{
                    header: ({ navigation, scene }) => (
                        <Header title={homeComponentName} routeName={"Home"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}
            />
            <Stack.Screen name="RestaurantsInCity" component={Home} options={{
                    header: ({ navigation, scene }) => (
                        <Header title={config.APP_NAME} routeName={"RestaurantsInCity"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen name="Items" component={Items} options={{
                    header: ({ navigation, scene }) => (
                        <Header  options back={!config.SINGLE_MODE} title={itemsComponentName} routeName={"Items"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen name="Item" component={Item} options={{
                    header: ({ navigation, scene }) => (
                        <Header  white back transparent   options  title={Language.items} routeName={"Item"}  navigation={navigation} scene={scene} />
                    ),
                    headerTransparent: true,
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen name="Cart" component={Cart} options={{
                    header: ({ navigation, scene }) => (
                        <Header    back   title={Language.order} routeName={"Cart"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>

            <Stack.Screen name="SelectAddress" component={SelectAddress} options={{
                    header: ({ navigation, scene }) => (
                        <Header back title={Language.orderOptions} routeName={"SelectAddress"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen name="AddAddress" component={AddAddress.AddAddress} options={{
                    header: ({ navigation, scene }) => (
                        <Header back title={Language.addAddress} routeName={"AddAddress"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen name="CompleteAddress" component={AddAddress.CompleteAddress} options={{
                    header: ({ navigation, scene }) => (
                        <Header title={Language.addAddress} routeName={"CompleteAddress"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
            <Stack.Screen  name="Payment" component={Payment} options={{
                    header: ({ navigation, scene }) => (
                        <Header back title={Language.checkout} routeName={"Payment"}  navigation={navigation} scene={scene} />
                    ),
                    cardStyle: { backgroundColor: "#F8F9FE" }
                }}/>
        </Stack.Navigator>
    )
}