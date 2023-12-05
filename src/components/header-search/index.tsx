// import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import {
//   BottomTabNavigationEventMap,
//   BottomTabScreenProps,
// } from "@react-navigation/bottom-tabs";
// import { CompositeScreenProps } from "@react-navigation/native";
// import { StackScreenProps } from "@react-navigation/stack";
// import { Input, SearchBar } from "@rneui/base";
// import React, { MutableRefObject, useEffect, useRef, useState } from "react";
// import {
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import { RootStackParamList } from "../../../App";
// import { request } from "../../utils/request";
// import { FilmItemSearch } from "../film-item-search";
// import { ListItemSearch } from "../list-film-item-search";
// import { TabParamList } from "../tab-navigator";

// const listFilms: FilmItemSearch[] = [
//   {
//     id: 1,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     isSeries: true,
//     yearOfManufacture: 2022,
//     category: ["Hành động"],
//     episode: 10,
//     evaluate: 7.8,
//     nation: "Trung Quốc",
//     desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
//     name: "Vân Chi Vũ",
//     vip: true,
//   },
//   {
//     id: 2,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     isSeries: true,
//     yearOfManufacture: 2022,
//     category: ["Hành động"],
//     episode: 10,
//     evaluate: 7.8,
//     nation: "Trung Quốc",
//     desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
//     name: "Vân Chi Vũ",
//     vip: false,
//   },
//   {
//     id: 3,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     isSeries: false,
//     yearOfManufacture: 2022,
//     category: ["Hành động"],
//     // episode: 10,
//     evaluate: 7.8,
//     nation: "Trung Quốc",
//     desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
//     name: "Vân Chi Vũ",
//     vip: false,
//   },
//   {
//     id: 4,
//     poster:
//       "https://image.tmdb.org/t/p/original/aQPeznSu7XDTrrdCtT5eLiu52Yu.jpg",
//     isSeries: true,
//     yearOfManufacture: 2022,
//     category: ["Hành động"],
//     episode: 10,
//     evaluate: 7.8,
//     nation: "Trung Quốc",
//     desc: "Doona là một bộ phim tâm lý, tình cảm lãng mạn Hàn Quốc của đạo diễn Lee Jeong Hyo, được chuyển thể từ webtoon The Girl Downstairs của tác giả Min Song Ah được nhiều bạn trẻ yêu thích. Phim này, sẽ đem đến câu chuyện tình cảm giữa một nữ ngôi sao đã giải nghệ và anh chàng sinh viên, khi họ vô tình gặp nhau tại một ngôi nhà chung. Đặc biệt, ở phim này sẽ có sự tham gia đóng chính của Suzy và Yang Se Jong",
//     name: "Vân Chi Vũ",
//     vip: true,
//   },
// ];
// export type SearchScreenProps = CompositeScreenProps<
//   BottomTabScreenProps<TabParamList>,
//   StackScreenProps<RootStackParamList>
// >;
// export const HeaderSearch = ({ navigation, route }: SearchScreenProps) => {
//   const [searchValue, setSearchValue] = useState("");

//   const searchBarRef = useRef<any>(null);

//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     if (searchBarRef.current != null) {
//       const transitionEndEvent =
//         "transitionEnd" as keyof BottomTabNavigationEventMap;

//       const unsubscribe = navigation.addListener(transitionEndEvent, () => {
//         searchBarRef.current?.focus();
//       });
//       return unsubscribe;
//     }
//   }, [navigation, searchBarRef.current]);
//   //api
//   const [searchResults, setSearchResults] = useState<FilmItemSearch[]>([]);

//   const fetchData = async () => {
//     try {
//       const response = await request.get(
//         `movies?search=${searchValue}&page=${1}&pageSize=${10000}`
//       );
//       const data = response.data;
//       setSearchResults(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, [searchValue]);

//   return (
//     <View>
//       <View style={styles.containerHeader}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <FontAwesomeIcon
//             icon={faAngleLeft}
//             style={styles.backIcon}
//             size={25}
//           />
//         </TouchableOpacity>
//         <SearchBar
//           ref={searchBarRef}
//           autoFocus
//           placeholder="Type Here..."
//           onChangeText={(value) => setSearchValue(value)}
//           value={searchValue}
//           containerStyle={styles.searchBarContainer}
//           inputStyle={styles.inputSearch}
//           inputContainerStyle={styles.searchBar}
//         />
//       </View>
//       <ScrollView>
//         <HeaderSearch navigation={navigation} route={route} />
//         <ListItemSearch
//           listFilms={searchResults}
//           navigation={navigation}
//           route={route}
//         />
//         <ListItemSearch
//           listFilms={listFilms}
//           title="Hành động"
//           navigation={navigation}
//           route={route}
//         />
//         <ListItemSearch
//           listFilms={listFilms}
//           title="Tình cảm"
//           navigation={navigation}
//           route={route}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   containerHeader: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 32,
//     justifyContent: "space-between",
//     paddingHorizontal: 5,
//   },
//   searchBarContainer: {
//     flex: 1,
//     borderTopColor: "transparent",
//     borderBottomColor: "transparent",
//     backgroundColor: "transparent",
//     position: "relative",
//   },
//   inputSearch: {
//     fontSize: 15,
//   },
//   searchBar: {
//     backgroundColor: "#8686861f",
//     height: 40,
//     borderRadius: 6,
//   },
//   backIcon: {
//     color: "silver",
//   },
// });
