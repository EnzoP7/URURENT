import React, { useContext, useState } from "react";
import Layout from "../Components/Layout";
import { View, Text, Alert } from "react-native";
import { Button } from "react-native";
import AlquilerContext from "../Providers/alquilerProvider";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalMensaje from "../Components/ModalMensaje";

import { useNavigation } from "@react-navigation/native";

const GenerarPla = () => {
  const { state, dispatch } = useContext(AlquilerContext);
  console.log("EL estado", state);
  const [showModal, setShowModal] = useState(false);
  const [modalMensaje, setModalMensaje] = useState("");
  const handleModalClose = () => {
    setShowModal(false);
  };
  const navigation = useNavigation();

  const enviarDatosFormulario = async (datosFormulario) => {
    try {
      const fechaInicial = new Date(datosFormulario.fecha);
      const dia = fechaInicial.getDate();
      const mes = fechaInicial.getMonth() + 1;
      const anio = fechaInicial.getFullYear();
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      const data = {
        Fecha: fechaFormateada,

        Cliente: datosFormulario.cliente,
        Dias: datosFormulario.dias,
        Precio: datosFormulario.precio,
        Pontet: parseInt(datosFormulario.precio) * 0.15,
      };
      const response = await axios.post(
        "https://sheetdb.io/api/v1/1gp6uyztgshds",
        data
      );

      console.log("Mensaje enviado:", response.data);
      setModalMensaje("Se genero Plantilla");
      setShowModal(true);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setModalMensaje("Se Hubo un error");
      setShowModal(true);
    }
  };
  const eliminarDatos = async () => {
    try {
      const response = await axios.delete(
        "https://sheetdb.io/api/v1/1gp6uyztgshds/all"
      );
      console.log("Datos eliminados:", response.data);
      dispatch({ type: "deleteAllState" });
    } catch (error) {
      console.error("Error al eliminar los datos:", error);
    }
  };
  const handlePressEliminar = async () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de eliminar los datos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            await eliminarDatos();
            navigation.navigate("Inicio");
          },
        },
      ],
      { cancelable: false }
    );
  };
  const handlePressPlanilla = () => {
    Alert.alert(
      "Confirmación",
      "¿Estás seguro de Generar Planilla?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Crear",
          onPress: async () => {
            enviar();
          },
        },
      ],
      { cancelable: false }
    );
  };

  const enviar = () => {
    state.map((alquiler) => {
      enviarDatosFormulario(alquiler);
      navigation.navigate("Inicio");
    });
  };

  return (
    <>
      <Layout>
        <View style={{ marginTop: 200 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#fab33e", fontSize: 30, padding: 14 }}>
              Al Hacer Click Aqui se Creara La Planilla{" "}
            </Text>
          </View>
          <TouchableOpacity onPress={handlePressPlanilla}>
            <Button title="Generar Planilla" color="green" />
          </TouchableOpacity>

          <View style={{ alignItems: "center", marginTop: 50 }}></View>
          <TouchableOpacity onPress={handlePressEliminar}>
            <Button title="Eliminar Datos" color="red" />
          </TouchableOpacity>
          <Text style={{ color: "#fab33e", fontSize: 25, padding: 14 }}>
            Al Hacer Click Aqui Eliminaran Los datos Viejos de La planilla{" "}
          </Text>
          <Text
            style={{ color: "#fab33e", fontSize: 18, paddingHorizontal: 14 }}
          >
            NOTA: Luego de terminar de copiar los datos de esta planilla y
            pasarla a la otra, hay que eliminar los registros que hayan en la
            planilla, por ende cuando se ingresen datos de alquiler de un mes
            nuevo, no apareceran los viejos.Cuando eso Pase Apretar el Boton
            Rojo
          </Text>
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

export default GenerarPla;
