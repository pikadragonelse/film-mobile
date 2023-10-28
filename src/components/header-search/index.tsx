import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { SearchBar } from "@rneui/base";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SearchScreenProps } from "../../page/search";

export const HeaderSearch = ({ navigation, route }: SearchScreenProps) => {
  const [searchValue, setSearchValue] = useState("");

  const searchBarRef = useRef<any>(null);

  useEffect(() => {
    if (searchBarRef.current != null) {
      const unsubscribe = navigation.addListener("transitionEnd", () => {
        searchBarRef.current?.focus();
      });
      return unsubscribe;
    }
  }, [navigation, searchBarRef.current]);

  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} style={styles.backIcon} size={35} />
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
    border: "none",
    backgroundColor: "black",
  },
  inputSearch: {
    fontSize: 15,
  },
  searchBar: {
    backgroundColor: "#8686861f",
    height: 40,
  },
  backIcon: {
    color: "white",
  },
});
