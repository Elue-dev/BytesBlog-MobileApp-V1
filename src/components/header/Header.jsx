import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth/AuthContext";

function Header({ scrollPage, auth, fromBlog }) {
  const navigation = useNavigation();

  const {
    state: { user },
    logOutUser,
  } = useAuth();

  return (
    <View
      style={[
        styles.wrapper,
        scrollPage ? styles.borders : null,
        fromBlog === true ? { marginVertical: 30 } : null,
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
        <Image source={require("../../../assets/logo.png")} />
      </TouchableOpacity>
      {auth ? (
        <Text style={{ fontSize: 20, fontWeight: 500 }}>
          Hi, {user?.firstName} 👋
        </Text>
      ) : (
        <View style={styles.authBtnWrapper}>
          {user !== null ? (
            <TouchableOpacity
              style={[styles.authBtn, styles.signInBtn]}
              onPress={() => {
                logOutUser(() => navigation.navigate("Login"));
              }}
            >
              <Text style={styles.signInText}>Log Out</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.authBtn, styles.signInBtn]}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.authBtn, styles.signUpBtn]}
                onPress={() => navigation.navigate("Create")}
              >
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

export default Header;
