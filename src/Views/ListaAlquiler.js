import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalMensaje from "../Components/ModalMensaje";
import AlquilerContext from "../Providers/alquilerProvider";
import { AntDesign } from "@expo/vector-icons";
import Layout2xd from "../Components/Layout2xd";

const ListaAlquiler = () => {
  const navigation = useNavigation();
  const handleAlquilerPress = (alquiler) => {
    navigation.navigate("InfoAlquiler", { alquiler });
  };
  const { state, dispatch } = useContext(AlquilerContext);
  console.log("EL ESTADO:", state);
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Layout2xd>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Alquileres</Text>
          </View>
          <View style={styles.line} />

          {state.length > 0 ? (
            <View style={styles.scrollViewContent}>
              <FlatList
                style={styles.FlatList}
                data={state}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleAlquilerPress(item)}>
                    <View style={styles.itemContainer}>
                      <AntDesign name="user" size={60} color="#fab33e" />
                      <Text style={styles.itemSubtitle}>
                        {item.id} {item.matricula} {item.fecha} {item.cliente}{" "}
                        {item.dias}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.line} />}
              />
              <View style={styles.line} />
            </View>
          ) : (
            <View style={styles.scrollViewContent}>
              <Text style={[styles.titulo, { marginLeft: 60, marginTop: 40 }]}>
                No hay Información
              </Text>
            </View>
          )}

          {showModal && (
            <ModalMensaje
              mensaje={modalMensaje}
              closeModal={handleModalClose}
              navega={false}
            />
          )}
        </SafeAreaView>
      </Layout2xd>
    </>
  );
};

export default ListaAlquiler;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fab33e",
  },
  line: {
    borderBottomColor: "#fab33e",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 80,
  },
  itemSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fab33e",
    marginLeft: 20,
  },
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },
  FlatList: {
    flex: 1,
  },

  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
  standaloneRowBack: {
    alignItems: "center",

    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  backTextWhite: {
    color: "#FFF",
  },
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "#cedda9",
    justifyContent: "center",
  },
  botonesr: {
    borderRadius: 10,
    marginRight: 3,
    backgroundColor: "red",
    padding: 8,
    flexDirection: "row",
  },
  botonesa: {
    borderRadius: 10,
    marginLeft: 3,
    backgroundColor: "orange",
    padding: 8,
    flexDirection: "row",
  },
});
