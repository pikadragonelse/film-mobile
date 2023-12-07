import { Ionicons } from "@expo/vector-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Colors from "../../constants/Colors";
import { Film } from "../model/film";
import { request } from "../../utils/request";

const { width } = Dimensions.get("window");

export const Slide = () => {
  const [popularMovies, setPopularMovies] = useState<Film[]>([]);

  const fetchTrending = async () => {
    try {
      const response = await request.get("movies");
      const data = response.data;
      setPopularMovies(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <View>
      <Carousel
        data={popularMovies}
        renderItem={({ item }: { item: Film }) => (
          <View>
            <TouchableOpacity onPress={() => {}} key={item.movieId}>
              <View style={{ position: "relative" }}>
                <Image
                  source={{
                    uri: item.posterURL,
                  }}
                  style={styles.main}
                />
                <FontAwesomeIcon
                  style={styles.heartIcon}
                  icon={faHeart}
                  size={25}
                />
                <TouchableOpacity style={styles.buttonPlay}>
                  <FontAwesomeIcon icon={faPlay} style={{ color: "white" }} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.titleMovie}
            >
              {item.title}
            </Text>
            <View style={styles.voteAccount}>
              <Text style={{ color: "#ccc", fontSize: 11.5 }}>
                {item.nation} | (U)
              </Text>
              <Text style={{ color: "#ccc", fontSize: 11 }}>
                <Ionicons
                  name="heart"
                  style={styles.heartActiveIcon}
                  size={15}
                />
                {(Number(item.averageRating) * 10).toFixed(1)}%
              </Text>
            </View>
          </View>
        )}
        containerCustomStyle={{ overflow: "visible" }}
        sliderWidth={width}
        itemWidth={width * 0.65}
        loop={true}
        firstItem={1}
        autoplay={true}
        autoplayInterval={8000}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: "105%",
    height: 340,
    borderRadius: 12,
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 10,
    marginTop: 10,
  },

  containButton: {
    alignItems: "center",
    flexDirection: "row",
  },
  titleMovie: {
    color: Colors.WHITE,
    fontSize: 13,
    marginTop: -15,
  },

  buttonAdd: {
    marginRight: 34,
    marginLeft: 10,
  },

  buttonPlay: {
    position: "absolute",
    top: "81%",
    left: "84%",
    padding: 10,
    backgroundColor: Colors.ACTIVE,
    borderRadius: 10000,
  },
  buttonIcon: {
    color: "white",
    marginLeft: 12,
  },
  voteAccount: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  heartIcon: {
    color: Colors.WHITE,
    bottom: "10%",
    left: "5%",
    opacity: 0.9,
  },
  heartActiveIcon: {
    color: Colors.HEART,
  },
});
