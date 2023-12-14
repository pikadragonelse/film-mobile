import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RootStackParamList } from "../../../../App";
import { ListFilmItemFouyou } from "../../../components/list-film-item-foryou";
import { request } from "../../../utils/request";
import { getToken } from "../../auth";
import { FilmItemForyouType } from "../history";

export type CollectionScreenProp = StackScreenProps<RootStackParamList>;

export const Collection = ({ navigation, route }: CollectionScreenProp) => {
  const [dataCollection, setDataCollection] = useState<FilmItemForyouType[]>(
    []
  );
  useEffect(() => {
    const fetchDataLove = async () => {
      try {
        const accessToken = await getToken();
        if (accessToken) {
          const response = await request.get(
            "user/get-watch-movie-list?page=1&pageSize=12",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = response.data.data.ListMovie;
          setDataCollection(data);
        } else {
          console.log("AccessToken is null. Handle accordingly.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataLove();
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  return (
    <View>
      <SafeAreaView>
        <View style={stylesCollection.containerHeaderForyou}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={stylesCollection.backIcon}
              size={20}
            />
          </TouchableOpacity>
          <View style={stylesCollection.subHeaderForyou}>
            <Text style={stylesCollection.titleText}>Bộ sưu tập </Text>
            <TouchableOpacity onPress={toggleEditing}>
              <Text style={stylesCollection.subTitle}>
                {isEditing ? "Hủy bỏ" : "Chỉnh sửa"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ListFilmItemFouyou dataList={dataCollection} isEditing={isEditing} />
    </View>
  );
};
const stylesCollection = StyleSheet.create({
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
