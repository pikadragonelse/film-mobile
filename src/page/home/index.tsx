import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    FlatList,
    ImageBackground,
} from "react-native";
import { RootStackParamList } from "../../../App";
import { Header } from "../../components/header";
import { Slide } from "../../components/slide";
import { TabParamList } from "../../components/tab-navigator";
import { ItemSeparator } from "../../components/item-separator";
import { GenreCard } from "../../components/genre-card";
import { useState, useEffect } from "react";
import { FilmItem } from "../../components/film-item";
import { LinearGradient } from "expo-linear-gradient";

type HomeScreenProp = CompositeScreenProps<
    BottomTabScreenProps<TabParamList>,
    StackScreenProps<RootStackParamList>
>;
const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

export const Home = ({ navigation, route }: HomeScreenProp) => {
    const [activeGenre, setActiveGenre] = useState("All");

    const genresData = [
        { id: 1, name: "All" },
        { id: 2, name: "Action" },
        { id: 3, name: "Comedy" },
        { id: 4, name: "Romance" },
        { id: 5, name: "Horror" },
        { id: 6, name: "Sci-Fi" },
    ];
    const image = {
        uri: "https://image.tmdb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    };

    return (
        <ScrollView style={styles.homeContainer}>
            <View>
                {/* <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
          blurRadius={50}
        > */}
                <Header navigation={navigation} route={route} />
                <View style={styles.genreListContainer}>
                    <FlatList
                        data={genresData}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => (
                            <ItemSeparator width={20} />
                        )}
                        ListHeaderComponent={() => <ItemSeparator width={20} />}
                        ListFooterComponent={() => <ItemSeparator width={20} />}
                        renderItem={({ item }) => (
                            <GenreCard
                                genreName={item.name}
                                active={item.name === activeGenre}
                                onPress={() => setActiveGenre(item.name)}
                            />
                        )}
                    />
                </View>
                <Slide />
                {/* </ImageBackground> */}
            </View>
            <FilmItem />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    homeContainer: {
        backgroundColor: "transparent",
        paddingBottom: 10,
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },

    genreListContainer: {
        paddingVertical: 10,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: -12,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    linear: {
        position: "absolute",
        bottom: 0,
    },
});
