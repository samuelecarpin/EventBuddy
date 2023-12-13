// Mappa.js
import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { globalStyles } from '../styles/global';

const Mappa = ({ markers }) => {
  return (
      <MapView style={globalStyles.map} region={markers}>
          <Marker coordinate={markers} pinColor='#062F76'/>
      </MapView>
  );
};

export default Mappa;
