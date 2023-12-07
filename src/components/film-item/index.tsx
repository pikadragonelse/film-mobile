import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import Colors from "../../constants/Colors";
import { Film } from "../model/film";
import { TabParamList } from "../tab-navigator";

type IndexProps = {
  title?: string;
  dataRCM: Array<Film>;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

const { width, height } = Dimensions.get("window");

export const FilmItem = ({ title, dataRCM, navigation, route }: IndexProps) => {
  const [showAllFilms, setShowAllFilms] = useState(false);
  const toggleShowAllFilms = () => {
    setShowAllFilms(!showAllFilms);
  };

  return (
    <View style={styleFilm.sectionContainer}>
      <Text style={styleFilm.sectionTitle}>
        <Text> {title}</Text>
      </Text>

      <View style={styleFilm.rcmContainer}>
        {dataRCM.slice(0, showAllFilms ? dataRCM.length : 6).map((item) => (
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
              <View style={styleFilm.rcmFilmSub}>
                <Text style={styleFilm.rcmFilmSubTitle}>
                  {item.isSingle === true
                    ? "Phim lẻ"
                    : `${item.episodeNum} tập`}
                </Text>
              </View>
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
      {dataRCM.length > 9 && (
        <TouchableOpacity
          onPress={toggleShowAllFilms}
          style={styleFilm.buttonMore}
        >
          <FontAwesomeIcon
            style={styleFilm.buttonMoreIcon}
            icon={showAllFilms ? faChevronUp : faChevronDown}
            size={10}
          />
          <Text style={styleFilm.buttonMoreText}>
            {showAllFilms ? "Ẩn đi" : "Khác"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const styleFilm = StyleSheet.create({
  sectionContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },

  sectionTitle: {
    color: "white",
    fontSize: 15,
    marginBottom: 8,
  },

  rcmContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
  },

  rcmFilmItem: {
    position: "relative",
    width: width / 3 - 12,
    marginBottom: 10,
  },

  rcmFilmImageContainer: {
    width: "100%",
    height: 140,
    borderRadius: 5,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },

  rcmFilmSub: {
    position: "absolute",
    left: "61%",
    borderTopRightRadius: 5,
    width: width / 8 - 2,
    height: height / 46,
    backgroundColor: Colors.ACTIVE,
  },

  rcmFilmSubTitle: {
    color: Colors.WHITE,
    fontSize: 10,
    textAlign: "center",
    marginTop: 1,
  },

  rcmFilmName: {
    color: Colors.GRAY,
    fontSize: 12,
    marginTop: 5,
  },

  buttonMore: {
    position: "relative",
    width: "100%",
    backgroundColor: "#333333",
    paddingVertical: 9,
    borderRadius: 5,
    marginTop: 4,
  },

  buttonMoreIcon: {
    position: "absolute",
    top: "70%",
    left: "41%",
    color: "#a1a1a1",
  },

  buttonMoreText: {
    color: "#a1a1a1",
    textAlign: "center",
  },
});
