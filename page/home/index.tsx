import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "../../components/header";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../components/tab-navigator";
import { RootStackParamList } from "../../App";
import { StackScreenProps } from "@react-navigation/stack";

type HomeScreenProp = CompositeScreenProps<
    BottomTabScreenProps<TabParamList>,
    StackScreenProps<RootStackParamList>
>;

export const Home = ({ navigation, route }: HomeScreenProp) => {
    return (
        <View style={styles.homeContainer}>
            <Header navigation={navigation} route={route} />
        </View>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: "black",
    },
});
