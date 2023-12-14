import React from "react";
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const listOption = [
  "Toàn bộ quốc gia",
  "Việt Nam",
  "Nga",
  "Mỹ",
  "Pháp",
  "Anh",
  "Nhật Bản",
];

export interface Section {
  index: number;
  title: string;
  data: string[] | number[] | any[];
}

export type FilterFilm = {
  data: Section[];
  activeOption: number[];
  setActiveOption: React.Dispatch<any>[];
};
export const FilterFilm = ({
  data,
  activeOption,
  setActiveOption,
}: FilterFilm) => {
  return (
    <>
      <SectionList
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section }) => (
          <FlatList
            data={item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setActiveOption[section.index](index)}
              >
                <Text
                  style={{
                    ...styles.listItem,
                    backgroundColor:
                      index === activeOption[section.index]
                        ? "#424242"
                        : "transparent",
                    color:
                      index === activeOption[section.index] ? "red" : "#cecece",
                    marginLeft: index === 0 ? 0 : 5,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.listContainer}
            horizontal
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: "white" }}></Text>
        )}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  listContainer: {},
  listItem: {
    color: "#cecece",
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});
