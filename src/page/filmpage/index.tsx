import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SectionList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Header } from "../../components/header";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { Button, TabItemProps, TabProps } from "@rneui/base";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../components/tab-navigator";
import { RootStackParamList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import { Tab, TabView, Image } from "@rneui/themed";
import { FilterFilm, Section } from "../../components/filter-film";
import { styles as stylesWatching } from "../watching/style";
import { FilmItem } from "../../components/film-item";
import { request } from "../../utils/request";
import { Film } from "../../components/model/film";
import { ListItemSearch } from "../../components/list-film-item-search";
import { FilmItemSearch } from "../../components/film-item-search";
import Colors from "../../constants/Colors";

type FilmScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

interface Genre {
  genre_id: number;
  name: string;
}
const listOption2 = ["Toàn bộ các loại trả phí", "Miễn phí", "VIP"];

export const FilmPage = ({ navigation, route }: FilmScreenProp) => {
  //api nation
  const [nation, setNation] = useState<string[]>([]);
  const listOption = async () => {
    try {
      const response = await request.get("movies/get/nations");
      const data = response.data;
      setNation(data);
    } catch (error) {
      console.error(error);
    }
  };
  //api genre
  const [genres, setGenres] = useState<Genre[]>([]);

  const listOption1 = async () => {
    try {
      const response = await request.get("genres");
      const genreData = response.data;
      setGenres(genreData.map((genre: Genre) => genre.name));
    } catch (error) {
      console.error(error);
    }
  };

  //api year
  const [year, setYear] = useState<string[]>([]);
  const listOption3 = async () => {
    try {
      const response = await request.get("movies/get/years");
      const data = response.data;
      setYear(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    listOption();
    listOption1();
    listOption3();
  }, []);
  const sections: Section[] = [
    { index: 0, title: "Hello", data: [nation] },
    {
      index: 1,
      title: "Hello",
      data: [genres],
    },
    { index: 2, title: "Hello", data: [listOption2] },
    { index: 3, title: "Hello", data: [year] },
  ];

  const [index, setIndex] = useState(0);
  const [activeNation, setActiveNation] = useState<number>(0);
  const [activeGenre, setActiveGenre] = useState<number>(0);
  const [activeFee, setActiveFee] = useState<number>(0);
  const [activeYear, setActiveYear] = useState<number>(0);
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
  const tabItemList = ["Phim bộ", "Phim lẻ"];
  const [activeTab, setActiveTab] = React.useState(0);
  const handleChangeTab = (newvalue: number) => {
    setActiveTab(newvalue);
  };
  //api lọc
  const [isSeriesMovies, setIsSeriesMovies] = useState<FilmItemSearch[]>([]);
  const [notIsSeriesMovies, setNotIsSeriesMovies] = useState<FilmItemSearch[]>(
    []
  );
  useEffect(() => {
    if (nation.length > 0 && genres.length > 0 && year.length > 0) {
      const isSeries = activeTab === 0;
      const apiParams = {
        nation: nation[activeNation],
        genre: activeGenre + 1,
        year: parseInt(year[activeYear]),
        // fee: activeFee,
      };

      const fetchData = async () => {
        try {
          const response = await request.get("movies", {
            params: { isSeries, ...apiParams },
          });
          const data = response.data.movies;

          if (isSeries) {
            setIsSeriesMovies(data);
          } else {
            setNotIsSeriesMovies(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [activeNation, activeGenre, activeFee, activeYear, activeTab]);

  const tabContents = [
    <View>
      <ListItemSearch
        listFilms={isSeriesMovies}
        navigation={navigation}
        route={route}
      />
    </View>,
    <View>
      <ListItemSearch
        listFilms={notIsSeriesMovies}
        navigation={navigation}
        route={route}
      />
    </View>,
  ];
  return (
    <>
      <Header navigation={navigation} route={route} />
      <Tab
        value={activeTab}
        onChange={handleChangeTab}
        indicatorStyle={{
          width: 100,
          backgroundColor: Colors.ACTIVE,
          left: (Dimensions.get("window").width / 1.8 / 2 - 80) / 2,
        }}
        style={styles.tab}
        titleStyle={{
          color: Colors.ACTIVE,
        }}
      >
        {tabItemList.map((tabItem, index) => (
          <Tab.Item key={index} variant="default">
            <Text
              style={
                activeTab === index ? styles.activeTabItem : styles.tabItem
              }
            >
              {tabItem}
            </Text>
          </Tab.Item>
        ))}
      </Tab>

      <TabView value={index} onChange={setIndex} animationType={undefined}>
        <TabView.Item style={{ width: "100%", height: "100%" }}>
          <ScrollView>
            <FilterFilm
              data={sections}
              activeOption={[activeNation, activeGenre, activeFee, activeYear]}
              setActiveOption={[
                setActiveNation,
                setActiveGenre,
                setActiveFee,
                setActiveYear,
              ]}
            />
            <Text
              style={{
                color: "white",
                marginLeft: 10,
                marginTop: 20,
                fontSize: 15,
              }}
            >
              Kết quả tìm kiếm
            </Text>
            <View style={styles.listRank}>{tabContents[activeTab]}</View>
            <View
              style={{
                ...stylesWatching.rcmContainer,
                marginTop: 20,
              }}
            >
              <FilmItem
                title="Phim hot"
                dataRCM={trendingData}
                navigation={navigation}
                route={route}
              />
            </View>
          </ScrollView>
        </TabView.Item>
      </TabView>
    </>
  );
};

const styles = StyleSheet.create({
  filmContainer: {
    // backgroundColor: "#212121",
    backgroundColor: "transparent",
    paddingBottom: 10,
  },
  activeTabItem: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.ACTIVE,
  },
  tabItem: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  tab: {
    // backgroundColor: "#191919",
    zIndex: 999,
    width: Dimensions.get("window").width / 1.6,
  },
  listRank: {
    marginTop: -50,
    marginBottom: -20,
  },
});
