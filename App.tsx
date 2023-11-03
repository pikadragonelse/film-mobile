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

export type RootStackParamList = {
  BottomTabNav: undefined;
  Search: undefined;
  Watching: { filmId: number };
  Rank: undefined;
  Personal: undefined;
  Login: undefined;

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
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );

}

const useStyles = makeStyles((theme) => ({}));
