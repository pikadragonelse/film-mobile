import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
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
import { ActorPopular } from "../../components/actor-popular-home";
import FilmListHome from "../../components/film-home-list";
import { CompositeScreenProps } from "@react-navigation/native";
import FilmPopularityList from "../../components/film-trending";

type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const Home: React.FC<HomeScreenProp> = ({ navigation, route }) => {
  const [activeGenre, setActiveGenre] = useState("Tất cả");

  const genresData = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hành động" },
    { id: 3, name: "Hài hước" },
    { id: 4, name: "Lãng mạng" },
    { id: 5, name: "Ngôn tình" },
    { id: 6, name: "Hình sự" },
    { id: 7, name: "Tâm lý" },
    { id: 8, name: "Tiên hiệp" },
  ];

  const image = {
    uri: "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  };

  const [filterData, setFilterData] = useState<Film[]>([]);
  const [trendingData, setTrendingData] = useState<Film[]>([]);
  const [vipData, setVipData] = useState<Film[]>([]);

  const fetchData = async () => {
    try {
      const [trendingResponse, vipResponse, filterResponse] = await Promise.all(
        [
          request.get("movies/home/trending"),
          request.get("movies/home/vip"),
          request.get("movies?page=1&pageSize=100"),
        ]
      );

      setTrendingData(trendingResponse.data);
      setVipData(vipResponse.data);
      setFilterData(filterResponse.data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <View>
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
        <Slide data={trendingData} navigation={navigation} route={route} />
      </View>

      <ScrollView style={styles.drived}>
        <FilmItem
          title="Phim thịnh hành"
          data={trendingData}
          navigation={navigation}
          route={route}
        />
        <FilmItem
          title="Phim VIP"
          data={vipData}
          navigation={navigation}
          route={route}
        />

        <FilmPopularityList
          title="Phổ biến nhất"
          data={vipData}
          navigation={navigation}
          route={route}
        />

        <ActorPopular
          title="Diễn viên nổi tiếng"
          navigation={navigation}
          route={route}
        />

        {[
          "Tình cảm",
          "Tiên hiệp",
          "Cổ trang",
          "Tâm lý",
          "Hành động",
          "Hài kịch",
          "Khoa học viễn tưởng",
          "Kinh dị",
          "Phiêu lưu",
          "Hoạt hình",
          "Tội phạm",
          "Lãng mạn",
          "Thần thoại",
          "Tiểu thuyết chuyển thế",
          "Võ thuật",
          "Thanh Xuân",
          "Bí ẩn",
          "Gia đình",
          "Chính trị",
          "Kỳ ảo",
          "Học Đường",
          "Hài hước",
          "Tình bạn",
        ].map((genre) => (
          <FilmListHome
            key={genre}
            title={`Phim ${genre}`}
            data={filterData.filter((film) =>
              film.genres.some((g) => g.name === genre)
            )}
            navigation={navigation}
            route={route}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    flex: 1,
  },
  genreListContainer: {
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: -12,
  },
  drived: {
    marginTop: 10,
  },
});
