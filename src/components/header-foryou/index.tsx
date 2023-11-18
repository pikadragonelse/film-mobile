import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../../../App";

type HeaderForyouScreenProp = {
  title?: string;
} & StackScreenProps<RootStackParamList>;

export const HeaderForyou = ({
  route,
  navigation,
  title,
}: HeaderForyouScreenProp) => (
  <SafeAreaView>
    <View style={styles.containerHeaderForyou}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} style={styles.backIcon} size={25} />
      </TouchableOpacity>
      <View style={styles.subHeaderForyou}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subTitle}>Chỉnh sửa</Text>
      </View>
    </View>
  </SafeAreaView>
);
const styles = StyleSheet.create({
  containerHeaderForyou: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 5,
    paddingBottom: 8,
    borderBottomColor: "#8686861f",
    borderBottomWidth: 1,
    zIndex: 999,
  },
  backIcon: {
    color: "silver",
  },
  subHeaderForyou: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  titleText: {
    color: "silver",
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    color: "silver",
  },
});
