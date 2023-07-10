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

export default function SavedPosts({ user }) {
  const [bookmarksToUse, setBookmarksToUse] = useState([]);
  const navigation = useNavigation();

  const authHeaders = {
    headers: { authorization: `Bearer ${user.token}` },
  };

  const queryFn = async () => {
    return httpRequest.get("/bookmarks", authHeaders).then((res) => {
      return res.data.bookmarks;
    });
  };

  const {
    isLoading,
    error,
    data: bookmarks,
  } = useQuery(["bookmarks"], queryFn, {
    staleTime: 60000,
  });

  useEffect(() => {
    setBookmarksToUse(
      bookmarks?.filter((bookmark) => bookmark.userId === user.id)
    );
  }, [bookmarks, user.id]);

  return (
    <View style={{ paddingTop: 10, paddingBottom: 100 }}>
      <>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#169639"
            style={{ paddingTop: 30 }}
          />
        ) : error ? (
          <Text style={{ fontSize: 16 }}>Something went wrong</Text>
        ) : bookmarksToUse?.length === 0 ? (
          <Text style={{ fontSize: 16 }}>You have no saved posts yet.</Text>
        ) : (
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(bookmarksToUse) => bookmarksToUse.id}
              data={bookmarksToUse}
              contentContainerStyle={{ gap: 10 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("PostDetails", {
                        postSlug: item.post.slug,
                      })
                    }
                  >
                    <Image
                      source={{ uri: item.post.image }}
                      style={{
                        height: 200,
                        width: 400,
                        borderRadius: 10,
                        backgroundColor: COLORS.primaryColorLight,
                      }}
                    />
                    <Text
                      style={{
                        maxWidth: 400,
                        fontSize: 17,
                        fontWeight: 600,
                        paddingTop: 10,
                      }}
                    >
                      {item.post.title}
                    </Text>
                    <View
                      style={[
                        globalStyles.flexBetween,
                        { paddingTop: 10, paddingBottom: 40 },
                      ]}
                    >
                      <View style={[globalStyles.flexStart]}>
                        <Feather
                          name="clock"
                          size={15}
                          color={COLORS.gray600}
                        />
                        <Text style={{ color: COLORS.gray600 }}>
                          {item.post.readTime} mins read
                        </Text>
                      </View>
                      <Text style={{ color: COLORS.gray600 }}>
                        Bookmarked {moment(item.createdAt).fromNow()}
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
