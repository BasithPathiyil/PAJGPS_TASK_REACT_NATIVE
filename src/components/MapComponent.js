import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
// import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
// import Mapbox from '@rnmapbox/maps';
import MapLibreGL, {Marker} from '@maplibre/maplibre-react-native';

// Mapbox.setWellKnownTileServer('Mapbox');
// Mapbox.setAccessToken(
//   'pk.eyJ1IjoiYmFzaXRoMTIxNiIsImEiOiJjbHBybDgxaDQwNjduMmxxcGN6ODhvZnBvIn0.20Ivs02_u-NP_4Ryxkr1Kw',
// );
MapLibreGL.setConnected(true);
MapLibreGL.setAccessToken(null);

const MapComponent = ({flyLocation, lastPoints}) => {
  const [loc, setLoc] = useState({lng: 10, lat: 11});
  const [myLocation, setMyLocation] = useState({});
  const mapRef = useRef(null);
  console.log('lastPoints', lastPoints);
  useEffect(() => {
    if (flyLocation && flyLocation.lat && flyLocation.lng && mapRef.current) {
      setLoc({lng: flyLocation.lng, lat: flyLocation.lat});
    }
  }, [flyLocation, mapRef.current]);

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(userLocation);
        setMyLocation({lat: userLocation.lat, lng: userLocation.lng});
        setLoc({lng: userLocation.lng, lat: userLocation.lat});
      },
      error => {
        console.error('Error getting user location:', error);
      },
    );
  };
  const [coordinates] = useState([8.674252499999994, 9.0845755]);
  const AnnotationContent = ({title}) => (
    <View style={styles.touchableContainer}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.touchableText}>Btn</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.mapContainer}>
      <MapLibreGL.MapView
        ref={mapRef}
        style={styles.map}
        animated={true}
        logoEnabled={false}
        styleURL="https://api.maptiler.com/maps/streets/style.json?key=XT48yKHekcP69aMy86zG">
        <MapLibreGL.Camera
          animationMode={'flyTo'}
          animationDuration={3000}
          centerCoordinate={[loc.lng, loc.lat]}
          zoomLevel={10}
          //   defaultSettings={{centerCoordinate: [loc.lng, loc.lat], zoomLevel: 8}}
        />
        {/* <MapLibreGL.MarkerView
          coordinate={[loc.lng, loc.lat]}
          x={0.5}
          title="My Location"
          description="This is your location"
        /> */}
        {/* <MapLibreGL.MarkerView coordinate={[loc.lng, loc.lat]} /> */}

        {lastPoints &&
          lastPoints.map((point, index) => (
            <MapLibreGL.PointAnnotation
              key={index}
              coordinate={[point.lng, point.lat]}
              title={`Marker ${index + 1}`}
              description={`Description for Marker ${index + 1}`}>
              <Text>►</Text>
            </MapLibreGL.PointAnnotation>
          ))}
        {/* </MapLibreGL.MarkerView> */}
      </MapLibreGL.MapView>

      <Button
        title="My Location"
        onPress={getUserLocation}
        style={styles.locationButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: 300,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default MapComponent;
