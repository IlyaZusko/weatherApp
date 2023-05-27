import * as React from 'react';
import { useCallback } from 'react';
import { View } from 'react-native';


// navigation import
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import Home from './src/Screen/Home.js'; // Home screen of the app
import Forecast from './src/Screen/Forecast.js'; // Forecast screen of the app

//Icons
import { Ionicons } from '@expo/vector-icons';


// Create navigation methods
// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



export default function Navigate() {
    return (
        <NavigationContainer>
            <Tab.Navigator 
            //191D1E 6E93FF
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        height: '8.5%',
                        bottom: 0,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        backgroundColor: '#212325',
                        borderTopWidth: 0,
                    },
                    
                }}
            >
                <Tab.Screen 
                    name='Forecast'
                    component={Forecast}
                    options={{
                        tabBarIcon: ({}) => (
                            <Ionicons name="ios-sunny" size={24} color="white" style={{marginTop: 10}} />
                        )
                    }}
                />
                <Tab.Screen 
                    name='Home'
                    component={Home}
                    options={{
                        tabBarIcon: ({}) => (
                            <Ionicons name="ios-navigate-circle" size={24} color="white" style={{marginTop: 10}}/>
                        )
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

