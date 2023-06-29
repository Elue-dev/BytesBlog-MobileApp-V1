import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { ImageBackground } from "react-native";
import { withNavigation } from "react-navigation";

function Hero({ navigation }) {
  return (
    <View style={{ marginHorizontal: 0, paddingTop: 20 }}>
      <ImageBackground
        source={require("../../../assets/heroImg.png")}
        style={styles.bgImage}
      />
      <View style={styles.heroTextWrap}>
        <Text style={styles.heroText}>
          Unleash your thoughts and pen them down
        </Text>
        <Text style={styles.heroTextSec}>
          Share your thoughts even as you immerse yourself in our rich content
          that covers a wide range of topics.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.gerStarted}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withNavigation(Hero);
