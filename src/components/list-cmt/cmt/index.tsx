import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar, Button } from "@rneui/base";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { getToken } from "../../../page/auth";
import { CurrentUser, listCommentsProps } from "../../../page/watching";
import { request } from "../../../utils/request";
import { WriteCmt } from "../write-cmt";
import * as jwtDecode from "jwt-decode";

interface listCommentProps {
  comment: listCommentsProps;
  onReplySubmit?: (commentId: number, replyText: string) => void;
  replyCommentId?: number | null;
  setReplyCommentId?: (commentId: number | null) => void;
  deleteCommentById?: (commentId: number, replyId?: number) => void;
}
export const Comment = ({
  comment,
  onReplySubmit,
  replyCommentId,
  setReplyCommentId,
  deleteCommentById,
}: listCommentProps) => {
  const getTimeDifference = (commentDateTime: string) => {
    const commentDate = new Date(commentDateTime);
    const currentDate = new Date();

    const timeDifference = Math.abs(
      commentDate.getTime() - currentDate.getTime()
    );

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30.5);
    const years = Math.floor(days / 365);

    if (years > 0) {
      return `${years} năm trước`;
    } else if (months > 0) {
      return `${months} tháng trước`;
    } else if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  };
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    username: "",
    email: "",
    avatarURL: "",
  });
  const fetchDataCurrentUser = async () => {
    const accessToken = await getToken();
    try {
      const response = await request.get("user/get-self-information", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataCurrentUser();
  }, []);

  const isCurrentUserComment = comment.user?.user_id === currentUser.userId;
  //subcomment
  const [isReplying, setIsReplying] = useState<boolean>(true);

  const handleCancelReply = () => {
    setIsReplying(false);
  };
  useEffect(() => {
    if (!isReplying && setReplyCommentId) {
      setReplyCommentId(null);
    }
  }, [isReplying]);

  const handleReply = () => {
    setIsReplying(true);
    if (setReplyCommentId) {
      setReplyCommentId(replyCommentId === comment.id ? null : comment.id);
    }
  };
  //like
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      comment.numLike = comment.numLike - 1;
    } else {
      comment.numLike = comment.numLike + 1;
    }
    setIsLiked(!isLiked);
  };

  return (
    <View
      style={{
        marginTop: 5,
        paddingTop: 4,
        paddingBottom: 9,
        flexDirection: "row",
      }}
    >
      <Avatar
        rounded
        size={40}
        source={{ uri: comment.user?.avatar_url }}
        avatarStyle={{ paddingTop: 5 }}
      />

      <View key={comment.id} style={styles.cmtContain}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 1, color: "silver" }}>
            {comment.user?.email}
          </Text>
          <Text>{" · "}</Text>
          <Text style={{ fontSize: 12 }}>
            <Text style={{ color: "silver" }}>
              {getTimeDifference(comment.createdAt)}
            </Text>
          </Text>
        </View>
        <Text style={{ color: "white" }}>{comment.content}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity onPress={handleLike}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              {comment.numLike > 0 && isLiked ? (
                <FontAwesomeIcon icon={faHeart} size={15} color={"red"} />
              ) : (
                <FontAwesomeIcon icon={faHeart} size={15} color={"silver"} />
              )}

              <Text
                style={{
                  marginLeft: 1,
                  color: "silver",
                  fontWeight: "bold",
                }}
              >
                {comment.numLike > 0 ? comment.numLike : "Like"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleReply}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  marginLeft: 1,
                  color: "silver",
                  fontWeight: "bold",
                }}
              >
                Phản hồi
              </Text>
            </View>
          </TouchableOpacity>

          {isCurrentUserComment && (
            <TouchableOpacity onPress={() => deleteCommentById?.(comment.id)}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    marginLeft: 1,
                    color: "silver",
                    fontWeight: "bold",
                  }}
                >
                  Xóa
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        {isReplying && replyCommentId === comment.id && (
          <WriteCmt
            currentUser={currentUser}
            onSubmitComment={(replyText) => {
              if (onReplySubmit) {
                onReplySubmit(comment.id, replyText);
                setIsReplying(false);
              }
            }}
            placeholder={`Trả lời ${comment.user?.email}`}
            onCancel={handleCancelReply}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  cmtContain: {
    marginLeft: 10,
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  postCmt: {
    flexDirection: "row",
    width: "100%",
  },
  postText: {
    color: "white",
    width: "65%",
    backgroundColor: "#202020",
    borderRadius: 5,
    marginLeft: 7,
    marginRight: 7,
  },
});
