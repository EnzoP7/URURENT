import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Layout from "../Components/Layout";
import Boton from "../Components/Boton";

const Home = () => {
  return (
    <>
      <Layout>
        <View style={styles.viewContainer}>
          <Boton nombre="addfile" info="Nuevo Alquiler" screenName="AltaAlq" />
          <Boton
            nombre="pushpino"
            info="Lista Alquileres"
            screenName="ListaAlquiler"
          />
          <Boton nombre="addfile" info="Generar Planilla" screenName="Home" />
        </View>
      </Layout>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  Color: {
    backgroundColor: "#34348c",
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

    marginHorizontal: 50,
    marginTop: 150,
  },
});
