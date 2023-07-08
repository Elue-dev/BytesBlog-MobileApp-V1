import { Platform, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/colors";

export default function CommentsHeader() {
  const navigation = useNavigation();

  if (Platform.OS === "android") {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={30} color={COLORS.grayNeutral} />
      </TouchableOpacity>
    );
  } else {
    return <View />;
  }
}
