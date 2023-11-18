import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@rneui/base";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { ScrollView } from "@nandorojo/anchor";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../tab-navigator";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

export interface FilmItemSearch {
  id: number;
  poster: string;
  isSeries?: boolean;
  yearOfManufacture: number;
  category: Array<string>;
  episode?: number;
  evaluate: number;
  nation: string;
  desc: string;
  name: string;
  vip: boolean;
}
export type FilmItemSearchProps = {
  data: FilmItemSearch;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
const { width, height } = Dimensions.get("window");

export const FilmItemSearch = ({
  data,
  navigation,
  route,
}: FilmItemSearchProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ScrollView style={styles.containerItemSearch}>
      <View style={styles.containerItem}>
        <View style={styles.posterItem}>
          <Image source={{ uri: data.poster }} style={styles.poster} />
          <View style={styles.filmSub}>
            <Text style={styles.filmSubText}>
              {data.vip === true ? (
                "VIP"
              ) : (
                <Text>
                  {data.isSeries === true ? `${data.episode} tập` : "Phim lẻ"}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.evaluateContent}>
            <FontAwesomeIcon
              style={styles.starIcon}
              icon={faStar}
              color={"#fbbc04"}
            />
            <Text style={styles.evaluate}>{data.evaluate}</Text>
          </View>
          <Text style={styles.info}>
            {data.yearOfManufacture} | {data.nation} |{" "}
            {data.category.join(", ")}
          </Text>
          <Text style={styles.desc}>
            {expanded ? data.desc : data.desc.slice(0, 50)}
            {data.desc.length > 50 && !expanded && (
              <Text>
                ...
                <Text
                  style={styles.readMore}
                  onPress={() => {
                    navigation.navigate("Watching", {
                      filmId: data.id,
                      // scrollToSection: "detailDesc",
                    });
                  }}
                >
                  Xem thêm
                </Text>
              </Text>
            )}
          </Text>
          <View style={styles.button}>
            <Button
              radius={"sm"}
              type="solid"
              buttonStyle={{
                backgroundColor: "#cf1a1a",
                height: 31,
                alignItems: "center",
              }}
              titleStyle={{
                color: "white",
                fontSize: 11,
                marginTop: -1,
              }}
              onPress={() => {
                navigation.navigate("Watching", { filmId: data.id });
              }}
            >
              <FontAwesomeIcon
                icon={faPlay}
                size={15}
                style={{ marginRight: 5, color: "white" }}
              />
              Xem ngay
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerItemSearch: {
    margin: 12,
    position: "relative",
  },
  containerItem: {
    width: "100%",
    height: 150,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
  },
  posterItem: {
    flex: 3,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  content: {
    flex: 6,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  evaluateContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 5,
  },
  evaluate: {
    color: "white",
    fontWeight: "500",
    lineHeight: 30,
    fontSize: 12,
  },
  info: {
    color: "silver",
    fontSize: 12,
  },
  desc: {
    color: "silver",
    lineHeight: 20,
    fontSize: 12,
    marginTop: 6,
  },
  button: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  readMore: {
    color: "#5983FF",
    fontSize: 12,
  },

  filmSub: {
    position: "absolute",
    top: 0,
    right: 0,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "40%",
    backgroundColor: "#cf1a1a",
  },
  filmSubText: {
    color: "white",
    fontSize: 10,
  },
});
