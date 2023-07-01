import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { DEFAULT_AVATAR, parseText } from "../../utils";
import moment from "moment";
import Categories from "./Categories";
import { useNavigation } from "@react-navigation/native";
import { categories } from "./data";
import Header from "../header/Header";
import { useState } from "react";
import { styles } from "./styles";
import { usePosts } from "../../context/posts/PostContext";

function BlogLayout({ postsData, isLoading, fromBlog }) {
  const navigation = useNavigation();
  const modifiedCategories = ["All", ...categories];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { filteredPosts } = usePosts();

  return (
    <View style={{ marginLeft: 15, flex: 1, marginTop: 40 }}>
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
          />

          {selectedCategory !== "All" && (
            <Text style={styles.categorySelectionText}>
              Posts results for category{" "}
              <Text style={styles.categorySelectionSubText}>
                '{selectedCategory}'
              </Text>
            </Text>
          )}
          <FlatList
            keyExtractor={(filteredPosts) => filteredPosts.id}
            data={filteredPosts || postsData}
            contentContainerStyle={{ flexGrow: 1 }}
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
                  <Text style={styles.readMore}>Read More</Text>
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
        </View>
      )}
    </View>
  );
}

export default BlogLayout;
