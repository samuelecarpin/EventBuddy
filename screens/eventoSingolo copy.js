import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function Home({navigation}) {
  
  const pressHandler = () => {

    navigation.goBack();

  }

  var dettagliEvento = [];

  var lisitaDettagli = ["Drink gratis", "VIP Area", "Ingresso Omaggio per le Donne Fino alle 10 puuhhhiibbu"];
    for(let i = 0; i < lisitaDettagli.length; i++){
		  dettagliEvento.push(
        <View style={[globalStyles.row, {justifyContent: 'left'}]}>
          <Image style={globalStyles.listItem} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/coriandoli.png?alt=media&token=4f9f14ad-91ee-4f3b-941a-96bc5d657fb6'}} />
          <Text style={{ paddingRight: 70}}>{lisitaDettagli[i]}</Text>
        </View>
		  )
	  }

    var listaTags = ["#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music",];

    const immagineBack = {uri: 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/368861160_694974532667393_1102515412597951598_n-1080x1080.jpg?alt=media&token=98b3f19f-c6d3-4740-b299-d10d44632617'};
    
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
      // safearea X non intralciare con date e robe
      <ScrollView style={{flex: 1,}}>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
          <View style={globalStyles.viewImmagineCopertina}>
            <ImageBackground source={immagineBack} resizeMode="cover" style={globalStyles.immagineCopertina}>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']} style={globalStyles.viewImmagineCopertina} >
              {/*condividi/torna indeitro */}
              <View style={globalStyles.bottoniCopertinaEvento}>
                <TouchableOpacity onPress={pressHandler}>
                  <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={pressHandler}>
                  <Octicons style={{marginTop: 3}} name="share" size={27} color="white" />
                </TouchableOpacity>
              </View>
              {/*titolo */}
              <View style={globalStyles.titoloCopertinaEvento}>
                <Text style={globalStyles.nomeEvento}>LuminosaFest Extravaganza</Text>
              </View>
              {/*data e ora*/}
              <View style={globalStyles.dettagliCopertinaEvento}>
                <Text style={globalStyles.panoramicaEvento}>27/10/2024 AT 20:00 | 16+</Text>
              </View>
              </LinearGradient>
            </ImageBackground>
          </View>
          <View style={globalStyles.FormContainer}>
            <TouchableOpacity style={[globalStyles.button]} onPress={pressHandler}>
              <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 18}]}>Contatta l'organizzatore</Text>
            </TouchableOpacity>
            {/*<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 100, textAlign: 'center'}}>Informazioni</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>*/}
            {/*informazioni */}
            <TouchableOpacity style={[globalStyles.infoContainer, {alignItems: 'center'}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Luogo dell'evento</Text>
            </TouchableOpacity>
            {/*mappa */}
            <View style={globalStyles.mapContainer}>
                <MapView style={globalStyles.map}
                  region={mapRegion}
                >
                  <Marker
                      coordinate={mapRegion}
                      pinColor='#062F76'
                  />
                </MapView>
          </View>
            {/*dettagli evento */}
            <View style={[globalStyles.infoContainer, {alignItems: 'center'}]} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Dettagli evento</Text>
              {dettagliEvento}
            </View>
            {/*tag evento */}
            <View style={[globalStyles.infoContainer, {alignItems: 'center'}]} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Tag evento</Text>
              <Text style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>{listaTags}</Text>
            </View>
            {/*social */}
            <View>

            </View>
          </View>
      </View>
    </ScrollView>
    );
};