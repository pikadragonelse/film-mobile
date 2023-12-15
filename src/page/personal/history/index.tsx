import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { request } from "../../../utils/request";
import { getToken } from "../../auth";
import { CompositeScreenProps } from "@react-navigation/native";
import { TabParamList } from "../../../components/tab-navigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type HistoryScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
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
  movieId?: number;
}

export const HistoryList = ({ navigation, route }: HistoryScreenProp) => {
  const [dataHistorymovies, setDataHistorymovies] = useState<
    FilmItemForyouType[]
  >([]);
  const fetchDataHistorymovies = async () => {
    const accessToken = await getToken();
    try {
      const response = await request.get(
        "user/get-movie-history-list?page=1&pageSize=1",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data.ListMovie;
      setDataHistorymovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataHistorymovies();
  }, []);
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
      <ListFilmItemFouyou
        title="Chọn để tiếp tục xem"
        dataList={dataHistorymovies}
        isEditing={isEditing}
        navigation={navigation}
        route={route}
      />
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
