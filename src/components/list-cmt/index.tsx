import { ScrollView } from "@nandorojo/anchor";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getToken } from "../../page/auth";
import { listCommentsProps, UserProps } from "../../page/watching";
import { request } from "../../utils/request";
import { Comment } from "./cmt";

type listCmt = {
  listComment: Array<listCommentsProps>;
  setListComment: (listComment: Array<listComment>) => void;
  episodeId: number | undefined;
};
export interface listComment {
  id: number;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  content: string;
  numLike: number;
  user?: UserProps;
  subcomments?: Array<listComment>;
}

export const ListComment = ({
  listComment,
  setListComment,
  episodeId,
}: listCmt) => {
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  //api subcomment
  const fetchUpdatedComments = async () => {
    try {
      const response = await request.get(`episode/${episodeId}/comments`);
      return response.data.comments;
    } catch (error) {
      console.error(error);
      return listComment;
    }
  };

  const handleReplySubmit = async (parentId: number, content: string) => {
    const accessToken = await getToken();
    try {
      await request.post(
        "comments/sub-comments/create",
        {
          parentId: `${parentId}`,
          content: content,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedComments = await fetchUpdatedComments();
      setListComment(updatedComments);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteCommentById = async (idToDelete: number) => {
    const accessToken = await getToken();
    try {
      await request.delete(`comments/delete/${idToDelete}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedComments = await fetchUpdatedComments();
      setListComment(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChildCmtById = async (replyIdToDelete: number) => {
    const accessToken = await getToken();
    try {
      await request.delete(`comments/sub-comments/delete/${replyIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const updatedComments = await fetchUpdatedComments();
      setListComment(updatedComments);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ScrollView>
      <Text style={styles.title}>Bình luận</Text>
      {listComment.map((comment) => (
        <React.Fragment key={comment.id}>
          <Comment
            key={comment.id}
            comment={comment}
            onReplySubmit={handleReplySubmit}
            replyCommentId={replyCommentId}
            setReplyCommentId={setReplyCommentId}
            deleteCommentById={deleteCommentById}
          />
          {comment.subcomments &&
            comment.subcomments.map((reply) => (
              <View style={styles.reply}>
                <Comment
                  key={reply.id}
                  comment={reply}
                  deleteCommentById={() => deleteChildCmtById(reply.id)}
                />
              </View>
            ))}
        </React.Fragment>
      ))}
      <Text
        style={{
          paddingTop: 10,
          color: "silver",
          marginLeft: 45,
        }}
      >
        Không còn nhiều bình luận hơn.
      </Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  reply: {
    marginLeft: 45,
    marginRight: 10,
    borderBottomColor: "#4B4A4A",
    borderBottomWidth: 1,
  },
});
