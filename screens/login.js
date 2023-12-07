import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';

export default function login({navigation}) {

  const pressHandler = () => {
    navigation.navigate('creaEvento');
  }

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
      <View style={globalStyles.LogoContainer}>
        <Image style={globalStyles.tinyLogo} source={{ uri: 'file:///Users/jacopofelluga/Desktop/EventBuddy/images/EventBuddy%20only%20logo.png'}} />
      </View>
      <View style={globalStyles.LoginContainer}>
        <View style={globalStyles.FormContainer}>
          <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text>
            <TextInput style={globalStyles.input} placeholder="Email"></TextInput>
          <Text style={{ fontWeight: 'bold', fontSize: 20}}>Password</Text>
            <TextInput style={globalStyles.input} placeholder="Password"></TextInput>
          {/* Parte per registra account o  */}
          <TouchableOpacity style={[globalStyles.forgotButton, { marginTop: 10}]}>
            <Text style={{fontWeight: 'bold', fontSize: 12, color: '#062F76'}}>Registrati</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#062F76', marginBottom: 10, marginTop: 10}}>o</Text>
          <TouchableOpacity style={globalStyles.forgotButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#062F76'}}>Recupera Password</Text>
          </TouchableOpacity>
        </View>
        <View style={globalStyles.ButtonContainer}>
          <TouchableOpacity style={globalStyles.button} onPress={pressHandler}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 15}]}>Log-In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};
