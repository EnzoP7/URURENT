import React, { useContext, useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AlquilerContext from "../Providers/alquilerProvider";
import { useRoute } from "@react-navigation/native";
import ModalMensaje from "../Components/ModalMensaje";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const AltaAlquiler = () => {
  const { dispatch } = useContext(AlquilerContext);
  const route = useRoute();
  const theAlquiler = {
    id: "",
    matricula: "",
    cliente: "",
    fecha: "",
    dias: "",
    precio: "",
  };

  const [elAlquiler, setElAlquiler] = useState(theAlquiler);

  useEffect(() => {
    if (route.params && route.params.alquiler) {
      setElAlquiler(route.params.alquiler);
    }
  }, [route.params]);

  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const [icono, seticono] = useState("checkcircle");

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setElAlquiler((prevAlquiler) => ({
      ...prevAlquiler,
      [field]: value,
    }));
  };

  const handleFormSubmit = () => {
    let action = "";
    let mensaje = "";

    if (elAlquiler.id) {
      action = "updateAlquiler";
      mensaje = "Alquiler editado";
    } else {
      action = "createAlquiler";
      mensaje = "Alquiler creado";
    }

    dispatch({
      type: action,
      payload: elAlquiler,
    });
    setModalMensaje(mensaje);
    setShowModal(true);
    console.log("elAlquiler", elAlquiler);
  };
  const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);

  //#region //! ShowDataPickers y Los HandleConfirm

  const showDatePicker1 = () => {
    setDatePickerVisibility1(true);
  };

  const hideDatePicker1 = () => {
    setDatePickerVisibility1(false);
  };

  const handleConfirm1 = (date) => {
    elAlquiler.fecha = date.toISOString();
    hideDatePicker1();
  };
  //#endregion

  return (
    <>
      <Layout>
        <View style={styles.distancia}>
          <View style={styles.container}>
            <Text style={styles.subtitulo}>Matricula</Text>
            <TextInput
              style={styles.input}
              keyboardType="default"
              placeholder="Ingrese Matricula"
              placeholderTextColor="#fab33e"
              value={elAlquiler.matricula}
              onChangeText={(text) => handleInputChange("matricula", text)}
            />
          </View>
        </View>
        <View style={styles.container2}>
          <Text style={styles.subtitulo}>Cliente</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Ingrese Cliente"
            placeholderTextColor="#fab33e"
            value={elAlquiler.cliente}
            onChangeText={(text) => handleInputChange("cliente", text)}
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.subtitulo}>Fecha</Text>
          {/* <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Ingrese Fecha Alquiler"
            placeholderTextColor="#fab33e"
            value={elAlquiler.fecha}
            onChangeText={(text) => handleInputChange("fecha", text)}
          /> */}
          <Text style={styles.hora}>{`Fecha:  ${
            elAlquiler.fecha
              ? moment(elAlquiler.fecha).format("MM/DD/YYYY")
              : "Seleccionar Fecha"
          }`}</Text>
          <View style={{ marginTop: 5 }}>
            <Button
              color="#fab33e"
              title="Seleccionar Fecha"
              onPress={showDatePicker1}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible1}
            mode="date"
            onConfirm={handleConfirm1}
            onCancel={hideDatePicker1}
          />
          <View
            style={{ justifyContent: "center", alignItems: "center" }}
          ></View>
        </View>
        <View style={styles.container2}>
          <Text style={styles.subtitulo}>Dias</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ingrese Dias"
            placeholderTextColor="#fab33e"
            value={elAlquiler.dias.toString()}
            onChangeText={(text) => handleInputChange("dias", text)}
          />
        </View>
        <View style={styles.container2}>
          <Text style={styles.subtitulo}>Precio TOTAL</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ingrese Precio Total"
            placeholderTextColor="#fab33e"
            value={elAlquiler.precio.toString()}
            onChangeText={(text) => handleInputChange("precio", text)}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleFormSubmit}
          >
            <Text style={styles.buttonText}>
              {elAlquiler.id ? "Editar" : "Crear"} Alquiler
            </Text>
          </TouchableOpacity>
        </View>
        {showModal && (
          <ModalMensaje
            mensaje={modalMensaje}
            icono={icono}
            closeModal={handleModalClose}
          />
        )}
      </Layout>
    </>
  );
};

export default AltaAlquiler;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  container2: {
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  distancia: {
    marginTop: 140,
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
    color: "#1D5E33",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fab33e",
  },
  icon: {
    marginRight: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#fab33e",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#fab33e",
  },
  buttonContainer: {
    backgroundColor: "#fab33e",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 3,
    borderColor: "white",
    marginBottom: 5,
  },
  buttonText: {
    color: "#34348b",
    fontSize: 30,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 5,
  },
  hora: {
    color: "#fab33e",
    fontSize: 26,
  },
});
