import React, {useState} from 'react';
import { View, ActivityIndicator} from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function login({navigation}) {
    const [email, setEmail] = useState('11@2.3')
  const [password, setPassword] = useState('12345678')
  const [key, setKey] = React.useState('userToken');
  const [credentialsError, setCredentialsError] = useState(false)
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

  getValueFor(key);

  const chechToken = (token) => {
    fetch('http://eventbuddy.localhost/api/get_user', {
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
              navigation.navigate("account");
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
