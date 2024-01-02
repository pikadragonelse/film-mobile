import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Input, SearchBar } from "@rneui/base";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { SearchScreenProps } from "../../page/search";
// import { styles } from "../../page/watching/style";

export const HeaderSearch = ({ navigation, route }: SearchScreenProps) => {
    const [searchValue, setSearchValue] = useState("");

    const searchBarRef = useRef<any>(null);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (searchBarRef.current != null) {
            const unsubscribe = navigation.addListener("transitionEnd", () => {
                searchBarRef.current?.focus();
            });
            return unsubscribe;
        }
    }, [navigation, searchBarRef.current]);

    return (
        <View style={styles.containerHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesomeIcon
                    icon={faAngleLeft}
                    style={styles.backIcon}
                    size={25}
                />
            </TouchableOpacity>
            <SearchBar
                ref={searchBarRef}
                autoFocus
                placeholder="Type Here..."
                onChangeText={(value) => setSearchValue(value)}
                value={searchValue}
                containerStyle={styles.searchBarContainer}
                inputStyle={styles.inputSearch}
                inputContainerStyle={styles.searchBar}
            />
        </View>
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
        flex: 1,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
        backgroundColor: "transparent",
        position: "relative",
    },
    inputSearch: {
        fontSize: 15,
    },
    searchBar: {
        backgroundColor: "#8686861f",
        height: 40,
        borderRadius: 6,
    },
    backIcon: {
        color: "silver",
    },
});
