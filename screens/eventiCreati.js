
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Alert, ActivityIndicator, Image, TouchableOpacity} from 'react-native'; 
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function Home({navigation}) { 
  const [events, setEvents] = useState([]);
  const [haveValues, setHaveValues] = useState(false);
  const [noEvents, setNoEvents] = useState(false);
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = useState(true);
  const today = new Date();
  getValueFor(key)
  
    async function getValueFor(key) {
        setValue(await SecureStore.getItemAsync(key));
        if (value) {
            console.log("🔐 Here's your value 🔐 \n" + value);
        }
  }

  function apriEvento(id) {
    navigation.navigate('eventoPersonaleSingolo', {
      paramKey: id,
    })
  };

  function modificaEvento(id) {
    navigation.navigate('modificaEvento', {
      paramKey: id,
    })
  };

  function duplicaEvento(id) {
    navigation.navigate('duplicaEvento', {
      paramKey: id,
    })
  };
  function eliminaEvento(id) {
    Alert.alert('Elimina evento', 'Sei sicuro di voler eliminare l\'evento ?', [
      {
        text: 'No',
      },
      {
        text: 'Si voglio eliminarlo',
        style: 'destructive',
        onPress: () =>
          fetch(`http://eventbuddy.localhost/api/delete/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: 'bearer ' + value,
            },
          })
            .then(response => {
              if (!response.ok) {
                throw new Error(`Errore durante la richiesta API: ${response.status} - ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              if (data.success) {
                Alert.alert('Successo', 'L\'evento è stato eliminato con successo', [
                  {
                    text: 'OK',
                  },
                ]);
                setEvents([]);
                getUserEvents();
              }
            })
            .catch(error => {
              console.error('Errore durante la richiesta API:', error.message);
              // Gestisci l'errore, ad esempio mostrando un messaggio all'utente
            }),
      },
    ]);
  };
  

  function findTime(time) {
    if (time.split(" ")[2] == "PM") {
      if(time.split(" ")[1] == "12") {
        return time.split(" ")[1].slice(0, -3)
      } else {
        return parseInt(time.split(" ")[1].split(":")[0]) + 12 + ":" + time.split(" ")[1].split(":")[1]
      }
    } else {
      
      if(time.split(" ")[1].split(":")[0] == "12") {
        return parseInt(time.split(" ")[1].split(":")[0]) - 12 + ":" + time.split(" ")[1].split(":")[1]

      }  
        return time.split(" ")[1].slice(0, -3)
      
    }
}

  const goBack = () => {
    navigation.goBack();
  }
  
  const getUserEvents = async() => {
    fetch('http://eventbuddy.localhost/api/events', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer '+ value
    },
    })
    .then(response => response.json())
    .then(data => {
      setHaveValues(true);
      var newEvents = [];
      var oldDates = false;
      for(let i = 0; i < data.length; i++){
        const eventEndDate = new Date(data[i].endDate);
        if(eventEndDate < today){
          if(oldDates == false) {
            oldDates = true;
            newEvents.push(
            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 25, marginVertical: 10}]}>Eventi passati</Text>
            )
          }
        }
        newEvents.push(
            <>
            
             <TouchableOpacity style={[globalStyles.containerCardEventi, {opacity:(eventEndDate > today ? 1 : 0.5 )}]}  onPress={() => apriEvento(data[i].id)}>
               <Image
                 source={{uri :'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+data[i].imagePath}} // Assicurati di sostituire con il percorso corretto della tua immagine
                 style={globalStyles.backgroundImageCardEventi}
               />
               <View style={globalStyles.contentContainerCardEventi}>
                 <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{data[i].name}</Text>
                 <Text style={globalStyles.sottotitoloCardEventi}>
                    Inizia il: {new Date(data[i].startDate).toLocaleString().split(",")[0]} {new Date(data[i].startDate).toLocaleString().split(" ")[1].slice(0,-3)}
                 </Text>
               </View>
             </TouchableOpacity>
             <View style={{flexDirection: 'row', marginVertical: 10}}>
                  <TouchableOpacity style={{backgroundColor: '#f7f7f7', padding: 15, borderRadius: 20, marginRight: 20}}  onPress={() => duplicaEvento(data[i].id)} >
                      <Text style={[{fontSize: 15, fontWeight: 500, alignItems:"center"}]}><Feather name="copy" size={17} color="black" /> Duplica</Text>
                  </TouchableOpacity>
                  <TouchableOpacity disabled={eventEndDate > today ? false : true } onPress={() => modificaEvento(data[i].id)} style={{ backgroundColor: '#f7f7f7', padding: 15, borderRadius: 20, marginRight: 20, opacity:(eventEndDate > today ? 1 : 0.5 )}}>
                      <Text style={[{fontSize: 15, fontWeight: 500, alignItems:"center"}]}><Feather name="edit" size={17} color="black" /> Modifica</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  onPress={() => eliminaEvento(data[i].id)} style={{backgroundColor: '#ff5b4f', padding: 15, borderRadius: 20}}>
                      <Text style={[{fontSize: 15, color: "white", fontWeight: 600, alignItems:"center"}]}><Feather name="trash-2" size={17} color="white" /> Elimina</Text>
                  </TouchableOpacity>
              </View>
            </>
        )
      }
      setLoading(false);
      setEvents(newEvents);
      if (data.length == 0) {
        setNoEvents(true)
      }
      })
    }

    useEffect(() => {
      if (haveValues === false) {
        getUserEvents();
      }
      
    });

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }
  return(
    <ScrollView style={{ backgroundColor: '#FFF'}}>
      <View style={{flex: 1, backgroundColor: '#FFF'}}> 
          <View style={globalStyles.safeArea}></View>
          <View style={globalStyles.FormContainer}>
            <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                </TouchableOpacity>
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>I miei eventi</Text>
                <TouchableOpacity>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.FormContainer, {paddingTop: 0}]}>
              {events} 
              {
                    noEvents ? (
                        <Text style={{color: '#ff5b4f', fontWeight: 'bold', fontSize: 35 }}>Non hai creato eventi !</Text>
                    ): null
              }
            </View>
          </View>
      </View>
    </ScrollView>
);  
};