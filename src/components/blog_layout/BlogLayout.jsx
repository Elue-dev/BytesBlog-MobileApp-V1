import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
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
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "react-native";
import { COLORS } from "../../common/colors";

function BlogLayout({ postsData, isLoading, fromBlog }) {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const modifiedCategories = ["All", ...categories];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { filteredPosts, filterPostsByKeyword, setCurrentPost } = usePosts();
  const { bottomSheetOpen, toggleBottomSheet, toggleOverlay } = useAuth();
  const SheetRef = useRef(null);
  const snapPoints = ["40%"];

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

  return (
    <View
      style={{
        marginLeft: bottomSheetOpen ? 0 : 15,
        flex: 1,
        marginTop: 40,
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

          {bottomSheetOpen && <View style={styles.overlay} />}

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
                          <Text>
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
                        <Text>{item.bookmarks.length} bookmarks</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      )}
      {bottomSheetOpen && (
        <BottomSheet
          ref={SheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => {
            toggleBottomSheet();
            toggleOverlay();
          }}
        >
          <BottomSheetView>
            <Text
              style={{ fontSize: 20, textAlign: "center", fontWeight: 600 }}
            >
              Menu Options
            </Text>
            <View
              style={{
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  toggleBottomSheet();
                  toggleOverlay();
                }}
                style={[styles.authBtn, styles.signUpBtn]}
              >
                <Text style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
                  CLOSE
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      )}
    </View>
  );
}

export default BlogLayout;
