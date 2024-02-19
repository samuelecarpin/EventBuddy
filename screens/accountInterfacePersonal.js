import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Linking, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Importa le icone MaterialIcons
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import {Ionicons} from "@expo/vector-icons"
import { globalStyles } from '../styles/global';

export default function Home({navigation}) {
  const [hasEvents, sethasEvents] = useState(false);
  const [username, setUsername] = useState(null)
  const [userId, setUserId] = useState(null)
  const [immagineBack, setImmagineBack] = useState({uri: ''});
  const [website, setWebsite] = useState(null)
  const [facebookLink, setFacebookLink] = useState(null)
  const [instagramLink, setInstagramLink] = useState(null)
  const [twitterLink, setTwitterLink] = useState(null)
  const [youtubeLink, setYoutubeLink] = useState(null)
  const [cardEvents, setcardEvents] = useState([]);
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  const [haveValues, setHaveValues] = useState(false);

  async function getValueFor(key) {
    setValue(await SecureStore.getItemAsync(key));
    if (value) {
        console.log("🔐 Here's your value 🔐 \n" + value);
    }
  }

  function apriSocial(social){
    Linking.canOpenURL(social).then((SUPPORTED) => {
      SUPPORTED && Linking.openURL(social);
    })
  }


  function apriEvento (id) {
    navigation.navigate('eventoPersonaleSingolo', {
      paramKey: id,
    });
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
        setImmagineBack({uri: data.user.accountImage != '' ? 'https://api.weventsapp.it/'+data.user.accountImage : ''})
        setUsername(data.user.username)
        setFacebookLink(data.user.facebookLink);
        setInstagramLink(data.user.instagramLink)
        setTwitterLink(data.user.twitterLink)
        setYoutubeLink(data.user.youtubeLink)
        setWebsite(data.user.website)
        setUserId(data.user.id)
        setHaveValues(true)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle error if needed
      });

  }

  function generateUserEvents () {
    if (userId != null) {
    fetch('http://api.weventsapp.it/api/getUserEvents/'+userId, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if(data != ""){
          sethasEvents(true);
        const eventCards = data.map((event, index) => (
          <TouchableOpacity key={event.id} style={globalStyles.containerCardEventi} onPress={() => apriEvento(event.id)}>
          <Image source={event.imagePath.startsWith("e") ? {uri:'https://api.weventsapp.it/'+event.imagePath} : {uri :event.imagePath}} style={globalStyles.backgroundImageCardEventi} />
              <View style={globalStyles.contentContainerCardEventi}>
                <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{event.name}</Text>
                <Text style={globalStyles.sottotitoloCardEventi}>
                Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}
                </Text>
              </View>
          </TouchableOpacity>
        ));        
        setcardEvents(eventCards)
        setLoading(false)
      }else{
        sethasEvents(false);
      }
    }
    )
    }
  }

  useEffect(() => {
    if (haveValues === false) {
      getValueFor(key)
      getUserData();
      generateUserEvents()
    }
  });

    const goToSettings = () => {
        navigation.navigate('account');
      };

  return (
<View style={{ flex: 1, backgroundColor: '#FFF'}}>
  <ScrollView>
    <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
    <View style={globalStyles.containerACC}>
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity style={{
      //padding:10,
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
      marginTop:30,
    }}>
        <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
        </TouchableOpacity>
    <View style={{width:"70%"}}></View>
      <TouchableOpacity style={globalStyles.settingsIconACC} onPress={goToSettings}>
        <MaterialIcons name="settings" size={24} color="black" style={{textAlign: "center"}}/>
      </TouchableOpacity>
    </View>
      <View style={globalStyles.headerACC}>
        <Image
          source={immagineBack}  // Sostituisci con l'URL dell'immagine del profilo
          style={globalStyles.profileImageACC}
        />
        <View style={globalStyles.userInfoACC}>
          <Text style={globalStyles.usernameACC}>{username}</Text>
        </View>
      </View>
        <View style={[globalStyles.infoContainer, globalStyles.row, {paddingLeft: 20, paddingRight: 20}]}>
            <TouchableOpacity disabled={facebookLink == null ? true : false } style={{opacity:(facebookLink ? 1 : 0.5 )}} onPress={() => apriSocial(facebookLink)}>
            <FontAwesome5 name="facebook-f" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity disabled={instagramLink == null ? true : false } style={{opacity:(instagramLink ? 1 : 0.5 )}} onPress={() => apriSocial(instagramLink)}>
            <FontAwesome5 name="instagram" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity disabled={twitterLink == null ? true : false } style={{opacity:(twitterLink ? 1 : 0.5 )}} onPress={() => apriSocial(twitterLink)}>
              <FontAwesome5 name="tiktok" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity disabled={youtubeLink == null ? true : false } style={{opacity:(youtubeLink ? 1 : 0.5 )}} onPress={() => apriSocial(youtubeLink)}>
            <FontAwesome5 name="youtube" size={27} color="black" />
            </TouchableOpacity>
            <TouchableOpacity disabled={website == null ? true : false } style={{opacity:(website ? 1 : 0.5 )}} onPress={() => apriSocial(website)}>
              <Fontisto name="world-o" size={27} color="black" />
            </TouchableOpacity>
          </View>
          </View>
      <View style={globalStyles.FormContainer}>
        <View style={{flex: 1}}>
            <View style={globalStyles.testoEventiVicini}>
              <Text style={{fontSize: 25, fontWeight: 700,textAlign:"center" }}>Eventi attivi</Text>
            </View>
            {hasEvents ? cardEvents : <Text style={[globalStyles.testoEventiVicini,{color: "#b8b8b8"}]}>Non ci sono eventi attivi</Text>}
        </View>
      </View>
    </ScrollView>
    </View>
  );
};