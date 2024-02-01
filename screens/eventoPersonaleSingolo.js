import React, { useState, useEffect } from 'react';
import { ScrollView, Linking, View, Text, ImageBackground, Alert, Image, TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import Mappa from '../components/Mappa';

export default function Home({navigation}) {
  const [socials, setSocials] = useState();
  const [capacity, setCapacity] = useState(null)
  const [like, setLike] = useState(false)
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
      getEvent()
  }
  const pressHandler = () => {
    navigation.goBack();
  }
  const getEvent = async () => {
    try {
      const response = await fetch('http://eventbuddy.localhost/api/showSingle/'+navigation.getParam('paramKey'), {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + value,
        },
      })
      .then(response => response.json())
      .then(data => {
          setDetails(data.details.split(","))
          setCapacity(data.maxCapacity === 0 ? 'Non ha limite di capacità' : "Capacità evento: " + data.maxCapacity);
          setImmagineBack({uri :'/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+data.imagePath})
          setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          });
          setData(data);
          setLike(data.liked ? true : false);
          var date = new Date(data.startDate).toLocaleString();
          setStartDate(date)
          var date = new Date(data.endDate).toLocaleString();
          setEndDate(date)
          setLoading(false);
          setSocials(
            <View style={[globalStyles.infoContainer, globalStyles.row, {paddingLeft: 20, paddingRight: 20}]}>
              <TouchableOpacity disabled={data.facebookLink == null ? true : false } style={{opacity:(data.facebookLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.facebookLink)}>
                <Entypo name="facebook-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.instagramLink == null ? true : false } style={{opacity:(data.instagramLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.instagramLink)}>
                <Entypo name="instagram-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.twitterLink == null ? true : false } style={{opacity:(data.twitterLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.twitterLink)}>
                <Entypo name="twitter-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.youtubeLink == null ? true : false } style={{opacity:(data.youtubeLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.youtubeLink)}>
                <Entypo name="youtube-with-circle" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.website == null ? true : false } style={{opacity:(data.website ? 1 : 0.5 )}} onPress={() => apriSocial(data.website)}>
                <Entypo name="network" size={35} color="black" />
              </TouchableOpacity>
            </View>
          )
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

  function eventLike () {
    if (value) {
    if (like == false ){
      setLike(true);
        try {
          fetch('http://eventbuddy.localhost/api/like', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ value
          },
          body: JSON.stringify({
            "eventId": navigation.getParam('paramKey'),
          })
        })
        .then(response => response.json())
          .then(data => {
              if(data.success) {
                Alert.alert('Successo', 'Evento aggiunto agli eventi che ti interessano', [
                  {
                      text: 'OK'
                  },
              ]);
              }
          })
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      setLike(false);
        try {
          fetch('http://eventbuddy.localhost/api/unlike/'+navigation.getParam('paramKey'), {
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer '+ value
          }
        })
        .then(response => response.json())
          .then(data => {
              if(data.success) {
                Alert.alert('Successo', 'Evento rimosso agli eventi che ti interessano', [
                  {
                      text: 'OK'
                  },
              ]);
              }
          })
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  } else {
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
            <Image style={globalStyles.listItem} source={{ uri: '/Users/jacopofelluga/Apps/EventBuddyGit/assets/coriandoli.png'}} />
            <Text style={{fontSize: 16, paddingRight: 70}}>{details[i]}</Text>
          </View>
        )
      }
      return dettagliEvento
    }

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
                  <Ionicons style={[{transform: [{rotate: '-90deg'}]}]}name="ios-chevron-back-sharp" size={33} color="white" />
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
              <View style={[globalStyles.dettagliCopertinaEvento, {alignContent:'center'}]}>
                <Text style={globalStyles.panoramicaEvento}>{startDate != null ? startDate.split(",")[0]: ''} {startDate != null ? findTime(startDate): ''} - {endDate != null ? endDate.split(",")[0]: ''} {endDate != null ? findTime(endDate): ''}</Text>
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
            <TouchableOpacity onPress={() => eventLike()}>
              {like ? <Octicons style={{marginBottom: 20}} name="heart-fill" size={27} color="black" />
              : <Octicons style={{marginBottom: 20}} name="heart" size={27} color="black" />
              }
              </TouchableOpacity>
            <View style={[globalStyles.infoContainer, {marginTop: 0,  marginBottom: 30}]}>
              <Text style={{ fontWeight: '700', fontSize: 18}}>Creato da: {data != null ? data.username: ''}</Text>
              <Text style={{ fontWeight: '700', fontSize: 18}}>Costo: {data != null ? data.price: ''} €</Text>
              <Text style={{ fontWeight: '700', fontSize: 18}}>Età minima: {data != null ? data.minimumAge: ''} anni</Text>
              <Text style={{ fontWeight: '700', fontSize: 18}}>{capacity}</Text>
            </View>
            {/*direzioni */}
            <TouchableOpacity onPress={() => openMaps(mapRegion.latitude, mapRegion.longitude)} style={[globalStyles.infoContainer, {alignItems: 'center', marginTop: 0}]} >
              <Text style={{ fontWeight: 'bold', fontSize: 20}}>Direzioni evento</Text>
            </TouchableOpacity>
            {/*mappa */}
            <View style={[globalStyles.mapContainer, {marginTop: 15, marginBottom: 15}]}>
              <Mappa markers={mapRegion} />
            </View>
            {/*descrizione evento */}
            <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 20}}>Descrizione evento</Text>
              <Text style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>{data != null ? data.description: ''}</Text>
            </View>
            {/*dettagli evento */}
            <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 20}}>Dettagli evento</Text>
              {createDetails()}
            </View>
            {/*tag evento */}
            {/* <View style={globalStyles.infoContainer} >
              <Text style={{ fontWeight: 'bold', fontSize: 20}}>Tag evento</Text>
              <Text style={{paddingLeft: 15, paddingRight: 15, paddingTop: 10}}>{listaTags}</Text>
            </View> */}
            {/*social */}
            {socials}
          </View>
      </View>
    </ScrollView>
    );
};