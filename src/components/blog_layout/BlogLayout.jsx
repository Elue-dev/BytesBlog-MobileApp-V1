import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { DEFAULT_AVATAR, parseText } from "../../utils";
import moment from "moment";
import Categories from "./Categories";
import { useNavigation } from "@react-navigation/native";
import { categories } from "./data";
import Header from "../header/Header";
import { useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { usePosts } from "../../context/posts/PostContext";
import { scrollToTop } from "../../helpers";
import { useAuth } from "../../context/auth/AuthContext";
import { SharedElement } from "react-native-shared-element";
import BottomSheetComponent from "../bottom_sheet/BottomSheet";

function BlogLayout({ postsData, isLoading }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const modifiedCategories = ["All", ...categories];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { filteredPosts, filterPostsByKeyword, setCurrentPost } = usePosts();
  const { bottomSheetOpen, toggleBottomSheet, toggleOverlay, logOutUser } =
    useAuth();

  useEffect(() => {
    filterPostsByKeyword(postsData, selectedCategory);
  }, []);

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
          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Text>Profile</Text>
          </Pressable>

          <Pressable onPress={logOutUser}>
            <Text>Logout</Text>
          </Pressable>

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
                          <EvilIcons name="like" size={30} />
                          <Text style={{ fontSize: 17 }}>
                            {item.likes.length}{" "}
                            {item.likes?.length > 1
                              ? "likes"
                              : item.likes?.length === 0
                              ? "likes"
                              : "like"}
                          </Text>
                        </View>
                      </Text>
                      <View style={styles.statsContent}>
                        <Feather name="bookmark" size={20} />
                        <Text style={{ fontSize: 17 }}>
                          {item.bookmarks.length} bookmarks
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
