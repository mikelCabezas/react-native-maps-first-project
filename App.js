import * as React from 'react';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from '@env'

export default function App() {
  const [origin, setOrigin] = React.useState({
    latitude: 41.2288403,
    longitude: 1.7253999,
  })
  const [destination, setDestination] = React.useState({
    latitude: 41.2275774,
    longitude: 1.7253157,
  })
  React.useEffect(() => {
    getLocationPermission()
  }, [])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted') {
      alert('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: Location.coords.latitude,
      longitude: Location.coords.longitude
    }
    setOrigin(current)

  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} >Hello Mikel!</Text>
       <MapView 
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} 
        >
        <Marker 
          draggable
          coordinate={origin}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor={'pink'}
          strokeWidth={5}
        />

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    width: '100%', 
    height: '10%',
    padding: '10%',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  map: {
    width: '100%', 
    height: '90%'
  }
});
