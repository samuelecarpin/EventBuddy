import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput, ActivityIndicator, ScrollView, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import * as SecureStore from 'expo-secure-store';


export default function Home({ navigation }) {
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [key, setKey] = React.useState('userToken');
    const [value, setValue] = React.useState('');
    const [haveValues, setHaveValues] = useState(false);
    const [loading, setLoading] = useState(true);
    const dataOdierna = new Date();
    const [apriCalendario, setapriCalendario] = useState(false)
    const [data, setData] = useState(null)
    const [dataInizio, setDataInizio] = useState(null)
    const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY/MM/DD')
  
  

  async function getValueFor(key) {
    setValue(await SecureStore.getItemAsync(key));
    if (value) {
        console.log("🔐 Here's your value 🔐 \n" + value);
    }
  }

  function cambioData(date) {
    setData(date);
};

function gestisciCalendario() {
    setapriCalendario(!apriCalendario);
};

  const goBack = () => {
    navigation.goBack();
  }

  function gestisciCalendario() {
    setapriCalendario(!apriCalendario);
  };

  function getUserData() {
    fetch('http://api.weventsapp.it/api/get_user', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer '+ value
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.user.name)
        setSurname(data.user.surname)
        setUsername(data.user.username)
        setData(data.user.birthDate.replace(/-/g, '/'))
        setEmail(data.user.email)
        setLoading(false)
        setHaveValues(true)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle error if needed
      });

  }

  useEffect(() => {
    if (haveValues === false) {
      getValueFor(key)
      getUserData();
    }
  });

  function saveUserData () {
    forceUpdateKey = !forceUpdateKey;
    fetch('http://api.weventsapp.it/api/updateUser?type=info&_method=PUT', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+ value
        },
        body: JSON.stringify({
          "name": name,
          "username": username,
          "birthDate": data,
          "surname": surname,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.success) {
                Alert.alert('Successo', 'Dati modificati con successo', [
                    {
                        text: 'OK',
                    },
                ]);
                navigation.navigate('account');
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
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating user information:', error);
        });
  }

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />
    }

  

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom:50}}>
    <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
            <View style={[globalStyles.FormContainer, {height:"90%"}]}>
            <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                <TouchableOpacity onPress={goBack} style={{marginTop:5}}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                </TouchableOpacity>
                <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Informazioni</Text>
                <TouchableOpacity onPress={goBack}>
                    <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                </TouchableOpacity>
            </View>
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Nome</Text>
                    <TextInput onChangeText={name => setName(name)} style={globalStyles.input}>{name}</TextInput>
                <Text style={{ fontWeight: 'bold', fontSize: 20}}>Cognome</Text>
                    <TextInput onChangeText={surname => setSurname(surname)} style={globalStyles.input}>{surname}</TextInput>
                <View style={globalStyles.row}>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 20}]}>Data Di nascita</Text>
                    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 0}]} onPress={gestisciCalendario}>
                        <Text style={{ alignSelf: 'center'}}>{data}</Text>
                    </TouchableOpacity>
                </View>
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
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text>
                <TextInput editable={false} style={globalStyles.input} placeholder='Email'>{email}</TextInput>
                {/* <Text style={{ fontWeight: 'bold', fontSize: 20}} >CodiceFiscale</Text>
                <TextInput style={globalStyles.input}>CodiceFiscale</TextInput> */}
                <Text style={{ fontWeight: 'bold', fontSize: 20}} >Username</Text>
                <TextInput onChangeText={username => setUsername(username)} style={[globalStyles.input]} placeholder='Username' >{username}</TextInput>
                </View>
              <View style={[globalStyles.FormContainer2]}>  
                <TouchableOpacity style={[globalStyles.button, {marginTop: 15}]} onPress={saveUserData}>
                <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Salva</Text>
                </TouchableOpacity>
              </View>
              </View>
  );
}
