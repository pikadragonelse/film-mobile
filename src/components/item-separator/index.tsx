import React from "react";
import { View, ViewStyle } from "react-native";

interface ItemSeparatorProps {
  height?: number;
  width?: number;
}

export const ItemSeparator: React.FC<ItemSeparatorProps> = ({
  height = 0,
  width = 0,
}) => {
  return <View style={{ width, height }} />;
};
