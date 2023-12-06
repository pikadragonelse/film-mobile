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

export type LovelistScreenProp = StackScreenProps<RootStackParamList>;

export const Lovelist = ({ navigation, route }: LovelistScreenProp) => {
  const [dataLovelist, setDataLovelist] = useState<FilmItemForyouType[]>([]);
  useEffect(() => {
    const fetchDataLove = async () => {
      try {
        const accessToken = await getToken();
        if (accessToken) {
          const response = await request.get(
            "user/get-favorite-movie-list?page=1&pageSize=10",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = response.data.data.ListMovie;
          setDataLovelist(data);
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
