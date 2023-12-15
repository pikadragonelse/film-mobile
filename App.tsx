import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { makeStyles } from "@rneui/themed";
import React from "react";
import { Provider } from "react-redux";
import { ActorDetail } from "./src/components/actor-detail/intex";
import { TabNavigator } from "./src/components/tab-navigator";
import { CurrentUser, Watching } from "./src/page/watching";
import { Rank } from "./src/page/rank";
import { Personal } from "./src/page/personal";
import { Login } from "./src/page/login";
import { VIPPackage } from "./src/page/personal/VIP-package";
import { Collection } from "./src/page/personal/collection";
import { HistoryList } from "./src/page/personal/history";
import { Lovelist } from "./src/page/personal/lovelist";
import { Profile } from "./src/page/personal/profile";
import { Register } from "./src/page/register";
import { SearchScreen } from "./src/page/search";
import { store } from "./src/redux/store";
import { ForgetPassword } from "./src/page/forgetPassword";

export type RootStackParamList = {
  BottomTabNav: undefined;
  Search: undefined;
  Watching: { movieId?: number; episodeId?: number };
  Rank: undefined;
  Personal: undefined;
  Login: undefined;
  VIPPackage: undefined;
  // Profile: undefined;
  Profile: { currentUser: CurrentUser };
  Collection: undefined;
  History: undefined;
  Lovelist: undefined;
  Home: undefined;
  Register: undefined;
  Actor: undefined;
  ForgetPassword: undefined;
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
            initialParams={{ movieId: 0, episodeId: 0 }}
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
          <Stack.Screen
            name="Actor"
            component={ActorDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const useStyles = makeStyles((theme) => ({}));
