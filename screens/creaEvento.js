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

  function mostraEventoEsteso () {
    seteventoEsteso(!eventoEsteso);
  }

  function mostraEventoRicorsivo () {
    seteventoRicorsivo(!eventoRicorsivo);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setrimuoviTitolo(!rimuoviTitolo);
    setSelectedImage(result.assets[0].uri);
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
            <View style={globalStyles.viewImmagineCopertina}>
                <TouchableOpacity onPress={pickImage}>
                <ImageBackground source={{ uri: selectedImage }} resizeMode="cover" style={globalStyles.immagineCopertina}>
                    <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']} style={globalStyles.viewImmagineCopertina}>
                    <View style={globalStyles.bottoniCopertinaEvento}>
                        <TouchableOpacity onPress={pressHandler}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/*testo */}
                    <View style={globalStyles.titoloCopertinaEvento}>
                        {
                            rimuoviTitolo ? (
                                <Text style={globalStyles.nomeEvento}>Carica un immagine</Text>
                            ): null
                        }
                    </View>
                    {/*data e ora solo per centrare la scritta sopra*/}
                    <View style={globalStyles.dettagliCopertinaEvento}></View>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={globalStyles.FormContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Nome dell'evento</Text>
                    <TextInput style={globalStyles.input} placeholder="Nome dell'evento"></TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 20}}>Luogo dell'evento</Text>
                    <TextInput style={globalStyles.input} placeholder="Luogo dell'evento"></TextInput>
                <View style={globalStyles.rigaTitoli}>
                    <Text style ={{marginLeft: 20}}></Text>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Dettagli evento</Text>
                    <TouchableOpacity style={globalStyles.infoBottone} onPress={alertDettagliEvento}>
                        <AntDesign name="questioncircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                    <TextInput style={globalStyles.input} placeholder="Inserisci i dati separati da una virgola (es Drink gratis)"></TextInput>
                <View style={globalStyles.rigaTitoli}>
                    <Text style ={{marginLeft: 20}}></Text>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Inserisci i Tag (opzionale)</Text>
                    <TouchableOpacity onPress={alertTagEvento}>
                        <AntDesign style={globalStyles.infoBottone} name="questioncircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                    <TextInput style={globalStyles.input} placeholder="Es. #FreeDrink"></TextInput>
                {/*checkbox visualizza social nell'evento */}
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, maxWidth: '90%'}}>Visualizza link ai social network</Text>
                        <TouchableOpacity onPress={alertVisualizzaSocial}>
                            <AntDesign name="questioncircleo" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={visualizzaSocial} onValueChange={setvisualizzaSocial} />
                    </View>
                </View>
                {/*selettore date*/}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data evento</Text>
                    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]} onPress={gestisciCalendario}>
                        <Text style={{ alignSelf: 'center'}}>{data}</Text>
                    </TouchableOpacity>
                </View>
                {/*checkbox eventoMultiGiornate */}
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Evento a più giornate</Text>
                    </View>
                    <View>
                        <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={eventoEsteso} onValueChange={mostraEventoEsteso} />
                    </View>
                </View>
                {/*selettore date*/}
                {
                    eventoEsteso ? (
                        <View style={globalStyles.row}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data fine evento</Text>
                            <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]} onPress={gestisciCalendario}>
                                <Text style={{ alignSelf: 'center'}}>{dataFineEvento}</Text>
                            </TouchableOpacity>
                        </View>
                    ): null
                }
                {/**calendario */}
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
                {/*checkbox eventoRicorsivo */}
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Evento ricorsivo</Text>
                    </View>
                    <View>
                        <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={eventoRicorsivo} onValueChange={mostraEventoRicorsivo} />
                    </View>
                </View>
                {/*selettore date*/}
                {
                    eventoRicorsivo ? (
                        <View style={globalStyles.row}>
                            <View>
                                <Text style={{ fontWeight: 'bold', fontSize: 20}}>Si ripete ogni: </Text>
                            </View>
                            <View>
                                <DropDown data={dateRipetizioni} />
                            </View>
                        </View>
                    ): null
                }
                {/*eta evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Età evento</Text>
                    <TextInput style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="0+"></TextInput>
                </View>
                {/*prezzo evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Costo entrata</Text>
                    <TextInput style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="0€"></TextInput>
                </View>
                {/*checkbox evento collegato al local*/}
                {/*<View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Evento collegato al mio locale</Text>
                        <TouchableOpacity onPress={alertcollegatoAlLocale}>
                            <AntDesign style={globalStyles.infoBottone} name="questioncircleo" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View>
                    <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={visualizzaSocial} onValueChange={setvisualizzaSocial} />
                    </View>
                </View>*/}
                {/*pubblica l'evento */}
                <TouchableOpacity style={[globalStyles.button, {marginTop: 15}]} onPress={pressHandler}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Pubblica il tuo evento</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
}
