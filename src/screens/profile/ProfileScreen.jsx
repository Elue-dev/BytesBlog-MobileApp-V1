import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/auth/AuthContext";
import { styles } from "./styles";

export default function ProfileScreen() {
  const {
    state: { user },
  } = useAuth();
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={{ fontSize: 20, fontWeight: 700 }}>
        Welcome to your profile, {user.firstName} 👋
      </Text>
    </SafeAreaView>
  );
}
