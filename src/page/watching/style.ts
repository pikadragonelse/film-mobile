import {
    Dimensions,
    StyleSheet,
} from "react-native";

export const styles = StyleSheet.create({
    watchingContainer: {
        marginTop: 30,
        position: "relative",
    },
    backIcon: {
        color: "white",
        marginLeft:6,
    },
    containerInfo: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    nameFilm: {
        color: "white",
        fontSize: 25,
        fontWeight: "600",
    },
    ratingContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },
    ratingText: {
        color: "white",
        marginLeft: 10,
        fontSize: 15,
    },
    hashtagContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
    },
    hashtagItem: {
        color: "white",
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: "#cecece",
    },
    infoIcon: {
        color: "white",
        marginLeft: "auto",
    },
    desc: {
        color: "white",
        marginTop: 10,
    },
    containerFeature: {
        flexDirection: "row",
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    feature: {
        color: "white",
        marginRight: 35,
    },
    sectionContainer: {
        marginVertical: 10
    },
    sectionTitle: {
        color: "white",
        fontSize: 20,
    },
    sectionDesc:{
        color: "#ececec",
        fontSize: 12,
    },
    sectionContent:{
        marginTop: 10,
    },
    sectionEpisode: {
        color: "white",
        paddingVertical: 10,
        paddingHorizontal: 25,
        backgroundColor: "#333333",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    rcmContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: -40,
    },
    rcmFilmItem: {
        position: "relative",
        width: Dimensions.get("window").width / 3 - 5,
        marginBottom: 5,
    },
    rcmFilmImageContainer: {
        width: "100%",
        height: 160,
        borderRadius: 5,
        margin: "auto",
    },
    rcmFilmSub: {
        color: "#cecece",
        fontSize: 12,
    },
    rcmFilmName: {
        color: "white",
    },
    postCmt:{
        flexDirection: 'row',
        width: '100%',
        marginBottom:-15,
        marginTop:10,
    },
    postText:{
        color:'white',
        width:'65%',
        backgroundColor:'#202020',
        borderRadius:5,
        paddingLeft:5,
        marginLeft:7,
        marginRight:7,
    }
});