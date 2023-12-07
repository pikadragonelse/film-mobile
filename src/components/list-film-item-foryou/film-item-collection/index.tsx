import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CheckBox, Image } from "@rneui/themed";
import { FilmItemForyouType } from "../../../page/personal/history";
import Colors from "../../../constants/Colors";

type FilmItemCollectionProps = {
  data: FilmItemForyouType;
  isEditing: boolean;
  isSelected: boolean;
  toggleItemSelection: () => void;
};

export const FilmItemCollection = ({
  data,
  isEditing,
  isSelected,
  toggleItemSelection,
}: FilmItemCollectionProps) => {
  return (
    <ScrollView style={stylesColection.containerItemForyou}>
      <View style={stylesColection.ctnItem}>
        <View style={stylesColection.poster}>
          <Image
            source={{
              uri: data.posterURL,
            }}
            style={stylesColection.posterimg}
          />
          {/* {data.duration ? (
            <Text style={stylesColection.duration}>{data.duration}</Text>
          ) : (
            <Text></Text>
          )} */}
        </View>
        <View style={stylesColection.Txt}>
          <Text style={stylesColection.nameFilm}>{data.title}</Text>

          <View style={stylesColection.ctnsubtxt}>
            {data.status && (
              <Text style={stylesColection.subtxt}>
                Xem đến tập {data.status}
              </Text>
            )}
            {/* {data.episode && (
              <Text style={stylesColection.subtxt}>
                Cập nhật đến tập {data.episode}
              </Text>
            )} */}
          </View>
        </View>
        <View style={stylesColection.checkbox}>
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

const stylesColection = StyleSheet.create({
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
    width: "35%",
  },
  posterimg: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  Txt: {
    width: "100%",
  },
  duration: {
    position: "absolute",
    // width: "100%",
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
  ctnsubtxt: {
    position: "absolute",
    left: 0,
    bottom: 5,
  },
  subtxt: {
    color: "gray",
    paddingLeft: 8,
    fontSize: 12,
    display: "flex",
    flexDirection: "row",
  },
  checkbox: {
    position: "absolute",
    top: 12,
    right: -20,
  },
});
