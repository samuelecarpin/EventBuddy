
import React, { useState, useEffect } from 'react';
import {View, Text, ScrollView, TextInput, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native'; 
import Mappa from '../components/Mappa';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import * as Location from 'expo-location';

export default function Home({navigation}) { 

  const apriEvento = () => {
    navigation.navigate('eventoSingolo');
  };

  const goBack = () => {
    navigation.goBack();
  }

  return(
      <View style={{flex: 1, backgroundColor: '#FFF'}}> 
        <ScrollView>
        <View style={globalStyles.safeArea}></View>
        <View style={globalStyles.FormContainer}>
          <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
              <TouchableOpacity onPress={goBack}>
                  <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
              </TouchableOpacity>
              <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Eventi Visitati</Text>
              <TouchableOpacity>
                  <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
              </TouchableOpacity>
          </View>
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