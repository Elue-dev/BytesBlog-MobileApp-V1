import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { httpRequest } from "../../lib";
import { styles } from "./styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  async function signInUser() {
    navigation.navigate("Home");
    return;
    const serverURL =
      "https://bytesblog-server-production.up.railway.app/api/v1/auth/login";

    if (!email || !password) {
      setError("Please provide your email and password");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      setIsLoading(true);
      const response = await httpRequest.post(serverURL, { email, password });
      if (response.data.status === "success") {
        setIsLoading(false);
        navigation.navigate("Home");
      }
    } catch (error) {
      setIsLoading(false);
      setTimeout(() => setError(""), 5000);
      setError(error.response.data.message);
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
          <View style={styles.passwordInput}>
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

            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {error && (
              <Text
                style={{ color: "crimson", fontWeight: "500", fontSize: 17 }}
              >
                {error}
              </Text>
            )}
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
