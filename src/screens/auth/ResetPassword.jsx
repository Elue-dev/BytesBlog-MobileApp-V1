import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { httpRequest } from "../../lib";
import { Feather } from "@expo/vector-icons";
import { SERVER_URL } from "../../utils";
import { throwAlert, throwError } from "../../helpers/throwAlert";
import { styles } from "./styles";
import { COLORS } from "../../common/colors";
import { runResetPasswordValidations } from "../../helpers/validation";

const initialValues = {
  password: "",
  confirmPassword: "",
};

export default function ResetPassword({ navigation }) {
  const [credentials, setCredentials] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [caseCondition, setCaseCondition] = useState(false);
  const [passwordCheckPassed, setPasswordCheckPassed] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const { password, confirmPassword } = credentials;

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setCaseCondition(true);
    } else {
      setCaseCondition(false);
    }
    if (password.length > 7) {
      setLengthCondition(true);
    } else {
      setLengthCondition(false);
    }

    if (password.match(/([0-9])/)) {
      setNumberCondition(true);
    } else {
      setNumberCondition(false);
    }

    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setCharCondition(true);
    } else {
      setCharCondition(false);
    }

    if (caseCondition && numberCondition && charCondition && lengthCondition) {
      setPasswordCheckPassed(true);
    } else {
      setPasswordCheckPassed(false);
    }
  }, [
    password,
    caseCondition,
    numberCondition,
    charCondition,
    lengthCondition,
    passwordCheckPassed,
  ]);

  function handleInputChange(name, value) {
    setCredentials((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function resetUserPassword() {
    if (runResetPasswordValidations()) {
      try {
        setIsLoading(true);
        const response = await httpRequest.post(
          `${SERVER_URL}/auth/reset-password`,
          { email }
        );
        if (response.data.status === "success") {
          setIsLoading(false);
          throwAlert("Success ✅", response?.data?.message);
          navigation.navigate("Login");
        }
      } catch (error) {
        throwError("Error encountered ❌", error?.response?.data?.message);
        setIsLoading(false);
      }
    }
  }

  const keyboardVerticalOffset =
    Platform.OS === "ios" ? 0 : -Dimensions.get("window").height * 0.2;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={30} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.imageWrapperReset}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text
            style={[styles.welcomeText, { fontWeight: "600", paddingTop: 10 }]}
          >
            Reset Password
          </Text>

          {/* ==== FORM ===== */}
          <View style={styles.formFields}>
            {/* ====  PASSWORD ====== */}
            <View style={styles.spaceOut}>
              <TextInput
                value={password}
                name="password"
                onFocus={() => setPasswordEntered(true)}
                onChangeText={(value) => handleInputChange("password", value)}
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
            </View>

            {/* ==== PASSWORD CHECKS ====== */}
            {passwordEntered && (
              <View
                style={[styles.passwordChecksWrapper, { flexWrap: "wrap" }]}
              >
                {/* Upper & Lower case letter check */}
                <View
                  style={[
                    styles.checkItem,
                    caseCondition && styles.checkItemPassed,
                  ]}
                >
                  {caseCondition ? (
                    <Feather
                      name="check-square"
                      size={20}
                      color={COLORS.primaryColorHover}
                    />
                  ) : (
                    <Feather name="x-square" size={20} color="crimson" />
                  )}
                  <Text
                    style={
                      caseCondition ? styles.checkItemPassed : styles.checkText
                    }
                  >
                    Upper & Lower case letter
                  </Text>
                </View>

                {/* 8 characters long check */}
                <View
                  style={[
                    styles.checkItem,
                    lengthCondition && styles.checkItemPassed,
                  ]}
                >
                  {lengthCondition ? (
                    <Feather
                      name="check-square"
                      size={20}
                      color={COLORS.primaryColorHover}
                    />
                  ) : (
                    <Feather name="x-square" size={20} color="crimson" />
                  )}
                  <Text
                    style={
                      lengthCondition
                        ? styles.checkItemPassed
                        : styles.checkText
                    }
                  >
                    8 characters long
                  </Text>
                </View>

                {/* Number check */}
                <View
                  style={[
                    styles.checkItem,
                    numberCondition && styles.checkItemPassed,
                  ]}
                >
                  {numberCondition ? (
                    <Feather
                      name="check-square"
                      size={20}
                      color={COLORS.primaryColorHover}
                    />
                  ) : (
                    <Feather name="x-square" size={20} color="crimson" />
                  )}
                  <Text
                    style={
                      numberCondition
                        ? styles.checkItemPassed
                        : styles.checkText
                    }
                  >
                    Number
                  </Text>
                </View>

                {/* Special character check */}
                <View
                  style={[
                    styles.checkItem,
                    charCondition ? styles.checkItemPassed : styles.checkItem,
                    ,
                  ]}
                >
                  {charCondition ? (
                    <Feather
                      name="check-square"
                      size={20}
                      color={COLORS.primaryColorHover}
                    />
                  ) : (
                    <Feather name="x-square" size={20} color="crimson" />
                  )}
                  <Text
                    style={
                      charCondition ? styles.checkItemPassed : styles.checkText
                    }
                  >
                    Special character
                  </Text>
                </View>
              </View>
            )}

            {/* ==== CONFIRM PASSWORD ====== */}
            <View style={styles.spaceOut}>
              <TextInput
                value={confirmPassword}
                name="confirmPassword"
                onChangeText={(value) =>
                  handleInputChange("confirmPassword", value)
                }
                secureTextEntry={cpasswordVisible ? false : true}
                style={
                  Platform.OS === "android"
                    ? styles.inputAndroid
                    : styles.inputIOS
                }
              />
              <Text style={styles.formText}>Confirm Password</Text>

              <TouchableOpacity
                style={styles.icon}
                onPress={() => setCPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? (
                  <Feather name="eye-off" size={22} color="#777" />
                ) : (
                  <Feather name="eye" size={22} olor="#777" />
                )}
              </TouchableOpacity>

              {/* ==== SUBMIT SECTION */}
              <TouchableOpacity style={styles.btn} onPress={resetUserPassword}>
                {isLoading ? (
                  <ActivityIndicator color={"#fff"} size="small" />
                ) : (
                  <Text style={styles.btnText}>Proceed</Text>
                )}
              </TouchableOpacity>

              {/* ==== REDIRECT SECTION */}
              <View style={styles.redirect}>
                <Text style={styles.redirectText}>Back to</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                  <Text style={[styles.redirectText, styles.underline]}>
                    Home
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* <View>
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
          </View> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
