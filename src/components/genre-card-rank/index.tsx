import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("screen");

const setWidth = (w: number) => (width / 100) * w;

interface GenreCardProps {
  genreName: string;
  active: boolean;
  onPress: (genre: string) => void;
}

export const GenreCardRank: React.FC<GenreCardProps> = ({
  genreName,
  active,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? "#1f1f1f" : "transparent",
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}
    >
      <Text
        style={{
          ...styles.genreText,
          color: active ? Colors.ACTIVE : Colors.WHITE,
        }}
      >
        {genreName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    color: Colors.ACTIVE,
  },
});
