
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, } from 'react-native'; 
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { Octicons } from '@expo/vector-icons';
import DropDown from '../components/DropDown';

export default function Home({navigation}) { 

  var ordinamento = [
    {label:'Vicinanza', value:'1'},
    {label:'Data più vicina', value:'2'},
    {label:'Data più lontana', value:'3'},
  ]

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
    
      const apriEvento = () => {
        navigation.navigate('eventoSingolo');
      };

      const pressHandler = () => {

        navigation.goBack();
    
      }
      categoriaScelta = navigation.getParam('categoriaScelta')

      if (categoriaScelta == "Barman") {
        immagineBack = {uri: linkFotoBarman};
      }
      if (categoriaScelta == "Addetto alla sicurezza") {
        immagineBack = {uri: linkFotoSicurezza};
      }
      if (categoriaScelta == "Fotografo") {
        immagineBack = {uri: linkFotoFotografo};
      }
      if (categoriaScelta == "Artista/DJ") {
        immagineBack = {uri: linkFotoArtista};
      }
      if (categoriaScelta == "Cuoco") {
        immagineBack = {uri: linkFotoCuoco};
      }
      if (categoriaScelta == "Addetto alle pulizie") {
        immagineBack = {uri: linkFotoPulizie};
      }
    
      return(
      <View style={{flex: 1, backgroundColor: '#FFF'}}> 
        <ScrollView>
        <View style={globalStyles.viewImmagineCopertina}>
            <ImageBackground source={immagineBack} resizeMode="cover" style={globalStyles.immagineCopertina}>
            <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']} style={globalStyles.viewImmagineCopertina} >
              {/*condividi/torna indeitro */}
              <View style={globalStyles.bottoniCopertinaEvento}>
                <TouchableOpacity onPress={pressHandler}>
                  <Ionicons name="ios-chevron-back-sharp" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={pressHandler}>
                  <Octicons style={{marginTop: 3, opacity: 0}} name="share" size={27} color="white" />
                </TouchableOpacity>
              </View>
              {/*titolo */}
              <View style={globalStyles.titoloCopertinaEvento}>
                <Text style={globalStyles.nomeEvento}>{categoriaScelta}</Text>
              </View>
              {/*data e ora*/}
              <View style={globalStyles.dettagliCopertinaEvento}>
                <Text style={globalStyles.panoramicaEvento}></Text>
              </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        <View style={[{flex:2}, globalStyles.FormContainer]}>
            <View style={[globalStyles.row, {marginTop: -5}]}>
                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Ordina per: </Text>
                </View>
                <View>
                    <DropDown data={ordinamento} />
                </View>
            </View>
            {/* eventi*/}
            <View style={{flex: 6}}>
            <TouchableOpacity style={globalStyles.containerCardEventi} onPress={apriEvento}>
            <Image
              source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
              style={globalStyles.backgroundImageCardEventi}
            />
            <View style={globalStyles.contentContainerCardEventi}>
              <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
              <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.containerCardEventi} onPress={apriEvento}>
            <Image
              source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
              style={globalStyles.backgroundImageCardEventi}
            />
            <View style={globalStyles.contentContainerCardEventi}>
              <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
              <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.containerCardEventi} onPress={apriEvento}>
            <Image
              source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
              style={globalStyles.backgroundImageCardEventi}
            />
             <View style={globalStyles.contentContainerCardEventi}>
              <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
              <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
            </View>
          </TouchableOpacity>
                </View>
            </View>
      </ScrollView>
    </View>
    );
    };