import React, { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Dimensions } from "react-native";
import { Icon, makeStyles } from "@rneui/themed";
import { TabNavigator } from "./src/components/tab-navigator";
import { Header } from "./src/components/header";
import { SearchScreen } from "./src/page/search";
import { HeaderSearch } from "./src/components/header-search";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { Watching } from "./src/page/watching";
import { Rank } from "./src/page/rank";
import { Personal } from "./src/page/personal";
import { Login } from "./src/page/login";
import { Profile } from "./src/page/personal/profile";
import { Collection } from "./src/page/personal/collection";
import { HistoryList } from "./src/page/personal/history";
import { VIPPackage } from "./src/page/personal/VIP-package";
import { Lovelist } from "./src/page/personal/lovelist";
import { Register } from "./src/page/register";

export type RootStackParamList = {
  BottomTabNav: undefined;
  Search: undefined;
  Watching: { filmId: number };
  Rank: undefined;
  Personal: undefined;
  Login: undefined;
  VIPPackage: undefined;
  Profile: undefined;
  Collection: undefined;
  History: undefined;
  Lovelist: undefined;
  Home: undefined;
  Register: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const styles = useStyles();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#191919",
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="BottomTabNav"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Watching"
            component={Watching}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Rank"
            component={Rank}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Personal"
            component={Personal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VIPPackage"
            component={VIPPackage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Collection"
            component={Collection}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Lovelist"
            component={Lovelist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="History"
            component={HistoryList}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const useStyles = makeStyles((theme) => ({}));
