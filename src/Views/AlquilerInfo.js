import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AlquilerContext from "../Providers/alquilerProvider";
import Layout from "../Components/Layout";
import { FontAwesome } from "@expo/vector-icons";
import ModalMensaje from "../Components/ModalMensaje";

const AlquilerInfo = ({ route }) => {
  const { alquiler } = route.params;
  const navigation = useNavigation();
  const { dispatch } = useContext(AlquilerContext);
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Layout>
        <View style={styles.distancia}>
          <View style={styles.container}>
            <FontAwesome name="car" size={150} color="#fab33e" />
            <Text style={styles.titulo}>ID: {alquiler.id}</Text>
            <Text style={styles.titulo}>Cliente: {alquiler.cliente}</Text>
            <Text style={styles.titulo}>Auto: {alquiler.matricula}</Text>
            <Text style={styles.titulo}>Fecha: {alquiler.fecha}</Text>
            <Text style={styles.titulo}>Dias: {alquiler.dias}</Text>
            <Text style={styles.titulo}>Precio: {alquiler.precio}</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.minicontainer}>
              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: "red" }]}
                onPress={() => {
                  dispatch({ type: "deleteAlquiler", payload: alquiler });
                  setModalMensaje("Alquiler Eliminado");
                  setShowModal(true);
                }}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: "blue" }]}
                onPress={() => {
                  navigation.navigate("AltaAlq", { alquiler });
                }}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {showModal && (
          <ModalMensaje
            mensaje={modalMensaje}
            closeModal={handleModalClose}
            navega={true}
          />
        )}
      </Layout>
    </>
  );
};

export default AlquilerInfo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20, // Agrega espacio horizontal en los extremos del formulario
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center", // Ajusta el espacio entre el componente Layout y el formulario
  },
  distancia: {
    marginTop: 110,
  },

  viewInfo: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fab33e",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D5E33",
  },
  icon: {
    marginRight: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#1D5E33",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    paddingHorizontal: 5,
  },
  minicontainer: {
    flexDirection: "row",
  },
});
