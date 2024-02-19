
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';


export default function Home({ navigation }) {
  const [haveValues, setHaveValues] = useState(false);
  const [password, setPassword] = useState('');
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  
  async function getValueFor(key) {
      setValue(await SecureStore.getItemAsync(key));
      if (value) {
          console.log("🔐 Here's your value 🔐 \n" + value);
      }
  }

  async function saveValue(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  useEffect(() => {
    if (haveValues === false) {
      getValueFor(key)
      } 
  });

  const goBack = () => {
    navigation.goBack();
  };

  const deleteAccount = () => {
    fetch('http://api.weventsapp.it/api/deleteUser', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+ value
        },
        body: JSON.stringify({
          "password": password,
        })
    })
    .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                  Alert.alert('Successo', 'Utente eliminato con successo', [
                    {
                        text: 'OK'
                    },
                  ]);
                  navigation.navigate("login");
                  saveValue(key, '')
                } else {
                  var errorsKeys = Object.keys(data.error);
                  var errorsObj = Object.values(data.error);
                  var errors = "";
                  for (let i = 0; i < errorsKeys.length; i++) {
                      errors = errors + errorsKeys[i] + ": " + errorsObj[i] + "\n";
                  }
                  Alert.alert('Errore', errors, [
                      {
                          text: 'OK'
                      },
                  ]);
              }
          });
  };


return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}}>
          <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
            <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
            <View style={globalStyles.FormContainer}>
              <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                  <TouchableOpacity onPress={goBack}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                  </TouchableOpacity>
                  <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Elimina account</Text>
                  <TouchableOpacity onPress={goBack}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                  </TouchableOpacity>
              </View>
              <View style={[globalStyles.FormContainer]}>
                <Text style={[{ fontWeight: 'bold', fontSize: 20}]} >Immetti la tua password</Text>
                    <TextInput onChangeText={password => setPassword(password)} style={globalStyles.input} placeholder='password'></TextInput>
              </View>
            </View>
        </View>
          <View style={[globalStyles.FormContainer2]}>
              <TouchableOpacity style={[globalStyles.logOut]} onPress={deleteAccount}>
                  <Text style={[globalStyles.titoliRiga, globalStyles.whiteText, { fontWeight: 'bold', fontSize: 17}]}>Elimina il mio account</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
}
