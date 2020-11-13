import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from './pages/Preload/preload.js';
import Login from './pages/Login/login.js';
import SearchHosp from './pages/SearchHosp/searchHosp.js';
import SearchEquip from './pages/SearchEquip/searchEquip.js';
import Hospital from './pages/Hospital/hospital.js';
import Equipamento from './pages/Equipamento/equipamento.js';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Preload"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SearchHosp" component={SearchHosp} />
        <Stack.Screen name="SearchEquip" component={SearchEquip} />
        <Stack.Screen name="Hospital" component={Hospital} />
        <Stack.Screen name="Equipamento" component={Equipamento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;