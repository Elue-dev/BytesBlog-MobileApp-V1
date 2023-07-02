import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/colors";
import { usePosts } from "../../context/posts/PostContext";

export default function PostDetailHeader({ title, location }) {
  const navigation = useNavigation();
  const { pageStep } = usePosts();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {location === "AddPost" && pageStep === 2 ? (
          <Text style={{ opacity: 0 }}>..</Text>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back"
              size={30}
              color={COLORS.grayNeutral}
            />
          </TouchableOpacity>
        )}

        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={{ opacity: 0 }}>..</Text>
      </View>
    </View>
  );
}
