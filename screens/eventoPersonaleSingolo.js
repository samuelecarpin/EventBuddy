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
  const [userId, setUserId] = useState('')
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
    keyRef = keyRef + 1;
  }

  const handleEmail = () => {
    Alert.alert('Conferma segnlazione evento', 'Sei sicuro di voler segnalare questo evento ?', [
      {
          text: 'Si',
          onPress: () => {
            fetch('http://eventbuddy.localhost/api/reportEvent', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "id": navigation.getParam('paramKey'),
            })
            })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                Alert.alert('Successo', 'Evento segnalato correttamente', [
                  {
                      text: 'OK'
                  },
                ]) 
              }
            });

          }
      },
      {
        text: 'No',
      },
  ]);
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
          setUserId(data.user_id)
          setLoading(false);
          setSocials(
            <View style={[globalStyles.infoContainer, globalStyles.row, {paddingLeft: 20, paddingRight: 20}]}>
              <TouchableOpacity disabled={data.facebookLink == null ? true : false } style={{opacity:(data.facebookLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.facebookLink)}>
              <FontAwesome5 name="facebook-f" size={27} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.instagramLink == null ? true : false } style={{opacity:(data.instagramLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.instagramLink)}>
              <FontAwesome5 name="instagram" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.twitterLink == null ? true : false } style={{opacity:(data.twitterLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.twitterLink)}>
                <FontAwesome5 name="tiktok" size={27} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.youtubeLink == null ? true : false } style={{opacity:(data.youtubeLink ? 1 : 0.5 )}} onPress={() => apriSocial(data.youtubeLink)}>
              <FontAwesome5 name="youtube" size={27} color="black" />
              </TouchableOpacity>
              <TouchableOpacity disabled={data.website == null ? true : false } style={{opacity:(data.website ? 1 : 0.5 )}} onPress={() => apriSocial(data.website)}>
                <Entypo name="network" size={30} color="black" />
              </TouchableOpacity>
            </View>
          )
      })
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


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

    function navigateAccount() {
      navigation.navigate('accountInterface', {
        paramKey: userId,
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
                <Text style={globalStyles.panoramicaEvento}>{startDate != null ? startDate.split(",")[0]: ''} {startDate != null ? startDate.split(" ")[1].slice(0,-3): ''} - {endDate != null ? endDate.split(",")[0]: ''} {endDate != null ? endDate.split(" ")[1].slice(0,-3): ''}</Text>
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
              <TouchableOpacity onPress={navigateAccount}><Text style={{ fontWeight: '700', fontSize: 18, marginVertical: 3}}>Creato da: {data != null ? data.username: ''}</Text></TouchableOpacity>
              <Text style={{ fontWeight: '700', fontSize: 18, marginVertical: 3}}>Tipologia evento: {data != null ? data.eventType == "private" ? "privato" : "pubblico" : ''}</Text>
              <Text style={{ fontWeight: '700', fontSize: 18, marginVertical: 3}}>Costo: {data != null ? data.price: ''} €</Text>
              <Text style={{ fontWeight: '700', fontSize: 18, marginVertical: 3}}>Età minima: {data != null ? data.minimumAge: ''} anni</Text>
              <Text style={{ fontWeight: '700', fontSize: 18, marginVertical: 3}}>{capacity}</Text>
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

            <Text onPress={handleEmail} style={{marginBottom: 20, color: '#e82e41', fontSize: 15, textDecorationLine: 'underline'}}>Segnala l'evento</Text>

          </View>
      </View>
    </ScrollView>
    );
};