import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { EvilIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { DEFAULT_AVATAR, parseText } from "../../utils";
import moment from "moment";
import Categories from "./Categories";
import { useNavigation } from "@react-navigation/native";
import { categories } from "./data";
import Header from "../header/Header";
import { useEffect, useRef, useState } from "react";
import { usePosts } from "../../context/posts/PostContext";
import { scrollToTop } from "../../helpers";
import { useAuth } from "../../context/auth/AuthContext";
import { SharedElement } from "react-native-shared-element";
import BottomSheetComponent from "../bottom_sheet/BottomSheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { styles } from "./styles";
import { httpRequest } from "../../lib";
import { throwAlert, throwError } from "../../helpers/throwAlert";

function BlogLayout({ postsData, isLoading, userSpecificPosts, posts }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const modifiedCategories = ["All", ...categories];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likesLoading, setLikesLoading] = useState(false);
  const [bookmarksLoading, setBookmarksloading] = useState(false);
  const { filteredPosts, filterPostsByKeyword, setCurrentPost } = usePosts();
  const { state, bottomSheetOpen, toggleBottomSheet, toggleOverlay } =
    useAuth();
  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${state.user?.token}` },
  };

  const likesMutation = useMutation(
    (postId) => {
      return httpRequest.post(`/likeDislike/${postId}`, "", authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
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

  useEffect(() => {
    userSpecificPosts.current = posts.filter((post) =>
      post.categories.some((category) =>
        state.user?.interests.includes(category)
      )
    );
    filterPostsByKeyword(userSpecificPosts.current, selectedCategory);
  }, [posts, selectedCategory, state.user]);

  function viewPostDetails(currentPost) {
    navigation.navigate("PostDetails", {
      postSlug: currentPost.slug,
      postId: currentPost.id,
    });
    setCurrentPost(currentPost.id, currentPost.slug);
  }

  function handleBottomSheetActions() {
    toggleBottomSheet();
    toggleOverlay();
  }

  return (
    <View
      style={{
        marginLeft: bottomSheetOpen ? 0 : 15,
        flex: 1,
        marginTop: 40,
        backgroundColor: "#fff",
      }}
    >
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#169639"
          style={{ paddingTop: 30 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Header auth={true} fromBlog={true} />
          <Categories
            posts={postsData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            modifiedCategories={modifiedCategories}
            scrollToTop={() => scrollToTop(flatListRef)}
          />

          {bottomSheetOpen && (
            <TouchableOpacity
              onPress={handleBottomSheetActions}
              style={styles.overlay}
            >
              <SharedElement id="overlay" style={styles.overlay}>
                <View />
              </SharedElement>
            </TouchableOpacity>
          )}

          {selectedCategory !== "All" && (
            <Text style={styles.categorySelectionText}>
              Posts results for category{" "}
              <Text style={styles.categorySelectionSubText}>
                '{selectedCategory}'
              </Text>
            </Text>
          )}
          {filteredPosts?.length === 0 ? (
            <View>
              <Text style={styles.noResults}>
                No posts found. If there are blog posts on {selectedCategory},
                they would appear here if they are among your interests.
              </Text>
              <View style={styles.manageIntWrap}>
                <TouchableOpacity style={styles.manageInt}>
                  <Text style={styles.btnText}>Manage Interets</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <FlatList
              keyExtractor={(filteredPosts) => filteredPosts.id}
              data={filteredPosts}
              contentContainerStyle={{ flexGrow: 1 }}
              ref={flatListRef}
              renderItem={({ item }) => {
                return (
                  <View style={[styles.container, { flex: 1 }]}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View style={styles.topContent}>
                      <View style={styles.authorDetails}>
                        <Image
                          source={{ uri: item.author.avatar || DEFAULT_AVATAR }}
                          style={styles.avatar}
                        />

                        <Text style={styles.username}>
                          {item.author.firstName} {item.author.lastName}
                        </Text>
                        <Text style={styles.date}>
                          {" "}
                          - {moment(item.createdAt).fromNow()}
                        </Text>
                      </View>
                      <View style={styles.readTime}>
                        <EvilIcons name="clock" size={20} />
                        <Text style={styles.readTimeText}>
                          {item.readTime} mins read
                        </Text>
                      </View>
                    </View>
                    <View style={styles.main}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.content}>
                        {parseText(item.content.slice(0, 200))}...
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => viewPostDetails(item)}>
                      <Text style={styles.readMore}>Read More</Text>
                    </TouchableOpacity>
                    <View style={styles.stats}>
                      <Text>
                        <View style={styles.statsContent}>
                          <TouchableOpacity
                            onPress={() => likeDislikePost(item.id)}
                          >
                            {userHasLikedPost(item.likes) ? (
                              <AntDesign name="like1" size={30} />
                            ) : (
                              <EvilIcons name="like" size={30} />
                            )}
                          </TouchableOpacity>
                          <Text style={{ fontSize: 17 }}>
                            {likesLoading ? (
                              "..."
                            ) : (
                              <>
                                {item.likes.length}{" "}
                                {item.likes?.length > 1
                                  ? "likes"
                                  : item.likes?.length === 0
                                  ? "likes"
                                  : "like"}
                              </>
                            )}
                          </Text>
                        </View>
                      </Text>
                      <View style={styles.statsContent}>
                        <TouchableOpacity
                          onPress={() => addRemoveBookmark(item.id)}
                        >
                          {userHasBookmarkedPost(item.bookmarks) ? (
                            <FontAwesome name="bookmark" size={20} />
                          ) : (
                            <Feather name="bookmark" size={20} />
                          )}
                        </TouchableOpacity>

                        <Text style={{ fontSize: 17 }}>
                          {bookmarksLoading ? (
                            "..."
                          ) : (
                            <>
                              {item.bookmarks.length}{" "}
                              {item.bookmarks?.length > 1
                                ? "bookmarks"
                                : item.bookmarks?.length === 0
                                ? "bookmarks"
                                : "bookmark"}
                            </>
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}

      {/* ======== BOTTOM SHEET ========= */}
      {bottomSheetOpen && <BottomSheetComponent />}
    </View>
  );
}

export default BlogLayout;
