import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Splash from './src/screens/Splash';
import HomePage from './src/screens/HomePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator initialRouteName="HomePage">
    <Stack.Screen name="HomePage" component={HomePage} />
    {/* Add more screens if needed */}
  </Stack.Navigator>
);

const App: React.FC = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <NavigationContainer>
      {isLogIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Tab1" component={DashboardStack} />
          {/* <Tab.Screen name="Tab2" component={Tab2} /> */}
        </Tab.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false, // Assuming you don't want to show the header on the login screen
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardStack}
            options={{
              headerShown: false, // Assuming you don't want to show the header on the Dashboard screen
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
