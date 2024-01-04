import { ScrollView } from "@nandorojo/anchor";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Tab } from "@rneui/base";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../../App";
import { FilmItemSearch } from "../../components/film-item-search";
import { GenreCardRank } from "../../components/genre-card-rank";
import { Header } from "../../components/header";
import { ListItemSearch } from "../../components/list-film-item-search";
import { TabParamList } from "../../components/tab-navigator";
import Colors from "../../constants/Colors";
import { request } from "../../utils/request";

type RankProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const Rank = ({ navigation, route }: RankProps) => {
  const tabs = ["Tháng", "Tuần"];
  const [activeTab, setActiveTab] = React.useState(0);
  const handleChangeTab = (newvalue: number) => {
    setActiveTab(newvalue);
  };
  const [activeGenre, setActiveGenre] = useState("Tất cả");

  const genresData = [
    { id: 1, name: "Tất cả" },
    { id: 2, name: "Hành động" },
    { id: 3, name: "Hài hước" },
    { id: 4, name: "Tình cảm" },
    { id: 5, name: "Kinh dị" },
  ];

  const [dataRankMonth, setdataRankMonth] = useState<FilmItemSearch[]>([]);
  const [dataRankWeek, setdataRankWeek] = useState<FilmItemSearch[]>([]);
  const fetchdataMonth = async () => {
    try {
      const response = await request.get(
        "movies?page=1&pageSize=32&sort=highFavorited&sortBy=DESC"
      );
      const data = response.data;
      setdataRankMonth(data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchdataWeek = async () => {
    try {
      const response = await request.get(
        "movies?page=1&pageSize=8&sort=highRated&sortBy=DESC"
      );
      const data = response.data;
      setdataRankWeek(data.movies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchdataMonth();
    fetchdataWeek();
  }, []);
  const tabContents = [
    <View>
      <ListItemSearch
        listFilms={dataRankMonth}
        navigation={navigation}
        route={route}
      />
    </View>,
    <View>
      <ListItemSearch
        listFilms={dataRankWeek}
        navigation={navigation}
        route={route}
      />
    </View>,
  ];
  return (
    <View style={styles.containerRank}>
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
        {tabs.map((tab, index) => (
          <Tab.Item key={index} variant="default">
            <Text
              style={
                activeTab === index ? styles.activeTabItem : styles.tabItem
              }
            >
              {tab}
            </Text>
          </Tab.Item>
        ))}
      </Tab>

      <View style={styles.genreListContainer}>
        <FlatList
          data={genresData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <GenreCardRank
              genreName={item.name}
              active={item.name === activeGenre}
              onPress={() => setActiveGenre(item.name)}
            />
          )}
        />
      </View>
      <ScrollView style={styles.listRank}>{tabContents[activeTab]}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRank: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 0,
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
  genreListContainer: {
    backgroundColor: "#191919",
    paddingVertical: 10,
    marginLeft: -12,
    zIndex: 999,
  },
  listRank: {
    marginTop: -50,
  },
});
