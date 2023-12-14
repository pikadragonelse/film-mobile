import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { SearchBar } from "@rneui/base";
import { Button } from "@rneui/themed";
import React, { useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import { Logo } from "../../assets/logo";
import { TabParamList } from "../tab-navigator";

type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

const { width } = Dimensions.get("window");

export const Header = ({ navigation, route }: HomeScreenProp) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView>
      <View style={styles.containerHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Logo />
        </TouchableOpacity>
        <View>
          <SearchBar
            placeholder="Nhập vào đây..."
            onChangeText={(value) => setSearchValue(value)}
            value={searchValue}
            containerStyle={styles.searchBarContainer}
            inputStyle={styles.inputSearch}
            inputContainerStyle={styles.searchBar}
            onPressIn={() => {
              navigation.navigate("Search");
            }}
          />
        </View>
        <Button
          radius={"sm"}
          type="solid"
          buttonStyle={{
            backgroundColor: "#dca226",
            height: 30,
            width: 70,
            alignItems: "center",
          }}
          titleStyle={{
            color: "black",
            fontSize: 12,
            marginTop: -1,
          }}
          // Chưa fix ?
          onPress={() => navigation.navigate("Watching", { movieId: 1 })}
        >
          <FontAwesomeIcon icon={faCrown} style={{ marginRight: 5 }} />
          VIP
        </Button>
      </View>
    </SafeAreaView>
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
    width: width - 200,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    // backgroundColor: "#212121",
    backgroundColor: "transparent",
  },
  inputSearch: {
    fontSize: 12,
  },
  searchBar: {
    backgroundColor: "#8686861f",
    height: 32,
  },
});
