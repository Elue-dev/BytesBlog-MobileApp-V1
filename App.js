import React, { useState, useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from "react-native";
import SearchScreen from "./src/screens/home_screen/HomeScreen";
// import ResultsShowScreen from "./src/screens/results_show_screen/ResultsShowScreen";
import * as Font from "expo-font";

const getFonts = () =>
  Font.loadAsync({
    "source-sans-regular": require("./assets/fonts/SourceSans3-Regular.ttf"),
    "source-sans-bold": require("./assets/fonts/SourceSans3-Bold.ttf"),
    "source-sans-semiBold": require("./assets/fonts/SourceSans3-SemiBold.ttf"),
  });

const AppNavigator = createStackNavigator(
  {
    Search: SearchScreen,
    // ResultsScreen: ResultsShowScreen,
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "BytesBlog",
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
    await getFonts();
    setFontLoaded(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      {fontLoaded ? <AppContainer /> : <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({});
