import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from './components/StartScreen';
import Login from './components/Login';
import Signup from './components/Signup';
import articals from './components/articals';
import Profile from './components/Profile';
import ArticleDetailScreen from './components/ArticleDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen 
          name="Start" 
          component={StartScreen} 
          options={{ headerShown: false }} // Hide header for StartScreen
        />
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} // Hide header for Login screen
        />

        <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ headerShown: false }} // Hide header for Login screen
      />

      <Stack.Screen 
      name="articals" 
      component={articals} 
      options={{ headerShown: false }} // Hide header for Login screen
    />

    <Stack.Screen 
      name="Profile" 
      component={Profile} 
      options={{ headerShown: false }} // Hide header for Login screen
    />
    <Stack.Screen 
    name="ArticleDetail" 
    component={ArticleDetailScreen} 
    options={{ headerShown: false }} // Hide header for Login screen
  />
      
    

      </Stack.Navigator>

    
    </NavigationContainer>
  );
}
