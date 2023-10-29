import {
  IconDefinition,
  faFilm,
  faHome,
  faRankingStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text } from "react-native";
import { RootStackParamList } from "../../../App";
import { Film } from "../../page/film";
import { Home } from "../../page/home";
import { Personal } from "../../page/personal";
import { Rank } from "../../page/rank";

const Tab = createBottomTabNavigator();

interface TabScreen {
  name: string;
  icon: IconDefinition;
  label: string;
  component: any;
}

type PropsStackBottomTabNav = NativeStackScreenProps<
  RootStackParamList,
  "BottomTabNav"
>;

export type TabParamList = {
  Home: undefined;
  Films: undefined;
  Rank: undefined;
  Personal: undefined;
};

export const TabNavigator = ({ navigation }: PropsStackBottomTabNav) => {
  const tabBarMap: TabScreen[] = [
    {
      name: "Home",
      icon: faHome,
      label: "Home",
      component: Home,
    },
    { name: "Films", icon: faFilm, label: "Films", component: Film },
    { name: "Rank", icon: faRankingStar, label: "Rank", component: Rank },
    {
      name: "Personal",
      icon: faUser,
      label: "Personal",
      component: Personal,
    },
  ];

  return (
    <Tab.Navigator>
      {tabBarMap.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <FontAwesomeIcon
                icon={item.icon}
                style={{
                  color: focused === true ? "#cf1a1a" : "#9AA1AD",
                }}
                size={17}
              />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused === true ? "#cf1a1a" : "#9AA1AD",
                  fontSize: 12,
                  marginBottom: 4,
                }}
              >
                {item.label}
              </Text>
            ),
            tabBarItemStyle: styles.itemNavbar,
            tabBarStyle: styles.tabBar,
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  itemNavbar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginTop: 10,
  },
  tabBar: {
    height: 65,
    backgroundColor: "#111111",
    borderTopWidth: 0,
  },
});
