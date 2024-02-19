import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function login({navigation}) {
  const [key, setKey] = React.useState('userToken');
  const [verificationError, setVerificationError] = useState(false) 

  async function getValueFor(key) {
      const keyResp = await SecureStore.getItemAsync(key);
      if (keyResp) {
          chechToken(keyResp);
      } else {
        navigation.navigate('login')
          //setError(true);
      }
  }

  useEffect(() => {
      getValueFor(key)
  });

  const chechToken = (token) => {
    fetch('http://api.weventsapp.it/api/get_user', {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+ token
      },
      })
      .then(response => response.json())
      .then(data => {
          if(data.user) {
            if(data.user.email_verified_at != null) {
              setVerificationError(false);
              navigation.navigate("accountInterfacePersonal");
              setLoading(false);
            } else {
              setVerificationError(true);
              navigation.navigate("login")
            }
          } else {
            navigation.navigate("login")
          }
          

    })
  }

    return(
        <View style={{height: '100%', justifyContent: 'center'}} >
            <ActivityIndicator size="large"  />
        </View>
    );
};
