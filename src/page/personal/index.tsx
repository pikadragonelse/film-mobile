import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faClockRotateLeft,
  faCrown,
  faHeart,
  faList,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import { Button } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../../App";
import { Avatar, Badge, CheckBox } from "@rneui/base";
import React, { useEffect } from "react";
import { useState } from "react";
import { AvatarDefault, Logo } from "../../assets/logo";
import Colors from "../../constants/Colors";
import { RootState } from "../../redux/store";
import { CurrentUser } from "../watching";
import { getToken } from "../auth";
import { request } from "../../utils/request";

export interface User {
  username: string;
  email: string;
  avatar: string;
  genre?: string;
  birthday?: string;
  password?: string;
  passwordtest?: string;
  newPassword?: string;
  confirmPassword?: string;
}
interface Item {
  title: string;
  icon: any;
  nextIcon: any;
  onPress?: () => void;
}
export type PersonalScreenProps = StackScreenProps<RootStackParamList>;

export const Personal = ({ navigation, route }: PersonalScreenProps) => {
  const items: Item[] = [
    {
      title: "Thông tin cá nhân",
      icon: <FontAwesomeIcon icon={faUser} color={"#989898"} />,
      nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
      onPress: () => navigation.navigate("Profile", { currentUser }),
    },
    // {
    //   title: "Gói VIP",
    //   icon: <FontAwesomeIcon icon={faCrown} color={"#989898"} />,
    //   nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
    //   onPress: () => navigation.navigate("VIPPackage"),
    // },
    {
      title: "Sưu tập của tôi",
      icon: <FontAwesomeIcon icon={faList} color={"#989898"} />,
      nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
      onPress: () => navigation.navigate("Collection"),
    },
    {
      title: "Phim yêu thích",
      icon: <FontAwesomeIcon icon={faHeart} color={"#989898"} />,
      nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
      onPress: () => navigation.navigate("Lovelist"),
    },
    {
      title: "Lịch sử xem",
      icon: <FontAwesomeIcon icon={faClockRotateLeft} color={"#989898"} />,
      nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
      onPress: () => navigation.navigate("History"),
    },
    {
      title: "Đăng xuất",
      icon: <FontAwesomeIcon icon={faRightFromBracket} color={"#989898"} />,
      nextIcon: <FontAwesomeIcon icon={faAngleRight} color={"#E3E0D7"} />,
      onPress: () => navigation.navigate("Home"),
    },
  ];

  const isUserLogged = useSelector((state: RootState) => state.user.isLogin);
  const handleBadgePress = () => {
    // navigation.navigate('badge');
  };
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    username: "",
    email: "",
    avatarURL: "",
  });
  const fetchDataCurrentUser = async () => {
    const accessToken = await getToken();
    console.log(accessToken);
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
  }, [isUserLogged]);
  return (
    <View style={styles.containerPesonal}>
      <View style={styles.headerPesonal}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Logo />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleBadgePress}>
          <FontAwesomeIcon icon={faBell} style={styles.badgeIcon} size={25} />
          <Badge
            value={10}
            badgeStyle={{ backgroundColor: "red", borderColor: "red" }}
            containerStyle={{ position: "absolute", top: -8, left: 10 }}
          />
        </TouchableOpacity>
      </View>
      {isUserLogged ? (
        <View style={styles.infor}>
          <Avatar rounded size={60} source={{ uri: currentUser.avatarURL }} />
          <Text style={styles.usernameTxt}>{currentUser.username}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.infor}
          onPress={() => navigation.navigate("Login")}
        >
          <AvatarDefault />
          <Text style={styles.usernameTxt}>Đăng nhập/Đăng ký</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.containerVIP}>
        <View>
          <Text style={styles.titleVIP}>Ưu đãi thành viên mới</Text>
          <Text style={styles.title}>Tháng đầu chỉ 19.000đ</Text>
        </View>
        <Button
          radius={"sm"}
          type="solid"
          buttonStyle={{
            backgroundColor: "#f7efdb",
            height: 31,
            width: 85,
            alignItems: "center",
            elevation: 4,
          }}
          titleStyle={{
            color: "black",
            fontSize: 12,
            marginTop: -1,
          }}
          onPress={() => navigation.navigate("VIPPackage")}
        >
          <FontAwesomeIcon icon={faCrown} style={{ marginRight: 5 }} />
          Đ.ký VIP
        </Button>
      </TouchableOpacity>
      <View style={styles.listItems}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={item.onPress}
          >
            <View style={styles.itemTitle}>
              {item.icon}
              <Text style={styles.textTitle}>{item.title}</Text>
            </View>
            {item.nextIcon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerPesonal: {
    marginTop: 32,
    paddingHorizontal: 5,
  },
  headerPesonal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    position: "relative",
    paddingRight: 10,
  },
  badgeIcon: {
    color: Colors.WHITE,
  },
  infor: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 20,
  },
  usernameTxt: {
    marginLeft: 10,
    color: Colors.WHITE,
    fontSize: 15,
  },
  containerVIP: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 25,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#F3C673",
  },
  titleVIP: {
    fontSize: 14,
    fontWeight: "500",
  },
  title: {
    fontSize: 13,
  },
  listItems: {
    margin: 5,
    marginTop: 15,
  },
  item: {
    marginBottom: 10,
    paddingTop: 14,
    paddingBottom: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemTitle: {
    display: "flex",
    flexDirection: "row",
  },
  textTitle: {
    marginLeft: 10,
    color: Colors.WHITE,
  },
});
