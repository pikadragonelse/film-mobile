import { ScrollView } from "@nandorojo/anchor";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { listCommentsProps } from "../../page/watching";
import { Comment } from "./cmt";

export interface UserProps {
  user_id: number;
  gender: string;
  avatar_url: string;
}

type listCmt = {
  listComment: Array<listCommentsProps>;
};
export const ListComment = ({ listComment }: listCmt) => {
  return (
    <ScrollView>
      <Text style={styles.title}>Bình luận</Text>
      {listComment.map((comment) => (
        <React.Fragment key={comment.id}>
          <Comment key={comment.id} comment={comment} />
          {comment.subcomments ? (
            comment.subcomments.map((reply) => (
              <View style={styles.reply}>
                <Comment key={reply.id} comment={reply} />
              </View>
            ))
          ) : (
            <View style={styles.reply}></View>
          )}
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
