// Importa le librerie necessarie
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/global.js';
// Importa le componenti per le schermate
import HomeScreen from '../routes/AppHome.js';
import PersonaleScreen from '../routes/AppPersonale.js';
import CreaScreen from '../routes/AppCrea.js';
import AccountScreen from '../routes/AppAccount.js';
import LocaliScreen from '../routes/AppLocali.js';
{/*import { View } from 'react-native-reanimated/lib/typescript/Animated.js';

*/}

// Crea tab navigator per la navigazione tra le schermate principali
const Tab = createBottomTabNavigator();

// Configurazione del tab navigator
const App = () => {
  return (
        <NavigationContainer style={[globalStyles.navStyles]}>
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#FFF',
                    inactiveTintColor: '#B0B0B0',
                    }}
                screenOptions={{headerShown:false}}
                    >
                <Tab.Screen name="Home" component={HomeScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor:"#062F76",
                            paddingTop:15,
                            borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
                            borderTopRightRadius: 30,
                        },
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="Locali" component={LocaliScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor:"#062F76",
                            paddingTop:15,
                            borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
                            borderTopRightRadius: 30,
                        },
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome5 name="compact-disc" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen name="Crea" component={CreaScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor:"#062F76",
                            paddingTop:15,
                            borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
                            borderTopRightRadius: 30,
                        },
                        tabBarLabel: 'Crea',
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="pluscircle" size={size} color={color} />
                        ),
                    }}
                />
                {/* <Tab.Screen name="Personale" component={PersonaleScreen} 
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor:"#062F76",
                            paddingTop:15,
                            borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
                            borderTopRightRadius: 30,
                        },
                        tabBarLabel: 'Personale',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-sharp" size={size} color={color} />
                        ),
                    }}
                /> */}
                <Tab.Screen name="Account" component={AccountScreen}
                    options={{
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor:"#062F76",
                            paddingTop:15,
                            borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
                            borderTopRightRadius: 30,
                        },
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    
  );
};

export default App;