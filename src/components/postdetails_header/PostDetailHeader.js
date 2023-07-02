import { View, TouchableOpacity, Image, Alert } from "react-native";
// import { useClipboard } from "@react-native-community/hooks";
// import Clipboard from "@react-native-clipboard/clipboard";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../../common/colors";
import { usePosts } from "../../context/posts/PostContext";

export default function PostDetailHeader() {
  const navigation = useNavigation();
  const { currentPost } = usePosts();

  // function copyURLToClipboard() {
  //   const webURL = `https://bytes-blog-client.vercel.app/blog/post/${currentPost.slug}/${currentPost.postId}`;
  //   try {
  //     Clipboard.setString("hello world");
  //     return Alert.alert("Success ✅", "Post link copied to clipboard", [
  //       { text: "CLOSE" },
  //     ]);
  //   } catch (error) {
  //     console.error("Failed to copy URL to clipboard:", error);
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color={COLORS.grayNeutral} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require("../../../assets/linkIcon.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
