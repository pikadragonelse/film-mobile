import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { FilmItem } from "../../components/film-item";
import { GenreCard } from "../../components/genre-card";
import { Header } from "../../components/header";
import { ItemSeparator } from "../../components/item-separator";
import { Film } from "../../components/model/film";
import { Slide } from "../../components/slide";
import { TabParamList } from "../../components/tab-navigator";
import { request } from "../../utils/request";

type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const Home = ({ navigation, route }: HomeScreenProp) => {
  const [activeGenre, setActiveGenre] = useState("Tất cả");

  const genresData = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hành động" },
    { id: 3, name: "Hài hước" },
    { id: 4, name: "Lãng mạng" },
    { id: 5, name: "Ngôn tình" },
    { id: 6, name: "Hình sự" },
  ];
  const image = {
    uri: "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  };
  //gọi api
  const [trendingData, setTrendingData] = useState<Film[]>([]);
  const fetchTrending = async () => {
    try {
      const response = await request.get("movies/home/trending");
      const data = response.data;
      setTrendingData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <View>
        {/* <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          blurRadius={50}
        > */}
        <Header navigation={navigation} route={route} />
        <View style={styles.genreListContainer}>
          <FlatList
            data={genresData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <ItemSeparator width={20} />}
            ListHeaderComponent={() => <ItemSeparator width={20} />}
            ListFooterComponent={() => <ItemSeparator width={20} />}
            renderItem={({ item }) => (
              <GenreCard
                genreName={item.name}
                active={item.name === activeGenre}
                onPress={() => setActiveGenre(item.name)}
              />
            )}
          />
        </View>
        <Slide />
        {/* </ImageBackground> */}
      </View>
      <FilmItem
        title="Phim hot"
        dataRCM={trendingData}
        navigation={navigation}
        route={route}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },

  genreListContainer: {
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: -12,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  linear: {
    position: "absolute",
    bottom: 0,
  },
});
