import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  BottomTabNavigationEventMap,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Input, SearchBar } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from "react-native";
import { RootStackParamList } from "../../../App";
import { FilmItemSearch } from "../../components/film-item-search";
import { ListItemSearch } from "../../components/list-film-item-search";
import { TabParamList } from "../../components/tab-navigator";
import { request } from "../../utils/request";
import debounce from "lodash/debounce";

export type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
export const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchBarRef = useRef<any>(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchBarRef.current != null) {
      const transitionEndEvent =
        "transitionEnd" as keyof BottomTabNavigationEventMap;

      const unsubscribe = navigation.addListener(transitionEndEvent, () => {
        searchBarRef.current?.focus();
      });
      return unsubscribe;
    }
  }, [navigation, searchBarRef.current]);
  //api
  const [searchResults, setSearchResults] = useState<FilmItemSearch[]>([]);
  const fetchDataSearch = useRef(
    debounce(async (value: string) => {
      try {
        setLoading(true);
        const response = await request.get(`movies?search=${value}`);
        const data = response.data.movies;
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 10)
  ).current;

  useEffect(() => {
    fetchDataSearch(searchValue);
  }, [searchValue, fetchDataSearch]);

  return (
    <View>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={styles.backIcon}
            size={25}
          />
        </TouchableOpacity>
        <SearchBar
          ref={searchBarRef}
          autoFocus
          placeholder="Type Here..."
          onChangeText={(value) => setSearchValue(value)}
          value={searchValue}
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.inputSearch}
          inputContainerStyle={styles.searchBar}
        />
      </View>
      <ScrollView>
        {searchResults.length > 0 ? (
          <ListItemSearch
            title="Kết quả tìm kiếm"
            listFilms={searchResults}
            navigation={navigation}
            route={route}
          />
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 32,
            }}
          >
            <Text style={{ color: "white" }}>Không tìm kết kết quả nào.</Text>
          </View>
        )}
        {/* <ListItemSearch
          listFilms={listFilms}
          title="Hành động"
          navigation={navigation}
          route={route}
        />
        <ListItemSearch
          listFilms={listFilms}
          title="Tình cảm"
          navigation={navigation}
          route={route}
        /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  searchBarContainer: {
    flex: 1,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    backgroundColor: "transparent",
    position: "relative",
  },
  inputSearch: {
    fontSize: 15,
  },
  searchBar: {
    backgroundColor: "#8686861f",
    height: 40,
    borderRadius: 6,
  },
  backIcon: {
    color: "silver",
  },
});
