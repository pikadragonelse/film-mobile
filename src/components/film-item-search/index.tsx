import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { ScrollView } from "@nandorojo/anchor";

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
};

export const FilmItemSearch = ({ data }: FilmItemSearchProps) => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.containerItemSearch}>
      <View style={styles.containerItem}>
        <View style={styles.posterItem}>
          <Image source={{ uri: data.poster }} style={styles.poster} />
          <Text style={styles.filmSub}>
            {data.vip === true ? (
              "VIP"
            ) : (
              <Text>
                {data.isSeries === true ? `${data.episode} tập` : "Phim lẻ"}
              </Text>
            )}
          </Text>
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
            {data.yearOfManufacture} | {data.nation} |{data.category.join(", ")}
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
                      scrollToSection: "detailDesc",
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
                height: 35,
                alignItems: "center",
              }}
              titleStyle={{
                color: "white",
                fontSize: 14,
                marginTop: -1,
              }}
              onPress={() => {
                navigation.navigate("Watching", { filmId: data.id });
              }}
            >
              <FontAwesomeIcon
                icon={faPlay}
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
    height: 180,
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "row",
  },
  posterItem: {
    flex: 3.6,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  content: {
    flex: 6,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 19,
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
  },
  info: {
    color: "silver",
    fontSize: 14,
  },
  desc: {
    color: "silver",
    lineHeight: 20,
    fontSize: 14,
    marginTop: 10,
  },
  button: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  readMore: {
    color: "#5983FF",
    fontSize: 13,
  },
  filmSub: {
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 12,
    height: 20,
    color: Colors.WHITE,
    textAlign: "center",
    alignItems: "center",
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    width: "40%",
    backgroundColor: "#cf1a1a",
  },
});
