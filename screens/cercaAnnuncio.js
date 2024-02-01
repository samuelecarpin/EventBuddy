
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, TextInput, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'; 
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function Home({navigation}) { 

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
      const apriCategoria = (categoria) => {
        navigation.navigate('categoriaAnnuncio', { categoriaScelta: categoria })
      };
      return(
      <View style={{flex: 1, backgroundColor: '#FFF'}}> 
        <ScrollView>
            <View style={globalStyles.safeArea}></View>
        <View style={{flexDirection: 'row'}}>
          <View style={globalStyles.containerCercaHome}>
          <TextInput
            style={globalStyles.inputCercaHome}
            placeholder="Cerca un evento..."
          />
          <Feather name="search" size={24} color="black" style={globalStyles.searchIconCercaHome} />
          </View>
          <View style={globalStyles.filtroCerca}>
            <Ionicons name="md-filter" size={24} color="black" style={{textAlign: "center", marginTop: 3, marginLeft: 2}}/>
          </View>
        </View>
        <View style={[{flex:2}, globalStyles.FormContainer]}>
            <View style={{flex: 6}}>
                <View style={globalStyles.testoEventiVicini}>
                    <Text style={[{fontSize: 25},{fontWeight: 700},{textAlign:"center"}]}>Cerca per categoria</Text>
                </View>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Barman")}>
                    <Image
                    source={{uri: linkFotoBarman}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Barman</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Addetto alla sicurezza")}>
                    <Image
                    source={{uri: linkFotoSicurezza}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Addetto alla sicurezza</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Fotografo")}>
                    <Image
                    source={{uri: linkFotoFotografo}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Fotografo</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Artista/DJ")}>
                    <Image
                    source={{uri: linkFotoArtista}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Artista/DJ</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Cuoco")}>
                    <Image
                    source={{uri: linkFotoCuoco}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Cuoco</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyles.containerCardEventi} onPress={() => apriCategoria("Addetto alle pulizie")}>
                    <Image
                    source={{uri: linkFotoPulizie}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                    />
                    <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Addetto alle pulizie</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}></Text>
                    </View>
                </TouchableOpacity>
                </View>
            </View>
      </ScrollView>
    </View>
    );
    };