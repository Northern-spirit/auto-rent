import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 56.8389,
  longitude: 60.6057,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const MARKER_COORDINATES = {
  latitude: 56.8389,
  longitude: 60.6057,
};

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
      >
        <Marker
          coordinate={MARKER_COORDINATES}
          title="Комсомольская 37"
          description="г. Екатеринбург"
        />
      </MapView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
}); 