import React, { useState, useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import HomeScreen from "./src/screens/home_screen/HomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import CreateAccountScreen from "./src/screens/auth/CreateAccountscreen";
import * as Font from "expo-font";
import LandingScreen from "./src/screens/landing_page/LandingScreen";
import { AuthProvider } from "./src/context/auth/AuthContext";
import ForgotPassword from "./src/screens/auth/ForgotPasswordScreen";
import ResetPassword from "./src/screens/auth/ResetPassword";

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Create: CreateAccountScreen,
    Landing: LandingScreen,
    Forgot: ForgotPassword,
    Reset: ResetPassword,
  },
  {
    initialRouteName: "Landing",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "source-sans-regular": require("./assets/fonts/SourceSans3-Regular.ttf"),
      "source-sans-bold": require("./assets/fonts/SourceSans3-Bold.ttf"),
      "source-sans-semiBold": require("./assets/fonts/SourceSans3-SemiBold.ttf"),
    });
    setFontLoaded(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {fontLoaded ? (
        <AuthProvider>
          <AppContainer />
        </AuthProvider>
      ) : (
        <ActivityIndicator color="#000" size="large" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
