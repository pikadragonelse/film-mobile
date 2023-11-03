import { ScrollView } from "@nandorojo/anchor";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Tab, TabView } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RootStackParamList } from "../../../App";
import { FilmItemSearch } from "../../components/film-item-search";
import { GenreCardRank } from "../../components/genre-card-rank";
import { Header } from "../../components/header";
import { ListItemSearch } from "../../components/list-film-item-search";
import { TabParamList } from "../../components/tab-navigator";
import Colors from "../../constants/Colors";

type RankProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
const rankMonth: FilmItemSearch[] = [
  {
    id: 1,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: true,
  },
  {
    id: 2,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: false,
  },
  {
    id: 3,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: false,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    // episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: false,
  },
  {
    id: 4,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: true,
  },
  {
    id: 5,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: true,
  },
];
const rankWeek: FilmItemSearch[] = [
  {
    id: 1,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: true,
  },
  {
    id: 2,
    poster:
      "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
    isSeries: true,
    yearOfManufacture: 2022,
    category: ["Hành động"],
    episode: 10,
    evaluate: 7.8,
    nation: "Trung Quốc",
    desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
    name: "Vân Chi Vũ",
    vip: false,
  },
];

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
  const tabContents = [
    <View>
      <ListItemSearch listFilms={rankMonth} />
    </View>,
    <View>
      <ListItemSearch listFilms={rankWeek} />
    </View>,
  ];
  return (
    <View style={styles.containerRank}>
      <Header navigation={navigation} route={route} />
      <Tab
        value={activeTab}
        onChange={handleChangeTab}
        dense
        indicatorStyle={{
          backgroundColor: Colors.ACTIVE,
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
    padding: 16,
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
    backgroundColor: "#191919",
    zIndex: 999,
  },
  genreListContainer: {
    backgroundColor: "#191919",
    paddingVertical: 10,
    marginBottom: 20,
    marginLeft: -12,
    zIndex: 999,
  },
  listRank: {
    marginTop: -80,
  },
});
