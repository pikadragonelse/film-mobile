import React from "react";
import { View } from "react-native";
import { HeaderSearch } from "../../components/header-search";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import { ListItemSearch } from "../../components/list-film-item-search";
import { FilmItemSearch } from "../../components/film-item-search";
import { ScrollView } from "@nandorojo/anchor";

const listFilms: FilmItemSearch[] = [
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
];
export type SearchScreenProps = StackScreenProps<RootStackParamList>;

export const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  return (
    <ScrollView>
      <HeaderSearch navigation={navigation} route={route} />
      <ListItemSearch listFilms={listFilms} title="Hành động" />
      <ListItemSearch listFilms={listFilms} title="Tình cảm" />
    </ScrollView>
  );
};
