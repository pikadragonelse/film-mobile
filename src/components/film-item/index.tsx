import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import Colors from "../../constants/Colors";
interface RcmFilm {
  id: number;
  image: string;
  isSingle: boolean;
  episode: number;
  name: string;
}

// interface IndexProps {
//   item: RcmFilm;
// }
const { width, height } = Dimensions.get("window");

const dataRCM: RcmFilm[] = [
  {
    id: 1,
    image:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSingle: true,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 2,
    image:
      "https://image.tmdb.org/t/p/original/oE7xtGDqZnr7tFHfwb8oM9iRW6H.jpg",
    isSingle: true,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
    isSingle: false,
    episode: 30,
    name: "Vân Chi Vũ",
  },
  {
    id: 4,
    image: "https://image.tmdb.org/t/p/original/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    isSingle: false,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 5,
    image:
      "https://image.tmdb.org/t/p/original/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    isSingle: true,
    episode: 15,
    name: "Vân Chi Vũ",
  },
  {
    id: 6,
    image:
      "https://image.tmdb.org/t/p/original/1eKWqTHp4OgKdx1QX1O9LxKHr1M.jpg",
    isSingle: false,
    episode: 15,
    name: "Vân Chi Vũ",
  },
  {
    id: 7,
    image:
      "https://image.tmdb.org/t/p/original/A4j8S6moJS2zNtRR8oWF08gRnL5.jpg",
    isSingle: true,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 8,
    image:
      "https://image.tmdb.org/t/p/original/1eKWqTHp4OgKdx1QX1O9LxKHr1M.jpg",
    isSingle: true,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 9,
    image: "https://image.tmdb.org/t/p/original/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    isSingle: false,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 10,
    image:
      "https://image.tmdb.org/t/p/original/qA5kPYZA7FkVvqcEfJRoOy4kpHg.jpg",
    isSingle: false,
    episode: 20,
    name: "Vân Chi Vũ",
  },
  {
    id: 11,
    image: "https://image.tmdb.org/t/p/original/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    isSingle: false,
    episode: 10,
    name: "Vân Chi Vũ",
  },
  {
    id: 12,
    image:
      "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    isSingle: false,
    episode: 20,
    name: "Vân Chi Vũ",
  },
];
export const FilmItem = () => {
  const [showAllFilms, setShowAllFilms] = useState(false);

  const toggleShowAllFilms = () => {
    setShowAllFilms(!showAllFilms);
  };

  return (
    <View style={styleFilm.sectionContainer}>
      <Text style={styleFilm.sectionTitle}>
        <Text> Phim đề xuất</Text>
      </Text>

      <View style={styleFilm.rcmContainer}>
        {dataRCM
          .slice(0, showAllFilms ? dataRCM.length : 9)
          .map((item, index) => (
            <TouchableOpacity key={item.id}>
              <View style={styleFilm.rcmFilmItem}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styleFilm.rcmFilmImageContainer}
                />
                <View style={styleFilm.rcmFilmSub}>
                  <Text style={styleFilm.rcmFilmSubTitle}>
                    {item.isSingle === true ? "Phim lẻ" : `${item.episode} tập`}
                  </Text>
                </View>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styleFilm.rcmFilmName}
                >
                  {item.name}
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
    height: height / 48,
    backgroundColor: Colors.ACTIVE,
  },

  rcmFilmSubTitle: {
    color: Colors.WHITE,
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
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
