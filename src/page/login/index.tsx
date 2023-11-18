import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { RootStackParamList } from "../../../App";
import { Logo } from "../../assets/logo";
import Colors from "../../constants/Colors";

export type LoginScreenProp = StackScreenProps<RootStackParamList>;
export const Login = ({ navigation, route }: LoginScreenProp) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <ScrollView>
      <View style={styles.containerLogin}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={styles.backIcon}
            size={25}
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
        <Text style={styles.LoginText2}>đăng nhập vào tài khoản của bạn</Text>
      </View>
      <View style={styles.ctnLogin}>
        <View style={styles.username}>
          <TextInput
            style={styles.usernameText}
            placeholder="Tên đăng nhập"
            placeholderTextColor="grey"
          />
        </View>
        <View style={styles.password}>
          <TextInput
            style={styles.passwordText}
            placeholder="Mật khẩu"
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            <FontAwesomeIcon
              icon={!showPassword ? faEye : faEyeSlash}
              size={16}
              style={{
                color: "grey",
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.loginText}>Đăng nhập</Text>
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
    </ScrollView>
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
  password: {
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
    position: "relative",
  },
  passwordText: {
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
