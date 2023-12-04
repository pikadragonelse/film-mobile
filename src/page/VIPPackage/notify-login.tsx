import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Avatar } from "@rneui/themed";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const NotifyLogin = () => {
    return (
        <TouchableOpacity activeOpacity={0.9}>
            <View style={styles.container}>
                <Avatar
                    size={50}
                    rounded
                    source={{
                        uri: "https://randomuser.me/api/portraits/men/36.jpg",
                    }}
                />
                <View style={styles.containerContent}>
                    <View style={styles.content}>
                        <Text style={styles.contentText}>
                            Hãy đăng nhập, sau đó đặt mua
                        </Text>
                        <FontAwesomeIcon icon={faAngleRight} color="white" />
                    </View>
                    <Text style={styles.subContent}>
                        Đăng ký thành viên xem phim bom tấn
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#191919",
        padding: 10,
    },
    containerContent: {
        marginLeft: 10,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    contentText: {
        color: "white",
        fontWeight: "500",
        fontSize: 16,
    },
    iconContent: {},
    subContent: {
        color: "#dca226",
    },
});
