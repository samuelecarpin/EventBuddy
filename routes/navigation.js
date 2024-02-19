// Importa le librerie necessarie
import React, { useEffect, useState } from 'react';
import { View, Platform, Keyboard } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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

// Crea tab navigator per la navigazione tra le schermate principali
const Tab = createBottomTabNavigator();

const iosOrAndroid = Platform.OS === "ios" ? 80 : 60;
const marginIosOrAndroid = Platform.OS === "ios" ? -5 : 10;

// Configurazione del tab navigator
const App = () => {
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setKeyboardShown(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardShown(false);
      }
    );

    // Clean up function
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <NavigationContainer style={[globalStyles.navStyles]}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#FFF',
          inactiveTintColor: '#B0B0B0',
        }}
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#062F76",
              paddingTop: 15,
              height: keyboardShown ? 0 : iosOrAndroid,
              borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
              borderTopRightRadius: 30,
              display: keyboardShown ? 'none' : 'flex',
            },
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-home" color={color} size={27} style={{ marginBottom: marginIosOrAndroid }} />
            ),
          }}
        />
        <Tab.Screen
          name="Locali"
          component={LocaliScreen}
          options={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#062F76",
              paddingTop: 15,
              height: keyboardShown ? 0 : iosOrAndroid,
              borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
              borderTopRightRadius: 30,
              display: keyboardShown ? 'none' : 'flex',
            },
            tabBarLabel: 'Locali',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="compact-disc" size={27} color={color} style={{ marginBottom: marginIosOrAndroid }} />
            ),
          }}
        />
        <Tab.Screen
          name="Crea"
          component={CreaScreen}
          options={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#062F76",
              paddingTop: 15,
              height: keyboardShown ? 0 : iosOrAndroid,
              borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
              borderTopRightRadius: 30,
              display: keyboardShown ? 'none' : 'flex',
            },
            tabBarLabel: 'Crea',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="pluscircle" size={27} color={color} style={{ marginBottom: marginIosOrAndroid }} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: "#062F76",
              paddingTop: 15,
              height: keyboardShown ? 0 : iosOrAndroid,
              borderTopLeftRadius: 30, // Bordo arrotondato in alto a sinistra
              borderTopRightRadius: 30,
              display: keyboardShown ? 'none' : 'flex',
            },
            tabBarLabel: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={27} color={color} style={{ marginBottom: marginIosOrAndroid }} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
