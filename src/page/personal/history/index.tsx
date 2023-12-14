import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../../../../App";
import { ListFilmItemFouyou } from "../../../components/list-film-item-foryou";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export type HistoryScreenProp = StackScreenProps<RootStackParamList>;
export interface FilmItemForyouType {
  id: number;
  title: string;
  posterURL: string;
  averageRating: string;
  episodeNum: number;
  numFavorite: number;
  level: number;
  // genres?:Array<genres>
  status?: number;
}
// const dataWeek: FilmItemForyouType[] = [
//   {
//     id: 1,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     category: ["Hành động", "Tình cảm"],
//     episode: 1,
//     nation: "Trung Quốc",
//     name: "Vân Chi VũVân Chi VũVân Chi VũVân Chi VũVân Chi",
//     duration: "47:45",
//     status: 23,
//   },
//   {
//     id: 2,
//     poster:
//       "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
//     category: ["Hành động"],
//     episode: 4,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ Trung Quốc Trung Quốc Trung Quốc",
//     duration: "47:45",
//     status: 100,
//   },
//   {
//     id: 3,
//     poster:
//       "https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
//   {
//     id: 4,
//     poster:
//       "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
//   {
//     id: 5,
//     poster:
//       "https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
//   {
//     id: 11,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     category: ["Hành động", "Tình cảm"],
//     episode: 1,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//     status: 23,
//   },
//   {
//     id: 12,
//     poster:
//       "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
//     category: ["Hành động"],
//     episode: 4,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//     status: 100,
//   },
//   {
//     id: 13,
//     poster:
//       "https://image.tmdb.org/t/p/original/oUmmY7QWWn7OhKlcPOnirHJpP1F.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
//   {
//     id: 14,
//     poster:
//       "https://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
//   {
//     id: 15,
//     poster:
//       "https://image.tmdb.org/t/p/original/c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
//     category: ["Hành động"],
//     episode: 10,
//     nation: "Trung Quốc",
//     name: "Vân Chi Vũ",
//     duration: "47:45",
//   },
// ];
// const dataToday: FilmItemForyouType[] = [];
export const HistoryList = ({ navigation, route }: HistoryScreenProp) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.containerHeaderForyou}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={styles.backIcon}
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.subHeaderForyou}>
            <Text style={styles.titleText}>Lịch sử xem</Text>
            <TouchableOpacity onPress={toggleEditing}>
              <Text style={styles.subTitle}>
                {isEditing ? "Hủy bỏ" : "Chỉnh sửa"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      {/* <ListFilmItemFouyou title="Hôm nay" dataList={dataToday} /> */}
      {/* <ListFilmItemFouyou
        title="Trong 1 tuần"
        dataList={dataWeek}
        isEditing={isEditing}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
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
