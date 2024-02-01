

import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, ScrollView, Modal, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DropDown from '../components/DropDown';


export default function Home({ navigation }) {

  const goBack = () => {
    navigation.goBack();
  };

  function gestisciCalendario() {
    setapriCalendario(!apriCalendario);
  };

  const pressHandler = () => {
    navigation.goBack();
  };
  
  function cambioData(propDate) {

        setData(propDate);
  };


  const [apriCalendario, setapriCalendario] = useState(false)
  const [data, setData] = useState('GG-MM-AAAA')
  const [dataFineEvento, setDataFineEvento] = useState('GG-MM-AAAA')

  const dataOdierna = new Date();
  const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY/MM/DD')
  
  var dateRipetizioni = [
    {label:'Giorno', value:'1'},
    {label:'Settimana', value:'2'},
    {label:'Mese', value:'3'},
  ]

  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}]}>
    <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
    <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                  <TouchableOpacity onPress={goBack}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                  </TouchableOpacity>
                  <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Filtri</Text>
                  <TouchableOpacity>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                  </TouchableOpacity>
              </View>
    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Ordina per:</Text>
    <TouchableOpacity style={globalStyles.button2} >
    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>I più vicini</Text>
    </TouchableOpacity>
    <TouchableOpacity style={globalStyles.button2} >
    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>I più popolari</Text>
    </TouchableOpacity>
    <TouchableOpacity style={globalStyles.button2} >
    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Eventi speciali</Text>
    </TouchableOpacity>

    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop:30}} >Seleziona la data:</Text>
    <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 10}]} onPress={gestisciCalendario}>
                    <Text style={{ alignSelf: 'center'}}>{data}</Text>
    </TouchableOpacity>
            <Modal animationType='slide' visible={apriCalendario}>
            <View style={globalStyles.vistaCentrata}>
                <View style={globalStyles.vistaCalendario}>
                    <DatePicker mode='datepicker' selected={dataFineEvento == false ? data : dataFineEvento} onDateChange={cambioData} minimumDate={dataPartenza} />
                    <TouchableOpacity onPress={gestisciCalendario} >
                        <AntDesign name="closecircleo" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop:30}} >Età:</Text>
            <View style={{alignItems:"center"}}>
            <TextInput style={[globalStyles.input, globalStyles.selettorePiccolo, {marginTop:10}]} placeholder="16+"></TextInput>
            </View>
    </View>
            <View style={[ globalStyles.FormContainer2]}>
                    <TouchableOpacity style={globalStyles.button}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Invia</Text>
                    </TouchableOpacity>
            </View> 
</View>
  );
};