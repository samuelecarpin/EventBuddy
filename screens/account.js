import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


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
                    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold'}]}>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                        <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 25}]}>Profilo</Text>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold'}]}>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                        <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Mario Rossi</Text>
                        <TouchableOpacity onPress={goBack}>
                            <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                        </TouchableOpacity>
                    </View>
                    {/*selettori */}
                    <View style={[globalStyles.infoContainer, {paddingTop: 30}]}>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Informazioni Personali</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[[globalStyles.row, globalStyles.infoPersonaliSelettore],]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Link ai social</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Eventi Visitati</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Personale Assunto</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>I miei eventi</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>I miei locali</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Reset Password</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={[globalStyles.row, globalStyles.infoPersonaliSelettore]}>
                            <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 17, padding: 10}]}>Elimina Account</Text>
                                <AntDesign name="right" size={25} color="black" />
                        </TouchableOpacity>
                        <View style={[globalStyles.logOut]}>
                            <TouchableOpacity>
                                <Text style={[globalStyles.titoliRiga, globalStyles.whiteText, { fontWeight: 'bold', fontSize: 17}]}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
