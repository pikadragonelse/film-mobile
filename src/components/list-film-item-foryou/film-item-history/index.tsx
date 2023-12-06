import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Image, CheckBox } from "@rneui/themed";
import { FilmItemForyouType } from "../../../page/personal/history";
import Colors from "../../../constants/Colors";

type FilmItemHistoryProps = {
  data: FilmItemForyouType;
  isEditing: boolean;
  isSelected: boolean;
  toggleItemSelection: () => void;
  title: string;
};

export const FilmItemHistory = ({
  data,
  isEditing,
  isSelected,
  toggleItemSelection,
  title,
}: FilmItemHistoryProps) => {
  console.log(title);
  return (
    <ScrollView style={stylesForyou.containerItemForyou}>
      <View style={stylesForyou.ctnItem}>
        <View style={stylesForyou.poster}>
          <Image
            source={{
              uri: data.posterURL,
            }}
            style={stylesForyou.posterimg}
          />
          <Text style={stylesForyou.duration}></Text>
          {/* <Text style={stylesForyou.duration}>{data.duration}</Text> */}
        </View>
        <View style={stylesForyou.content}>
          <Text
            style={stylesForyou.nameFilm}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {/* {data.title} tập {data.episodeNum} */}
            {title}
          </Text>
          {/* <Text style={stylesForyou.nameFilm}>
            {data.category.map((cate) => cate.concat(", ")) || [""]}
          </Text> */}
          {data.status && (
            <Text style={stylesForyou.subtxt}> Đã xem {data.status}%</Text>
          )}
        </View>
        <View style={stylesForyou.checkbox}>
          {isEditing && (
            <CheckBox
              checked={isSelected}
              onPress={toggleItemSelection}
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
              uncheckedIcon="checkbox-blank-circle-outline"
              checkedColor={Colors.ACTIVE}
              uncheckedColor="gray"
              size={24}
              containerStyle={{
                backgroundColor: "transparent",
              }}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const stylesForyou = StyleSheet.create({
  containerItemForyou: {
    margin: 12,
    marginBottom: 5,
  },
  ctnItem: {
    width: "100%",
    height: 80,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
  },
  poster: {
    flex: 1.1,
  },
  content: {
    flex: 2,
  },
  posterimg: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  duration: {
    position: "absolute",
    bottom: 2,
    left: 2,
    color: Colors.WHITE,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 1,
    borderRadius: 3,
    fontSize: 12,
  },
  nameFilm: {
    padding: 5,
    paddingLeft: 8,
    color: Colors.WHITE,
    fontSize: 14,
  },
  subtxt: {
    color: "gray",
    paddingLeft: 8,
    fontSize: 12,
    position: "absolute",
    bottom: 5,
    left: 0,
  },
  checkbox: {
    position: "absolute",
    top: 12,
    right: -20,
  },
});
