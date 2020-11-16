import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Routes from './src/routes'
export default function App() {

  async function fontes() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    })
  }

  fontes();
  return (
    <Routes />
  );
}


