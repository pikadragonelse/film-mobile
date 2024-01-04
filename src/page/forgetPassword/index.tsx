import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../../../App";
import { Logo } from "../../assets/logo";
import Colors from "../../constants/Colors";
import { setIslogin, setUsername } from "../../redux/reducer/isLogin";
import { request } from "../../utils/request";
import { storeToken } from "../auth";

export type ForgetPasswordScreenProp = StackScreenProps<RootStackParamList>;
export const ForgetPassword = ({
  navigation,
  route,
}: ForgetPasswordScreenProp) => {
  const [email, setEmail] = useState("");
  const handleConfirm = async () => {
    if (!email) {
      alert("Vui lòng nhập email.");
      return;
    }
    const postEmail = {
      email: email,
    };
    await request
      .post("auth/forgot-password", postEmail)
      .then((response) => {
        if (response.data.status == "Ok!") {
          alert("Hãy vào mail của bạn để xác nhận nhé!.");
        }
        navigation.navigate("Home");
      })
      .catch(function (err) {
        console.error(err);
        alert("Hãy kiểm tra lại email bạn nhập nhé!.");
      });
 
  };

  return (
    <KeyboardAvoidingView>
      <View style={styles.containerLogin}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={styles.backIcon}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subHeaderLogin}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Logo />
        </TouchableOpacity>
      </View>
      <View style={styles.begin}>
        <Text style={styles.LoginText1}>Chào mừng trở lại,</Text>
        <Text style={styles.LoginText2}>
          nhập email để có thể lấy lại mật khẩu
        </Text>
      </View>
      <View style={styles.ctnLogin}>
        <View style={styles.username}>
          <TextInput
            style={styles.usernameText}
            placeholder="Nhập email xác nhận"
            placeholderTextColor="grey"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>

        <TouchableOpacity style={styles.btnLogin} onPress={handleConfirm}>
          <Text style={styles.loginText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.btnNewAcc}>
        <Text style={styles.btnNewAccText}>Bạn mới sử dụng MOVTIME? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.new}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerLogin: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 5,
    paddingBottom: 8,
    zIndex: 999,
  },
  backIcon: {
    color: "silver",
  },
  subHeaderLogin: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  begin: {
    padding: 10,
  },
  LoginText1: {
    color: Colors.WHITE,
    fontSize: 23,
    fontWeight: "600",
  },
  LoginText2: {
    color: Colors.WHITE,
    fontWeight: "500",
    marginTop: 3,
    fontSize: 16,
  },
  ctnLogin: {
    marginTop: 60,
    padding: 80,
    paddingLeft: 10,
    paddingRight: 10,
  },
  username: {
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
  },
  usernameText: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10,
  },
  btnLogin: {
    justifyContent: "center",
    backgroundColor: Colors.ACTIVE,
    height: 50,
    marginTop: 30,
    borderRadius: 7,
  },
  loginText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  btnNewAcc: {
    marginTop: 25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btnNewAccText: {
    fontSize: 16,
    textAlign: "center",
    color: "silver",
  },
  new: {
    fontSize: 16,
    color: Colors.ACTIVE,
  },
});
