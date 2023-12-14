import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
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
  KeyboardAvoidingView,
} from "react-native";
import DatePicker from "@react-native-community/datetimepicker";
import { RootStackParamList } from "../../../App";
import { Logo } from "../../assets/logo";
import Colors from "../../constants/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import { request } from "../../utils/request";

export type RegisterScreenProp = StackScreenProps<RootStackParamList>;
export const Register = ({ navigation, route }: RegisterScreenProp) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date>();
  const toggleConfirmPassword = () => {
    setShowPassword(!showConfirm);
  };
  //genre
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | null>("");
  type GenderOption = { label: string; value: string };
  const [items, setItems] = useState<GenderOption[]>([
    { label: "Nam", value: "Male" },
    { label: "Nữ", value: "Female" },
    { label: "Khác", value: "Other" },
  ]);

  //api
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm: "",
    birthday: "",
    gender: "",
  });
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async () => {
    try {
      if (formData.password !== formData.confirm) {
        alert("Mật khẩu và xác nhận mật khẩu không khớp");
        return;
      }
      const registrationData = {
        email: formData.email,
        dateOfBirth: formData.birthday,
        gender: formData.gender,
        username: formData.username,
        password: formData.password,
      };
      const response = await request.post("auth/register", registrationData);

      console.log("Registration successful:", response.data);
      alert("Đăng kí tài khoản thành công");
      navigation.navigate("Login");
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
        <Text style={styles.ResgiterText1}>Chào mừng đến với Movtime,</Text>
        <Text style={styles.ResgiterText2}>đăng ký tài khoản để sử dụng</Text>
      </View>
      <View style={styles.ctnRegister}>
        <View style={styles.email}>
          <TextInput
            style={styles.emailText}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={(text) => handleChange("email", text)}
            value={formData.email}
          />
        </View>
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
            onPress={togglePassword}
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
        <View style={styles.confirmPassword}>
          <TextInput
            style={styles.confirmPasswordText}
            placeholder="Xác nhận lại mật khẩu"
            placeholderTextColor="grey"
            secureTextEntry={!showPassword}
            onChangeText={(text) => handleChange("confirm", text)}
            value={formData.confirm}
          />
          <TouchableOpacity
            onPress={toggleConfirmPassword}
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            <FontAwesomeIcon
              icon={!showConfirm ? faEye : faEyeSlash}
              size={16}
              style={{
                color: "grey",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.ctnbirthGenre}>
          <View style={styles.birthday}>
            <TouchableOpacity
              onPress={() => {
                setShowPicker(true);
              }}
            >
              <TextInput
                style={styles.birthdayText}
                placeholder="Ngày sinh"
                placeholderTextColor="grey"
                value={date ? date.toLocaleDateString() : ""}
                editable={false}
              />
              <FontAwesomeIcon
                icon={faCalendarDays}
                size={16}
                style={{
                  color: "grey",
                  position: "absolute",
                  right: 10,
                  top: 5,
                }}
              />
            </TouchableOpacity>
            {showPicker && (
              <DatePicker
                value={new Date()}
                placeholderText={"Ngày sinh"}
                mode={"date"}
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || new Date();
                  setShowPicker(false);
                  setDate(currentDate);
                  handleChange("birthday", currentDate.toLocaleDateString());
                }}
              />
            )}
          </View>
          <View style={styles.genre}>
            {/* <TextInput
              style={styles.usernameText}
              placeholder="giới tính"
              placeholderTextColor="grey"
            /> */}
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={(value: any) => {
                const selectedValue =
                  typeof value === "function" ? value() : value;
                setValue(selectedValue);
                handleChange("gender", selectedValue);
              }}
              setItems={setItems}
              placeholder={"Giới tính"}
              searchable={false}
              textStyle={{
                fontSize: 15,
                color: "grey",
              }}
              style={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnRegister}
          onPress={handleRegistration}
        >
          <Text style={styles.registerText}>Đăng ký</Text>
        </TouchableOpacity>
        <Text style={styles.txt}>
          Bằng việc đăng kí, bạn đã chấp nhận tất cả các điều khoản của chúng
          tôi.
        </Text>
      </View>

      <View style={styles.btnLogin}>
        <Text style={styles.btnLoginText}>Bạn đã có tài khoản? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={styles.new}>Đăng nhập ngay</Text>
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
  ResgiterText1: {
    color: Colors.WHITE,
    fontSize: 23,
    fontWeight: "600",
  },
  ResgiterText2: {
    color: Colors.WHITE,
    fontWeight: "500",
    marginTop: 3,
    fontSize: 16,
  },
  ctnRegister: {
    padding: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  email: {
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
  },
  emailText: { color: "#fff", fontSize: 16, paddingLeft: 10 },
  username: {
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
    marginTop: 10,
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
  confirmPassword: {
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
    position: "relative",
  },
  confirmPasswordText: { color: "#fff", fontSize: 16, paddingLeft: 10 },
  btnRegister: {
    justifyContent: "center",
    backgroundColor: Colors.ACTIVE,
    height: 50,
    marginTop: 50,
    borderRadius: 7,
  },
  registerText: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },
  btnLogin: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  txt: {
    fontSize: 13,
    color: "grey",
    marginTop: 12,
  },
  btnLoginText: {
    fontSize: 16,
    textAlign: "center",
    color: "silver",
  },
  new: {
    fontSize: 16,
    color: Colors.ACTIVE,
  },
  ctnbirthGenre: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  birthday: {
    width: "48%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
    marginTop: 10,
  },
  genre: {
    width: "48%",
    height: 50,
    justifyContent: "center",
    borderWidth: 1.5,
    borderStyle: "solid",
    borderColor: "#8686861f",
    borderRadius: 7,
    marginTop: 10,
    zIndex: 999,
  },
  birthdayText: {
    fontSize: 16,
    color: "#fff",
    paddingLeft: 10,
  },
});
