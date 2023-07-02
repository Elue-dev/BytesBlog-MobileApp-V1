import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, View, LogBox } from "react-native";
import HomeScreen from "./src/screens/home_screen/HomeScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import CreateAccountScreen from "./src/screens/auth/CreateAccountscreen";
import * as Font from "expo-font";
import LandingScreen from "./src/screens/landing_page/LandingScreen";
import { AuthProvider } from "./src/context/auth/AuthContext";
import ForgotPassword from "./src/screens/auth/ForgotPasswordScreen";
import ResetPassword from "./src/screens/auth/ResetPassword";
import { PostProvider } from "./src/context/posts/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostDetailScreen from "./src/screens/post_detail/PostDetailScreen";
import PostDetailHeader from "./src/components/postdetails_header/PostDetailHeader";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import AddPostScreen from "./src/screens/add_post/AddPostScreen";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {fontLoaded ? (
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <PostProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="Landing"
                  screenOptions={{
                    headerShown: false,
                  }}
                >
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Create" component={CreateAccountScreen} />
                  <Stack.Screen name="Landing" component={LandingScreen} />
                  <Stack.Screen name="Forgot" component={ForgotPassword} />
                  <Stack.Screen name="Reset" component={ResetPassword} />
                  <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                      headerShown: true,
                      header: () => (
                        <PostDetailHeader title="Profile" location="Profile" />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="AddPost"
                    component={AddPostScreen}
                    options={{
                      headerShown: true,
                      header: () => (
                        <PostDetailHeader title="Add Post" location="AddPost" />
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="PostDetails"
                    component={PostDetailScreen}
                    options={{
                      headerShown: true,
                      header: () => <PostDetailHeader />,
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </PostProvider>
          </AuthProvider>
        </QueryClientProvider>
      ) : (
        <ActivityIndicator color="#000" size="large" />
      )}
    </View>
  );
}
