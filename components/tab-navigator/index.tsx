import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    IconDefinition,
    faFilm,
    faHome,
    faRankingStar,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
    BottomTabScreenProps,
    createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Text, StyleSheet, View } from "react-native";
import { Home } from "../../page/home";
import { Rank } from "../../page/rank";
import { Film } from "../../page/film";
import { Personal } from "../../page/personal";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import { NavigatorScreenParams } from "@react-navigation/native";

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
                                    color:
                                        focused === true ? "white" : "#a2a3a2",
                                }}
                                size={22}
                            />
                        ),
                        tabBarLabel: ({ focused, color }) => (
                            <Text
                                style={{
                                    color:
                                        focused === true ? "white" : "#a2a3a2",
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
        backgroundColor: "#1F1F1F",
        borderTopWidth: 0,
    },
});
