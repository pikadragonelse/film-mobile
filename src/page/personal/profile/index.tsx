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
import { ScrollView } from "@nandorojo/anchor";
import DatePicker from "@react-native-community/datetimepicker";
import { Input } from "@rneui/themed";
import { CurrentUser } from "../../watching";
import { getToken } from "../../auth";
import { request } from "../../../utils/request";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DropDownPicker from "react-native-dropdown-picker";

export type ProfileScreenProp = StackScreenProps<RootStackParamList>;

export const Profile = ({ navigation, route }: ProfileScreenProp) => {
  const isUserLogged = useSelector((state: RootState) => state.user.isLogin);
  const currentUser: CurrentUser | undefined = route.params?.currentUser;

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>(currentUser?.gender);
  type GenderOption = { label: string; value: string };
  const [items, setItems] = useState<GenderOption[]>([
    { label: "Nam", value: "Male" },
    { label: "Nữ", value: "Female" },
    { label: "Khác", value: "Other" },
  ]);

  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(
    new Date(currentUser?.dateOfBirth as string)
  );
  const [userInfo, setUserInfo] = useState({
    userId: currentUser?.userId,
    avatar: currentUser?.avatarURL,
    username: currentUser?.username,
    email: currentUser?.email,
    genre: currentUser?.gender,
    dayOfBirth: date,
  });
  const hashPassword = (password?: string) => {
    return password;
  };
  const handleInputChange = (key: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));
    if (key === "dateOfBirth") {
      setDate(new Date(value));
    }
  };
  const handleSave = async () => {
    // if (userInfo.newPassword || userInfo.confirmPassword) {
    //   if (hashPassword(userInfo.passwordtest) !== user.password) {
    //     alert("Mật khẩu hiện tại chưa đúng");
    //     return;
    //   }

    //   if (userInfo.newPassword !== userInfo.confirmPassword) {
    //     alert("Mật khẩu và xác nhận mật khẩu không khớp");
    //     return;
    //   }
    // }
    const accessToken = await getToken();
    userInfo.userId = currentUser?.userId;
    const editProfileUser = async () => {
      try {
        await request.put("user/update-user", userInfo, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        alert("Lưu thông tin thành công");
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    };
    editProfileUser();
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
      {isUserLogged ? (
        <View>
          <SafeAreaView>
            <View style={styles.containerHeaderProfile}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={styles.backIcon}
                  size={25}
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
              <Avatar
                rounded
                size={70}
                source={{ uri: currentUser?.avatarURL }}
              />
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
                editable={false}
              />
              <Text style={styles.titleItem}>Giới tính</Text>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={(value: any) => {
                  const selectedValue =
                    typeof value === "function" ? value() : value;
                  setValue(selectedValue);
                  handleInputChange("gender", selectedValue);
                }}
                setItems={setItems}
                searchable={false}
                textStyle={{
                  fontSize: 15,
                  color: "grey",
                }}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#202020",
                }}
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
                    handleInputChange(
                      "dateOfBirth",
                      currentDate.toLocaleDateString()
                    );
                  }}
                />
              )}
            </View>
            <View style={styles.inforPassword}>
              <Text style={styles.titleItem}>Mật khẩu hiện tại</Text>
              <TextInput
                style={styles.inputItem}
                // value={userInfo.passwordtest}
                secureTextEntry={true}
                onChangeText={(text) => handleInputChange("passwordtest", text)}
              />
              <Text style={styles.titleItem}>Mật khẩu mới</Text>
              <TextInput
                style={styles.inputItem}
                // value={userInfo.newPassword}
                secureTextEntry={true}
                onChangeText={(text) => handleInputChange("newPassword", text)}
              />
              <Text style={styles.titleItem}>Xác nhận lại mật khẩu mới</Text>
              <TextInput
                style={styles.inputItem}
                // value={userInfo.confirmPassword}
                secureTextEntry={true}
                onChangeText={(text) =>
                  handleInputChange("confirmPassword", text)
                }
              />
            </View>
          </ScrollView>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={{
              color: "white",
              paddingTop: 50,
              paddingLeft: 70,
            }}
          >
            Đăng nhập xem thông tin của bạn.
          </Text>
        </TouchableOpacity>
      )}
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
