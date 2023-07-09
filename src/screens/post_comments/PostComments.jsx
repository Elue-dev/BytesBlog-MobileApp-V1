import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DEFAULT_AVATAR } from "../../utils";
import { styles } from "./styles";
import { useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { globalStyles } from "../../common/globalStyles";
import CommentsLayout from "../../components/comments_layout/CommentsLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { httpRequest } from "../../lib";
import { throwError } from "../../helpers/throwAlert";

export default function PostComments() {
  const navigation = useNavigation();
  const { authorEmail, postSlug, postId } = useRoute().params;
  const [showInput, setShowInput] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [heightAdjust, setHeightAdust] = useState(false);
  const [author, setAuthor] = useState(null);
  const [replyId, setReplyId] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const {
    state: { user },
  } = useAuth();

  const queryClient = useQueryClient();
  const authHeaders = {
    headers: { authorization: `Bearer ${user?.token}` },
  };

  function getReplies(commentId) {
    return allComments?.filter((comment) => comment.parentId === commentId);
  }

  const queryFn = async () => {
    return httpRequest.get(`/comments/${postId}`).then((res) => {
      return res.data.comments;
    });
  };

  const { data: allComments, isLoading } = useQuery(
    [`comments-${postId}`],
    queryFn,
    {
      staleTime: 60000,
    }
  );

  const rootComments = allComments?.filter(
    (comment) => comment.parentId === null
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `Comments ${!isLoading ? `(${rootComments.length})` : ""} `,
    });
  }, [isLoading, comment]);

  const mutation = useMutation(
    (newComment) => {
      return httpRequest.post("/comments", newComment, authHeaders);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([`comments-${postId}`]);
        queryClient.invalidateQueries([`post-${postSlug}`]);
        setHeightAdust(false);
      },
      onError: () => {
        setLoading(false);
      },
    }
  );

  async function submitComment(id) {
    const commentData = {
      message: comment,
      postId: postId,
      parentId: id,
      authorEmail,
      path: `https://bytes-blog-client.vercel.app/${postSlug}/${postId}`,
      isReplying: isReplying,
    };

    try {
      setLoading(true);
      const response = await mutation.mutateAsync(commentData);
      if (response) {
        setShowInput(false);
        setComment("");
        setLoading(false);
      }
    } catch (error) {
      setShowInput(false);
      setIsReplying(false);
      return throwError(null, error.response.data.message);
    }
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {allComments?.length === 0 ? (
        <View style={styles.noComments}>
          <Text style={styles.noCommentsHeadingText}>No comments yet</Text>
          <Text style={styles.noCommentsSubText}>
            Be the first to add a comment to this post
          </Text>
        </View>
      ) : isLoading ? (
        <View style={{ backgroundColor: "#fff", flex: 1 }}>
          <ActivityIndicator
            size="small"
            color="#169639"
            style={{ paddingTop: 20 }}
          />
        </View>
      ) : (
        <FlatList
          keyExtractor={(rootComments) => rootComments.id}
          data={rootComments}
          renderItem={({ item }) => {
            return (
              <CommentsLayout
                comment={item}
                postId={postId}
                allComments={allComments}
                replies={getReplies(item.id)}
                setShowInput={setShowInput}
                inputRef={inputRef}
                setIsReplying={setIsReplying}
                setAuthor={setAuthor}
                setReplyId={setReplyId}
              />
            );
          }}
        />
      )}

      {!showInput && (
        <View style={styles.border}>
          {isReplying && (
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.replyingTo}>Replying to {author}</Text>
            </View>
          )}
          <View
            style={[
              styles.addCommentwrap,
              heightAdjust ? styles.adjustedHeight : null,
            ]}
          >
            <Image
              source={{ uri: user.avatar || DEFAULT_AVATAR }}
              style={globalStyles.avatarStyle}
            />
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={comment}
              onChangeText={(newComment) => setComment(newComment)}
              placeholder="Add a comment..."
              placeholderTextColor="#888"
              onFocus={() => setHeightAdust(true)}
              onBlur={() => {
                setIsReplying(false);
                setHeightAdust(false);
              }}
            />

            {comment.length === 0 ? (
              <Text style={styles.disabledtext}>Send</Text>
            ) : loading ? (
              <Text style={styles.disabledtext}>Sending...</Text>
            ) : (
              <>
                {!loading && (
                  <TouchableOpacity
                    onPress={() =>
                      submitComment(isReplying ? replyId : comment.id)
                    }
                  >
                    <Text style={styles.greenText}>Send</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
