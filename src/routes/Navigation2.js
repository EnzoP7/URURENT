import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AltaAlquiler from "../Views/AltaAlquiler";

import Home from "../Views/Home";
import ListaAlquiler from "../Views/ListaAlquiler";
import AlquilerInfo from "../Views/AlquilerInfo";
import GenerarPla from "../Views/GenerarPla";

export const Navigation2 = () => {
  const Stack = createStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Inicio"
            component={Home}
            options={{ headerShown: false, tabBarShowLabel: false }}
          />

          <Stack.Screen
            name="AltaAlq"
            component={AltaAlquiler}
            options={{ headerShown: false, tabBarShowLabel: false }}
          />
          <Stack.Screen
            name="ListaAlquiler"
            component={ListaAlquiler}
            options={{ headerShown: false, tabBarShowLabel: false }}
          />
          <Stack.Screen
            name="InfoAlquiler"
            component={AlquilerInfo}
            options={{ headerShown: false, tabBarShowLabel: false }}
          />
          <Stack.Screen
            name="Planilla"
            component={GenerarPla}
            options={{ headerShown: false, tabBarShowLabel: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation2;
