import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BarraInferior = () => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate("Inicio");
  };
  const handlePress2 = () => {
    navigation.navigate("MandarPlanilla");
  };
  return (
    <>
      <View style={styles.FooterContainer}>
        <View style={styles.FooterView}>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.iconContainer}>
              <Entypo name="home" size={80} color="#fab33e" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePress}>
            <View style={styles.iconContainer}>
              <Ionicons name="menu" size={80} color="#fab33e" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BarraInferior;
const styles = StyleSheet.create({
  FooterContainer: {
    backgroundColor: "#34348b",
    borderTopWidth: 2,
    borderTopColor: "#fab33e",
  },
  FooterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  iconContainer: {
    marginHorizontal: 50,
  },
});
