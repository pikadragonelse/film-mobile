import { faAngleLeft, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { ScrollView } from "@nandorojo/anchor";
import DatePicker from "@react-native-community/datetimepicker";
import { StackScreenProps } from "@react-navigation/stack";
import { Avatar } from "@rneui/base";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { User } from "..";
import { RootStackParamList } from "../../../../App";
import Colors from "../../../constants/Colors";

const user: User = {
  username: "username1",
  email: "user1@gmail.com",
  avatar: "https://randomuser.me/api/portraits/women/40.jpg",
  genre: "Nam",
  birthday: "02/06/2001",
  password: "12345",
  passwordtest: "",
  newPassword: "",
  confirmPassword: "",
};
export type ProfileScreenProp = StackScreenProps<RootStackParamList>;

export const Profile = ({ navigation, route }: ProfileScreenProp) => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(user.birthday as string));
  const [userInfo, setUserInfo] = useState({
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    genre: user.genre,
    birthday: date,
    passwordtest: user.passwordtest,
    newPassword: user.newPassword,
    confirmPassword: user.confirmPassword,
  });

  const hashPassword = (password?: string) => {
    return password;
  };
  const handleInputChange = (key: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    if (key === "birthday") {
      setDate(new Date(value));
    }
  };
  const handleSave = () => {
    if (userInfo.newPassword || userInfo.confirmPassword) {
      if (hashPassword(userInfo.passwordtest) !== user.password) {
        alert("Mật khẩu hiện tại chưa đúng");
        return;
      }

      if (userInfo.newPassword !== userInfo.confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }
    }

    console.log("Lưu thông tin người dùng:", userInfo);
  };

  //thay avt
  // const handleUploadPhoto = () => {
  //   fetch(`${SERVER_URL}/api/upload`, {
  //     method: 'POST',
  //     body: createFormData(photo, { userId: '123' }),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log('response', response);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // };

  return (
    <View>
      <SafeAreaView>
        <View style={styles.containerHeaderProfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={styles.backIcon}
              size={20}
            />
          </TouchableOpacity>
          <View style={styles.subHeader}>
            <Text style={styles.titleText}>Thông tin cá nhân</Text>
            <TouchableOpacity>
              <Text onPress={handleSave} style={styles.subTitle}>
                Lưu lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView>
        <View style={styles.avatar}>
          {/* <TouchableOpacity onPress={handleUploadAvatar}> */}
          <Avatar rounded size={70} source={{ uri: user.avatar }} />
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.inforUser}>
          <Text style={styles.titleItem}>Tên tài khoản</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.username}
            onChangeText={(text) => handleInputChange("username", text)}
          />
          <Text style={styles.titleItem}>Email</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <Text style={styles.titleItem}>Giới tính</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.genre}
            onChangeText={(text) => handleInputChange("genre", text)}
          />
          <Text style={styles.titleItem}>Ngày sinh</Text>

          <TouchableOpacity
            onPress={() => {
              setShowPicker(true);
            }}
          >
            <TextInput
              style={styles.inputItem}
              value={date.toLocaleDateString()}
              editable={false}
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              size={16}
              style={{
                color: "grey",
                position: "absolute",
                right: 10,
                top: 8,
              }}
            />
          </TouchableOpacity>

          {showPicker && (
            <DatePicker
              value={date}
              mode={"date"}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || new Date();
                setShowPicker(false);
                setDate(currentDate);
                handleInputChange("birthday", currentDate.toLocaleDateString());
              }}
            />
          )}
        </View>
        <View style={styles.inforPassword}>
          <Text style={styles.titleItem}>Mật khẩu hiện tại</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.passwordtest}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("passwordtest", text)}
          />
          <Text style={styles.titleItem}>Mật khẩu mới</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.newPassword}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("newPassword", text)}
          />
          <Text style={styles.titleItem}>Xác nhận lại mật khẩu mới</Text>
          <TextInput
            style={styles.inputItem}
            value={userInfo.confirmPassword}
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  containerHeaderProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 5,
    paddingBottom: 8,
    borderBottomColor: "#8686861f",
    borderBottomWidth: 1,
    zIndex: 999,
  },
  backIcon: {
    color: "silver",
  },
  subHeader: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
  },
  titleText: {
    color: "silver",
    fontSize: 16,
    fontWeight: "600",
  },
  subTitle: {
    color: "silver",
  },
  avatar: {
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 20,
  },
  inforUser: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: Colors.GRAY,
    borderBottomWidth: 0.5,
    padding: 10,
    paddingBottom: 20,
  },
  inforPassword: {
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  titleItem: {
    margin: 6,
    marginTop: 12,
    color: "silver",
    fontSize: 16,
  },
  inputItem: {
    borderWidth: 1.5,
    borderColor: "#202020",
    padding: 2,
    paddingLeft: 10,
    borderRadius: 6,
    color: Colors.WHITE,
  },
});
