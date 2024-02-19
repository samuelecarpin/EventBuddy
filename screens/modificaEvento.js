import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DropDown from '../components/DropDown';
import { ImageManipulator, manipulateAsync } from 'expo-image-manipulator';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';


export default function Home({ navigation }) {
    const [eventName, seteventName] = useState(null)
    const [eventDetails, seteventDetails] = useState(null)
    const [description, setDescription] = useState(null)
    const [eventAge, seteventAge] = useState(null)
    const [eventCost, seteventCost] = useState(null)
    const [maxCapacity, setMaxCapacity] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [eventType, seteventType] = useState('');
    const [immagineBack, setImmagineBack] = useState({uri: ''});
    const [rimuoviTitolo, setrimuoviTitolo] = useState(false)
    const [eventoEsteso, seteventoEsteso] = useState(false)
    //const [eventoRicorsivo, seteventoRicorsivo] = useState(false)
    const [apriCalendario, setapriCalendario] = useState(false)
    const [data, setData] = useState(null);
    const [startDate, setstartDate] = useState(null)
    const [dataFineEvento, setDataFineEvento] = useState(null)
    const [dataFineRipetizioni, setDataFineRipetizioni] = useState(null)
    const [dataSelezionata, setDataSelezionata] = useState(null)
    const dataOdierna = new Date();
    const [startHour, setstartHour] = useState(null);
    const [endHour, setendHour] = useState(null);
    const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY-MM-DD')
    const [dontHaveLimit, setDontHaveLimit] = useState(false);
    const [key, setKey] = React.useState('userToken');
    const [value, setValue] = React.useState('');
  
    async function getValueFor(key) {
        setValue(await SecureStore.getItemAsync(key));
        if (value) {
            getEvent();
        }
    }

    const handleDropdownChange = (value) => {
        seteventType(value);
    };

    var eventTypes = [
        {label:'Privato', value:'private'},
        {label:'Pubblico', value:'public'},
    ]

    const pressHandler = () => {
        navigation.goBack();
    };

    function gestisciCalendario(tipoData) {
        if (tipoData == "dataFine") {
            setDataSelezionata("dataFine")
        } else if (tipoData == "startDate"){
            setDataSelezionata("startDate")
        } else {
            setDataSelezionata("dataRipetizioni")
        }
        setapriCalendario(!apriCalendario);
    };

    function cambioData(date) {
        if(dataSelezionata == "dataFine"){
            setDataFineEvento(date);
        } else if (dataSelezionata == "startDate") {
            setstartDate(date);
            setData(date);
        } else {
            setDataFineRipetizioni(date);
        }
    };

    function mostraEventoEsteso () {
        seteventoEsteso(!eventoEsteso);
        setDataFineEvento(null)
    }

    /*function mostraEventoRicorsivo () {
        seteventoRicorsivo(!eventoRicorsivo);
    }*/

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            // Imposta le nuove dimensioni
            const newWidth = 1720;
            const newHeight = 1920;
            // Ridimensiona e converte l'immagine in formato WebP
            const resizedImage = await manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: newWidth, height: newHeight } }],
                { format: 'jpeg', compress: 1 }
            );  
    
            // Assegna il nuovo percorso dell'immagine WebP a result.uri
            result.assets[0].uri = resizedImage.uri;
    
            // Ora puoi utilizzare result come immagine ridimensionata in formato WebP
            setrimuoviTitolo(false);
            setSelectedImage(result.assets[0].uri);
            setImmagineBack({ uri: result.assets[0].uri });
        }
    };


    const getEvent = async () => {
        try {
          const response = await fetch('http://api.weventsapp.it/api/events/'+navigation.getParam('paramKey'), {
            method: 'GET',
            headers: {
              Authorization: 'Bearer '+ value
            },
          })
          .then(response => response.json())
          .then(data => {
                seteventName(data.name);
                seteventDetails(data.details);
                setDescription(data.description);
                seteventAge(data.minimumAge);
                seteventCost(data.price);
                setImmagineBack({uri :'https://api.weventsapp.it/'+data.imagePath})
                setLocation({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  latitudeDelta: 0.0422,
                  longitudeDelta: 0.0421,
                });
                setMaxCapacity(data.maxCapacity);
                setDontHaveLimit(data.maxCapacity == 0 ? true : false);
                setstartDate(data.startDate.split(" ")[0].replace(/-/g, "/"))
                setstartHour(data.startDate.split(" ")[1].slice(0, -3))
                setDataFineEvento(data.endDate.split(" ")[0].replace(/-/g, "/"))
                setendHour(data.endDate.split(" ")[1].slice(0, -3))
                seteventType(data.eventType)
            //   setData(data);
            //   var date = new Date(data.startDate).toLocaleString();
            //   setStartDate(date)
            //   var date = new Date(data.endDate).toLocaleString();
            //   setEndDate(date)
          })
        } catch (error) {
          console.error('Error during login:', error);
        }
      };

    useEffect(() => {
        getValueFor(key);
    }, [value]); 

    function modificaEvento () {
        if (startDate == null || dataFineEvento == null) {
            return alertDateErrate()
        }
        const initDate = startDate.replace(/\//g, '-')+"T"+startHour;
        const endDate = dataFineEvento.replace(/\//g, '-')+"T"+endHour;
        if(initDate > dataFineEvento || initDate.endsWith("0") == false  || endDate.endsWith("0") == false){
            return alertDateErrate()
        }
        var formData = new FormData();
        formData.append('name', eventName);
        formData.append('description', description == null ? description : description.replace(/\n/g, "<br />"));
        formData.append('latitude', mapRegion.latitude);
        formData.append('longitude', mapRegion.longitude);
        formData.append('details', eventDetails);
        selectedImage ? formData.append('image', {
            uri: selectedImage,
            name: selectedImage,
            type: 'image/jpeg',
        }) : '';
        formData.append('eventType', eventType);
        formData.append('startDate', initDate);
        formData.append('endDate', endDate);
        formData.append('minimumAge', eventAge);
        formData.append('maxCapacity', dontHaveLimit ? 0 : maxCapacity);
        formData.append('price', eventCost);
        try {
            fetch('http://api.weventsapp.it/api/update/' + navigation.getParam('paramKey') + '?_method=PUT', {
                method: 'POST',
                headers: {
                    Authorization: 'bearer ' + value,
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    
                    Alert.alert('Evento modificato correttamente', 'Il tuo evento è stato modificato con successo !', [
                        {
                            text: 'OK'
                        },
                    ]);
                    navigation.navigate("account");
                } else {
                    var errorsKeys = Object.keys(data.error);
                    var errorsObj = Object.values(data.error);
                    var errors = "";
                    for (let i = 0; i < errorsKeys.length; i++) {
                        errors = errors + errorsKeys[i] + ": " + errorsObj[i] + "\n";
                    }
                    Alert.alert('Errore', errors, [
                        {
                            text: 'OK'
                        },
                    ]);
                }
            });
        } catch (error) {
            
            // Puoi gestire l'errore qui, ad esempio mostrando un messaggio all'utente o effettuando altre azioni.
        }        
    }

    let [mapRegion, setLocation] = useState({
        latitude: 42.912826727246,
        longitude: 12.525392436526216,
        latitudeDelta: 1.0922,
        longitudeDelta: 1.0421,
      });

      function setLimit () {
        setDontHaveLimit(!dontHaveLimit)
        setMaxCapacity(0);
      }

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

    const handleEventType = (value) => {
        seteventType(value);
    };

    const confermaRimozioneImmagine = () => {
        Alert.alert(
          'Conferma Rimozione',
          'Sei sicuro di voler cancellare l\'immagine?',
          [
            {
              text: 'No',
              style: 'cancel',
            },
            {
              text: 'Sì, sono sicuro',
              onPress: () => removeImage(),
            },
          ],
          { cancelable: false }
        );
      };

      const removeImage = async () => {
        setrimuoviTitolo(true);
        setSelectedImage(null);
        setImmagineBack({uri: ''})
        var formData = new FormData();
        fetch('http://api.weventsapp.it/api/update/' + navigation.getParam('paramKey') + '?delete=true&_method=PUT', {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + value,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    Alert.alert('Successo', data.message, [
                        {
                            text: 'OK'
                        },
                    ]);
                } else {
                    var errorsKeys = Object.keys(data.error);
                    var errorsObj = Object.values(data.error);
                    var errors = "";
                    for (let i = 0; i < errorsKeys.length; i++) {
                        errors = errors + errorsKeys[i] + ": " + errorsObj[i] + "\n";
                    }
                    Alert.alert('Errore', errors, [
                        {
                            text: 'OK'
                        },
                    ]);
                }
            });
      }

    const alerteventDetails = () =>
        Alert.alert('Dettagli rapidi', 'I dettagli rapidi sono quelli che serviranno a dare una panoramica generale del tuo evento. Esempi di vario tipo possono essere Zona VIP, Regali e premi a sorpresa, Sagra di Paese, Drink Gratis', [
        {
            text: 'OK'
        },
    ]);
    const alertDateErrate = () =>
        Alert.alert('Date errate', 'Le date dell\'evento sono state inserite in maniera errata ! Prova a verificare che l\'orario sia scritto con il formato HH:MM, o che non stia mancando qualche data.', [
        {
            text: 'OK'
        },
    ]);
    /*const alertTagEvento = () =>
        Alert.alert('Tag evento', 'I Tag dell\'evento sono delle parole o frasi che servono per dare più visibilità al tuo evento. Per esempio se inserisci il tag #FreeDrink, e qualcuno cerca degli eventi con drink gratis, il tuo evento comparirà nella lista dei possibili eventi', [
        {
            text: 'OK'
        },
    ]);*/
    const alertLuogoEvento = () =>
        Alert.alert('Luogo dell\'evento', 'Questa mappa serve a inserire il luogo nel quale il tuo evento si svolgerà. Per muovere il pin, tenilo premuto per 1 secondo e trascinalo dove ti pare ( la punta dell\'ago sarà dove il puntatore atterrerà )', [
        {
            text: 'OK'
        },
    ]);

  return (
    <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50 }}>
            <View style={globalStyles.viewImmagineCopertina}>
                <TouchableOpacity onPress={pickImage}>
                <ImageBackground source={immagineBack} resizeMode="cover" style={globalStyles.immagineCopertina}>
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
                            ) : (
                                <View style={{alignItems: 'center'}}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}><Text style={[globalStyles.nomeEvento, {fontSize: 22}]}>clicca per sostituire l'immagine</Text></View>
                                </View>
                            )
                        }
                    </View>
                    {/*data e ora solo per centrare la scritta sopra*/}
                    <View style={globalStyles.dettagliCopertinaEvento}></View>
                    </LinearGradient>
                </ImageBackground>
                </TouchableOpacity>
                {
                    rimuoviTitolo ? (
                        null
                    ) : (
                        <TouchableOpacity onPress={confermaRimozioneImmagine} style={{flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: -30, alignItems: 'center'}}><Text style={{fontSize: 18, color: 'white'}}>Rimuovi immagine </Text><AntDesign name="closecircleo" size={20} color="white" /></TouchableOpacity>
                    )
                }
            </View>
            <View style={globalStyles.FormContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Nome dell'evento</Text>
                    <TextInput onChangeText={titolo => seteventName(titolo)} style={globalStyles.input} placeholder="Nome dell'evento">{eventName}</TextInput>
                <View style={globalStyles.rigaTitoli}>
                    <Text style ={{marginLeft: 20}}></Text>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Luogo dell'evento</Text>
                    <TouchableOpacity onPress={alertLuogoEvento}>
                        <AntDesign style={globalStyles.infoBottone} name="questioncircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={[globalStyles.searchContainer, { marginTop: 20, marginBottom: 20}]}>
                <MapView style={[globalStyles.map, {height: 300}]} region={mapRegion}>
                        <Marker
                        coordinate={mapRegion}
                        />
                    </MapView>
                    <GooglePlacesAutocomplete
                        placeholder='Cerca il luogo'
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            setLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 1.0100,
                                longitudeDelta: 1.0100,
                            });
                        }}
                        query={{
                            key: 'AIzaSyAI0z897cqUjCcAJoXZj99UtE4UIUttc1c',
                            language: 'it',
                        }}
                        minLength={5}
                        styles={{
                            container: {zIndex: 1},
                            textInput: {textAlign: 'center', height: 50, flex: 1, backgroundColor: '#f7f7f7', borderRadius: 30, marginVertical: 15, padding: 15,},
                            listView: {backgroundColor:'white'}
                        }
                        }
                        />
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Descrizione evento</Text>
                    <TextInput multiline = {true} onChangeText={description => setDescription(description)} style={[globalStyles.input, {height: 200}]} placeholder="Descrizione evento">{description}</TextInput>
                <View style={globalStyles.rigaTitoli}>
                    <Text style ={{marginLeft: 20}}></Text>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Dettagli rapidi</Text>
                    <TouchableOpacity style={globalStyles.infoBottone} onPress={alerteventDetails}>
                        <AntDesign name="questioncircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                    <TextInput onChangeText={dettagli => seteventDetails(dettagli)} style={globalStyles.input} placeholder="Inserisci i dettagli separati da una virgola (es Drink gratis)">{eventDetails}</TextInput>
                
                {/* <View style={globalStyles.rigaTitoli}>
                    <Text style ={{marginLeft: 20}}></Text>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Inserisci i Tag (opzionale)</Text>
                    <TouchableOpacity onPress={alertTagEvento}>
                        <AntDesign style={globalStyles.infoBottone} name="questioncircleo" size={20} color="black" />
                    </TouchableOpacity>
                </View>
                <TextInput style={globalStyles.input} placeholder="Es. #FreeDrink"></TextInput>
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Tipologia evento</Text>
                    </View>
                </View> */}
                <View style={globalStyles.row}>
                    <Text style={{fontSize: 15}}>Evento Privato</Text>
                    <Checkbox style={{ borderRadius: 40}} title="viualizzaSocial" value={eventType != '' ? eventType == "private" ? true : false : false} onValueChange={() => handleEventType("private")} />
                    <Text style={{fontSize: 15}}>Evento Pubblico</Text>
                    <Checkbox style={{ borderRadius: 40}} title="viualizzaSocial" value={eventType != '' ? eventType == "private" ? false : true : false} onValueChange={() => handleEventType("public")} />
                </View>
                {/*selettore date*/}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data inizio evento</Text>
                    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]}  onPress={() => gestisciCalendario("startDate")}>
                        <Text style={{ alignSelf: 'center'}}>{startDate}</Text>
                    </TouchableOpacity>
                </View>
                {/*orarii evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Orario inizio</Text>
                    <TextInput onChangeText={time => setstartHour(time)} style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="20:00">{startHour}</TextInput>
                </View>
                {/*selettore date*/}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data fine evento</Text>
                    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]}  onPress={() => gestisciCalendario("dataFine")}>
                        <Text style={{ alignSelf: 'center'}}>{dataFineEvento}</Text>
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Orario fine</Text>
                    <TextInput onChangeText={time => setendHour(time)} style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="20:00">{endHour}</TextInput>
                </View>
                {/**calendario */}
                <Modal animationType='slide' visible={apriCalendario}>
                    <View style={globalStyles.vistaCentrata}>
                        <View style={globalStyles.vistaCalendario}>
                        <DatePicker mode='calendar' selected={dataSelezionata === "dataFine" ? dataFineEvento : startDate} onDateChange={cambioData} minimumDate={startDate ? dataSelezionata === "dataFine" ? startDate : dataPartenza: dataPartenza} />
                            <TouchableOpacity  onPress={() => gestisciCalendario(dataSelezionata)} >
                                <AntDesign name="checkcircleo" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/*checkbox eventoRicorsivo
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Evento ricorsivo</Text>
                    </View>
                    <View>
                        <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={eventoRicorsivo} onValueChange={mostraEventoRicorsivo} />
                    </View>
                </View>
                selettore date
                {
                    eventoRicorsivo ? (
                        <View>
                            <View style={globalStyles.row}>
                                <View>
                                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Si ripete ogni: </Text>
                                </View>
                                <View>
                                    <DropDown onValueChange={handleDropdownChange} data={dateRipetizioni} />
                                </View>
                            </View>
                            <View style={globalStyles.row}>
                                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data fine ripetizione</Text>
                                <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]}  onPress={() => gestisciCalendario("dataRipetizioni")}>
                                    <Text style={{ alignSelf: 'center'}}>{dataFineRipetizioni}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ): null
                }*/}
                {/*capacità massima evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20, maxWidth: '70%'}]}>Numero massimo di partecipanti</Text>
                    <TextInput keyboardType="numeric" editable={dontHaveLimit ? false : true } onChangeText={maxCapacity => setMaxCapacity(maxCapacity)} style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="25+">{maxCapacity == 0 ? '' : maxCapacity}</TextInput>
                </View>
                <View style={globalStyles.row}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 20}}>Non ho un limite massimo</Text>
                    </View>
                    <View>
                        <Checkbox style={{ fontWeight: 'bold', fontSize: 20}} title="viualizzaSocial" value={dontHaveLimit} onValueChange={setLimit} />
                    </View>
                </View>
                {/*eta evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Età evento</Text>
                    <TextInput keyboardType="numeric" onChangeText={eta => seteventAge(eta)} style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="0+">{eventAge}</TextInput>
                </View>
                {/*prezzo evento */}
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Costo entrata</Text>
                    <TextInput keyboardType="numeric" onChangeText={costo => seteventCost(costo)} style={[globalStyles.input, globalStyles.selettorePiccolo]} placeholder="0€">{eventCost}</TextInput>
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
                <TouchableOpacity style={[globalStyles.button, {marginTop: 15}]} onPress={modificaEvento}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Modifica il tuo evento</Text>
                </TouchableOpacity>
            </View>
        </View>
    </ScrollView>
  );
}