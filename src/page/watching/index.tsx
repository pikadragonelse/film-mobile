import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Animated,
    ScrollView,
    Dimensions,
    FlatList,
} from "react-native";
import { VideoPlayerCustom } from "../../components/video-player";
import { Rating } from "react-native-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faAngleDown,
    faAngleUp,
    faArrowUpFromBracket,
    faHeart,
    faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import Collapsible from "react-native-collapsible";
import {
    Avatar,
    Button,
    Icon,
    ListItem,
    Tab,
    TabView,
    Image,
} from "@rneui/themed";
import {
    faBookmark as faBookmarkRegular,
    faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { ScrollTo, Target } from "@nandorojo/anchor";
import { styles } from "./style";
import { RootStackParamList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";

const list = [
    {
        name: "Amy Farha 123123",
        avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        subtitle: "Vice President",
    },
    {
        name: "Chris Jackson",
        avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice Chairman",
    },
    {
        name: "Chris Jackson",
        avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice Chairman",
    },
    {
        name: "Chris Jackson",
        avatar_url:
            "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        subtitle: "Vice Chairman",
    },
];

export interface RcmFilm {
    id: number;
    image: string;
    isSingle: boolean;
    episode: number;
    name: string;
}

const dataRCM: RcmFilm[] = [
    {
        id: 1,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 2,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 3,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: false,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 4,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 5,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 6,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 7,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 8,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 9,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 10,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 11,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
    {
        id: 12,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQQUhXY9o56Aexeb2XZ1ik04MmoqaC131vNxQsuANkLROs3JxlN",
        isSingle: true,
        episode: 10,
        name: "aksjdfkadsfkadskajdsfk;aldsfjakldsjakls;djfa;lkdsjfa",
    },
];

const listEpisode = [1, 2, 3, 4, 5, 6, 7, 8];

export type WatchingScreenProps = StackScreenProps<RootStackParamList>;

export const Watching = ({ navigation }: WatchingScreenProps) => {
    const [isHideDesc, setIsHideDesc] = useState<boolean>(true);
    const [isSaveMovie, setIsSaveMovie] = useState<boolean>(false);
    const [isLikeMovie, setIsLikeMovie] = useState<boolean>(false);

    const [index, setIndex] = useState(0);

    return (
        <>
            <View
                style={{
                    ...styles.watchingContainer,
                    height:
                        Dimensions.get("window").height -
                        styles.watchingContainer.marginTop,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon
                        style={styles.backIcon}
                        icon={faAngleDown}
                        size={30}
                    />
                </TouchableOpacity>
                <VideoPlayerCustom sourceURI="https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4" />
                <ScrollView>
                    <View style={styles.containerInfo}>
                        <Text style={styles.nameFilm}>One piece</Text>
                        <View style={styles.ratingContainer}>
                            <Rating
                                ratingColor="red"
                                ratingBackgroundColor="red"
                                startingValue={3.5}
                                imageSize={15}
                                tintColor="#191919"
                            />
                            <Text style={styles.ratingText}>3.5/5</Text>
                        </View>
                        <View style={styles.hashtagContainer}>
                            <Text
                                style={{
                                    ...styles.hashtagItem,
                                    paddingLeft: 0,
                                }}
                            >
                                2023
                            </Text>
                            <Text style={styles.hashtagItem}>Phụ đề</Text>
                            <Text
                                style={{
                                    ...styles.hashtagItem,
                                    borderRightWidth: 0,
                                }}
                            >
                                Trung Quốc đại lục
                            </Text>
                            <TouchableOpacity
                                style={styles.infoIcon}
                                onPress={() => setIsHideDesc(!isHideDesc)}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isHideDesc === true
                                            ? faAngleDown
                                            : faAngleUp
                                    }
                                    style={styles.infoIcon}
                                />
                            </TouchableOpacity>
                        </View>
                        <Collapsible collapsed={isHideDesc}>
                            <Text style={styles.desc}>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </Text>
                        </Collapsible>
                    </View>
                    <ScrollView
                        style={{
                            flexDirection: "row",
                            marginTop: 10,
                            backgroundColor: "#191919",
                        }}
                        horizontal
                    >
                        {list.map((l, i) => (
                            <ListItem
                                key={i}
                                style={{ width: 190 }}
                                containerStyle={{
                                    backgroundColor: "#191919",
                                }}
                            >
                                <Avatar
                                    source={{ uri: l.avatar_url }}
                                    avatarStyle={{ borderRadius: 50 }}
                                />
                                <ListItem.Content
                                    style={{ backgroundColor: "#191919" }}
                                >
                                    <ListItem.Title
                                        style={{ color: "white" }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {l.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle
                                        style={{ color: "white" }}
                                    >
                                        {l.subtitle}
                                    </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                        ))}
                    </ScrollView>
                    <View style={styles.containerFeature}>
                        <TouchableOpacity
                            onPress={() => setIsLikeMovie(!isLikeMovie)}
                        >
                            <FontAwesomeIcon
                                style={styles.feature}
                                icon={
                                    isLikeMovie === true
                                        ? faHeart
                                        : faHeartRegular
                                }
                                size={22}
                                color={isLikeMovie === true ? "red" : "white"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsSaveMovie(!isSaveMovie)}
                        >
                            <FontAwesomeIcon
                                style={styles.feature}
                                icon={
                                    isSaveMovie === true
                                        ? faBookmark
                                        : faBookmarkRegular
                                }
                                size={22}
                                color={
                                    isSaveMovie === true ? "yellow" : "white"
                                }
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesomeIcon
                                style={styles.feature}
                                icon={faArrowUpFromBracket}
                                size={22}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Lịch cập nhật</Text>
                        <Text style={styles.sectionDesc}>
                            Cập nhật vào 20h Chủ Nhật hàng tuần
                        </Text>
                        <ScrollView horizontal style={styles.sectionContent}>
                            {listEpisode.map((episode, index) => (
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            ...styles.sectionEpisode,
                                            marginLeft:
                                                index === 0
                                                    ? 0
                                                    : styles.sectionEpisode
                                                          .marginHorizontal,
                                        }}
                                    >
                                        {episode}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Phim đề xuất</Text>
                        <View style={styles.rcmContainer}>
                            {dataRCM.map((item, index) => (
                                <TouchableOpacity>
                                    <View
                                        style={{
                                            ...styles.rcmFilmItem,
                                        }}
                                    >
                                        <Image
                                            source={{
                                                uri: item.image,
                                            }}
                                            style={styles.rcmFilmImageContainer}
                                        />
                                        <Text
                                            numberOfLines={2}
                                            ellipsizeMode="tail"
                                            style={styles.rcmFilmName}
                                        >
                                            {item.name}
                                        </Text>
                                        <Text style={styles.rcmFilmSub}>
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
                                        ...styles.rcmFilmItem,
                                    }}
                                ></View>
                            ) : undefined}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};
