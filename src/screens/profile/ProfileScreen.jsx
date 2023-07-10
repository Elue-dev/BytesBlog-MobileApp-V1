import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth/AuthContext";
import { AntDesign, Feather } from "@expo/vector-icons";
import { styles } from "./styles";
import { COLORS } from "../../common/colors";
import AddedPosts from "../../components/added_posts/AddedPosts";
import SavedPosts from "../../components/saved_posts/SavedPosts";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const {
    state: { user },
  } = useAuth();

  const navigation = useNavigation();

  if (!user)
    return (
      <ActivityIndicator
        size="small"
        color="#169639"
        style={{ paddingTop: 30 }}
      />
    );

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.topSec}>
        <View>
          <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        </View>
        <Text style={styles.names}>
          {user.firstName} {user.lastName}
        </Text>
        <Text style={styles.bio}>
          {user.bio === "" ? "No Bio Yet" : user.bio}
        </Text>
      </View>

      <View style={styles.info}>
        <View style={styles.infoFlex}>
          <Text style={styles.headingText}>INFORMATION</Text>

          <TouchableOpacity
            style={styles.manage}
            onPress={() => navigation.navigate("EditProfile", { user })}
          >
            <Feather name="edit" size={15} color={COLORS.gray600} />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 20 }}>
          <View style={styles.flexInfo}>
            <Text style={styles.title}>Email</Text>
            <Text style={styles.infoText}>
              {user.email.length > 30
                ? `${user.email.slice(0, 30)}...`
                : user.email}
            </Text>
          </View>

          <View style={styles.flexInfo}>
            <Text style={styles.title}>Member Since</Text>
            <Text style={styles.infoText}>
              {new Date(user.joinedAt).toDateString()}
            </Text>
          </View>

          <View style={styles.flexInfo}>
            <Text style={styles.title}>Last Updated</Text>
            <Text style={styles.infoText}>
              {new Date(user.lastUpdated).toDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.interestsFlex}>
          <Text style={styles.headingText}>INTERESTS</Text>
          <TouchableOpacity
            style={styles.manage}
            onPress={() =>
              navigation.navigate("ManageInterests", {
                interests: user.interests,
              })
            }
          >
            <AntDesign name="edit" size={15} color={COLORS.gray600} />
            <Text style={styles.manageText}>Manage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.interests}>
          {user.interests.map((interest) => (
            <Text key={interest} style={styles.interest}>
              {interest}
            </Text>
          ))}
        </View>
      </View>

      <View style={{ paddingTop: 40 }}>
        <Text style={styles.headingText}>POSTS YOU'VE ADDED</Text>
        <AddedPosts user={user} type="Internal" />
      </View>

      <View style={{ paddingTop: 40 }}>
        <Text style={styles.headingText}>SAVED POSTS</Text>
        <SavedPosts user={user} />
      </View>
    </ScrollView>
  );
}
