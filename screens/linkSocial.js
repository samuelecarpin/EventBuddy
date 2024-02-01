

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

  const goBack = () => {
    navigation.goBack();
  };

  const pressHandler = () => {
    navigation.goBack();
  };
  return (
    <View style={[{ flex: 1, backgroundColor: '#FFF', paddingBottom: 50}]}>
        <View style={[ globalStyles.FormContainer2, {height:"90%"}]}>
            <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
                <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                    </TouchableOpacity>
                    <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Reset password</Text>
                    <TouchableOpacity onPress={goBack}>
                        <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={globalStyles.containerSocial}>
                    <View style={[{ width: '80%'},globalStyles.containerSocial]}>
                        <Text style={globalStyles.inputLabelSocial}>YouTube</Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Inserisci link YouTube"
                        />
                        
                        <Text style={globalStyles.inputLabelSocial}>Instagram</Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Inserisci link Instagram"
                        />

                        <Text style={globalStyles.inputLabelSocial}>TikTok</Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Inserisci link TikTok"
                        />

                        <Text style={globalStyles.inputLabelSocial}>Personalizzato</Text>
                        <TextInput
                        style={globalStyles.input}
                        placeholder="Inserisci link personalizzato"
                        />
                    </View>
        

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