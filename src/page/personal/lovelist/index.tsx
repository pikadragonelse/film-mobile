import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../../../../App";
import { ListFilmItemFouyou } from "../../../components/list-film-item-foryou";
import { FilmItemForyouType } from "../history";

export type LovelistScreenProp = StackScreenProps<RootStackParamList>;
const dataLovelist: FilmItemForyouType[] = [
  {
    id: 1,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    category: ["Hành động", "Tình cảm"],
    episode: 1,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 1,
  },
  {
    id: 2,
    poster:
      "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    category: ["Hành động"],
    episode: 4,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
  {
    id: 3,
    poster:
      "https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
  {
    id: 4,
    poster:
      "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 14,
  },
  {
    id: 5,
    poster:
      "https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 24,
  },
  {
    id: 11,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    category: ["Hành động", "Tình cảm"],
    episode: 1,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 1,
  },
  {
    id: 12,
    poster:
      "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    category: ["Hành động"],
    episode: 4,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
  {
    id: 13,
    poster:
      "https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
  {
    id: 14,
    poster:
      "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 14,
  },
  {
    id: 15,
    poster:
      "https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 24,
  },
  {
    id: 22,
    poster:
      "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    category: ["Hành động"],
    episode: 4,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
  {
    id: 23,
    poster:
      "https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
    category: ["Hành động"],
    episode: 10,
    nation: "Trung Quốc",
    name: "Vân Chi Vũ",
    status: 4,
  },
];

export const Lovelist = ({ navigation, route }: LovelistScreenProp) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <View>
      <SafeAreaView>
        <View style={stylesLovelist.containerHeaderForyou}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={stylesLovelist.backIcon}
              size={25}
            />
          </TouchableOpacity>
          <View style={stylesLovelist.subHeaderForyou}>
            <Text style={stylesLovelist.titleText}>Phim yêu thích </Text>
            <TouchableOpacity onPress={toggleEditing}>
              <Text style={stylesLovelist.subTitle}>
                {isEditing ? "Hủy bỏ" : "Chỉnh sửa"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ListFilmItemFouyou dataList={dataLovelist} isEditing={isEditing} />
    </View>
  );
};
const stylesLovelist = StyleSheet.create({
  containerHeaderForyou: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 5,
    paddingBottom: 8,
    borderBottomColor: "#8686861f",
    borderBottomWidth: 1,
    zIndex: 999,
  },
  backIcon: {
    color: "silver",
  },
  subHeaderForyou: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  titleText: {
    color: "silver",
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    color: "silver",
  },
});
