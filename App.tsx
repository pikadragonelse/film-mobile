import React, { ReactNode } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, Dimensions } from "react-native";
import { Icon, makeStyles } from "@rneui/themed";
import { TabNavigator } from "./components/tab-navigator";
import { Header } from "./components/header";
import { SearchScreen } from "./page/search";
import { HeaderSearch } from "./components/header-search";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export type RootStackParamList = {
    BottomTabNav: undefined;
    Search: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    const styles = useStyles();
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: "black",
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
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const useStyles = makeStyles((theme) => ({}));
