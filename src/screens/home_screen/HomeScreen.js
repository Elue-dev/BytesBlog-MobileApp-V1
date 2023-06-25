import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import BlogDetails from "../../components/blog_details/BlogDetails";
import { httpRequest } from "../../lib";
import SearchBar from "../../components/search_bar/SearchBar";
import { styles } from "./styles";

export default function Search() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      setIsLoading(true);
      const response = await httpRequest.get(
        "https://bytesblog-server-production.up.railway.app/api/v1/posts"
      );
      setResults(response.data.posts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [term]);

  return (
    <View style={{ marginLeft: 15, flex: 1 }}>
      {/* <Hero /> */}
      {/* <SearchBar
        term={term}
        setTerm={setTerm}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={fetchRestaurants}
      /> */}
      {term && (
        <Text style={styles.searchText}>
          Search results for <Text style={styles.subText}>'{term}'</Text>
        </Text>
      )}
      <View>
        <BlogDetails data={results} isLoading={isLoading} />
      </View>
    </View>
  );
}
