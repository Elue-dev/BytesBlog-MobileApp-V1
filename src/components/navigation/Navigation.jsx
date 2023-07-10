import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/auth/AuthContext";
import { PostProvider } from "../../context/posts/PostContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/home_screen/HomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import CreateAccountscreen from "../../screens/auth/CreateAccountscreen";
import LandingScreen from "../../screens/landing_page/LandingScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import ResetPassword from "../../screens/auth/ResetPassword";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import AddPostScreen from "../../screens/add_post/AddPostScreen";
import PostDetailScreen from "../../screens/post_detail/PostDetailScreen";
import ScreensHeader from "../screens_header/ScreensHeader";
import PostComments from "../../screens/post_comments/PostComments";
import PostLikes from "../../screens/post_likes/PostLikes";
import CommentsHeader from "../screens_header/CommentHeader";
import UserProfile from "../../screens/user_profile/UserProfile";
import ManageInterests from "../../screens/manage_interests/ManageInterests";
import EditProfile from "../../screens/edit_profile/EditProfile";
import EditProfileHeader from "../screens_header/EditProfileHeader";
import Search from "../../screens/search/Search";

const Stack = createStackNavigator();
const queryClient = new QueryClient();

export default function Navigation() {
  return (
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
              <Stack.Screen name="Create" component={CreateAccountscreen} />
              <Stack.Screen name="Landing" component={LandingScreen} />
              <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
              <Stack.Screen name="Reset" component={ResetPassword} />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                  headerShown: true,
                  header: () => (
                    <ScreensHeader title="Profile" location="Profile" />
                  ),
                }}
              />
              <Stack.Screen
                name="AddPost"
                component={AddPostScreen}
                options={{
                  headerShown: true,
                  header: () => (
                    <ScreensHeader title="Add Post" location="AddPost" />
                  ),
                }}
              />
              <Stack.Screen
                name="PostDetails"
                component={PostDetailScreen}
                options={{
                  headerShown: true,
                  header: () => <ScreensHeader />,
                }}
              />
              <Stack.Screen
                name="PostComments"
                component={PostComments}
                options={{
                  headerShown: true,
                  presentation: "modal",
                  headerLeft: () => <CommentsHeader />,
                }}
              />
              <Stack.Screen
                name="PostLikes"
                component={PostLikes}
                options={{
                  headerShown: true,
                  presentation: "modal",
                  headerLeft: () => <CommentsHeader />,
                }}
              />
              <Stack.Screen
                name="UserProfile"
                component={UserProfile}
                options={{
                  headerShown: true,
                  header: () => (
                    <ScreensHeader title="Profile" location="Profile" />
                  ),
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                  headerShown: true,
                  presentation: "modal",
                  headerLeft: () => <EditProfileHeader />,
                }}
              />
              <Stack.Screen
                name="ManageInterests"
                component={ManageInterests}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{
                  headerShown: true,
                  presentation: "modal",
                  headerLeft: () => <CommentsHeader />,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
