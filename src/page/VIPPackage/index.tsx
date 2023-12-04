import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { NotifyLogin } from "./notify-login";
import { Tab, TabView } from "@rneui/themed";

export const VIPPackage = () => {
    const [index, setIndex] = useState(0);
    return (
        <>
            <>
                <NotifyLogin />
                <Tab
                    value={index}
                    onChange={(e) => setIndex(e)}
                    indicatorStyle={{
                        backgroundColor: "white",
                        height: 3,
                    }}
                    variant="primary"
                    disableIndicator
                >
                    <Tab.Item title="Recent" titleStyle={{ fontSize: 12 }} />
                    <Tab.Item title="favorite" titleStyle={{ fontSize: 12 }} />
                    <Tab.Item title="cart" titleStyle={{ fontSize: 12 }} />
                </Tab>

                <TabView
                    value={index}
                    onChange={setIndex}
                    animationType="spring"
                >
                    <ScrollView>
                        <TabView.Item
                            style={{
                                backgroundColor: "red",
                                width: "100%",
                                height: 1000,
                            }}
                        >
                            <Text>Recent</Text>
                        </TabView.Item>
                    </ScrollView>

                    <TabView.Item
                        style={{ backgroundColor: "blue", width: "100%" }}
                    >
                        <Text>Favorite</Text>
                    </TabView.Item>
                    <TabView.Item
                        style={{ backgroundColor: "green", width: "100%" }}
                    >
                        <Text>Cart</Text>
                    </TabView.Item>
                </TabView>
            </>
            <View style={{ height: 50, backgroundColor: "black" }}>
                <Text>500</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
