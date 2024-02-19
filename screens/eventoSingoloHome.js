import React, { useState, useEffect } from 'react';
import { ScrollView, Linking, View, Text, ImageBackground, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Mappa from '../components/Mappa';

export default function Home({navigation}) {
  const [data, setData] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [details, setDetails] = useState([])
  const [immagineBack, setImmagineBack] = useState({uri: ''});
  const [key, setKey] = React.useState('userToken');
  const [value, setValue] = React.useState('');
  const [loading, setLoading] = useState(true);
  async function getValueFor(key) {
      setValue(await SecureStore.getItemAsync(key));
      if (value) {
          getEvent();
      }
  }
  const pressHandler = () => {
    navigation.goBack();
  }
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
          setDetails(data.details.split(","))
          setDetails(current => [...current, data.price, data.minimumAge, data.maxCapacity]);
          data.imagePath != null ? setImmagineBack({uri :'https://api.weventsapp.it/'+data.imagePath}) : setImmagineBack({uri :'/Users/jacopofelluga/Apps/EventBuddyGit/assets/image'+Math.floor(Math.random() * 5) + 1+'.png'})
          setLocation({
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          });
          setData(data);
          var date = new Date(data.startDate).toLocaleString();
          setStartDate(date)
          var date = new Date(data.endDate).toLocaleString();
          setEndDate(date)
          setLoading(false);
      })
    } catch (error) {
      console.error('Error during login:', error);
    }
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

  useEffect(() => {
    getValueFor(key);
  }, [value]); 

  var dettagliEvento = [];
    function createDetails () {
      for(let i = 0; i < details.length; i++){
        dettagliEvento.push(
          <View style={[globalStyles.row, {justifyContent: 'left'}]}>
            <Image style={globalStyles.listItem} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/startup-f5f25.appspot.com/o/coriandoli.png?alt=media&token=4f9f14ad-91ee-4f3b-941a-96bc5d657fb6'}} />
            <Text style={{ paddingRight: 70}}>{details[i]}</Text>
          </View>
        )
      }
      return dettagliEvento
    }

    var listaTags = ["#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music","#freedrink", "#vip", "#music",];

    let [mapRegion, setLocation] = useState({
      latitude: '45.4640976',
      longitude: '9.1893516',
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0421,
    });

    const openMaps = (latitude, longitude) => {
      const daddr = `${latitude},${longitude}`;
      const company = Platform.OS === "ios" ? "apple" : "google";
      Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
    }

    function apriSocial(social){
      Linking.canOpenURL(social).then((SUPPORTED) => {
        SUPPORTED && Linking.openURL(social);
      })
    }
    
    return(
      // safearea X non intralciare con date e robe
      <ScrollView style={{flex: 1,}}>
        <View style={{flex: 1, backgroundColor: '#FFF'}}>
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
                <Text style={globalStyles.nomeEvento}>{data != null ? data.name: ''}</Text>
              </View>
              {/*data e ora*/}
              <View style={globalStyles.dettagliCopertinaEvento}>
                <Text style={globalStyles.panoramicaEvento}>{startDate != null ? startDate.split(",")[0]: ''} {startDate != null ? findTime(startDate): ''} - {endDate != null ? endDate.split(",")[0]: ''} {endDate != null ? findTime(endDate): ''} | {data != null ? data.minimumAge: ''}+</Text>
              </View>
              </LinearGradient>
            </ImageBackground>
          </View>
          <View style={globalStyles.FormContainer}>
            {/*<TouchableOpacity style={[globalStyles.button, {marginBottom: 15}]} onPress={pressHandler}>
              <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 18}]}>Contatta l'organizzatore</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: 100, textAlign: 'center'}}>Informazioni</Text>
              </View>
              <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
            </View>*/}
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Creato da: {data != null ? data.username: ''}</Text>
            </View>
            {/*direzioni */}
            <TouchableOpacity onPress={() => openMaps(mapRegion.latitude, mapRegion.longitude)} style={[globalStyles.infoContainer, {alignItems: 'center', marginTop: 0}]} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Direzioni evento</Text>
            </TouchableOpacity>
            {/*mappa */}
            <View style={[globalStyles.mapContainer, {marginTop: 15, marginBottom: 15}]}>
              <Mappa markers={mapRegion} />
            </View>
            {/*descrizione evento */}
            <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Descrizione evento</Text>
              <Text style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>{data != null ? data.description: ''}</Text>
            </View>
            {/*dettagli evento */}
            <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Dettagli evento</Text>
              {createDetails()}
            </View>
            {/*tag evento */}
            <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 18}}>Tag evento</Text>
              <Text style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>{listaTags}</Text>
            </View>
            {/*social */}
            <View style={[globalStyles.infoContainer, globalStyles.row, {paddingLeft: 20, paddingRight: 20}]}>
              <TouchableOpacity onPress={() => apriSocial(data.facebookLink)}>
                <Entypo name="facebook-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => apriSocial(data.instagramLink)}>
                <Entypo name="instagram-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => apriSocial(data.twitterLink)}>
                <Entypo name="twitter-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => apriSocial(data.youtubeLink)}>
                <Entypo name="youtube-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => apriSocial(data.website)}>
                <Entypo name="network" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </ScrollView>
    );
};