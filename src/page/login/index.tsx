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

export type LoginScreenProp = StackScreenProps<RootStackParamList>;
export const Login = ({ navigation, route }: LoginScreenProp) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const saveUserDataToStorage = async (userData: any) => {
    try {
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day
      const dataToStore = {
        ...userData,
        expires: expirationTime,
      };

      await AsyncStorage.setItem("userData", JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Lỗi khi lưu thông tin người dùng:", error);
    }
  };
  const handleLogin = async () => {
    try {
      if (!formData.username || !formData.password) {
        alert("Vui lòng nhập username và mật khẩu.");
        return;
      }
      const loginData = {
        username: formData.username,
        password: formData.password,
      };
      const response = await request.post("auth/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const authToken = response.data.result.token.accessToken;
      try {
        await storeToken(authToken);
      } catch (error) {
        console.error("Error storing token:", error);
      }

      dispatch(setIslogin(true));
      if (loginData.username) {
        dispatch(setUsername(loginData.username));
        await saveUserDataToStorage({ username: loginData.username });
      }

      alert("Đăng nhập tài khoản thành công");
      navigation.navigate("Home");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const dispatch = useDispatch();
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
        <Text style={styles.LoginText2}>đăng nhập vào tài khoản của bạn</Text>
      </View>
      <View style={styles.ctnLogin}>
        <View style={styles.username}>
          <TextInput
            style={styles.usernameText}
            placeholder="Tên đăng nhập"
            placeholderTextColor="grey"
            onChangeText={(text) => handleChange("username", text)}
            value={formData.username}
          />
        </View>
        <View style={styles.password}>
          <TextInput
            style={styles.passwordText}
            placeholder="Mật khẩu"
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            onChangeText={(text) => handleChange("password", text)}
            value={formData.password}
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
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.loginText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgetPassword");
          }}
        >
          <Text style={styles.forget}>Quên mật khẩu</Text>
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
  forget: {
    marginTop: 14,
    fontSize: 15,
    color: Colors.ACTIVE,
    textDecorationLine: "underline",
    textAlign: "right",
  },
});
