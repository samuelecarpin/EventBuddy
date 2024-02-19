import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import * as SecureStore from 'expo-secure-store';

export default function login({navigation}) {
  const [email, setEmail] = useState('11@2.3')
  const [password, setPassword] = useState('12345678')
  const [key, setKey] = React.useState('userToken');
  const [credentialsError, setCredentialsError] = useState(false)
  const [verificationError, setVerificationError] = useState(false) 
  const [loading, setLoading] = useState(true);

  async function getValueFor(key) {
      const keyResp = await SecureStore.getItemAsync(key);
      if (keyResp) {
          chechToken(keyResp);
      } else {
          //setError(true);
      }
  }

  getValueFor(key);

  const chechToken = (token) => {
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
            if(data.user.email_verified_at != null) {
              setVerificationError(false);
              navigation.navigate("account");
              setLoading(false);
            } else {
              setVerificationError(true);
            }
          }

    })
  }
  
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const logIn = async () => {
    try {
      const response = await fetch('http://api.weventsapp.it/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        }),
      });

      const data = await response.json();
      if (data.success === true) {
        setCredentialsError(false);
        chechToken(data.token)
        save(key, data.token)
      } else {
        setCredentialsError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const registrazione = () => {
    navigation.navigate('registrazione');
  }

  

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
      <View style={globalStyles.LogoContainer}>
        <Image style={globalStyles.tinyLogo} source={{ uri: '/Users/jacopofelluga/Apps/EventBuddyGit/assets/logoSimbolo.png'}} />
      </View>
      <View style={globalStyles.LoginContainer}>
        <View style={globalStyles.FormContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text>
            <TextInput autoCompleteType="email" keyboardType="email-address" autoCapitalize="none" onChangeText={email => setEmail(email)} style={globalStyles.input} placeholder="Email"></TextInput>
          <Text style={{ fontWeight: 'bold', fontSize: 20}}>Password</Text>
            <TextInput autoCompleteType="password" secureTextEntry onChangeText={password => setPassword(password)} style={globalStyles.input} placeholder="Password"></TextInput>
          {
          credentialsError ? (
            <Text style={{fontSize: 15, color: '#ff5b4f', marginBottom: 10}}>Credenziali non valide</Text>
            ): null
          }
          {
          verificationError ? (
            <Text style={{fontSize: 15, color: '#ff5b4f', marginBottom: 10}}>Devi prima verificare la tua email</Text>
            ): null
          }
          <TouchableOpacity onPress={registrazione} style={[globalStyles.forgotButton, { marginTop: 10}]}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#062F76'}}>Registrati</Text>
          </TouchableOpacity>
          {/* Parte per registra account o  
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#062F76', marginBottom: 10, marginTop: 10}}>o</Text>
          <TouchableOpacity onPress={registrazione} style={[globalStyles.forgotButton]}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#062F76'}}><FontAwesome name="google" size={15} color="#062F76" /> Login</Text>
          </TouchableOpacity>*/}
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#062F76', marginBottom: 10, marginTop: 10}}>o</Text>
          <TouchableOpacity style={globalStyles.forgotButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#062F76'}}>Recupera Password</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.ButtonContainer}>
          <TouchableOpacity style={globalStyles.button} onPress={logIn}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 15}]}>Log-In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};
