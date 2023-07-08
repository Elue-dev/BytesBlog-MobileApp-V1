import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth/AuthContext";
import { AntDesign } from "@expo/vector-icons";

import { styles } from "./styles";
import { globalStyles } from "../../common/globalStyles";
import { COLORS } from "../../common/colors";
import AddedPosts from "../../components/added_posts/AddedPosts";
import SavedPosts from "../../components/saved_posts/SavedPosts";
import { useRoute } from "@react-navigation/native";
import { DEFAULT_AVATAR } from "../../utils";

export default function UserProfile() {
  const { user } = useRoute().params;

  return (
    <ScrollView style={styles.wrapper}>
      <SafeAreaView>
        <View style={styles.topSec}>
          <Image
            source={{ uri: user.avatar || DEFAULT_AVATAR }}
            style={styles.avatar}
          />
          <Text style={styles.names}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={styles.bio}>
            {user.bio === "" ? "No Bio Yet" : user.bio}
          </Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.headingText}>INFORMATION</Text>

          <View style={{ paddingTop: 20 }}>
            <View style={styles.flexInfo}>
              <Text style={styles.title}>Email</Text>
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.flexInfo}>
              <Text style={styles.title}>Member Since</Text>
              <Text style={styles.infoText}>
                {new Date(user.joinedAt).toDateString()}
              </Text>
            </View>
          </View>

          <View style={styles.interestsFlex}>
            <Text style={styles.headingText}>
              {user.firstName.toUpperCase()}'S INTERESTS
            </Text>
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
          <Text style={styles.headingText}>
            POSTS ADDED BY {user.firstName.toUpperCase()}
          </Text>
          <AddedPosts user={user} type="External" />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
