import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRef, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  AntDesign,
  Ionicons,
  EvilIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../lib";
import moment from "moment";
import { globalStyles } from "../../common/globalStyles";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import PostContent from "../../helpers/PostContent";
import { DEFAULT_AVATAR } from "../../utils";
import RelatedPosts from "../../components/related_posts/RelatedPosts";
import { scrollToTop } from "../../helpers/index";
import { styles } from "./styles";
import { useAuth } from "../../context/auth/AuthContext";
import { throwAlert, throwError } from "../../helpers/throwAlert";

export default function PostDetailScreen() {
  const { state } = useAuth();
  const { postSlug } = useRoute().params;
  const scrollRef = useRef(null);
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);
  const [bookmarksLoading, setBookmarksloading] = useState(false);
  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${state.user?.token}` },
  };

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

  const likesMutation = useMutation(
    (postId) => {
      return httpRequest.post(`/likeDislike/${postId}`, "", authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries([`post-${postSlug}`]);
        setLikesLoading(false);
      },
    }
  );

  const bookmarksMutation = useMutation(
    (postId) => {
      return httpRequest.post(
        `/bookmarks/addRemoveBookmark/${postId}`,
        "",
        authHeaders
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        queryClient.invalidateQueries([`post-${postSlug}`]);
        setBookmarksloading(false);
      },
    }
  );

  useEffect(() => {
    if (isLiked) {
      const timer = setTimeout(() => {
        setIsLiked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (isBookmarked) {
      const timer = setTimeout(() => {
        setIsBookmarked(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLiked, isBookmarked]);

  async function likeDislikePost(postId) {
    try {
      setLikesLoading(true);
      const response = await likesMutation.mutateAsync(postId);
      if (response && response.data.message === "Post liked") {
        setIsLiked(true);
      }
    } catch (error) {
      setLikesLoading(false);
      throwError(error.response.data.message);
    }
  }

  async function addRemoveBookmark(postId) {
    try {
      setBookmarksloading(true);
      const response = await bookmarksMutation.mutateAsync(postId);
      if (response && response.data.message === "Post added to bookmarks") {
        // throwAlert("Success ✅", "Post added to saved");
        setIsBookmarked(true);
      } else {
        // throwAlert("Success ✅", "Post removed from saved");
      }
    } catch (error) {
      setBookmarksloading(false);
      throwError(error.response.data.message);
    }
  }

  function userHasLikedPost(likes) {
    return likes?.some((like) => like.userId === state.user?.id);
  }

  function userHasBookmarkedPost(bookmarks) {
    return bookmarks?.some((bookmark) => bookmark.userId === state.user?.id);
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }} ref={scrollRef.current}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/BlogBG.png")}
          style={styles.bgImage}
        />
        <View style={styles.content}>
          <View style={styles.authorInfo}>
            <TouchableOpacity
              style={styles.authorProfile}
              onPress={() =>
                navigation.navigate("UserProfile", {
                  user: post.author,
                })
              }
            >
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
            </TouchableOpacity>
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
                <TouchableOpacity onPress={() => likeDislikePost(post.id)}>
                  {userHasLikedPost(post.likes) ? (
                    <AntDesign name="like1" size={22} />
                  ) : (
                    <EvilIcons name="like" size={35} />
                  )}
                </TouchableOpacity>
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
                    {likesLoading ? "..." : post.likes.length}
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
                <EvilIcons name="comment" size={25} />
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
                <TouchableOpacity onPress={() => addRemoveBookmark(post.id)}>
                  {userHasBookmarkedPost(post.bookmarks) ? (
                    <FontAwesome name="bookmark" size={20} />
                  ) : (
                    <Ionicons name="bookmark-outline" size={21} />
                  )}
                </TouchableOpacity>

                <Text style={styles.actionText}>
                  {bookmarksLoading ? "..." : post.bookmarks.length}
                </Text>
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
