import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert, StyleSheet} from 'react-native';
import api from '../utils/api';
import {handleToken} from '../utils/jwt';

// Assuming you have a custom API module for making requests

const Login = ({navigation}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!password || !email) {
      showAlert();
      setIsOpen(true);
      return;
    }

    // Add your login logic here
    let encodedEmail = encodeURIComponent(email);
    let encodedPassword = encodeURIComponent(password);

    try {
      const {data} = await api.post(
        `/login?email=${encodedEmail}&password=${encodedPassword}`,
      );

      console.log(data);

      if (data?.success?.token) {
        // Assuming you have a function to handle token storage
        handleToken(data?.success?.token);
        navigation.navigate('Dashboard'); // Use the appropriate screen name for Dashboard
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showAlert = () => {
    Alert.alert(
      'Missing values!',
      'All fields are mandatory.',
      [{text: 'OK', onPress: () => setIsOpen(false)}],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
      {/* <Alert
        visible={isOpen}
        title="Missing values!"
        message="All fields are mandatory."
        onClose={() => setIsOpen(false)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default Login;
