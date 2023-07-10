import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { Image } from "react-native";
import { DEFAULT_AVATAR } from "../../utils";
import { useLayoutEffect } from "react";

export default function PostLikes() {
  const { likes } = useRoute().params;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Likes (${likes?.length})`,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1, padding: 10 }}>
      {likes.length === 0 ? (
        <View style={styles.noLikes}>
          <Text style={styles.noLikesHeadingText}>No likes on this yet</Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(likes) => likes.id}
          data={likes}
          renderItem={({ item }) => {
            return (
              <View style={styles.wrapper}>
                <View style={styles.likesWrap}>
                  <Image
                    source={{ uri: item.user.avatar || DEFAULT_AVATAR }}
                    style={styles.userImg}
                  />
                  <View>
                    <View style={styles.topWrap}>
                      <Text style={styles.text}>
                        {item.user.firstName} {item.user.lastName}
                      </Text>
                    </View>
                    <Text style={styles.bio}>
                      {item.user.bio === ""
                        ? "No Bio Yet"
                        : item.user.bio.length < 30
                        ? item.user.bio
                        : item.user.bio.substring(0, 25) + "..."}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate("UserProfile", {
                      user: item.user,
                    })
                  }
                >
                  <Text style={styles.btnText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}
