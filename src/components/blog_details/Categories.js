import { View, Text, FlatList, StyleSheet } from "react-native";
import { categories } from "./data";

export default function Categories() {
  const modifiedCategories = ["All", ...categories];
  return (
    <View style={styles.wrapper}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(modifiedCategories) => modifiedCategories}
        data={modifiedCategories}
        renderItem={({ item }) => {
          return (
            <View style={styles.category}>
              <Text style={styles.text}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingBottom: 15,
    paddingTop: 15,
    borderBottomWidth: 3,
    borderBottomColor: "#E9ECEF",
    borderBottomStyle: "solid",
  },
  category: {
    marginRight: 10,
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    color: "#8E8E93",
  },
});
