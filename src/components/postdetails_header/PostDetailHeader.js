import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/colors";

export default function PostDetailHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={COLORS.grayNeutral} />
        </TouchableOpacity>
        <Image source={require("../../../assets/linkIcon.png")} />
      </View>
    </View>
  );
}
