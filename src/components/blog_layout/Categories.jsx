import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { COLORS } from "../../common/colors";
import { usePosts } from "../../context/posts/PostContext";

export default function Categories({
  posts,
  selectedCategory,
  setSelectedCategory,
  modifiedCategories,
  scrollToTop,
}) {
  const { filterPostsByKeyword } = usePosts();

  function filterPosts(currentCategory) {
    scrollToTop();
    setSelectedCategory(currentCategory);
    filterPostsByKeyword(posts, currentCategory);
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {modifiedCategories.map((item) => (
          <View
            key={item}
            style={[
              styles.category,
              selectedCategory === item ? styles.active : null,
            ]}
          >
            <TouchableOpacity onPress={() => filterPosts(item)}>
              <Text
                style={[
                  styles.text,
                  selectedCategory === item ? styles.activeText : null,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 2,
    borderColor: "#dedede",
  },
  category: {
    marginRight: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 52,
    borderColor: "#999",
    padding: 10,
  },
  active: {
    backgroundColor: COLORS.primaryColorHover,
    borderWidth: 0,
  },
  text: {
    fontSize: 18,
    color: "#8E8E93",
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
