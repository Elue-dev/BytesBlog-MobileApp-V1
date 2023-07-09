import { View } from "react-native";
import BlogLayout from "../../components/blog_layout/BlogLayout";
import { httpRequest } from "../../lib";
import { useQuery } from "@tanstack/react-query";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import { useRef } from "react";
import { useAuth } from "../../context/auth/AuthContext";

export default function HomeScreen() {
  const userSpecificPosts = useRef();
  const {
    state: { user },
  } = useAuth();

  async function queryFn() {
    const response = await httpRequest.get("/posts");
    return response.data.posts;
  }

  const {
    isLoading,
    error,
    data: posts,
    refetch,
  } = useQuery(["posts"], queryFn, {
    staleTime: 60000,
  });

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen refetch={refetch} />;

  userSpecificPosts.current = posts.filter((post) =>
    post.categories.some((category) => user?.interests.includes(category))
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
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
      <BlogLayout
        postsData={userSpecificPosts.current}
        isLoading={isLoading}
        posts={posts}
        userSpecificPosts={userSpecificPosts}
      />
    </View>
  );
}
