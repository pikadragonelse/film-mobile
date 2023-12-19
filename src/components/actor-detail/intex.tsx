import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "@nandorojo/anchor";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/themed";
import {
  faAngleLeft,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { request } from "../../utils/request";
import { FilmItem } from "../film-item";
import Colors from "../../constants/Colors";
import { RootStackParamList } from "../../../App";
import { TabParamList } from "../tab-navigator";
import { Film } from "../model/film";
import moment from "moment";

type ActorScreenProp = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
interface ActorInfo {
  name: string;
  gender: string;
  avatar: string;
  dateOfBirth: string;
  description: string;
}

export const ActorDetail = ({ navigation, route }: ActorScreenProp) => {
  const { actorId } = route.params || {
    actorId: 0,
  };

  const [movieData, setMovieData] = useState<Film[]>([]);

  const [actorInfo, setActorInfo] = useState<ActorInfo | null>(null);
  const fetchActorInf = async () => {
    try {
      const response = await request.get(`/individuals/actors/${actorId}`);
      setActorInfo(response.data.data);
      setMovieData(response.data.data.movies);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchActorInf();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faAngleLeft} size={20} style={styles.backIcon} />
        <Text style={styles.backTitle}>Thông tin cá nhân</Text>
      </TouchableOpacity>

      <View style={styles.actorDetail}>
        <Avatar
          size={84}
          rounded
          source={{
            uri: actorInfo?.avatar,
          }}
        />
        <View style={styles.actorInfo}>
          <View>
            <Text style={styles.actorName}>{actorInfo?.name}</Text>
            <Text style={styles.actorDate}>
              {moment(actorInfo?.dateOfBirth).format("DD-MM-YYYY")}
            </Text>
          </View>
          <TouchableOpacity style={styles.actorShareBg}>
            <FontAwesomeIcon
              style={styles.actorShare}
              icon={faArrowUpFromBracket}
              size={16}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.actorDescription}>
        <Text style={styles.actorDescriptionTitle}>Giới thiệu</Text>
        <Text style={styles.actorDescriptionText}>
          {actorInfo?.description}
        </Text>
        {[
          { label: "Tên", value: actorInfo?.name },
          { label: "Giới tính", value: actorInfo?.gender },
          {
            label: "Ngày sinh",
            value: moment(actorInfo?.dateOfBirth).format("DD-MM-YYYY"),
          },
          // { label: "Quốc gia", value: "Trung Quốc" },
          // { label: "Chiều cao", value: "170cm" },
          // { label: "Cân nặng", value: "60kg" },
          // { label: "Nghề nghiệp", value: "Diễn viên, Người mẫu" },
        ].map((item, index) => (
          <View style={styles.infoItem} key={index}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <FilmItem
        title="Phim liên quan"
        data={movieData}
        navigation={navigation}
        route={route}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },

  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 6,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(0, 0, 10, 0.1)",
  },

  backTitle: {
    color: Colors.WHITE,
    fontSize: 17,
    marginLeft: 5,
  },

  actorDetail: {
    marginLeft: 15,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  actorInfo: {
    marginLeft: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  actorName: {
    fontWeight: "bold",
    fontSize: 19,
    color: Colors.WHITE,
    marginBottom: 6,
    marginRight: 15,
  },

  actorDate: {
    color: "rgba(255, 255, 255, 0.6)",
    marginRight: 15,
  },

  backIcon: {
    color: Colors.WHITE,
  },

  actorShareBg: {
    alignItems: "center",
    backgroundColor: "rgba(35,37,43,0.8)",
    width: "15%",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },

  actorShare: {
    color: "rgba(255, 255, 255, 0.6)",
  },

  actorDescription: {
    marginLeft: 15,
    marginTop: 24,
  },

  actorDescriptionTitle: {
    color: Colors.WHITE,
    fontWeight: "bold",
    marginBottom: 6,
  },

  actorDescriptionText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  infoLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    flexBasis: "40%",
  },

  infoValue: {
    color: Colors.WHITE,
  },
});
