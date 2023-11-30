import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from '../screens/LoginPage'
import RegisterPage from '../screens/RegisterPage'
import HomePage from '../screens/HomePage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import ProductInfoPage from '../screens/ProductInfoPage'
import CreateAddressPage from '../screens/CreateAddressPage'
import AddressPage from '../screens/AddressPage'
import CartPage from '../screens/CartPage'
import ProfilePage from '../screens/ProfilePage'

const StackNavigator = () => {
    const Stack = createNativeStackNavigator();

    const Tab = createBottomTabNavigator();
    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color="#008E97" />
                            ) : (
                                <AntDesign name="home" size={24} color="black" />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Profile"
                    component={ProfilePage}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "#008E97" },
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person" size={24} color="#008E97" />
                            ) : (
                                <Ionicons name="person-outline" size={24} color="black" />
                            ),
                    }}
                />

                <Tab.Screen
                    name="Cart"
                    component={CartPage}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: "#008E97" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign name="shoppingcart" size={24} color="#008E97" />
                            ) : (
                                <AntDesign name="shoppingcart" size={24} color="black" />
                            ),
                    }}
                />
            </Tab.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Info" component={ProductInfoPage} options={{ headerShown: false }} />
                <Stack.Screen name="Address" component={CreateAddressPage} options={{ headerShown: false }} />
                <Stack.Screen name="Add" component={AddressPage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})