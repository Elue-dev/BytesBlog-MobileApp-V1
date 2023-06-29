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
import { AntDesign } from "@expo/vector-icons";
import { httpRequest } from "../../lib";
import { styles } from "./styles";
import { SERVER_URL } from "../../utils";
import { throwAlert, throwError } from "../../helpers/throwAlert";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function sendPasswordResetEmail() {
    if (!email) {
      Alert.alert("Empty field detected ❌", "Please provide your email", [
        { text: "CLOSE" },
      ]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await httpRequest.post(
        `${SERVER_URL}/auth/forgot-password`,
        { email }
      );
      if (response.data.status === "success") {
        setIsLoading(false);
        throwAlert("Success ✅", response?.data?.message);
        navigation.navigate("Reset");
      }
    } catch (error) {
      throwError("Error encountered ❌", error?.response?.data?.message);
      setIsLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="leftcircleo" size={30} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text
          style={[styles.welcomeText, { fontWeight: "600", paddingTop: 10 }]}
        >
          Forgot Password
        </Text>
        <Text style={styles.subText}>
          Kindly enter the email address you registered with
        </Text>

        {/* ==== FORM ===== */}
        <View style={styles.formFields}>
          <View style={styles.spaceOut}>
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
          <View>
            <TouchableOpacity
              style={styles.btn}
              onPress={sendPasswordResetEmail}
            >
              {isLoading ? (
                <ActivityIndicator color={"#fff"} size="small" />
              ) : (
                <Text style={styles.btnText}>Send Password Reset Link</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
