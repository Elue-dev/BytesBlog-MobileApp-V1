import { useState, useEffect } from "react";
import { ActivityIndicator, View, LogBox } from "react-native";
import * as Font from "expo-font";
import Navigation from "./src/components/navigation/Navigation";
import { ThemeProvider } from "./src/context/theme/ThemeContext";

// LogBox.ignoreAllLogs();

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
    <View style={{ flex: 1 }}>
      {fontLoaded ? (
        // <ThemeProvider>
        <Navigation />
      ) : (
        // </ThemeProvider>
        <ActivityIndicator color="#000" size="large" />
      )}
    </View>
  );
}
