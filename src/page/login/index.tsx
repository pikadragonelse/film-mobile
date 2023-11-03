import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";

export const Login = () => {
  const route = useRoute();
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};
