import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/colors";
import { usePosts } from "../../context/posts/PostContext";

export default function ScreensHeader({ title, location }) {
  const navigation = useNavigation();
  const { pageStep, setPageStep } = usePosts();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => {
            location === "AddPost" && pageStep === 2
              ? setPageStep((currentStep) => currentStep - 1)
              : navigation.goBack();
          }}
        >
          <Ionicons name="chevron-back" size={30} color={COLORS.grayNeutral} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={{ opacity: 0 }}>..</Text>
      </View>
    </View>
  );
}
