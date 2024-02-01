

import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, Alert, ScrollView, Modal, FlatList, Dimensions, StyleSheet} from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DropDown from '../components/DropDown';
var widthScreen = Dimensions.get('window').width; //full width


export default function Home({ navigation }) {
  const [selectedImage, setSelectedImage] = useState('')
  const [rimuoviTitolo, setrimuoviTitolo] = useState(true)
  const [visualizzaSocial, setvisualizzaSocial] = useState(false)
  const [eventoEsteso, seteventoEsteso] = useState(false)
  const [eventoRicorsivo, seteventoRicorsivo] = useState(false)
  const [apriCalendario, setapriCalendario] = useState(false)
  const [data, setData] = useState('GG-MM-AAAA')
  const [dataFineEvento, setDataFineEvento] = useState('GG-MM-AAAA')

  const goBack = () => {
    navigation.goBack();
  };

  const MyComponent = () => {
    const [selectedValue, setSelectedValue] = useState('');
  };
  const vaiAResetPasswordContinua = () => {
    navigation.navigate("resetPasswordContinua");
  };

  const pressHandler = () => {
    navigation.goBack();
  };


return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}}>
        <View style={[ globalStyles.FormContainer, {height:"80%"}]}>
        <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
            <View style={globalStyles.FormContainer}>
            <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                </TouchableOpacity>
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Reset password</Text>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.FormContainer]}>
                <Text style={[{ fontWeight: 'bold', fontSize: 20}]} >Ordina per: Recenti</Text>
                <View style={{flex:6}}>
                <View style={{    
                                  width: widthScreen-50,
                                  height:300,
                                  marginTop:10,
                                  marginHorizontal:10,
                                  borderRadius: 40,
                                  overflow: 'hidden'}}>
                <View style={{
                                  height:150,
                                  borderTopLeftRadius: 40,
                                  borderTopRightRadius: 40,
                                  zIndex:-1,
                                  /*borderBottomRightRadius: -40,
                                  borderBottomLeftRadius: -40,*/
                                  overflow: 'hidden'}}>
                  <Image
                    source={{uri:'https://www.veratour.it/share/img/img.cfm?src=opentur/VERATOUR/cms/1190904/Ibiza-100.jpg&tmp=croppatutto&width=740&height=400'}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={[globalStyles.backgroundImageCardEventi,{zIndex:-1,flex:1, borderRadius:40}]}
                  />
                </View>
                <View style={{
                        zIndex: 5,
                        marginTop:"-10%",
                        height:150,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                }}>

                </View>
                {/*<View style={{
                        borderRadius: 40,
                        ...StyleSheet.absoluteFillObject,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                }}>
                    <Text style={{
                            marginTop:"40%",
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: 'black',
                            textAlign: 'center',
                    }}>Il tuo titolo</Text>
                    <Text style={[globalStyles.sottotitoloCardEventi,{color:"black"}]}>Il tuo sottotitolo</Text>
                  </View>*/}
                </View>
                <TouchableOpacity style={globalStyles.containerCardEventi}>
                  <Image
                    source={{uri:'https://images.app.goo.gl/hXhbZCkcQRAEPLSD6'}} // Assicurati di sostituire con il percorso corretto della tua immagine
                    style={globalStyles.backgroundImageCardEventi}
                  />
                  <View style={globalStyles.contentContainerCardEventi}>
                    <Text style={globalStyles.titoloCardEventi}>Il tuo titolo</Text>
                    <Text style={globalStyles.sottotitoloCardEventi}>Il tuo sottotitolo</Text>
                  </View>
                </TouchableOpacity>
                </View>
            </View>
            </View>
            </View>
        </View>
  );
}