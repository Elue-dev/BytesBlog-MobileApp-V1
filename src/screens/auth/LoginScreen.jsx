import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { httpRequest } from "../../lib";
import { styles } from "./styles";
import { SERVER_URL } from "../../utils";
import { useAuth } from "../../context/auth/AuthContext";
import { throwError } from "../../helpers/throwAlert";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setActiveUser, state } = useAuth();

  async function signInUser() {
    if (!email || !password) {
      Alert.alert(
        "Empty fields detected ❌",
        "Email and Password are required fields",
        [{ text: "CLOSE" }]
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await httpRequest.post(`${SERVER_URL}/auth/login`, {
        email,
        password,
      });
      if (response.data.status === "success") {
        setIsLoading(false);
        setActiveUser(response.data.user);
        navigation.navigate("Home");
      }
    } catch (error) {
      throwError(error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <TouchableOpacity style={styles.oAuth}>
          <Image
            source={require("../../../assets/googleIcon.png")}
            style={styles.oAuthImage}
          />
          <Text style={styles.oAuthText}>Continue With Google</Text>
        </TouchableOpacity>
        <Text style={styles.or}>Or</Text>
        <View style={styles.formFields}>
          <View>
            <TextInput
              value={email}
              onChangeText={(newVal) => setEmail(newVal)}
              style={
                Platform.OS === "android"
                  ? styles.inputAndroid
                  : styles.inputIOS
              }
            />
            <Text style={styles.formText}>Email Address</Text>
          </View>
          <View style={styles.spaceOut}>
            <TextInput
              value={password}
              onChangeText={(newVal) => setPassword(newVal)}
              secureTextEntry={passwordVisible ? false : true}
              style={
                Platform.OS === "android"
                  ? styles.inputAndroid
                  : styles.inputIOS
              }
            />
            <Text style={styles.formText}>Password</Text>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <Feather name="eye-off" size={22} color="#777" />
              ) : (
                <Feather name="eye" size={22} olor="#777" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={signInUser}>
              {isLoading ? (
                <ActivityIndicator color={"#fff"} size="small" />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>
            <View style={styles.redirect}>
              <Text style={styles.redirectText}>
                Don't have a Bytes account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Create")}>
                <Text style={[styles.redirectText, styles.underline]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
