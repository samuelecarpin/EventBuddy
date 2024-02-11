

import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';


export default function Home({ navigation }) {

  const [email, setEmail] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const vaiAResetPasswordContinua = () => {
    fetch('http://eventbuddy.localhost/api/resetPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email" : email,
      })
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        navigation.navigate("resetPasswordContinua");
      } else {
        var errorsKeys = Object.keys(data.errors);
        var errorsObj = Object.values(data.errors);
        var errors = "";
        for (i = 0; i < errorsKeys.length; i++) {
            errors = errors + errorsKeys[i] + ": " + errorsObj[i] + "\n"
        }
        Alert.alert('Errore', errors, [
            {
                text: 'OK'
            },
        ]);
      }
    })
  };


return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}}>
          <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
            <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
                <View style={globalStyles.FormContainer}>
                  <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30, alignItems:"center", textAlign:"center"}]}>
                      <TouchableOpacity onPress={goBack}>
                          <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                      </TouchableOpacity>
                      <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Reset password</Text>
                      <TouchableOpacity>
                          <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                      </TouchableOpacity>
                  </View>
                  <View style={[globalStyles.FormContainer]}>
                      <Text style={[{ fontWeight: 'bold', fontSize: 20}]} >Inserisci la tua email</Text>
                          <TextInput autoCapitalize='none' onChangeText={email => setEmail(email)} style={globalStyles.input} placeholder='email' ></TextInput>
                  </View>
                </View>
          </View>
              <View style={[globalStyles.FormContainer]}>
                    <TouchableOpacity style={[globalStyles.button]} onPress={vaiAResetPasswordContinua}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Avanti</Text>
                    </TouchableOpacity>
              </View>
        </View>
  );
}
