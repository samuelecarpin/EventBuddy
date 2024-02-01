import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, SafeAreaView, Image, TextInput, ScrollView} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import Checkbox from 'expo-checkbox';

export default function login({navigation}) {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [userType, setUserType] = useState(null)
    const [cellular, setCellular] = useState(null)
    const [rimuoviTitolo, setrimuoviTitolo] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [facebookLink, setFacebookLink] = useState(null)
    const [instagramLink, setInstagramLink] = useState(null)
    const [twitterLink, setTwitterLink] = useState(null)
    const [youtubeLink, setYoutubeLink] = useState(null)
    const dataOdierna = new Date();
    const [immagineBack, setImmagineBack] = useState({uri: ''});
    const [selectedImage, setSelectedImage] = useState(null)
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [birthDateError, setBirthDateError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [userError, setUserError] = useState(false);
    const [cellularError, setCellularError] = useState(false);
    const [usernameError, setUsernameError] = useState(null)
    const [apriCalendario, setapriCalendario] = useState(false)
    const [data, setData] = useState(null)
    const [dataInizio, setDataInizio] = useState(null)
    const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY/MM/DD')

    const goBack = () => {
        navigation.goBack();
    }

    function cambioData(date) {
            setDataInizio(date);
            setData(date);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });
        setrimuoviTitolo(false);
        setSelectedImage(result.assets[0].uri);
        setImmagineBack({uri: result.assets[0].uri})
    };

    const removeImage = async () => {
        setrimuoviTitolo(true);
        setSelectedImage(null);
        setImmagineBack({uri: ''})
    }

    function gestisciCalendario() {
        setapriCalendario(!apriCalendario);
    };

    function registerPerson () {
        var formData = new FormData();
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('email', email);
        formData.append('username', username);
        formData.append('birthDate', data);
        formData.append('cellular', cellular);
        formData.append('userType', userType);
        formData.append('password', password);
        selectedImage ? formData.append('image', {
            uri: selectedImage,
            name: 'selected.jpg',
            type: 'image/jpeg',
        }) : '';
        formData.append('facebookLink', facebookLink);
        formData.append('instagramLink', instagramLink);
        formData.append('twitterLink', twitterLink);
        formData.append('youtubeLink', youtubeLink);
        formData.append('website', website);
        fetch('http://eventbuddy.localhost/api/register', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
                if (data.success == true) {
                    navigation.navigate("confermaRegistrazione")
                } else {
                    
                    if (data.errors.name) {
                        setNameError(true)
                    } else {
                        setNameError(false)
                    }
                    if (data.errors.surname) {
                        setSurnameError(true)
                    } else {
                        setSurnameError(false)
                    }
                    if (data.errors.birthDate) {
                        setBirthDateError(true)
                    } else {
                        setBirthDateError(false)
                    }
                    if (data.errors.username) {
                        setUsernameError(true)
                    } else {
                        setUsernameError(false)
                    }
                    if (data.errors.cellular) {
                        setCellularError(true)
                    } else {
                        setCellularError(false)
                    }
                    if (data.errors.email) {
                        setEmailError(true)
                    } else {
                        setEmailError(false)
                    }
                    if (data.errors.password) {
                        setPasswordError(true)
                    } else {
                        setPasswordError(false)
                    }
                    if (data.errors.userType) {
                        setUserError(true)
                    } else {
                        setUserError(false)
                    }
                }
        })
    }

  return(
    // safearea X non intralciare con date e robe
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF'}}>
        <ScrollView>
            <View style={{flex: 1}}>
                <View style={globalStyles.FormContainer}>
                    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                        </TouchableOpacity>
                        <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Registrati</Text>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 10}} >Foto profilo</Text>
                    <TouchableOpacity style={{marginBottom: 10}} onPress={pickImage}>
                        <Image source={immagineBack}  resizeMode="cover" style={globalStyles.immagineAccount} />
                    </TouchableOpacity>
                    {
                        rimuoviTitolo ? (
                            null
                        ) : (
                            <TouchableOpacity onPress={removeImage} style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingVertical: 10, alignItems: 'center'}}><Text style={{fontSize: 18}}>Rimuovi immagine </Text><AntDesign name="closecircleo" size={20} color="black" /></TouchableOpacity>
                        )
                    }
                    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Dati principali</Text>
                        <TextInput onChangeText={name => setName(name)} style={[globalStyles.input, nameError ? globalStyles.error : '']} placeholder="Nome*"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Cognome</Text> */}
                        <TextInput  onChangeText={surname => setSurname(surname)} style={[globalStyles.input, surnameError ? globalStyles.error : '']} placeholder="Cognome*"></TextInput>
                    {/* <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data di nascita</Text> */}
                        <TouchableOpacity  style={[globalStyles.input, birthDateError ? globalStyles.error : '']} onPress={gestisciCalendario}>
                            <Text style={{textAlign: 'center', color: data == null ? "#bdbdbd" : "black" }} >{data == null ? "Data di nascita*" : data }</Text>
                        </TouchableOpacity>
                    {/**calendario */}
                    <Modal animationType='slide' visible={apriCalendario}>
                        <View style={globalStyles.vistaCentrata}>
                            <View style={globalStyles.vistaCalendario}>
                            <DatePicker mode='calendar' selected={dataInizio} onDateChange={cambioData} maximumDate={dataPartenza} />
                                <TouchableOpacity  onPress={gestisciCalendario} >
                                    <AntDesign name="checkcircleo" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text> */}
                        <TextInput autoCapitalize='none' onChangeText={email => setEmail(email)} style={[globalStyles.input, emailError ? globalStyles.error : '']} placeholder="Email*"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Password</Text> */}
                        <TextInput autoCapitalize='none' onChangeText={password => setPassword(password)} style={[globalStyles.input, passwordError ? globalStyles.error : '']} placeholder="Password*"></TextInput>
                        <View style={{paddingHorizontal: 15}}>
                            <Text style={{textAlign: 'center', color: '#062F76'}}>Minimo 8 caratteri, 1 lettera minuscola, 1 maiuscola e 1 numero</Text>
                        </View>
                    {/*<Text style={{ fontWeight: 'bold', fontSize: 20}}>Cellulare</Text>
                        <TextInput onChangeText={cellular => setCellular(cellular)} style={[globalStyles.input,  cellularError ? globalStyles.error : '']} placeholder="Cellulare"></TextInput>*/}
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Username</Text> */}
                        <TextInput autoCapitalize='none' onChangeText={username => setUsername(username)} style={[globalStyles.input,  usernameError ? globalStyles.error : '']} placeholder="Username*"></TextInput>
                <View style={[globalStyles.row, userError ? globalStyles.error : '']}>
                    <Text style={{fontSize: 15}}>Account Personale</Text>
                    <Checkbox style={{ borderRadius: 40}} title="viualizzaSocial" value={userType != '' ? userType == "personal" ? true : false : false} onValueChange={() => setUserType("personal")} />
                    <Text style={{fontSize: 15}}>Account Attività</Text>
                    <Checkbox style={{ borderRadius: 40}} title="viualizzaSocial" value={userType != '' ? userType == "commercial" ? true : false : false} onValueChange={() => setUserType("commercial")} />
                </View>
                    {/*<Text style={{ fontWeight: 'bold', fontSize: 20}}>Codice Fiscale</Text>
                        <TextInput onChangeText={name => setName(name)} style={[globalStyles.input, nameError ? globalStyles.error : '']} placeholder="Codice Fiscale"></TextInput>*/}
                    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Socials</Text>
                        <TextInput onChangeText={website => setWebsite(website)} style={globalStyles.input} placeholder="Sito Internet"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Instagram</Text> */}
                        <TextInput onChangeText={instagramLink => setInstagramLink(instagramLink)} style={globalStyles.input} placeholder="Instagram"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Facebook</Text> */}
                        <TextInput onChangeText={facebookLink => setFacebookLink(facebookLink)} style={globalStyles.input} placeholder="Facebook"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Twitter</Text> */}
                        <TextInput onChangeText={twitterLink => setTwitterLink(twitterLink)} style={globalStyles.input} placeholder="Twitter"></TextInput>
                    {/* <Text style={{ fontWeight: 'bold', fontSize: 20}}>Youtube</Text> */}
                        <TextInput onChangeText={youtubeLink => setYoutubeLink(youtubeLink)} style={globalStyles.input} placeholder="Youtube"></TextInput>
                    {/*<View style={globalStyles.caricaDocumenti}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#062F76'}}>Carica fronte documento</Text>
                    </View>
                    <View style={globalStyles.caricaDocumenti}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#062F76'}}>Carica retro documento {/*https://www.veriff.com/plans/self-serve</Text>
                    </View>*/}
                </View>
                <View style={[globalStyles.ButtonContainer, {marginTop: 10}]}>
                <TouchableOpacity onPress={registerPerson} style={globalStyles.button}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 15}]}>Registrati</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
