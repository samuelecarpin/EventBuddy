// Importa le librerie necessarie
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global';

// Importa le componenti per le schermate
import HomeScreen from '../screens/home.js';
import PersonaleScreen from '../screens/eventoSingolo.js';
import CreaScreen from '../screens/eventoSingolo.js';
import AccountScreen from '../screens/login.js';
{/*import { View } from 'react-native-reanimated/lib/typescript/Animated.js';

*/}

// Crea tab navigator per la navigazione tra le schermate principali
const Tab = createBottomTabNavigator();


// Configurazione del tab navigator
const App = () => {
  return (
    <View  style={[{backgroundColor: "blue"}, {flex:1}]}>
    <NavigationContainer style={globalStyles.navStyles}>
      <Tab.Navigator
        tabBarOptions={{
            activeTintColor: '#FFF',
            inactiveTintColor: '#B0B0B0',
            }}
        screenOptions={{headerShown:false}}
            >
        <Tab.Screen name="Home" component={HomeScreen}
            options={{
                tabBarStyle: {
                    backgroundColor:"#062F76",
                    paddingTop:10,
                },
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                <Icon name="ios-home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen name="Personale" component={PersonaleScreen} 
            options={{
                tabBarStyle: {
                    backgroundColor:"#062F76",
                },
                tabBarLabel: 'Personale',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="people-sharp" size={size} color={color} />
                ),
            }}
        />
        <Tab.Screen name="Crea" component={CreaScreen}
            options={{
                tabBarStyle: {
                    backgroundColor:"#062F76",
                },
                tabBarLabel: 'Crea',
                tabBarIcon: ({ color, size }) => (
                <AntDesign name="pluscircle" size={size} color={color} />
                ),
            }}
        />
        <Tab.Screen name="Account" component={AccountScreen}
            options={{
                tabBarStyle: {
                    backgroundColor:"#062F76",
                },
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
                ),
            }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
};

export default App;
