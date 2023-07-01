import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../lib";
import moment from "moment";
import { globalStyles } from "../../common/globalStyles";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import { parseText } from "../../utils";

export default function PostDetailScreen() {
  const { postSlug } = useRoute().params;

  const {
    isLoading,
    error,
    data: post,
  } = useQuery([`post-${postSlug}`], () =>
    httpRequest.get(`/posts/${postSlug}`).then((res) => {
      return res.data.post[0];
    })
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/BlogBG.png")}
          style={styles.bgImage}
        />
        <View style={styles.content}>
          <View style={styles.authorInfo}>
            <View style={styles.authorProfile}>
              <Image
                source={{ uri: post?.author?.avatar }}
                style={styles.authorImage}
              />
              <View>
                <Text style={styles.authorNames}>
                  {post.author.firstName} {post.author.lastName}
                </Text>
                <Text style={styles.createdAt}>
                  {moment(post.createdAt).fromNow()}
                </Text>
              </View>
            </View>
            <View style={globalStyles.flexStart}>
              <AntDesign name="clockcircleo" size={15} style={styles.icon} />
              <Text style={styles.readTime}>{post.readTime} mins read</Text>
            </View>
          </View>

          {/* ====== MAIN POST CONTENT ======= */}
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <View style={{ paddingRight: 10 }}>
              <Image source={{ uri: post.image }} style={styles.postImg} />
            </View>
            <Text style={styles.postContent}>{parseText(post.content)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
