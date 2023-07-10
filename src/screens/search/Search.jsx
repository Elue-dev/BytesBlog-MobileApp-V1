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
  EvilIcons,
  Fontisto,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { styles } from "./style";
import { httpRequest } from "../../lib";
import { useQuery } from "@tanstack/react-query";
import { getRelevantPosts } from "../../helpers/search.algorithm";
import moment from "moment";
import { COLORS } from "../../common/colors";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();

  async function queryFn() {
    const response = await httpRequest.get("/posts");
    return response.data.posts;
  }

  const { data: posts } = useQuery(["posts"], queryFn, {
    staleTime: 60000,
  });

  useEffect(() => {
    if (searchQuery) {
      const getPostsBySearch = getRelevantPosts(posts, searchQuery);
      setSearchResults(getPostsBySearch);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ marginHorizontal: 10, marginBottom: 200 }}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={searchQuery}
            onChangeText={(newVal) => setSearchQuery(newVal)}
            placeholder="Search posts by title, authors, categories"
          />
          {searchQuery && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <AntDesign name="close" size={20} />
            </TouchableOpacity>
          )}
        </View>

        {!searchQuery && (
          <View style={styles.introSearch}>
            <MaterialCommunityIcons
              name="text-box-search-outline"
              size={200}
              color={COLORS.grayNeutralSec}
            />
            <Text style={styles.introText}>
              Search for blog posts by Title, Authors, Categories etc
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

        {searchQuery && (
          <View style={styles.searchResults}>
            <FlatList
              data={searchResults}
              showsVerticalScrollIndicator={false}
              keyExtractor={(searchResults) => searchResults.id}
              renderItem={({ item }) => {
                return (
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
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.info}>
                          <View style={styles.readTime}>
                            <EvilIcons name="clock" size={20} />
                            <Text>{item.readTime} mins read</Text>
                          </View>

                          <View style={styles.createdAt}>
                            <Fontisto name="date" size={13} />
                            <Text>{moment(item.createdAt).fromNow()}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
