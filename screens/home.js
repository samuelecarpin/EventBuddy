
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, Dimensions, TextInput, Image, TouchableOpacity, Keyboard} from 'react-native'; 
import {useNavigation} from '@react-navigation/native';
import { Marker, Callout }  from 'react-native-maps';
import MapView from "react-native-map-clustering";
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import * as Notifications from 'expo-notifications';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';
var widthScreen = Dimensions.get('window').width;

export default function Home({navigation}) { 

  var mapIndexColor = '#062F76';
  
  const [positionIsAccepted, setpositionIsAccepted] = useState(true);
  const [hasEvents, sethasEvents] = useState(false);
  const [allEvents, setallEvents] = useState([]);
  const [cardEvents, setcardEvents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);
  const [havesLocation, setHaveLocation] = useState(false);

  let [mapRegion, setLocation] = useState({
    latitude: 42.912826727246,
    longitude: 12.525392436526216,
    latitudeDelta: 1.0922,
    longitudeDelta: 1.0421,
  });

  const userLocation = () => {
    const getPermissions = async () => { 
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setpositionIsAccepted(false);
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, 
    })
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.1021,
        longitudeDelta: 0.1021,
      });
      setHaveLocation(true);

    };
    getPermissions();
  }
  
  function apriEvento (id) {
    navigation.navigate('eventoSingolo', {
      paramKey: id,
    });
  };

  function apriFiltri () {
    navigation.navigate('filters');
  };

  
//   async function registerForPushNotificationsAsync() {
//     let token;

//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//         const { status } = await Notifications.requestPermissionsAsync();
//         finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//         alert('Failed to get push token for push notification!');
//         return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);

