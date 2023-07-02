import { useRef } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";

function Header({ scrollPage, auth, fromBlog }) {
  const navigation = useNavigation();
  const { toggleBottomSheet, toggleOverlay } = useAuth();

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
        <TouchableOpacity
          onPress={() => {
            toggleBottomSheet();
            toggleOverlay();
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500 }}>
            Hi, {user?.firstName} 👋
          </Text>
        </TouchableOpacity>
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
