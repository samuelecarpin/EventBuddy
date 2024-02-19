

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ActivityIndicator} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';


export default function Home({ navigation }) {

  const [website, setWebsite] = useState(null)
  const [facebookLink, setFacebookLink] = useState(null)
  const [instagramLink, setInstagramLink] = useState(null)
  const [twitterLink, setTwitterLink] = useState(null)
  const [youtubeLink, setYoutubeLink] = useState(null)
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  const [haveValues, setHaveValues] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getValueFor(key) {
    setValue(await SecureStore.getItemAsync(key));
    if (value) {
        console.log("🔐 Here's your value 🔐 \n" + value);
    }
  }
  const goBack = () => {
    navigation.goBack();
  };

  function getUserData() {
    fetch('http://api.weventsapp.it/api/get_user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer '+ value
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFacebookLink(data.user.facebookLink)
        setInstagramLink(data.user.instagramLink)
        setTwitterLink(data.user.twitterLink)
        setYoutubeLink(data.user.youtubeLink)
        setWebsite(data.user.website)
        setLoading(false)
        setHaveValues(true)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle error if needed
      });

  }

  useEffect(() => {
    if (haveValues === false) {
      getValueFor(key)
      getUserData();
    }
    
  });

  function saveUserData () {
    fetch('http://api.weventsapp.it/api/updateUser?type=links&_method=PUT', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
            Authorization: 'Bearer '+ value
        },
        body: JSON.stringify({
          "facebookLink": facebookLink,
          "youtubeLink": youtubeLink,
          "twitterLink": twitterLink,
          "instagramLink": instagramLink,
          "website": website,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                Alert.alert('Successo', 'Dati modificati con successo', [
                    {
                        text: 'OK'
                    },
                ]);
                navigation.navigate('account');
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
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating user information:', error);
        });
  }

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }

  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}]}>
        <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
            <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
                <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                    <TouchableOpacity onPress={goBack} style={{marginTop:5}}>
                        <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                    </TouchableOpacity>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Link ai social</Text>
                    <TouchableOpacity>
                        <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.containerSocial}>
                    <View style={[{ width: '80%'},globalStyles.containerSocial]}>
                        <Text style={globalStyles.inputLabelSocial}>Facebook</Text>
                        <TextInput onChangeText={link => setFacebookLink(link)} style={globalStyles.input}placeholder="Inserisci link Facebook" >{facebookLink}</TextInput>
                        <Text style={globalStyles.inputLabelSocial}>Instagram</Text>
                        <TextInput onChangeText={link => setInstagramLink(link)} style={globalStyles.input}placeholder="Inserisci link Instagram">{instagramLink}</TextInput>
                        <Text style={globalStyles.inputLabelSocial}>TikTok</Text>
                        <TextInput onChangeText={link => setTwitterLink(link)} style={globalStyles.input}placeholder="Inserisci link TikTok">{twitterLink}</TextInput>
                        <Text style={globalStyles.inputLabelSocial}>Youtube</Text>
                        <TextInput onChangeText={link => setYoutubeLink(link)} style={globalStyles.input}placeholder="Inserisci link Youtube">{youtubeLink}</TextInput>
                        <Text style={globalStyles.inputLabelSocial}>Sito web</Text>
                        <TextInput onChangeText={link => setWebsite(link)} style={globalStyles.input}placeholder="Inserisci link del sito web">{website}</TextInput>
                    </View>
        

                </View>
        </View>
                <View style={[ globalStyles.FormContainer2]}>
                      <TouchableOpacity onPress={saveUserData} style={globalStyles.button}>
                        <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Invia</Text>
                      </TouchableOpacity>
                </View> 
    </View>
  );
};