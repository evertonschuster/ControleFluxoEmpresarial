import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
const Tab = createMaterialTopTabNavigator();

export default function HomeStackScreen() {

    return (
        <Tab.Navigator
            initialRouteName="OS"
            tabBarOptions={{
                labelStyle: { fontSize: 11, margin: 0, height: 28 },
                tabStyle: { height: 40, },
            }} >
            <Tab.Screen name="CB" options={{ title: "C.B." }} component={HomeScreen} />
            <Tab.Screen name="OS" options={{ title: "O.S." }} component={HomeScreen} />
            <Tab.Screen name="Produtos" options={{ title: "Prod." }} component={NotificationScreen} />
            <Tab.Screen name="Clientes" options={{ title: "Client." }} component={NotificationScreen} />
            <Tab.Screen name="Servicos" options={{ title: "Serv." }} component={NotificationScreen} />
        </Tab.Navigator>
    );
}