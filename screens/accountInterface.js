import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';  // Importa le icone MaterialIcons
import {AntDesign} from '@expo/vector-icons'
import {Ionicons} from "@expo/vector-icons"
import { globalStyles } from '../styles/global';
var widthScreen = Dimensions.get('window').width; //full width

export default function Home({navigation}) {
    const goBack = () => {
        navigation.goBack();
    }
    const pressHandler = () => {
        navigation.goBack();
      };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}}>
    <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
    <View style={globalStyles.containerACC}>
    <View style={{flexDirection: 'row'}}>
    <TouchableOpacity onPress={goBack} style={{
                                              //padding:10,
                                              justifyContent: "center",
                                              alignContent: "center",
                                              textAlign: "center",
                                              
                                              marginTop:30,
    }}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                </TouchableOpacity>
                <View style={{width:"70%"}}></View>
      <TouchableOpacity style={globalStyles.settingsIconACC} onPress={() => console.log('Icona impostazioni cliccata')}>
        <MaterialIcons name="settings" size={24} color="black" style={{textAlign: "center"}}/>
      </TouchableOpacity>
    </View>
      <View style={globalStyles.headerACC}>
        <Image
          source={{ uri: 'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400' }}  // Sostituisci con l'URL dell'immagine del profilo
          style={globalStyles.profileImageACC}
        />
        <View style={globalStyles.userInfoACC}>
          <Text style={globalStyles.usernameACC}>Nome Utente</Text>
        </View>
      </View>
      <View style={[ globalStyles.containerRaggioMappa,{marginTop:20}]}>   
      <AntDesign name="facebook-square" size={24} color="black" style={{paddingHorizontal:10}}></AntDesign>
      <AntDesign name="instagram" size={24} color="black" style={{paddingHorizontal:10}}></AntDesign>
      </View>
        <Text style={{ marginTop:40, fontWeight: 'bold',fontSize: 20}}>Eventi attivi:</Text>
      <View style={{    width: widthScreen-50,
                        height:150,
                        marginTop:10,
                        marginHorizontal:10,
                        borderRadius: 40,
                        overflow: 'hidden'}}>
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
  );
};