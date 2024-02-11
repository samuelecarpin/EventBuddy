
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TextInput, ActivityIndicator, Image, TouchableOpacity} from 'react-native'; 
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

export default function Home({navigation}) { 
  const [events, setEvents] = useState([]);
  const [haveValues, setHaveValues] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = useState(true);
  const today = new Date();
  
  
    async function getValueFor(key) {
        setValue(await SecureStore.getItemAsync(key));
        if (value) {
            console.log("🔐 Here's your value 🔐 \n" + value);
        }
  }

  function apriLocale(id) {
    navigation.navigate('accountInterface', {
      paramKey: id,
    })
  }

  function duplicaEvento(id) {
    navigation.navigate('duplicaEvento', {
      paramKey: id,
    })
  };

  const goBack = () => {
    navigation.goBack();
  }

  const searchUsers = () => {
    setEvents([])
    fetch('http://eventbuddy.localhost/api/searchCommercial?commName='+searchValue, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
        var commercials = [];
      for(let i = 0; i < data.length; i++){
        commercials.push(
             <TouchableOpacity style={[globalStyles.containerCardEventi]}  onPress={() => apriEvento(data[i].id)}>
              <Image
                source={{uri : '/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+data[i].accountImage}} // Assicurati di sostituire con il percorso corretto della tua immagine
                style={globalStyles.backgroundImageCardEventi}
              />
               <View style={globalStyles.contentContainerCardEventi}>
                 <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{data[i].username}</Text>
                 <Text style={globalStyles.sottotitoloCardEventi}>
                  {/* Fine: {data[i].endDate} {findTime(data[i].endDate)} */}
                 </Text>
               </View>
             </TouchableOpacity>
        )
      }
      setLoading(false);
      setEvents(commercials);
      }
    )
  }
  
  const getUserEvents = async() => {
    fetch('http://eventbuddy.localhost/api/commercials', {
    method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setHaveValues(true);
      var commercials = [];
      for(let i = 0; i < data.length; i++){
        commercials.push(
             <TouchableOpacity style={[globalStyles.containerCardEventi]}  onPress={() => apriLocale(data[i].id)}>
              <Image
                source={{uri : '/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+data[i].accountImage}} // Assicurati di sostituire con il percorso corretto della tua immagine
                style={globalStyles.backgroundImageCardEventi}
              />
               <View style={globalStyles.contentContainerCardEventi}>
                 <Text style={[globalStyles.titoloCardEventi, {paddingHorizontal: 10}]}>{data[i].username}</Text>
                 <Text style={globalStyles.sottotitoloCardEventi}>
                  {/* Fine: {data[i].endDate} {findTime(data[i].endDate)} */}
                 </Text>
               </View>
             </TouchableOpacity>
        )
      }
      setLoading(false);
      setEvents(commercials);
      if (data.length == 0) {
        setNoEvents(true)
      }
      })
    }

    useEffect(() => {
      if (haveValues === false) {
        getValueFor(key)
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
          <View style={{flexDirection: 'row'}}>
      <View style={[globalStyles.containerCercaHome, {width: '95%'}]}>
      <TextInput
        autoCapitalize='none' 
        onChangeText={searchValue => setSearchValue(searchValue)} 
        style={globalStyles.inputCercaHome}
        placeholder="Cerca un locale ..."
        value={searchValue}
      />
      <TouchableOpacity onPress={() => setSearchValue("")}><Feather name="x-circle" size={20} color="gray" style={[globalStyles.searchIconCercaHome,{opacity: searchValue == "" ? 0 : 1} ]} /></TouchableOpacity>
      <Feather onPress={searchUsers} name="search" size={24} color="black" style={globalStyles.searchIconCercaHome} />
      </View>
      
    </View>
          <View style={globalStyles.FormContainer}>
            <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                <TouchableOpacity>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Locali </Text>
                <TouchableOpacity>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
            <View style={[globalStyles.FormContainer, {paddingTop: 0}]}>
              {events} 
            </View>
          </View>
      </View>
    </ScrollView>
);  
};