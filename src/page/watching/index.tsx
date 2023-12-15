import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleLeft,
  faAngleUp,
  faArrowUpFromBracket,
  faBookmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar, Button, ListItem } from "@rneui/themed";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Rating } from "react-native-ratings";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { FilmItem } from "../../components/film-item";
import { ListComment } from "../../components/list-cmt";
import { WriteCmt } from "../../components/list-cmt/write-cmt";
import { Film } from "../../components/model/film";
import { TabParamList } from "../../components/tab-navigator";
import { VideoPlayerCustom } from "../../components/video-player";
import Colors from "../../constants/Colors";
import { RootState } from "../../redux/store";
import { request } from "../../utils/request";
import { getToken } from "../auth";
import { FilmItemForyouType } from "../personal/history";
import { styles } from "./style";

const moment = require("moment");
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
export interface UserProps {
  user_id: number;
  gender: string;
  avatar_url: string;
  email: string;
}
export interface listCommentsProps {
  id: number;
  avatar: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  content: string;
  numLike: number;
  user?: UserProps;
  subcomments?: Array<listCommentsProps>;
}
interface Episodes {
  episodeId?: number;
  movieId?: number;
  title: string;
  releaseDate?: string;
  posterURL?: string;
  movieURL: string;
  numView: string;
  duration: number;
  episodeNo?: number;
  titleFilm?: string;
}
export interface CurrentUser {
  userId?: number;
  username: string;
  email: string;
  avatarURL: string;
  dateOfBirth?: string;
  gender?: string;
}

export type WatchingScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  StackScreenProps<RootStackParamList>
>;