//     return token;
// }

  const searchEvents = () => {
    Keyboard.dismiss();
    fetch('http://api.weventsapp.it/api/search?eventName='+searchValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data != ""){
          sethasEvents(true);
        const markers = data.map((event, index) => (
          <TouchableOpacity onPress={() => apriEvento(event.id)}>
          <Marker
            key={event.id}
            coordinate={{
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
            }}
          >
            <Image source={{uri:'https://api.weventsapp.it/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            
          </Marker>
        </TouchableOpacity>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity onPress={() => apriEvento(event.id)} style={[globalStyles.containerEvent, {width: widthScreen-50, marginVertical: 20}]}>
                  <View style={globalStyles.containerPhotoEvent}>
                    <Image
                      source={{uri :'https://api.weventsapp.it/'+event.imagePath}} // Assicurati di sostituire con il percorso corretto della tua immagine
                      style={[globalStyles.backgroundImageCardEventi,{zIndex:-1,flex:1, borderRadius:40}]}
                    />
                  </View>
                <View style={globalStyles.containerTitleEvent}>
                  <Text style={{
                            marginTop: 30,
                            fontSize: 23,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                    }}>{event.name}</Text>
                    <Text style={[globalStyles.sottotitoloCardEventi,{color:"black", fontSize: 18}]}> Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}</Text>
                </View>
          </TouchableOpacity>
        ));        
        setallEvents(markers)
        setcardEvents(eventCards)
      }else{
        sethasEvents(false);
      }
    }
    )
  }

  const filter = () =>  {
    fetch('http://api.weventsapp.it/api/filter?filter='+navigation.getParam('filterQuery')+'&lat='+mapRegion.latitude+'&lon='+mapRegion.longitude+'&area='+area, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if(data != ""){
          sethasEvents(true);
        const markers = data.map((event, index) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
            }}
          >
            <Image source={{uri:'https://api.weventsapp.it/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            <Callout style={{width:125}}>
              <TouchableOpacity onPress={() => apriEvento(event.id)}>
                <Text style={{fontWeight: 600}}>{event.name}</Text>
                <Text>Apri evento</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity onPress={() => apriEvento(event.id)} style={[globalStyles.containerEvent, {width: widthScreen-50, marginVertical: 20}]}>
                  <View style={globalStyles.containerPhotoEvent}>
                    <Image
                      source={{uri :'https://api.weventsapp.it/'+event.imagePath}} // Assicurati di sostituire con il percorso corretto della tua immagine
                      style={[globalStyles.backgroundImageCardEventi,{zIndex:-1,flex:1, borderRadius:40}]}
                    />
                  </View>
                <View style={globalStyles.containerTitleEvent}>
                  <Text style={{
                            marginTop: 30,
                            fontSize: 23,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                    }}>{event.name}</Text>
                    <Text style={[globalStyles.sottotitoloCardEventi,{color:"black", fontSize: 18}]}> Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}</Text>
                </View>
          </TouchableOpacity>
        ));
        setallEvents(markers)
        setcardEvents(eventCards)
        setForceUpdate(true);
      }else{
        sethasEvents(false);
      }
    }
        )
  }

  useEffect(() => {
    //registerForPushNotificationsAsync();
    if (navigation.getParam('function') ) {
      if (navigation.getParam('function') == "filter") { 
        filter();
      }
      if (navigation.getParam('function') == "all") { 
        generaEventiVicini();
      }
    } else { 
      userLocation();
      generaEventiVicini();
    }
  }, [forceUpdateKey, mapRegion.latitude]);


  const generaEventiVicini = () =>  {

    fetch('https://api.weventsapp.it/api/showAll?lat='+mapRegion.latitude+'&lon='+mapRegion.longitude+'&area='+area, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        if (data != "") {
        sethasEvents(true);
        const markers = data.map((event, index) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: parseFloat(event.latitude),
              longitude: parseFloat(event.longitude),
            }}
          >
            <Image source={{uri:'https://api.weventsapp.it/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            <Callout style={{width:125}}>
              <TouchableOpacity onPress={() => apriEvento(event.id)}>
                <Text style={{fontWeight: 600}}>{event.name}</Text>
                <Text>Apri evento</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity onPress={() => apriEvento(event.id)} style={[globalStyles.containerEvent, {width: widthScreen-50, marginVertical: 20}]}>
                  <View style={globalStyles.containerPhotoEvent}>
                    <Image
                      source={{uri :'https://api.weventsapp.it/'+event.imagePath}} // Assicurati di sostituire con il percorso corretto della tua immagine
                      style={[globalStyles.backgroundImageCardEventi,{zIndex:-1,flex:1, borderRadius:40}]}
                    />
                  </View>
                <View style={globalStyles.containerTitleEvent}>
                  <Text style={{
                            marginTop: 30,
                            fontSize: 23,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                    }}>{event.name}</Text>
                    <Text style={[globalStyles.sottotitoloCardEventi,{color:"black", fontSize: 18}]}> Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}</Text>
                </View>
          </TouchableOpacity>
        ));        
        setallEvents(markers)
        setcardEvents(eventCards)
        setForceUpdate(true);
        }else{
          sethasEvents(false);
        }
      }
        )
  }
  
  return(
    <View style={{ flex: 1, backgroundColor: '#FFF'}}>
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={globalStyles.safeArea}></View>
    <View style={{flexDirection: 'row'}}>
      <View style={globalStyles.containerCercaHome}>
      <TextInput
        autoCapitalize='none'
        onChangeText={searchValue => setSearchValue(searchValue)} 
        style={globalStyles.inputCercaHome}
        placeholder="Cerca un evento ..."
        value={searchValue}
      />

      {/* searchValue != "" ? <TouchableOpacity onPress={() => setSearchValue("")}><Feather name="x-circle" size={20} color="black" style={[globalStyles.searchIconCercaHome ]} /></TouchableOpacity> : null */}
      <TouchableOpacity onPress={searchEvents}><Feather name="search" size={24} color="black" style={globalStyles.searchIconCercaHome} /></TouchableOpacity>
      </View>
      <TouchableOpacity onPress={apriFiltri} style={globalStyles.filtroCerca}>
          <Ionicons name="md-filter" size={24} color="black" style={{textAlign: "center", marginTop: 3, marginLeft: 2}}/>
      </TouchableOpacity>
    </View>
      <View style={globalStyles.FormContainer}>
      {/* <View style={[{flex: 1}, globalStyles.containerRaggioMappa]}>
          <Text style={globalStyles.labelRaggioMappa}>Inserisci il raggio (km):</Text> 
          <TextInput
            style={globalStyles.inputRaggioMappa}
            placeholder="Es. 5"
            keyboardType="numeric"
          />
      </View> */}
      {
      positionIsAccepted==true ? "" :  
      <View style={{height: 80, width: '87%', backgroundColor: '#f56c6c', borderRadius: 15, padding: 10, marginBottom: 20}}>
        <Text style={{color: '#fff', fontWeight: 800, textAlign: 'center'}}>Se non hai attivato la posizione attivala ora per un esperienza completa su Wevents !</Text>
      </View>
      }
      <View style={globalStyles.mapContainer}>
        <MapView  key={forceUpdate} animationEnabled={false} showsUserLocation={true} style={globalStyles.map} region={mapRegion} clusterColor = {mapIndexColor}>
          {allEvents}
        </MapView>
      </View> 
      <View style={{flex: 1}}>
          <View style={globalStyles.testoEventiVicini}>
            <Text style={{fontSize: 25, fontWeight: 700,textAlign:"center" }}>Eventi vicini</Text>
          </View>
          {hasEvents==true ? cardEvents : <Text style={[globalStyles.testoEventiVicini,{color: "#b8b8b8"}]}>Non ci sono eventi nelle vicinanze</Text>}

      </View>
      </View>
      </ScrollView>
    </View> 
);  
};