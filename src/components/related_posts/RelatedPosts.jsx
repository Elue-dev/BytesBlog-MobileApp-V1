import moment from "moment";
import { View, Text, Image, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { DEFAULT_AVATAR, parseText } from "../../utils";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { styles } from "./styles";
import { COLORS } from "../../common/colors";
import { useNavigation } from "@react-navigation/native";

export default function RelatedPosts({ posts }) {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.heading}>Some Related Posts</Text>
      <FlatList
        data={posts.slice(0, 3)}
        key={(posts) => posts.id}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemWrap}>
              <Image source={{ uri: item.image }} style={styles.postImg} />

              <View style={styles.authorInfo}>
                <Image
                  source={{ uri: item.author.avatar || DEFAULT_AVATAR }}
                  style={styles.authorImage}
                />
                <Text style={styles.authorName}>
                  {item.author.firstName} {item.author.lastName} -{" "}
                  <Text style={styles.createdAt}>
                    {moment(item.createdAt).fromNow()}
                  </Text>
                </Text>
              </View>
              <View style={styles.authorInfo}></View>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postContent}>
                {parseText(item.content.slice(0, 100))}...
              </Text>

              <View style={styles.bottomSec}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("PostDetails", {
                      postSlug: item.slug,
                      postId: item.id,
                    });
                  }}
                >
                  <View style={styles.readMoreWrap}>
                    <Text style={styles.readMore}>Read More</Text>
                    <MaterialIcons
                      name="double-arrow"
                      size={16}
                      color={COLORS.primaryColorHover}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles.readTimeWrap}>
                  <AntDesign
                    name="clockcircleo"
                    size={15}
                    color={COLORS.blackNeutralSec}
                  />
                  <Text style={styles.readTime}>{item.readTime} mins read</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
