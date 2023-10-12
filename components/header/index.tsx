import React, {
    MutableRefObject,
    RefObject,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    TextInput,
} from "react-native";
import { Logo } from "../../assets/logo";
import { SearchBar } from "@rneui/base";
import { faCrown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, Icon } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { TabParamList } from "../tab-navigator";
import { RootStackParamList } from "../../App";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

type HomeScreenProp = CompositeScreenProps<
    BottomTabScreenProps<TabParamList>,
    StackScreenProps<RootStackParamList>
>;

export const Header = ({ navigation, route }: HomeScreenProp) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <SafeAreaView>
            <View style={styles.containerHeader}>
                <Logo />
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={(value) => setSearchValue(value)}
                        value={searchValue}
                        containerStyle={styles.searchBarContainer}
                        inputStyle={styles.inputSearch}
                        inputContainerStyle={styles.searchBar}
                        onPressIn={() => {
                            navigation.navigate("Search");
                        }}
                    />
                </View>
                <Button
                    radius={"sm"}
                    type="solid"
                    buttonStyle={{
                        backgroundColor: "#F3BF83",
                        height: 35,
                        width: 70,
                        alignItems: "center",
                    }}
                    titleStyle={{
                        color: "black",
                        fontSize: 14,
                        marginTop: -1,
                    }}
                >
                    <FontAwesomeIcon
                        icon={faCrown}
                        style={{ marginRight: 5 }}
                    />
                    VIP
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 32,
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    searchBarContainer: {
        width: 250,
        border: "none",
        backgroundColor: "black",
    },
    inputSearch: {
        fontSize: 13,
    },
    searchBar: {
        backgroundColor: "#8686861f",
        height: 35,
    },
});
