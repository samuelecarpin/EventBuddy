
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
        fetch('http://eventbuddy.localhost/api/delete/'+id, {
        method: 'DELETE',
        headers: {
            Authorization: 'Bearer '+ value
        },
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
              Alert.alert('Successo', 'L\'evento è stato eliminato con successo', [
                {
                    text: 'OK'
                },
            ]);
              setEvents([])
              getUserEvents()
            }
          })
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
    fetch('http://eventbuddy.localhost/api/likedEvents', {
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
                  Inizia il: {data[i].startDate} {findTime(data[i].startDate)}
                 </Text>
               </View>
             </TouchableOpacity>
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
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35, textAlign: 'center'}]}>Eventi che mi interessano</Text>
                <TouchableOpacity>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.FormContainer, {paddingTop: 0}]}>
              {events} 
              {
                    noEvents ? (
                        <Text style={{color: '#ff5b4f', fontWeight: 'bold', fontSize: 35 }}>Non hai event che ti interessano !</Text>
                    ): null
              }
            </View>
          </View>
      </View>
    </ScrollView>
);  
};