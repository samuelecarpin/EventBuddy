import React, {useState, useEffect} from 'react';
import {View, Image, Text, Alert, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Octicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';


export default function login({navigation}) {
    const [username, setUsername] = useState(null)
    const [immagineBack, setImmagineBack] = useState({uri: ''});
    const [haveValues, setHaveValues] = useState(false);
    const [rimuoviTitolo, setrimuoviTitolo] = useState(true)
    const [key, setKey] = React.useState('userToken');
    const [value, setValue] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getValueFor(key)
        getUserData();
        setTimeout(() => {
            setRefreshing(false);
          }, 2000);
    }, []);
    async function getValueFor(key) {
        setValue(await SecureStore.getItemAsync(key));
        if (value) {
            console.log("🔐 Here's your value 🔐 \n" + value);    
        }
    }

    async function saveValue(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const logOut = async() => {
        fetch('http://eventbuddy.localhost/api/logout', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+ value
        },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success == true) {
                saveValue(key, '')
                navigation.navigate('login')
            }
            
        })
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        setrimuoviTitolo(false);
        var formData = new FormData();
        formData.append('image', {
            uri: result.assets[0].uri,
            name: 'selected.jpg',
            type: 'image/jpeg',
        });
        fetch('http://eventbuddy.localhost/api/updateUser?type=image&_method=PUT', {
            method: 'POST',
            headers: {
                Authorization: 'bearer ' + value,
            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success == true) {
                    setImmagineBack({uri: result.assets[0].uri})
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
        setImmagineBack({uri: ''})
        var formData = new FormData();
        fetch('http://eventbuddy.localhost/api/updateUser?type=image&delete=true&_method=PUT', {
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

    const getUserData = async() => {
        fetch('http://eventbuddy.localhost/api/get_user', {
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
            setUsername(data.user.username)
            setImmagineBack({uri: data.user.accountImage != '' ? '/Users/jacopofelluga/Apps/php/EventBuddy/storage/app/'+data.user.accountImage : ''})
            data.user.accountImage != '' ? setrimuoviTitolo(false) : '';
        })
    }

    useEffect(() => {
        if (haveValues === false) {
          getValueFor(key)
          getUserData();
        }
    });

    const eventiVisitati = () => {
        navigation.navigate('eventiVisitati')
    }
    const eventiCreati = () => {
        navigation.navigate('eventiCreati')
    }
    const linkSocial = () => {
        navigation.navigate('linkSocial')
    }
    const informazioniPersonali = () => {
        navigation.navigate('informazioniPersonali')
    }
    const eventiInteressanti = () => {
        navigation.navigate('eventiInteressanti')
    }
    const resetPassword = () => {
        navigation.navigate('resetPassword')
    }
    const eliminaAccount = () => {
        navigation.navigate('eliminaAccount')
    }
    

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView key={refreshing} style={{ flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView key={refreshing}  refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View style={{flex: 1}}>
                <View style={globalStyles.FormContainer}>
                    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold'}]}>
                        <TouchableOpacity onPress={() => navigation.navigate('accountInterfacePersonal')}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                        </TouchableOpacity>
                        <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 25}]}>Profilo</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{marginBottom: 10}} onPress={pickImage}>
                        <Image source={immagineBack}  resizeMode="cover" style={globalStyles.immagineAccount} />
                    </TouchableOpacity>
                    {
                        rimuoviTitolo ? (
                            null
                        ) : (
                            <TouchableOpacity onPress={confermaRimozioneImmagine} style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingVertical: 10, alignItems: 'center'}}><Text style={{fontSize: 18}}>Rimuovi immagine </Text><AntDesign name="closecircleo" size={20} color="black" /></TouchableOpacity>
                        )
                    }
                    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold'}]}>
                        <TouchableOpacity>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                        <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>{username}</Text>
                        <TouchableOpacity>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/*selettori */}
                    <View style={[globalStyles.infoContainer, {paddingTop: 30}]}>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={informazioniPersonali}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Informazioni Personali</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[[globalStyles.row, globalStyles.infoPersonaliSelettore],]} onPress={linkSocial}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Link ai social</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={eventiVisitati}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Eventi Visitati</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={eventiInteressanti}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Eventi che mi interessano</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={eventiCreati}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Eventi Creati</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>I miei locali</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={resetPassword}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Reset Password</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]} onPress={eliminaAccount}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Elimina Account</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logOut} style={[globalStyles.logOut]}>
                                <Text style={[globalStyles.titoliRiga, globalStyles.whiteText, { fontWeight: 'bold', fontSize: 17}]}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
