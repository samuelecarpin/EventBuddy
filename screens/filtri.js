

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, KeyboardAvoidingView } from 'react-native';
import { globalStyles } from '../styles/global';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';


export default function Home({ navigation }) {

  const [apriCalendario, setapriCalendario] = useState(false)
  const [dataFineEvento, setDataFineEvento] = useState('GG-MM-AAAA')

  const dataOdierna = new Date();
  const dataPartenza = getFormatedDate(dataOdierna.setDate(dataOdierna.getDate()), 'YYYY/MM/DD')

  const chiudiCalendario = () => {
    setapriCalendario(false);
};

  function privateFilter (query, filter){
    privateEvent = !privateEvent;
    publicEvent = false;
    minAge = 0;
    minDate = "";
    maxPrice = 0;
    maxDist = 0;
    forceUpdateKey = !forceUpdateKey;
    filter = privateEvent == true ? "filter" : "all";
    navigation.navigate('home',
      { filterQuery: query, function: filter }
    );
  };

  function updateArea() {

    forceUpdateKey = !forceUpdateKey;
    navigation.navigate('home',
      { function: "all" }
    );
  }

  function publicFilter (query, filter){
    privateEvent = false;
    publicEvent = !publicEvent;
    minAge = 0;
    minDate = "";
    maxPrice = 0;
    maxDist = 0;
    forceUpdateKey = !forceUpdateKey;
    filter = publicEvent == true ? "filter" : "all";
    navigation.navigate('home',
      { filterQuery: query, function: filter }
    );
  };

  function goBack () {
    navigation.goBack();
  }

  function gestisciCalendario() {
    setapriCalendario(!apriCalendario);
  };


  function minDateFilter (propDate) {
    privateEvent = false;
    publicEvent = false;
    minAge = 0;
    minDate = propDate;
    maxPrice = 0;
    maxDist = 0;
    forceUpdateKey = !forceUpdateKey;
    filter = minDate != "" ? "filter" : "all";
    navigation.navigate('home',
      { filterQuery: "startDate,>=,"+minDate, function: filter }
    );
  }

  function minAgeFilter(type) {
    if (type == "delete") {
      minAge = 0
    }
    privateEvent = false;
    publicEvent = false;
    minDate = "";
    maxPrice = 0;
    maxDist = 0;
    forceUpdateKey = !forceUpdateKey;
    filter = minAge != 0 ? "filter" : "all";
    navigation.navigate('home',
      { filterQuery: "minimumAge,>=,"+minAge, function: filter }
    );
  }
  function maxPriceFilter(type){
    if (type == "delete") {
      maxPrice = 0
    }
    privateEvent = false;
    publicEvent = false;
    minAge = 0;
    minDate = "";
    maxDist = 0;
    forceUpdateKey = !forceUpdateKey;
    filter = maxPrice != 0 ? "filter" : "all";
    navigation.navigate('home',
      { filterQuery: "price,<=,"+maxPrice, function: filter }
    );
  }

  return (
    /*<KeyboardAvoidingView style={[{ flex: 1}]} enabled={true} behavior={'padding'}>*/
    <ScrollView style={[{ flex: 1, backgroundColor: '#FFF'}]}>
    <View style={[ globalStyles.FormContainer2]}>
    <View style={[{backgroundColor:"#FFF"},{height:20}]}></View>
    <View style={[globalStyles.rigaTitoli, { fontWeight: 'bold', fontSize: 35, marginBottom: 30}]}>
                  <TouchableOpacity onPress={goBack} style={{marginTop:5}}>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="black" />
                  </TouchableOpacity>
                  <Text style={[globalStyles.titoliRiga, { fontWeight: 'bold', fontSize: 35}]}>Filtri</Text>
                  <TouchableOpacity>
                      <Ionicons name="ios-chevron-back-sharp" size={33} color="white" />
                  </TouchableOpacity>
              </View>
    <Text style={{ fontWeight: 'bold', fontSize: 20}} >Filtra per:</Text>
    <TouchableOpacity onPress={() => privateFilter("eventType,=,private", "filter")} style={globalStyles.button2} >
    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 17}]}>Evento privato {privateEvent == true ? <Feather name="check" size={24} color="white" /> : ""}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => publicFilter("eventType,=,public", "filter")} style={globalStyles.button2} >
    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 17}]}>Evento pubblico {publicEvent == true ? <Feather name="check" size={24} color="white" /> : ""}</Text>
    </TouchableOpacity>
    <TouchableOpacity>
          <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color={minAge != 0 ? "black" : "white"}/>
        </TouchableOpacity>
    <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10}} >A partire dalla data:</Text>
      <TouchableOpacity style={[globalStyles.input, globalStyles.selettorePiccolo, {marginBottom: 0, marginTop: 10}]} onPress={gestisciCalendario}>
        <Text style={{ alignSelf: 'center'}}>{minDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => minDateFilter("")}>
        <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color={minDate != "" ? "black" : "white"}/>
      </TouchableOpacity>
            <Modal animationType='slide' visible={apriCalendario}>
            <View style={globalStyles.vistaCentrata}>
                <View style={globalStyles.vistaCalendario}>
                    <DatePicker mode='calendar' selected={dataFineEvento == false ? minDate : dataFineEvento} onDateChange={minDateFilter} minimumDate={dataPartenza} />
                    <TouchableOpacity onPress={chiudiCalendario}>
                    <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color="black"/>
                    </TouchableOpacity>
                </View>
            </View> 
            </Modal>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10}} >Età minima:</Text>
          <View style={{alignItems:"center"}}>
            <TextInput onChangeText={text => minAge = text} style={[globalStyles.input, globalStyles.selettorePiccolo, {marginTop:10}]} onSubmitEditing={minAgeFilter} returnKeyType="done" placeholder="16+" keyboardType='numeric'>{minAge}</TextInput>
          </View>
        <TouchableOpacity onPress={() => minAgeFilter("delete")}>
          <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color={minAge != 0 ? "black" : "white"}/>
        </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10}} >Prezzo massimo:</Text>
          <View style={{alignItems:"center"}}>
          <TextInput onChangeText={text => maxPrice = text} style={[globalStyles.input, globalStyles.selettorePiccolo, {marginTop:10}]} onSubmitEditing={maxPriceFilter} returnKeyType="done" placeholder="16+" keyboardType='number-pad'>{maxPrice}</TextInput>
            </View>
          <TouchableOpacity onPress={() => maxPriceFilter("delete")}>
            <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color={maxPrice != "" ? "black" : "white"}/>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10}} >Area di copoertura (in Km):</Text>
          <View style={{alignItems:"center"}}>
          <TextInput onChangeText={text => area = text} style={[globalStyles.input, globalStyles.selettorePiccolo, {marginTop:10}]} onSubmitEditing={updateArea} returnKeyType="done" placeholder="150" keyboardType='number-pad'>{area}</TextInput>
          <TouchableOpacity>
            <AntDesign style={{marginTop: 15}} name="closecircleo" size={24} color={maxPrice != "" ? "black" : "white"}/>
          </TouchableOpacity>
            </View>
    </View>
            <View style={[ globalStyles.FormContainer2, {paddingBottom: 20}]}>
                  <TouchableOpacity style={globalStyles.button}>
                    <Text style={[globalStyles.whiteText, { fontWeight: 'bold', fontSize: 20}]}>Applica filtri</Text>
                  </TouchableOpacity>
            </View>  
</ScrollView>
/*</KeyboardAvoidingView>*/
  );
};