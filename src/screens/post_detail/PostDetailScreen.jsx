import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../lib";
import moment from "moment";
import { globalStyles } from "../../common/globalStyles";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import PostContent from "../../helpers/PostContent";
import { DEFAULT_AVATAR } from "../../utils";
import { styles } from "./styles";

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
                source={{ uri: post?.author?.avatar || DEFAULT_AVATAR }}
                style={styles.authorImage}
              />
              <View>
                {(post.author.firstName + " " + post.author.lastName).length >
                20 ? (
                  <Text style={styles.authorNames}>
                    {post.author.firstName} {post.author.lastName.slice(0, 4)}
                    ...
                  </Text>
                ) : (
                  <Text style={styles.authorNames}>
                    {post.author.firstName} {post.author.lastName}
                  </Text>
                )}

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
            <View>
              <Image source={{ uri: post.image }} style={styles.postImg} />
            </View>
            <PostContent content={post.content} />

            <Text style={styles.catHeading}>Categories:</Text>
            <View style={styles.postCatWrap}>
              {post.categories.map((category) => (
                <View>
                  <Text key={category} style={styles.postCat}>
                    {category}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
