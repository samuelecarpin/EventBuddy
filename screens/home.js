
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, Dimensions, TextInput, Image, TouchableOpacity} from 'react-native'; 
import {useNavigation} from '@react-navigation/native';
import { Marker, Callout }  from 'react-native-maps';
import MapView from "react-native-map-clustering";
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import * as Notifications from 'expo-notifications';
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function Home({navigation}) { 

  var mapIndexColor = '#062F76';

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
    fetch('http://eventbuddy.localhost/api/search?eventName='+searchValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
      .then(data => {
        const markers = data.map((event, index) => (
          <TouchableOpacity onPress={() => apriEvento(event.id)}>
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
          >
            <Image source={{uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            
          </Marker>
        </TouchableOpacity>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity key={event.id} style={globalStyles.containerCardEventi} onPress={() => apriEvento(event.id)}>
          <Image source={{uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath}} style={globalStyles.backgroundImageCardEventi} />
              <View style={globalStyles.contentContainerCardEventi}>
                <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{event.name}</Text>
                <Text style={globalStyles.sottotitoloCardEventi}>
                Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}
                  {/* {event.startDate.split(" ")[0]} {event.startDate.split(" ")[1].slice(0, -3)} */}
                </Text>
              </View>
          </TouchableOpacity>
        ));        
        setallEvents(markers)
        setcardEvents(eventCards)
        setSearchValue('')
      }
    )
  }

  const filter = () =>  {
    fetch('http://eventbuddy.localhost/api/filter?filter='+navigation.getParam('filterQuery')+'&lat='+mapRegion.latitude+'&lon='+mapRegion.longitude+'&area='+area, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const markers = data.map((event, index) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
          >
            <Image source={{uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            <Callout style={{width:125}}>
              <TouchableOpacity onPress={() => apriEvento(event.id)}>
                <Text style={{fontWeight: 600}}>{event.name}</Text>
                <Text>Apri evento</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity key={event.id} style={globalStyles.containerCardEventi} onPress={() => apriEvento(event.id)}>
          <Image source={event.imagePath.startsWith("e") ? {uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath} : {uri :event.imagePath}} style={globalStyles.backgroundImageCardEventi} />
              <View style={globalStyles.contentContainerCardEventi}>
                <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{event.name}</Text>
                <Text style={globalStyles.sottotitoloCardEventi}>
                Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}
                  {/* {event.startDate.split(" ")[0]} {event.startDate.split(" ")[1].slice(0, -3)} */}
                </Text>
              </View>
          </TouchableOpacity>
        ));
        setallEvents(markers)
        setcardEvents(eventCards)
        setForceUpdate(true);
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
        const markers = data.map((event, index) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
          >
            <Image source={{uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath}} style={{height: 50, width:50, borderRadius: 30, borderWidth: 2, borderColor: '#062F76'}}/>
            <Callout style={{width:125}}>
              <TouchableOpacity onPress={() => apriEvento(event.id)}>
                <Text style={{fontWeight: 600}}>{event.name}</Text>
                <Text>Apri evento</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ));
        const eventCards = data.map((event, index) => (
          <TouchableOpacity key={event.id} style={[globalStyles.containerCardEventi]} onPress={() => apriEvento(event.id)}>
          <Image source={event.imagePath.startsWith("e") ? {uri:'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+event.imagePath} : {uri :event.imagePath}} style={globalStyles.backgroundImageCardEventi} />
              <View style={globalStyles.contentContainerCardEventi}>
                <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{event.name}</Text>
                <Text style={globalStyles.sottotitoloCardEventi}>
                Inizia il: {new Date(event.startDate).toLocaleString().split(",")[0]} {new Date(event.startDate).toLocaleString().split(" ")[1].slice(0,-3)}
                  {/* {event.startDate.split(" ")[0]} {event.startDate.split(" ")[1].slice(0, -3)} */}
                </Text>
                {event.isSponsored == 1 ? <Text style={{fontSize: 16, color: '#bdbdbd', marginTop: 5}}><Feather name="info" size={20} color="#bdbdbd" /> Sponsorizzato</Text> : "" }
              </View>
          </TouchableOpacity>
        ));        
        setallEvents(markers)
        setcardEvents(eventCards)
        setForceUpdate(true);
      }
        )
  }
  
  return(
  <View style={{flex: 1, backgroundColor: '#FFF'}}> 
    <ScrollView>
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
      <TouchableOpacity onPress={() => setSearchValue("")}><Feather name="x-circle" size={20} color="gray" style={[globalStyles.searchIconCercaHome,{opacity: searchValue == "" ? 0 : 1} ]} /></TouchableOpacity>
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
      havesLocation ? "" :  
      <View style={{height: 60, width: '87%', backgroundColor: '#f56c6c', borderRadius: 15, padding: 10, marginBottom: 20}}>
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
          {cardEvents}
      </View>
      </View>
      </ScrollView>
    </View> 
);  
};