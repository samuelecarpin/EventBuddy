import React from 'react';
import {View, Text, TouchableOpacity, SafeAreaView, Image} from 'react-native';
import { globalStyles } from '../styles/global';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function login({navigation}) {

  const login = () => {
    navigation.navigate('login');
  }

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1}}>
      <View style={[globalStyles.FormContainer, {height: '100%', justifyContent: 'center', paddingLeft: '10%', paddingRight: '10%'}]}>
            <MaterialCommunityIcons name="email-check-outline" size={70} color="black" />
            <Text style={{fontWeight: 'bold', fontSize: 20, color: 'black', margin: 10, marginBottom: 20, textAlign:'center'}}>Esegui la verifica dell'email per attivare il tuo account !</Text>
          {/* Parte per registra account o  */}
          <TouchableOpacity style={globalStyles.button} onPress={login}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Ho capito</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
