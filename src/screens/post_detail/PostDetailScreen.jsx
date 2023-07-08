import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRef, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AntDesign,
  SimpleLineIcons,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../lib";
import moment from "moment";
import { globalStyles } from "../../common/globalStyles";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import PostContent from "../../helpers/PostContent";
import { DEFAULT_AVATAR } from "../../utils";
import RelatedPosts from "../../components/related_posts/RelatedPosts";
import { scrollToTop } from "../../helpers/index";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

export default function PostDetailScreen() {
  const { postSlug } = useRoute().params;
  const scrollRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    scrollToTop(scrollRef);
  }, []);

  const {
    isLoading,
    error,
    data: post,
  } = useQuery([`post-${postSlug}`], () =>
    httpRequest.get(`/posts/${postSlug}`).then((res) => {
      return res.data.post[0];
    })
  );

  const {
    isLoading: loading,
    error: err,
    data: posts,
    refetch,
  } = useQuery(
    [`posts`],
    () =>
      httpRequest.get(`/posts`).then((res) => {
        return res.data.posts;
      }),
    {
      staleTime: 60000,
    }
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen />;

  const rootComments = post.comments.filter(
    (comment) => comment.parentId === null
  );

  const relatedPosts = posts?.filter(
    (p) =>
      p.categories.some((category) => post?.categories.includes(category)) &&
      p.slug !== postSlug
  );

  return (
    <ScrollView style={{ backgroundColor: "#fff" }} ref={scrollRef.current}>
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
                <View key={category}>
                  <Text style={styles.postCat}>{category}</Text>
                </View>
              ))}
            </View>

            {/* =========== ACTIONS (likes, comments, bookmarks) =========== */}
            <View style={styles.actions}>
              <View style={styles.action}>
                <SimpleLineIcons name="like" size={22} />
                <TouchableOpacity
                  style={styles.action}
                  onPress={() =>
                    navigation.navigate("PostLikes", {
                      likes: post.likes,
                    })
                  }
                >
                  <Text
                    style={[
                      styles.actionText,
                      { textDecorationLine: "underline" },
                    ]}
                  >
                    {post.likes.length}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.action}
                onPress={() =>
                  navigation.navigate("PostComments", {
                    authorEmail: post.author.email,
                    postId: post.id,
                    postSlug,
                  })
                }
              >
                <Fontisto name="comment" size={22} />
                <Text
                  style={[
                    styles.actionText,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  {rootComments.length}
                </Text>
              </TouchableOpacity>

              <View style={styles.action}>
                <Feather name="bookmark" size={24} />
                <Text style={styles.actionText}>{post.bookmarks.length}</Text>
              </View>
            </View>

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#169639"
                style={{ paddingTop: 30 }}
              />
            ) : err ? (
              <View>
                <Text>Something went wrong </Text>

                <TouchableOpacity onPress={refetch}>
                  <Text>RETRY</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <RelatedPosts posts={relatedPosts} />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
