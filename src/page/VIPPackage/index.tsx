import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { NotifyLogin } from "./notify-login";
import { Header, Tab, TabView } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

const tabTitleList = ["Tiêu chuẩn", "Cao cấp", "Đặc biệt"];

export const VIPPackage = ({
    navigation,
    route,
}: StackScreenProps<RootStackParamList>) => {
    const [indexTab, setIndexTab] = useState(0);

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ left: 10, position: "absolute" }}
                >
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        size={25}
                        color="white"
                    />
                </TouchableOpacity>
                <Text style={styles.textHeader}>VIP Package</Text>
            </View>
            <ScrollView>
                <NotifyLogin />
                <View style={styles.tabContainer}>
                    {tabTitleList.map((title, index) => (
                        <TouchableOpacity
                            style={{
                                ...styles.tabItem,
                                backgroundColor:
                                    index !== indexTab ? "#ccc" : "yellow",
                            }}
                            key={index}
                            onPress={() => setIndexTab(index)}
                            activeOpacity={0.9}
                        >
                            <Text style={styles.tabItemTitle}>{title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View></View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    header: {
        marginTop: 50,
        backgroundColor: "#191919",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    textHeader: {
        fontSize: 20,
        color: "white",
    },
    tabContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    tabItem: {
        backgroundColor: "#ccc",
        padding: 10,
        flex: 1,
        alignItems: "center",
    },
    tabItemTitle: {
        color: "black",
    },
    tabView: {},
});
