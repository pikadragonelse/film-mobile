import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SectionList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Header } from "../../components/header";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { Button, TabItemProps, TabProps } from "@rneui/base";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../../components/tab-navigator";
import { RootStackParamList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import { Tab, TabView, Image } from "@rneui/themed";
import { FilterFilm, Section } from "../../components/filter-film";
import { dataRCM } from "../watching";
import { styles as stylesWatching } from "../watching/style";

type FilmScreenProp = CompositeScreenProps<
    BottomTabScreenProps<TabParamList>,
    StackScreenProps<RootStackParamList>
>;

const tabItemList = ["Phim bộ", "Phim lẻ"];
const listOption = [
    "Toàn bộ quốc gia",
    "Việt Nam",
    "Nga",
    "Mỹ",
    "Pháp",
    "Anh",
    "Nhật Bản",
];
const listOption1 = [
    "Toàn bộ thể loại",
    "Hành động",
    "Tình cảm",
    "Kịch tính",
    "Hài hước",
    "Lãng mạn",
];

const listOption3 = [
    "Toàn bộ các năm",
    "2023",
    "2022",
    "2021",
    "2015-2020",
    "2000-2014",
    "Khác",
];

const listOption2 = ["Toàn bộ các loại trả phí", "Miễn phí", "VIP"];

const sections: Section[] = [
    { index: 0, title: "Hello", data: [listOption] },
    { index: 1, title: "Hello", data: [listOption1] },
    { index: 2, title: "Hello", data: [listOption2] },
    { index: 3, title: "Hello", data: [listOption3] },
];

export const Film = ({ navigation, route }: FilmScreenProp) => {
    const [index, setIndex] = useState(0);
    const [activeNation, setActiveNation] = useState<number>(1);
    const [activeGenre, setActiveGenre] = useState<number>(1);
    const [activeFee, setActiveFee] = useState<number>(1);
    const [activeYear, setActiveYear] = useState<number>(1);

    return (
        <>
            <Header navigation={navigation} route={route} />
            <Tab
                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: "red",
                    width: 80,
                    left: (Dimensions.get("window").width / 1.8 / 2 - 80) / 2,
                }}
                style={{ width: Dimensions.get("window").width / 1.8 }}
            >
                {tabItemList.map((tabItem) => (
                    <Tab.Item
                        title={tabItem}
                        titleStyle={{ fontSize: 14, color: "white" }}
                    />
                ))}
            </Tab>

            <TabView
                value={index}
                onChange={setIndex}
                animationType={undefined}
            >
                <TabView.Item style={{ width: "100%", height: "100%" }}>
                    <ScrollView>
                        <FilterFilm
                            data={sections}
                            activeOption={[
                                activeNation,
                                activeGenre,
                                activeFee,
                                activeYear,
                            ]}
                            setActiveOption={[
                                setActiveNation,
                                setActiveGenre,
                                setActiveFee,
                                setActiveYear,
                            ]}
                        />
                        <View
                            style={{
                                ...stylesWatching.rcmContainer,
                                marginTop: 20,
                            }}
                        >
                            {dataRCM.map((item, index) => (
                                <TouchableOpacity>
                                    <View
                                        style={{
                                            ...stylesWatching.rcmFilmItem,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item.image,
                                            }}
                                            style={
                                                stylesWatching.rcmFilmImageContainer
                                            }
                                        />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            style={stylesWatching.rcmFilmName}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={stylesWatching.rcmFilmSub}>
                                            {item.isSingle === true
                                                ? "Phim lẻ"
                                                : `${item.episode} tập`}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                            {dataRCM.length % 3 !== 0 ? (
                                <View
                                    style={{
                                        ...stylesWatching.rcmFilmItem,
                                    }}
                                ></View>
                            ) : undefined}
                        </View>
                    </ScrollView>
                </TabView.Item>
                <TabView.Item style={{ width: "100%" }}>
                    <Text style={{ color: "white" }}>Favorite</Text>
                </TabView.Item>
            </TabView>
        </>
    );
};

const styles = StyleSheet.create({
    filmContainer: {
        // backgroundColor: "#212121",
        backgroundColor: "transparent",
        paddingBottom: 10,
    },
});
