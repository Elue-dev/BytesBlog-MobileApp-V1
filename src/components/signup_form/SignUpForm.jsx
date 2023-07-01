import {
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "../../screens/auth/styles";
import { COLORS } from "../../common/colors";
import { runRegisterationValidation } from "../../helpers/validation";
import { useNavigation } from "@react-navigation/native";

function SignUpForm({ values, handleInputChange, nextStep }) {
  const { firstname, lastname, email, password, confirmPassword } = values;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [numberCondition, setNumberCondition] = useState(false);
  const [charCondition, setCharCondition] = useState(false);
  const [lengthCondition, setLengthCondition] = useState(false);
  const [caseCondition, setCaseCondition] = useState(false);
  const [passwordCheckPassed, setPasswordCheckPassed] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const navigation = useNavigation();

  const CREDENTIALS_FIELDS = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
  };

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

  async function initiateRegistration() {
    const allValidationsPassed = runRegisterationValidation(
      CREDENTIALS_FIELDS,
      email,
      passwordCheckPassed,
      password,
      confirmPassword,
      firstname,
      lastname
    );
    if (allValidationsPassed) {
      nextStep();
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
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.welcomeText}>Create Account</Text>
          <TouchableOpacity style={styles.oAuth}>
            <Image
              source={require("../../../assets/googleIcon.png")}
              style={styles.oAuthImage}
            />
            <Text style={styles.oAuthText}>Continue With Google</Text>
          </TouchableOpacity>
          <Text style={styles.or}>Or</Text>

          {/* ==== FIRST NAME ====== */}
          <View style={styles.formFields}>
            <View>
              <TextInput
                value={firstname}
                name="firstname"
                onChangeText={(value) => handleInputChange("firstname", value)}
                style={
                  Platform.OS === "android"
                    ? styles.inputAndroid
                    : styles.inputIOS
                }
              />
              <Text style={styles.formText}>First Name</Text>
            </View>

            {/* ==== LAST NAME ====== */}
            <View style={styles.spaceOut}>
              <TextInput
                value={lastname}
                name="lastname"
                onChangeText={(value) => handleInputChange("lastname", value)}
                style={
                  Platform.OS === "android"
                    ? styles.inputAndroid
                    : styles.inputIOS
                }
              />
              <Text style={styles.formText}>Last Name</Text>
            </View>

            {/* ====  EMAIL ADDRESS ====== */}
            <View style={styles.spaceOut}>
              <TextInput
                value={email}
                name="email"
                onChangeText={(value) => handleInputChange("email", value)}
                style={
                  Platform.OS === "android"
                    ? styles.inputAndroid
                    : styles.inputIOS
                }
              />
              <Text style={styles.formText}>Email Address</Text>
            </View>

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
              <TouchableOpacity
                style={styles.btn}
                onPress={initiateRegistration}
              >
                <Text style={styles.btnText}>Proceed</Text>
              </TouchableOpacity>

              {/* ==== REDIRECT SECTION */}
              <View style={styles.redirect}>
                <Text style={styles.redirectText}>
                  Already have a Bytes Account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={[styles.redirectText, styles.underline]}>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUpForm;
