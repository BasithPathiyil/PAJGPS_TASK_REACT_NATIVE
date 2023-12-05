import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    // Simulate a delay (e.g., 3 seconds) for the splash screen
    const timeout = setTimeout(() => {
      // Navigate to the main content page after the delay
      navigation.replace('Login'); // Use the appropriate screen name for login
    }, 1500);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* You can customize the splash screen content here */}

      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default Splash;
