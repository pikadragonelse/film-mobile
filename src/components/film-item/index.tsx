import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Image } from "@rneui/themed";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../page/watching/style";
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
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        <Text> Phim đề xuất</Text>
      </Text>

      <View style={styles.rcmContainer}>
        {dataRCM
          .slice(0, showAllFilms ? dataRCM.length : 9)
          .map((item, index) => (
            <TouchableOpacity key={item.id}>
              <View style={styles.rcmFilmItem}>
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={styles.rcmFilmImageContainer}
                />
                <Text style={styles.rcmFilmSub}>
                  {item.isSingle === true ? "Phim lẻ" : `${item.episode} tập`}
                </Text>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.rcmFilmName}
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
          style={styles.buttonMore}
        >
          <FontAwesomeIcon
            style={styles.buttonMoreIcon}
            icon={showAllFilms ? faChevronUp : faChevronDown}
            size={10}
          />
          <Text style={styles.buttonMoreText}>
            {showAllFilms ? "Ẩn đi" : "Khác"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