export const Watching = ({ navigation, route }: WatchingScreenProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    username: "",
    email: "",
    avatarURL: "",
  });
  const fetchDataCurrentUser = async () => {
    const accessToken = await getToken();
    try {
      const response = await request.get("user/get-self-information", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = response.data;
      setCurrentUser(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataCurrentUser();
  }, []);
  //api bộ phim
  const defaultFilm = {
    movieId: 0,
    title: "",
    description: "",
    releaseDate: "",
    nation: "",
    posterURL: "",
    trailerURL: "",
    averageRating: "",
    episodeNum: 0,
    level: 0,
    genres: [],
    actors: [],
    episodes: [],
  };
  const defaultEpisode = {
    episodeId: 0,
    movieId: 0,
    title: "",
    releaseDate: "",
    posterURL: "",
    movieURL: "",
    numView: "",
    duration: 0,
    episodeNo: 0,
  };
  const [watchingData, setWatchingData] = useState<Film>(defaultFilm);
  const { movieId, episodeId: id } = route.params || {
    movieId: 0,
    episodeId: 0,
  };

  const [episodeId, setEpisodeId] = useState<number | undefined>(id);

  const fetchData = async () => {
    try {
      const response = await request.get(`movies/${movieId}`);
      const data = response.data;
      setEpisodeId(
        data.episodes.length > 0 ? data.episodes[0].episode_id : undefined
      );
      setActiveEpisode(episodeId);
      setWatchingData(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [movieId]);
  // api từng tập
  const [dataEpisode, setDataEpisode] = useState<Episodes>(defaultEpisode);
  const fetchDataEpisode = async () => {
    try {
      const response = await request.get(`episode/${episodeId}`);
      const data = response.data;
      if (watchingData.movieId !== data.movieId) {
        await fetchData();
      }
      setDataEpisode(data);
      //
      if (startTime) {
        const elapsedMinutes = calculateElapsedTime();
        saveWatchingHistory(data.episodeId, elapsedMinutes);
      }
      setStartTime(Date.now());
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataEpisode();
  }, [episodeId]);
  //api cmt
  const listComment = [
    {
      id: 0,
      avatar: "",
      username: "",
      createdAt: "",
      content: "",
      numLike: 0,
      subcomments: [],
    },
  ];
  const [listComments, setListComments] =
    useState<Array<listCommentsProps>>(listComment);
  const fetchDataCmt = async () => {
    try {
      const response = await request.get(`episode/${episodeId}/comments`);
      const data = response.data.comments;
      setListComments(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataCmt();
  }, [episodeId]);

  const year = moment(watchingData.releaseDate).format("YYYY");
  const genres = watchingData?.genres.map((genre) => genre.name + " ") || [];
  // const actor = watchingData?.actors
  //   .map((actor) => actor.name.concat(", "))
  //   .concat("...") || [""];
  const [isHideDesc, setIsHideDesc] = useState<boolean>(false);
  const [isSaveMovie, setIsSaveMovie] = useState<boolean>(false);
  const [isLikeMovie, setIsLikeMovie] = useState<boolean>(false);
  const [activeEpisode, setActiveEpisode] = useState<number | undefined>(
    episodeId
  );
  const scrollViewRef = useRef<ScrollView>(null);
  const [showPostCmt, setShowPostCmt] = useState(false);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const handleScroll = (event: any) => {
    const { y } = event.nativeEvent.contentOffset;
    setShowPostCmt(y > 700);
  };

  //gọi api
  const [trendingData, setTrendingData] = useState<Film[]>([]);
  const fetchTrending = async () => {
    try {
      const response = await request.get("movies/home/trending?", {
        params: {
          page: 1,
          pageSize: 1,
        },
      });
      const data = response.data;
      setTrendingData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);
  //check
  const [dataCollect, setDataCollect] = useState<FilmItemForyouType[]>([]);
  const fetchWatchLaterList = async () => {
    const accessToken = await getToken();
    try {
      const response = await request.get(
        "user/get-watch-movie-list?page=1&pageSize=100",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data.ListMovie;

      setDataCollect(data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkFilmDetailsInCollections = (
    data: Film,
    dataCollect: FilmItemForyouType[]
  ) => {
    if (data && data.movieId) {
      const isFilmDetailInWatchLater = dataCollect.some(
        (item: FilmItemForyouType) => item.id === data.movieId
      );
      setIsSaveMovie(isFilmDetailInWatchLater);
    }
  };
  const fetchDataAndWatchLaterList = async () => {
    checkFilmDetailsInCollections(watchingData, dataCollect);
  };
  //check love
  const [dataLove, setDataLove] = useState<FilmItemForyouType[]>([]);
  const fetchLoveList = async () => {
    const accessToken = await getToken();

    try {
      const response = await request.get(
        "user/get-favorite-movie-list?page=1&pageSize=100",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = response.data.data.ListMovie;
      setDataLove(data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkFilmDetailsInLove = (
    data: Film,
    dataLove: FilmItemForyouType[]
  ) => {
    if (data && data.movieId) {
      const isFilmDetailInLove = dataLove.some(
        (item: FilmItemForyouType) => item.id === data.movieId
      );
      setIsLikeMovie(isFilmDetailInLove);
    }
  };

  const fetchDataAndLoveList = async () => {
    checkFilmDetailsInLove(watchingData, dataLove);
  };
  //add bộ sưu tập
  const handleAddToCollection = async () => {
    const accessToken = await getToken();
    if (watchingData && watchingData.movieId) {
      const isFilmDetailInWatchLater = dataCollect.some(
        (item: FilmItemForyouType) => item.id === watchingData.movieId
      );
      if (!isFilmDetailInWatchLater) {
        try {
          const response = await request.get(
            `user/add-watch-list?movieId=${movieId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.data.status === "Ok!") {
            setIsSaveMovie(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (isFilmDetailInWatchLater) {
        try {
          await request.delete(`user/delete-watch-list?movieId=${movieId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (error) {
          console.error(error);
        }
        setIsSaveMovie(false);
      }
    }
  };
  //add love
  const handleAddToLove = async () => {
    const accessToken = await getToken();
    if (watchingData && watchingData.movieId) {
      const isFilmDetailInLove = dataLove.some(
        (item: FilmItemForyouType) => item.id === watchingData.movieId
      );
      if (!isFilmDetailInLove) {
        try {
          const response = await request.get(
            `user/add-favorite-movie?movieId=${movieId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          if (response.data.status === "Ok!") {
            setIsLikeMovie(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
      if (isFilmDetailInLove) {
        try {
          await request.delete(
            `user/delete-favorite-movie?movieId=${movieId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
        setIsLikeMovie(false);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchWatchLaterList();
  }, [isSaveMovie]);
  useEffect(() => {
    fetchLoveList();
  }, [isLikeMovie]);

  useEffect(() => {
    fetchDataAndWatchLaterList();
    fetchDataAndLoveList();
  }, [movieId, watchingData, dataCollect, dataLove]);
  //
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    fetchDataCmt();
    setRefreshData(false);
  }, [episodeId, refreshData]);

  const postData = async (content: string) => {
    const accessToken = await getToken();
    try {
      await request.post(
        "comments/create",
        {
          episodeId: `${episodeId}`,
          content: content,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefreshData(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCommentSubmit = async (content: string) => {
    await postData(content);
  };
  //api history
  const saveWatchingHistory = async (episodeId: number, duration: number) => {
    const accessToken = await getToken();
    try {
      const response = await request.get(
        `user/add-movie-history?episodeId=${episodeId}&duration=${duration}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const [startTime, setStartTime] = useState<number | null>(null);
  const calculateElapsedTime = () => {
    if (startTime) {
      const endTime = Date.now();
      const elapsedMinutes = Math.floor((endTime - startTime) / (1000 * 60));
      return elapsedMinutes;
    }
    return 0;
  };

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
            icon={faAngleLeft}
            size={20}
          />
        </TouchableOpacity>
        <VideoPlayerCustom sourceURI={dataEpisode.movieURL} />
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.containerInfo}>
            <Text style={styles.nameFilm}>
              {watchingData.title}-{dataEpisode.title}
            </Text>
            <View style={styles.ratingContainer}>
              <Rating
                ratingColor="red"
                ratingBackgroundColor="red"
                startingValue={3.5}
                imageSize={15}
                tintColor="#191919"
              />
              <Text style={styles.ratingText}>
                {watchingData.averageRating}
              </Text>
            </View>
            <View style={styles.hashtagContainer}>
              <Text
                style={{
                  ...styles.hashtagItem,
                  paddingLeft: 0,
                }}
              >
                {year}
              </Text>
              <Text style={styles.hashtagItem}>{genres}</Text>
              <Text
                style={{
                  ...styles.hashtagItem,
                  borderRightWidth: 0,
                }}
              >
                {watchingData.nation}
              </Text>
              <TouchableOpacity
                style={styles.infoIcon}
                onPress={() => setIsHideDesc(!isHideDesc)}
              >
                <FontAwesomeIcon
                  icon={isHideDesc === true ? faAngleDown : faAngleUp}
                  style={styles.infoIcon}
                />
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={isHideDesc}>
              <Text style={styles.desc}>{watchingData.description}</Text>
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
                <ListItem.Content style={{ backgroundColor: "#191919" }}>
                  <ListItem.Title
                    style={{ color: "white" }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {l.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ color: "white" }}>
                    {l.subtitle}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
          <View style={styles.containerFeature}>
            <TouchableOpacity onPress={handleAddToLove}>
              <FontAwesomeIcon
                style={styles.feature}
                icon={isLikeMovie === true ? faHeart : faHeartRegular}
                size={22}
                color={isLikeMovie === true ? "red" : "white"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddToCollection}>
              <FontAwesomeIcon
                style={styles.feature}
                icon={isSaveMovie === true ? faBookmark : faBookmarkRegular}
                size={22}
                color={isSaveMovie === true ? "yellow" : "white"}
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
              {watchingData.episodes.map((episode, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setActiveEpisode(episode.episode_id);
                    setEpisodeId(episode.episode_id);
                  }}
                  key={episode.episode_id}
                >
                  <Text
                    style={{
                      ...styles.sectionEpisode,
                      marginLeft:
                        index === 0
                          ? 0
                          : styles.sectionEpisode.marginHorizontal,
                      color:
                        activeEpisode === episode.episode_id ? "red" : "white",
                    }}
                  >
                    {episode.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Phim đề xuất</Text>
            <View style={styles.rcmContainer}>
              <FilmItem
                data={trendingData}
                navigation={navigation}
                route={route}
              />
            </View>
          </View>
          <View>
            <ListComment
              listComment={listComments}
              setListComment={setListComments}
              episodeId={episodeId}
            />
          </View>
        </ScrollView>
        {isLogin ? (
          showPostCmt && (
            <WriteCmt
              currentUser={currentUser}
              onSubmitComment={handleCommentSubmit}
              placeholder="Write a comment..."
            />
          )
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "white", paddingTop: 15 }}>
              Đăng nhập để bình luận
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
