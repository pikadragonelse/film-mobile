import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Image } from "@rneui/themed";
import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import Colors from "../../constants/Colors";
import { Film } from "../model/film";
import { TabParamList } from "../tab-navigator";

const { width, height } = Dimensions.get("window");

type IndexProps = {
  title?: string;
  data: Array<Film>;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const FilmPopularityList = ({
  title,
  data,
  navigation,
  route,
}: IndexProps) => {
  return (
    <View style={styleFilm.sectionContainer}>
      <View style={styleFilm.sectionTitle}>
        <Text style={styleFilm.sectionName}> {title}</Text>
        <TouchableOpacity>
          <FontAwesomeIcon color="white" icon={faAngleRight} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styleFilm.rcmContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.movieId}
              onPress={() => {
                navigation.navigate("Watching", {
                  movieId: item.movieId,
                });
              }}
            >
              <View style={styleFilm.rcmFilmItem}>
                <Image
                  source={{
                    uri: item.posterURL,
                  }}
                  style={styleFilm.rcmFilmImageContainer}
                />

                <Text style={styleFilm.rcmFilmTop}>{`TOP ${index + 1}`}</Text>
                {item.level === 1 ? (
                  <View style={styleFilm.rcmFilmSub}>
                    <Text style={styleFilm.rcmFilmSubTitle}>VIP</Text>
                  </View>
                ) : (
                  ""
                )}
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styleFilm.rcmFilmName}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export const styleFilm = StyleSheet.create({
  sectionContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },

  sectionTitle: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  rcmContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },

  rcmFilmItem: {
    position: "relative",
    width: width / 2 - 24,
    marginBottom: 10,
    marginRight: 8,
  },

  rcmFilmImageContainer: {
    width: "100%",
    height: 240,
    borderRadius: 5,
    margin: "auto",
    resizeMode: "cover",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },

  rcmFilmTop: {
    position: "absolute",
    color: Colors.WHITE,
    fontSize: 20,
    bottom: "20%",
    left: "6%",
    fontWeight: "bold",
  },

  rcmFilmSub: {
    position: "absolute",
    left: "72%",
    borderTopRightRadius: 5,
    width: width / 8 - 2,
    height: height / 46,
    backgroundColor: Colors.ACTIVE,
    borderBottomLeftRadius: 5,
  },

  rcmFilmSubTitle: {
    color: Colors.WHITE,
    fontSize: 10,
    textAlign: "center",
    marginTop: 1,
  },

  rcmFilmName: {
    position: "absolute",
    bottom: "5%",
    left: "6%",
    color: Colors.WHITE,
    fontSize: 12,
    marginTop: 5,
  },
});

export default FilmPopularityList;
