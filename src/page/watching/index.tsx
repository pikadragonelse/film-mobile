import React, { useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { VideoPlayerCustom } from "../../components/video-player";
import { Rating } from "react-native-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const Watching = () => {
    return (
        <View style={styles.watchingContainer}>
            <VideoPlayerCustom sourceURI="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
            <View style={styles.containerInfo}>
                <Text style={styles.nameFilm}>One piece</Text>
                <View style={styles.ratingContainer}>
                    <Rating
                        ratingColor="red"
                        ratingBackgroundColor="red"
                        startingValue={3.5}
                        readonly
                        imageSize={15}
                        tintColor="#191919"
                    />
                    <Text style={styles.ratingText}>3.5/5</Text>
                </View>
                <View style={styles.hashtagContainer}>
                    <Text style={{ ...styles.hashtagItem, paddingLeft: 0 }}>
                        2023
                    </Text>
                    <Text style={styles.hashtagItem}>Phụ đề</Text>
                    <Text style={styles.hashtagItem}>Trung Quốc đại lục</Text>
                    <FontAwesomeIcon
                        icon={faAngleDown}
                        style={styles.infoIcon}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    watchingContainer: {
        marginTop: 25,
    },
    containerInfo: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    nameFilm: {
        color: "white",
        fontSize: 25,
        fontWeight: "600",
    },
    ratingContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    ratingText: {
        color: "white",
        marginLeft: 10,
        fontSize: 15,
    },
    hashtagContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    hashtagItem: {
        color: "white",
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: "#cecece",
    },
    infoIcon: {},
});
