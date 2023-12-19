import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import Colors from "../../constants/Colors";
import { request } from "../../utils/request";
import { TabParamList } from "../tab-navigator";

type ActorPopularProps = {
  title?: string;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;
export type ActorFamousInfo = {
  actorId?: number;
  name: string;
  avatar: string;
  actor_id?: number;
};

export const ActorPopular = ({
  title,
  navigation,
  route,
}: ActorPopularProps) => {
  const [dataActorFamous, setDataActorFamous] = useState<ActorFamousInfo[]>([]);
  const getActorFamous = async () => {
    try {
      const response = await request.get(
        "individuals/actors?page=1&pageSize=20"
      );
      setDataActorFamous(response.data.data.actors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getActorFamous();
  }, []);

  return (
    <View style={stylesActor.actorContain}>
      <Text style={stylesActor.sectionTitle}>
        <Text> {title}</Text>
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={stylesActor.actorList}
      >
        {dataActorFamous.map((actor) => (
          <TouchableOpacity
            key={actor.actorId}
            style={stylesActor.actorItem}
            onPress={() => {
              navigation.navigate("Actor", { actorId: actor.actorId });
            }}
          >
            <Avatar size={80} rounded source={{ uri: actor.avatar }} />
            <Text style={stylesActor.actorName}>{actor.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const stylesActor = StyleSheet.create({
  actorContain: {
    marginTop: 12,
    marginBottom: 16,
    marginLeft: 10,
  },

  sectionTitle: {
    color: Colors.WHITE,
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 16,
  },

  actorList: {
    display: "flex",
    flexDirection: "row",
    marginTop: 5,
  },

  actorItem: {
    display: "flex",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  actorName: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.WHITE,
  },
});
