import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';


export default function login({navigation}) {

  const goBack = () => {
    navigation.goBack();
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
                    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Nome</Text>
                        <TextInput style={globalStyles.input} placeholder="Nome"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Cognome</Text>
                        <TextInput style={globalStyles.input} placeholder="Cognome"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Data di nascita</Text>
                        <TextInput style={globalStyles.input} placeholder="Data di nascita"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Email</Text>
                        <TextInput style={globalStyles.input} placeholder="Email"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Password</Text>
                        <TextInput style={globalStyles.input} placeholder="Password"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Cellulare</Text>
                        <TextInput style={globalStyles.input} placeholder="Cellulare"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Codice Fiscale</Text>
                        <TextInput style={globalStyles.input} placeholder="Codice Fiscale"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Sito Internet</Text>
                        <TextInput style={globalStyles.input} placeholder="Sito Internet"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Instagram</Text>
                        <TextInput style={globalStyles.input} placeholder="Instagram"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Facebook</Text>
                        <TextInput style={globalStyles.input} placeholder="Facebook"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Twitter</Text>
                        <TextInput style={globalStyles.input} placeholder="Twitter"></TextInput>
                    <Text style={{ fontWeight: 'bold', fontSize: 20}}>Youtube</Text>
                        <TextInput style={globalStyles.input} placeholder="Youtube"></TextInput>
                    {/*<View style={globalStyles.caricaDocumenti}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#062F76'}}>Carica fronte documento</Text>
                    </View>
                    <View style={globalStyles.caricaDocumenti}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#062F76'}}>Carica retro documento {/*https://www.veriff.com/plans/self-serve</Text>
                    </View>*/}
                </View>
                <View style={[globalStyles.ButtonContainer, {marginTop: 10}]}>
                <TouchableOpacity style={globalStyles.button}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 15}]}>Registrati</Text>
                </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
