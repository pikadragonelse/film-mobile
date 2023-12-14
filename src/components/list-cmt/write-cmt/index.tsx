import { Avatar } from "@rneui/base";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { Button } from "@rneui/themed";
import { styles } from "../../../page/watching/style";
import Colors from "../../../constants/Colors";

interface CurrentUser {
  username: string;
  email: string;
  avatarURL: string;
}
interface WriteCommentProps {
  currentUser: CurrentUser;
  placeholder: string;
  onSubmitComment?: (comment: string) => void;
  onCancel?: () => void;
}
export const WriteCmt = ({
  currentUser,
  placeholder,
  onSubmitComment,
}: WriteCommentProps) => {
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    if (onSubmitComment && comment.trim() !== "") {
      onSubmitComment(comment);
      setComment("");
    }
    setComment("");
  };
  return (
    <View style={styles.postCmt}>
      <Avatar
        rounded
        size={40}
        source={{ uri: currentUser.avatarURL }}
        avatarStyle={{ paddingTop: 5 }}
      />
      <TextInput
        placeholder={placeholder}
        value={comment}
        onChangeText={(text) => setComment(text)}
        style={styles.postText}
      />

      <Button
        buttonStyle={{
          backgroundColor: "transparent",
          alignItems: "center",
        }}
        titleStyle={{
          color: Colors.ACTIVE,
        }}
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </View>
  );
};
