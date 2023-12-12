import { ScrollView } from "@nandorojo/anchor";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { RootStackParamList } from "../../../App";
import Colors from "../../constants/Colors";
import { FilmItemForyouType } from "../../page/personal/history";
import { TabParamList } from "../tab-navigator";
import { FilmItemCollection } from "./film-item-collection";
import { FilmItemHistory } from "./film-item-history";

export type FilmItemForyouProps = {
  dataList: Array<FilmItemForyouType>;
  title?: string;
  isEditing: boolean;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const ListFilmItemFouyou = ({
  dataList,
  title,
  isEditing,
  navigation,
  route,
}: FilmItemForyouProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedAll, setSelectedAll] = useState<boolean>(false);
  const toggleItemSelection = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // const deleteSelectedItems = () => {
  //   const updatedDataList = dataList.filter(
  //     (item) => !selectedItems.includes(item.id)
  //   );
  //   setDataList(updatedDataList);
  //   setSelectedItems([]);
  // };

  const selectedAllItems = () => {
    const allItemIds = dataList.map((item) => item.id);
    setSelectedItems(selectedAll ? [] : allItemIds);
    setSelectedAll(!selectedAll);
  };
  return (
    <ScrollView style={styles.containerListItem}>
      {title ? (
        <View>
          <View>
            {isEditing && (
              <View style={styles.cntDelete}>
                <TouchableOpacity
                  style={styles.selectedAll}
                  onPress={selectedAllItems}
                >
                  {selectedAll ? (
                    <Text style={styles.selectedText}>Hủy chọn toàn bộ</Text>
                  ) : (
                    <Text style={styles.selectedText}>Chọn toàn bộ</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectedItem}
                  // onPress={deleteSelectedItems}
                >
                  {selectedItems.length > 0 ? (
                    <Text style={styles.selectedActiveText}>
                      Xóa ({selectedItems.length})
                    </Text>
                  ) : (
                    <Text style={styles.selectedText}> Xóa </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.header}>
              <Text style={styles.titleForyou}>{title}</Text>
            </View>
            {dataList.map((data) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Watching", {
                    movieId: data.id,
                  });
                }}
              >
                <FilmItemHistory
                  key={data.id}
                  data={data}
                  title={data.title}
                  isEditing={isEditing}
                  isSelected={selectedItems.includes(data.id)}
                  toggleItemSelection={() => toggleItemSelection(data.id)}
                  navigation={navigation}
                  route={route}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : (
        <View>
          <View>
            {isEditing && (
              <View style={styles.cntDelete}>
                <TouchableOpacity
                  style={styles.selectedAll}
                  onPress={selectedAllItems}
                >
                  {selectedAll ? (
                    <Text style={styles.selectedText}>Hủy chọn toàn bộ</Text>
                  ) : (
                    <Text style={styles.selectedText}>Chọn toàn bộ</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.selectedItem}
                  // onPress={deleteSelectedItems}
                >
                  {selectedItems.length > 0 ? (
                    <Text style={styles.selectedActiveText}>
                      Xóa ({selectedItems.length})
                    </Text>
                  ) : (
                    <Text style={styles.selectedText}> Xóa </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
          {dataList.map((data) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Watching", {
                  movieId: data.id,
                });
              }}
            >
              <FilmItemCollection
                key={data.id}
                data={data}
                isEditing={isEditing}
                isSelected={selectedItems.includes(data.id)}
                toggleItemSelection={() => toggleItemSelection(data.id)}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleForyou: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 12,
    marginTop: 18,
  },
  containerListItem: {
    marginBottom: 65,
  },
  cntDelete: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    width: "100%",
    height: 40,
    backgroundColor: "transparent",
    zIndex: 999,
    display: "flex",
    flexDirection: "row",
  },
  selectedAll: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 2,
  },
  selectedItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedText: {
    color: "silver",
    fontSize: 15,
    fontWeight: "600",
  },
  selectedActiveText: {
    color: Colors.ACTIVE,
    fontSize: 15,
    fontWeight: "600",
  },
});
