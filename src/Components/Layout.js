import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import BarraInferior from "./BarraInferior";

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.imageBackground} />
      <View style={styles.logoContainer2}>
        <Image
          style={styles.logoImage2}
          source={require("../../assets/textoiconoxd.png")}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled" // Evita el cierre automático del teclado al tocar la pantalla
      >
        <View style={styles.container}>{children}</View>
        <BarraInferior />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
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
    backgroundColor: "#34348b",
  },
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 200,
    marginHorizontal: 50,
  },
  viewContainer2: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: -160,
    marginHorizontal: 50,
  },
  logoContainer: {
    position: "absolute",
    alignSelf: "center",
    top: "4%",
    backgroundColor: "#1D5E33",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  logoImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
    marginHorizontal: 30,
  },
  FooterContainer: {
    position: "absolute",
    alignSelf: "center",
    bottom: "0%",
    backgroundColor: "#1D5E33",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: 120,
    borderTopWidth: 2,
    borderTopColor: "white",
  },
  FooterView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer2: {
    position: "absolute",
    alignSelf: "center",
    top: "0%",

    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
  },
  logoImage2: {
    width: 250,
    height: 250,
    marginTop: -30,
    marginBottom: 0,
    marginHorizontal: 30,
  },
});
