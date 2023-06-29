import { useEffect, useState } from "react";
import { View } from "react-native";
import BlogLayout from "../../components/blog_layout/BlogLayout";
import { httpRequest } from "../../lib";
import SearchBar from "../../components/search_bar/SearchBar";
import { styles } from "./styles";
import { SERVER_URL } from "../../utils";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const response = await httpRequest.get(`${SERVER_URL}/posts`);
      setPosts(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* <Hero /> */}
      {/* <SearchBar
        term={term}
        setTerm={setTerm}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={fetchRestaurants}
      /> */}
      {/* {term && (
        <Text style={styles.searchText}>
          Search results for <Text style={styles.subText}>'{term}'</Text>
        </Text>
      )} */}
      <BlogLayout data={posts} isLoading={isLoading} />
    </View>
  );
}
