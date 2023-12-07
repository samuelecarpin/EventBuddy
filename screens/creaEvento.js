import React from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Home({navigation}) {

  const pressHandler = () => {

    navigation.goBack();

  }

  const immagineBack = {uri: 'file:///Users/jacopofelluga/Desktop/EventBuddy/images/368861160_694974532667393_1102515412597951598_n-1080x1080.jpg'};

  return(
    // safearea X non intralciare con date e robe
      <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
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
              <Text style={globalStyles.panoramicaEvento}>31/10/2024 AT 20:00 | 16+</Text>
            </View>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={globalStyles.FormContainer}>
          <TouchableOpacity style={[globalStyles.button, globalStyles.ombraBottoneBlu]} onPress={pressHandler}>
            <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 15}]}>Contatta l'organizzatore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[globalStyles.infoContainer, globalStyles.ombra]} onPress={pressHandler}>
            <Text style={{ fontWeight: 'bold', fontSize: 15}}>Luogo dell'evento</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};