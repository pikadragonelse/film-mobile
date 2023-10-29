import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FilmItemSearch } from "../film-item-search";

export type ListItemSearchProps = {
  listFilms: Array<FilmItemSearch>;
  title?: string;
};
export const ListItemSearch = ({ listFilms, title }: ListItemSearchProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {listFilms.map((data) => (
        <FilmItemSearch key={data.id} data={data} />
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
