import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DropDown from '../components/DropDown';


export default function Home({ navigation }) {
  const [selectedImage, setSelectedImage] = useState('')
  const [rimuoviTitolo, setrimuoviTitolo] = useState(true)
  const [visualizzaSocial, setvisualizzaSocial] = useState(false)
  const [eventoEsteso, seteventoEsteso] = useState(false)
  const [eventoRicorsivo, seteventoRicorsivo] = useState(false)
  const [apriCalendario, setapriCalendario] = useState(false)
  const [data, setData] = useState('GG-MM-AAAA')
  const [dataFineEvento, setDataFineEvento] = useState('GG-MM-AAAA')

  const dataOdierna = new Date();
  const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY/MM/DD')
  
  var dateRipetizioni = [
    {label:'Giorno', value:'1'},
    {label:'Settimana', value:'2'},
    {label:'Mese', value:'3'},
  ]

  const goBack = () => {
    navigation.goBack();
  }

  const pressHandler = () => {
    navigation.goBack();
  };

  function gestisciCalendario() {
    setapriCalendario(!apriCalendario);
  };

  function cambioData(propDate) {
    if(eventoEsteso){
        setDataFineEvento(propDate);
    } else {
        setData(propDate);
    }
  };

    const alertDettagliEvento = () =>
        Alert.alert('Dettagli evento', 'I dettagli dell\'evento sono quelli che serviranno a dare una panoramica generale del tuo evento. Esempi di vario tipo possono essere Zona VIP, Regali e premi a sorpresa, Sagra di Paese, Drink Gratis', [
        {
            text: 'OK'
        },
    ]);
    const alertTagEvento = () =>
        Alert.alert('Tag evento', 'I Tag dell\'evento sono delle parole o frasi che servono per dare più visibilità al tuo evento. Per esempio se inserisci il tag #FreeDrink, e qualcuno cerca degli eventi con drink gratis, il tuo evento comparirà nella lista dei possibili eventi', [
        {
            text: 'OK'
        },
    ]);
    const alertVisualizzaSocial = () =>
        Alert.alert('Visualizza Social', 'Facendo una spunta su questa casella permetterai alle persone di visualizzare i link ai social network che hai inserito nel tuo profilo. Se non hai inserito nessun link e vuoi inserirne uno vai su Account>Link ai social', [
        {
            text: 'OK'
        },
    ]);
    const alertcollegatoAlLocale = () =>
        Alert.alert('Evento collegato al mio locale', 'Facendo una spunta su questa casella collegherai l\'evento creato ad un locale a te associato, facendo così in modo che sulla pagina di essi risulti attivo questo specifico evento ', [
        {
            text: 'OK'
        },
    ]);

  return (
    <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50 }}>
        <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
            <View style={globalStyles.FormContainer}>
            <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                </TouchableOpacity>
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Informazioni</Text>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Nome</Text>
                    <TextInput style={globalStyles.input}>Nome</TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 20}}>Cognome</Text>
                    <TextInput style={globalStyles.input}>Cognome</TextInput>
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data Di nascita</Text>
                    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]} onPress={gestisciCalendario}>
                        <Text style={{ alignSelf: 'center'}}>{data}</Text>
                    </TouchableOpacity>
                </View>
                <Modal animationType='slide' visible={apriCalendario}>
                    <View style={globalStyles.vistaCentrata}>
                        <View style={globalStyles.vistaCalendario}>
                            <DatePicker mode='datepicker' selected={dataFineEvento == false ? data : dataFineEvento} onDateChange={cambioData} minimumDate={dataPartenza} />
                            <TouchableOpacity onPress={gestisciCalendario} >
                                <AntDesign name="closecircleo" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text>
                <TextInput style={globalStyles.input} placeholder='Email'></TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >CodiceFiscale</Text>
                <TextInput style={globalStyles.input}>CodiceFiscale</TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Telefono</Text>
                <TextInput style={globalStyles.input} keyboardType="numeric"></TextInput>
                <TouchableOpacity style={[globalStyles.button, {marginTop: 15}]} onPress={pressHandler}>
                <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Salva</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
}
