import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { httpRequest } from "../../lib";
import { useQuery } from "@tanstack/react-query";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../common/colors";
import moment from "moment";
import { globalStyles } from "../../common/globalStyles";
import { useNavigation } from "@react-navigation/native";

export default function AddedPosts({ user, type }) {
  const [postsToUse, setPostsToUse] = useState([]);
  const navigation = useNavigation();

  const authHeaders = {
    headers: { authorization: `Bearer ${user.token}` },
  };

  const queryFn = async () => {
    return httpRequest.get("/posts", authHeaders).then((res) => {
      return res.data.posts;
    });
  };

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery(["posts"], queryFn, {
    staleTime: 60000,
  });

  useEffect(() => {
    setPostsToUse(posts?.filter((post) => post.authorId === user.id));
  }, [posts, user.id]);

  return (
    <View style={{ paddingTop: 10 }}>
      <>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#169639"
            style={{ paddingTop: 30 }}
          />
        ) : error ? (
          <Text style={{ fontSize: 16 }}>Something went wrong</Text>
        ) : postsToUse?.length === 0 ? (
          <Text style={{ fontSize: 16 }}>
            {type === "External"
              ? `${user.firstName} has not added any posts to BytesBlog`
              : "You have not added any posts to BytesBlog"}
          </Text>
        ) : (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(postsToUse) => postsToUse.id}
              data={postsToUse}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PostDetails", {
                        postSlug: item.slug,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ height: 200, width: 400, borderRadius: 10 }}
                    />
                    <Text
                      style={{
                        maxWidth: 400,
                        fontSize: 17,
                        fontWeight: 600,
                        paddingTop: 10,
                      }}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={[globalStyles.flexBetween, { paddingTop: 10 }]}
                    >
                      <View style={[globalStyles.flexStart]}>
                        <Feather
                          name="clock"
                          size={15}
                          color={COLORS.gray600}
                        />
                        <Text style={{ color: COLORS.gray600 }}>
                          {item.readTime} mins read
                        </Text>
                      </View>
                      <Text style={{ color: COLORS.gray600 }}>
                        Added {moment(item.createdAt).fromNow()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </>
    </View>
  );
}
