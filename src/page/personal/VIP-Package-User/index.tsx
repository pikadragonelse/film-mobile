import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { RootStackParamList } from "../../../../App";
import { Logo } from "../../../assets/logo";
import { PackageInfo } from "../../../components/manage-VIP";
export interface DataType {
    id: string;
    namePackage: string;
    term: string;
    tags: string;
    price: string;
    startDay: string;
    endDay: string;
}
const data: DataType[] = [
    {
        id: "ID7",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID18",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID20",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "active",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID21",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID3",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID4",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID5",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "active",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
    {
        id: "ID30",
        namePackage: "VIP1",
        term: "01 tháng",
        tags: "inactive",
        price: "79000 ₫",
        startDay: "23/01/2023",
        endDay: "23/02/2023",
    },
];
type VIPScreenProp = StackScreenProps<RootStackParamList>;
export const VIPPackageUser = ({ navigation, route }: VIPScreenProp) => {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.containerVIP}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            style={styles.backIcon}
                            size={25}
                        />
                    </TouchableOpacity>
                    <View style={styles.subHeader}>
                        <Text style={styles.titleText}>Quản lý gói VIP</Text>
                    </View>
                </View>
            </SafeAreaView>
            <ScrollView>
                {data.map((packageData, index) => (
                    <PackageInfo key={index} packageData={packageData} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 52,
    },
    containerVIP: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 32,
        paddingHorizontal: 5,
        paddingBottom: 8,
        borderBottomColor: "#8686861f",
        borderBottomWidth: 1,
        zIndex: 999,
    },
    backIcon: {
        color: "silver",
    },
    subHeader: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 5,
    },
    titleText: {
        color: "silver",
        fontSize: 16,
        fontWeight: "600",
    },
    subTitle: {
        color: "silver",
    },
});
