import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function login({navigation}) {

    const [key, setKey] = React.useState('userToken');
    const [loginError, setError] = useState(false);
    const [tokenError, setTokenError] = useState(false);

    async function getValueFor(key) {
        const keyResp = await SecureStore.getItemAsync(key);
        if (keyResp) {
            setError(false);
            navigation.navigate('creaEvento');
            chechToken(keyResp);
        } else {
            setError(true);
        }
    }

    const chechToken = (token) => {
      setError(false);
      fetch('http://api.weventsapp.it/api/get_user', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ token
        },
        })
        .then(response => response.json())
        .then(data => {
            if(data.user) {
              setTokenError(false);
              navigation.navigate('creaEvento');
            } else {
              setTokenError(true);
            }

      })
    }

    const creaEvento = () => {
        getValueFor(key);
    }

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
      <View style={[globalStyles.FormContainer, {height: '100%', justifyContent: 'center'}]}>
          <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
              <TouchableOpacity>
                  <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
              </TouchableOpacity>
              <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Crea</Text>
              <TouchableOpacity>
                  <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
              </TouchableOpacity>
          </View>
          {/* Parte per registra account o  */}
          {
          loginError ? (
            <Text style={{fontSize: 15, color: '#ff5b4f', marginBottom: 10}}>Devi prima effettuare il login</Text>
            ): null
          }
          {
          tokenError ? (
            <Text style={{fontSize: 15, color: '#ff5b4f', marginBottom: 10}}>Token non riconosciuto</Text>
            ): null
          }
          <TouchableOpacity style={globalStyles.button} onPress={creaEvento}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Crea un evento</Text>
          </TouchableOpacity>
          {/* <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#062F76', marginBottom: 15, marginTop: 15}}>oppure</Text>
          <TouchableOpacity style={globalStyles.button} onPress={creaEvento}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Crea un annuncio</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};
