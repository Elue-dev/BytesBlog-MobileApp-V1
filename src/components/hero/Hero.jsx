import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth/AuthContext";

function Hero() {
  const navigation = useNavigation();
  const {
    state: { user },
  } = useAuth();

  return (
    <View style={{ marginHorizontal: 0 }}>
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
        {user !== null ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.gerStarted}>Visit Blog</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Create")}
          >
            <Text style={styles.gerStarted}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default Hero;
