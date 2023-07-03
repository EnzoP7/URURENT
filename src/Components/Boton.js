import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const Boton = ({ nombre = "adduser", size = 90, screenName, info }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screenName);
  };
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <View style={styles.viewContainer}>
          <AntDesign name={nombre} size={size} color="#34348b" />
          <Text>{info}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Boton;
const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 150,
    backgroundColor: "#fab33e",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    marginHorizontal: 50,
    marginBottom: 10,
  },
  viewContainer: {
    alignItems: "center",
  },
});
