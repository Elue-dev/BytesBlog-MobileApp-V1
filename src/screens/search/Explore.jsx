import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { styles } from "./style";
import { httpRequest } from "../../lib";
import { useQuery } from "@tanstack/react-query";
import { getRelevantPosts } from "../../helpers/search.algorithm";
import { COLORS } from "../../common/colors";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../components/httpStates/Loading";
import ErrorScreen from "../../components/httpStates/Error";
import { parseText } from "../../utils";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  async function queryFn() {
    const response = await httpRequest.get("/posts");
    return response.data.posts;
  }

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery(["posts"], queryFn, {
    staleTime: 60000,
  });

  useEffect(() => {
    if (searchQuery) {
      const getPostsBySearch = getRelevantPosts(posts, searchQuery);
      setSearchResults(getPostsBySearch);
    }
  }, [searchQuery]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen refetch={refetch} />;

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ marginHorizontal: 10, marginBottom: 200 }}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={(newVal) => setSearchQuery(newVal)}
            placeholder="Explore by title, authors, categories..."
            placeholderTextColor="#999"
          />
          {searchQuery && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <AntDesign name="close" size={23} />
            </TouchableOpacity>
          )}
        </View>

        {!searchQuery && (
          <View style={styles.introSearch}>
            <MaterialIcons
              name="explore"
              size={200}
              color={COLORS.grayNeutralSec}
            />
            <Text style={styles.introText}>
              Explore blog posts outside of your interests
            </Text>
          </View>
        )}

        {searchQuery && searchResults.length === 0 && (
          <View style={styles.noResultsCont}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/6134/6134065.png",
              }}
              style={styles.noResultsImg}
            />
            <Text style={styles.noResultsText}>
              No results match your search
            </Text>
            <Text style={styles.noResultsSubText}>
              Try searching something else
            </Text>
          </View>
        )}

        {searchQuery && searchResults.length > 0 && (
          <Text style={styles.resultsCount}>
            {searchResults.length}{" "}
            {searchResults.length === 1 ? "post" : "posts"} found
          </Text>
        )}

        {searchQuery && (
          <View style={styles.searchResults}>
            <FlatList
              data={searchResults}
              showsVerticalScrollIndicator={false}
              keyExtractor={(searchResults) => searchResults.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.resultsWrap}>
                    <TouchableOpacity
                      style={styles.container}
                      onPress={() =>
                        navigation.navigate("PostDetails", {
                          postSlug: item.slug,
                          postId: item.id,
                        })
                      }
                    >
                      <View style={styles.contentWrap}>
                        <Image
                          source={{ uri: item.image }}
                          style={styles.image}
                        />
                        <View>
                          <Text style={styles.title}>
                            {item.title.length > 100
                              ? item.title.slice(0, 100) + "..."
                              : item.title}
                          </Text>
                          <View style={styles.content}>
                            <Text>
                              {parseText(item.content.slice(0, 70))}
                              {"..."}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
