import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../../../App";
import { ListFilmItemFouyou } from "../../../components/list-film-item-foryou";
import { TabParamList } from "../../../components/tab-navigator";
import { RootState } from "../../../redux/store";
import { request } from "../../../utils/request";
import { getToken } from "../../auth";
import { FilmItemForyouType } from "../history";

export type CollectionScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const Collection = ({ navigation, route }: CollectionScreenProp) => {
  const isUserLogged = useSelector((state: RootState) => state.user.isLogin);

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
      {isUserLogged ? (
        <View>
          <SafeAreaView>
            <View style={stylesCollection.containerHeaderForyou}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={stylesCollection.backIcon}
                  size={25}
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
          <ListFilmItemFouyou
            dataList={dataCollection}
            isEditing={isEditing}
            navigation={navigation}
            route={route}
          />
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "white",
              paddingTop: 50,
              paddingLeft: 40,
            }}
          >
            Đăng nhập để có những trải nghiệm tốt nhất từ MovTime.
          </Text>
        </TouchableOpacity>
      )}
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
