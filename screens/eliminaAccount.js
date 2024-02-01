
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, TextInput, Alert, ScrollView, Modal } from 'react-native';
import { globalStyles } from '../styles/global';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import DropDown from '../components/DropDown';


export default function Home({ navigation }) {
  const [selectedImage, setSelectedImage] = useState('')
  const [rimuoviTitolo, setrimuoviTitolo] = useState(true)
  const [visualizzaSocial, setvisualizzaSocial] = useState(false)
  const [eventoEsteso, seteventoEsteso] = useState(false)
  const [eventoRicorsivo, seteventoRicorsivo] = useState(false)
  const [apriCalendario, setapriCalendario] = useState(false)
  const [data, setData] = useState('GG-MM-AAAA')
  const [dataFineEvento, setDataFineEvento] = useState('GG-MM-AAAA')

  const goBack = () => {
    navigation.goBack();
  };

  const vaiAResetPasswordContinua = () => {
    navigation.navigate("resetPasswordContinua");
  };

  const pressHandler = () => {
    navigation.goBack();
  };


return (
        <View style={{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}}>
          <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
            <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
            <View style={globalStyles.FormContainer}>
              <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                  <TouchableOpacity onPress={goBack}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                  </TouchableOpacity>
                  <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Elimina account</Text>
                  <TouchableOpacity onPress={goBack}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                  </TouchableOpacity>
              </View>
              <View style={[globalStyles.FormContainer]}>
                <Text style={[{ fontWeight: 'bold', fontSize: 20}]} >Inserisci il codice ricevuto per email</Text>
                    <TextInput style={globalStyles.input} placeholder='codice' keyboardType='numeric'></TextInput>
              </View>
            </View>
        </View>
          <View style={[globalStyles.FormContainer]}>
                  <TouchableOpacity style={[globalStyles.button]} onPress={vaiAResetPasswordContinua}>
                <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Avanti</Text>
                </TouchableOpacity>
          </View>
      </View>
  );
}
