import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { withNavigation } from "react-navigation";

function Header({ navigation, scrollPage, auth }) {
  return (
    <View style={[styles.wrapper, scrollPage ? styles.borders : null]}>
      <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
        <Image source={require("../../../assets/logo.png")} />
      </TouchableOpacity>
      {auth ? (
        <Text style={{ fontSize: 20, fontWeight: 500 }}> Hi, Wisdom 👋</Text>
      ) : (
        <View style={styles.authBtnWrapper}>
          <TouchableOpacity
            style={[styles.authBtn, styles.signInBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.authBtn, styles.signUpBtn]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default withNavigation(Header);
