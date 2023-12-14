import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/themed";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../App";
import Colors from "../../constants/Colors";
import { TabParamList } from "../tab-navigator";

type ActorPopularProps = {
  title?: string;
} & CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const ActorPopular = ({
  title,
  navigation,
  route,
}: ActorPopularProps) => {
  const actors = [
    {
      id: "1",
      name: "Christopher",
      imageUri: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
      id: "2",
      name: "Maurice",
      imageUri: "https://randomuser.me/api/portraits/men/9.jpg",
    },
    {
      id: "3",
      name: "DiCaprio",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLXSbEzmwYg5-jcXTNAJJyQvqJb_CPDHJ1HQ&usqp=CAU",
    },
    {
      id: "4",
      name: "Cillian Murphy",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMcbTYeoKgaKkF02a1PDn1l0gqXpJsXW2kOMPHDdnQxZz07QNSChoglULMTqlW7_kLH4&usqp=CAU",
    },

    {
      id: "5",
      name: "Leonardo",
      imageUri:
        "https://qph.cf2.quoracdn.net/main-qimg-de3859cf3a24c3bbe410a67f281184a0-lq",
    },

    {
      id: "6",
      name: "Christopher",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSWaOJtBgXcnWu4pN-IkMaYKQzfk3DfGZxYw&usqp=CAU",
    },
    {
      id: "7",
      name: "General",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxX2J0cjz5TE85EmDAJ7ftaGTsBKQUGQEjGsxSWVOgaSfMdIAQmgHGOGAPcbaJoJnNW58&usqp=CAU",
    },
    {
      id: "8",
      name: "Christopher",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMcbTYeoKgaKkF02a1PDn1l0gqXpJsXW2kOMPHDdnQxZz07QNSChoglULMTqlW7_kLH4&usqp=CAU",
    },
    {
      id: "9",
      name: "Maurice",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTptwL3wf2PUSgEz9OBFj64vTOZ4mvEBpSu62MCbQKbP0VjbFe1iiSROy0JIWd7UzymxcU&usqp=CAU",
    },
    {
      id: "10",
      name: "DiCaprio",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLXSbEzmwYg5-jcXTNAJJyQvqJb_CPDHJ1HQ&usqp=CAU",
    },
  ];

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
        {actors.map((actor) => (
          <TouchableOpacity
            key={actor.id}
            style={stylesActor.actorItem}
            onPress={() => {
              navigation.navigate("Actor");
            }}
          >
            <Avatar size={80} rounded source={{ uri: actor.imageUri }} />
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
