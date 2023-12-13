
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, TextInput, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'; 
import Mappa from '../components/Mappa';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient'; 
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
export default function Home({navigation}) 
{ 
  const pressHandler = () => { navigation.navigate(eventoSingolo); 
}

let [mapRegion, setLocation] = useState({
  latitude: 37,
  longitude: 37,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
});
  const userLocation = async () => {
    const getPermissions = async () => { 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };
    getPermissions();
  }
  useEffect(() => {
    userLocation();
  }, []);

  return(
    <View style={{flex: 1, backgroundColor: '#FFF'}}> 
      <ScrollView>
      <View style={[{height:20},{backgroundColor:"#FFF"}]}>
      </View>
        {/*<View style={[globalStyles.row, globalStyles.headerMenu, {flex: 1}]}> 
          <TextInput style={[globalStyles.inputCercaEvento]}><Feather name="search" size={24} color="black" /></TextInput>       
          <View style={globalStyles.filtroCerca}>
            <Ionicons name="md-filter" size={24} color="black" style={{textAlign: "center"}}/>
          </View>
  </View> >*/}
    <View style={{flexDirection: 'row'}}>
      <View style={globalStyles.containerCercaHome}>
      <TextInput
        style={globalStyles.inputCercaHome}
        placeholder="Cerca un evento..."
      />
      <Feather name="search" size={24} color="black" style={globalStyles.searchIconCercaHome} />
      </View>
      <View style={globalStyles.filtroCerca}>
        <Ionicons name="md-filter" size={24} color="black" style={{textAlign: "center"}}/>
      </View>
    </View>
      <View style={[{flex:2}, globalStyles.FormContainer]}>
      <View style={globalStyles.mapContainer}>
        <Mappa markers={mapRegion}/>
      </View> 
      <View style={[{flex: 1}, globalStyles.containerRaggioMappa]}>   
          <Text style={globalStyles.labelRaggioMappa}>Inserisci il raggio (km):</Text> 
          <TextInput
            style={globalStyles.inputRaggioMappa}
            placeholder="Es. 5"
            keyboardType="numeric"
          />
        
      </View>
      <View style={{flex: 6}}>
          <View style={globalStyles.testoEventiVicini}>
            <Text style={[{fontSize: 25},{fontWeight: 700},{textAlign:"center"}]}>Eventi vicini</Text>
          </View>
          <View style={globalStyles.containerCardEventi}>
            <Image
              source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
              style={globalStyles.backgroundImageCardEventi}
            />
            <View style={globalStyles.contentContainerCardEventi}>
              <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
              <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
            </View>
          </View>
          <View style={globalStyles.containerCardEventi}>
            <Image
              source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
              style={globalStyles.backgroundImageCardEventi}
            />
            <View style={globalStyles.contentContainerCardEventi}>
              <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
              <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
            </View>
          </View>
        </View>
      </View>
      </ScrollView>
    </View> 
);  
};