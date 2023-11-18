import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../../../App";
import { FilmItemSearch } from "../film-item-search";
import { TabParamList } from "../tab-navigator";

export type ListItemSearchProps = {
  listFilms: Array<FilmItemSearch>;
  title?: string;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
export const ListItemSearch = ({
  listFilms,
  title,
  navigation,
  route,
}: ListItemSearchProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {listFilms.map((data) => (
        <FilmItemSearch
          key={data.id}
          data={data}
          navigation={navigation}
          route={route}
        />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 0,
  },
});
