import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapComponent from '../components/MapComponent';
import api from '../utils/api';

// Mock data for testing
const mockDevices = [
  {id: 1, name: 'Device 1', route_profile: ['Profile 1']},
  {id: 2, name: 'Device 2', route_profile: ['Profile 2']},
];

// HomePage component
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allDevices, setAllDevices] = useState(mockDevices);
  const [lastPointsAll, setLastPointsAll] = useState([]);
  const [flyLocation, setFlyLocation] = useState({});

  // useEffect to fetch devices
  useEffect(() => {
    const fetchDevices = async () => {
      setIsLoading(true);
      const {data} = await api.get('/device');
      console.log(data);
      setAllDevices(data.success);
      setIsLoading(false);
    };
    fetchDevices();
  }, []);

  // useEffect to fetch last points
  useEffect(() => {
    const fetchLastPoints = async id => {
      try {
        const {data} = await api.get(
          `https://connect.paj-gps.de/api/trackerdata/${id}/last_points?lastPoints=${1}`,
        );
        console.log(data);
        return data;
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    if (allDevices.length > 0) {
      const fetchData = async () => {
        setIsLoading(true);
        let lastPoints = [];
        const fetchPromises = allDevices.map(async device => {
          let response = await fetchLastPoints(device?.id);
          console.log('response', response);
          return {
            deviceId: response.success[0].iddevice,
            lat: response.success[0].lat,
            lng: response.success[0].lng,
          };
        });

        lastPoints = await Promise.all(fetchPromises);
        setLastPointsAll(lastPoints);
        setIsLoading(false);
      };

      fetchData();
    }
  }, [allDevices]);

  // Function to handle card click
  const handleClickCard = id => {
    const loc = lastPointsAll?.find(point => point.deviceId === id);
    setFlyLocation(loc);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {isLoading && <ActivityIndicator style={styles.loader} />}
      <View style={styles.mapContainer}>
        <MapComponent lastPoints={lastPointsAll} flyLocation={flyLocation} />
      </View>
      <View style={styles.devicesContainer}>
        <Text style={styles.devicesTitle}>My Devices</Text>
        <View style={styles.deviceList}>
          {allDevices?.map(device => (
            <TouchableOpacity
              key={device?.id}
              onPress={() => handleClickCard(device?.id)}
              style={styles.deviceCard}>
              <Text>{device?.name}</Text>
              <Text>{device?.route_profile[0]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  loader: {
    marginTop: 10,
  },
  mapContainer: {
    flex: 1,
    height: 300,
    marginBottom: 16,
  },
  devicesContainer: {
    flex: 1,
  },
  devicesTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  deviceList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  deviceCard: {
    width: '48%', // Adjust the width as per your design
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
