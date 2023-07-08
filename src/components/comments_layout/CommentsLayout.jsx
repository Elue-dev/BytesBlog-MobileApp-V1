import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { DEFAULT_AVATAR } from "../../utils";
import { COLORS } from "../../common/colors";
import { globalStyles } from "../../common/globalStyles";
import moment from "moment";
import { useAuth } from "../../context/auth/AuthContext";

export default function CommentsLayout({
  comment,
  allComments,
  replies,
  setShowInput,
  inputRef,
  setIsReplying,
  setAuthor,
  setReplyId,
}) {
  const [showReplies, setShowReplies] = useState(false);
  const {
    state: { user },
  } = useAuth();

  const getReplies = (commentId) => {
    return allComments?.filter((comment) => comment.parentId === commentId);
  };

  return (
    <View style={styles.commentsWrap}>
      <View style={styles.commentsContent}>
        <Image
          source={{ uri: comment.author.avatar || DEFAULT_AVATAR }}
          style={globalStyles.avatarStyle}
        />
        <View style={styles.commentInfoWrap}>
          <View style={styles.topSec}>
            <Text style={styles.authorNames}>
              {comment.author.firstName} {comment.author.lastName}
            </Text>
            <Text style={{ color: COLORS.grayNeutral }}>
              {moment(comment.createdAt).fromNow()}
            </Text>
          </View>
          <Text style={styles.comment}>{comment.message}</Text>

          <View style={styles.actions}>
            {comment.author.id !== user.id && (
              <TouchableOpacity
                onPress={() => {
                  setAuthor(
                    comment.author.firstName + " " + comment.author.lastName
                  );
                  setReplyId(comment.id);
                  setIsReplying(true);
                  inputRef.current.focus();
                }}
              >
                <Text style={styles.repliesText}>Reply</Text>
              </TouchableOpacity>
            )}

            {getReplies(comment.id)?.length !== 0 && (
              <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
                {showReplies ? (
                  <Text style={styles.repliesText}>Hide Replies</Text>
                ) : (
                  <>
                    {replies?.length > 0 && (
                      <Text style={styles.repliesText}>
                        Show Replies ({replies?.length})
                      </Text>
                    )}
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {showReplies && (
        <View style={styles.repliesWrap}>
          <FlatList
            keyExtractor={(replies) => replies.id}
            data={replies}
            renderItem={({ item }) => {
              return (
                <CommentsLayout
                  replies={getReplies(item.id)}
                  comment={item}
                  setShowInput={setShowInput}
                  inputRef={inputRef}
                  setIsReplying={setIsReplying}
                  setAuthor={setAuthor}
                  setReplyId={setReplyId}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
