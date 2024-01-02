import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { DataType } from "../../page/personal/VIP-Package-User";

interface PackageProps {
    packageData: DataType;
}

export const PackageInfo: React.FC<PackageProps> = ({ packageData }) => {
    return (
        <View style={styles.container}>
            {packageData.tags === "active" ? (
                <Text style={styles.headingActive}>
                    Package ID: {packageData.id}
                </Text>
            ) : (
                <Text style={styles.heading}>Package ID: {packageData.id}</Text>
            )}

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{packageData.namePackage}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Term:</Text>
                <Text style={styles.value}>{packageData.term}</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.label}>Tags:</Text>
                <Text style={styles.value}>{packageData.tags}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{packageData.price}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Start Day:</Text>
                <Text style={styles.value}>{packageData.startDay}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>End Day:</Text>
                <Text style={styles.value}>{packageData.endDay}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#8686861f",
    },
    headingActive: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: Colors.ACTIVE,
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
        color: "silver",
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "silver",
    },
    value: {
        fontSize: 16,
        color: "white",
    },
});

export default PackageInfo;
