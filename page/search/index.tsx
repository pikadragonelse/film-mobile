import React from "react";
import { View } from "react-native";
import { HeaderSearch } from "../../components/header-search";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

export type SearchScreenProps = StackScreenProps<RootStackParamList>;

export const SearchScreen = ({ navigation, route }: SearchScreenProps) => {
    return (
        <View>
            <HeaderSearch navigation={navigation} route={route} />
        </View>
    );
};
