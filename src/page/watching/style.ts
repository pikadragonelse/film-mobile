import {
    Dimensions,
    StyleSheet,
} from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    watchingContainer: {
        marginTop: 25,
        position: "relative",
    },
    backIcon: {
        color: "white",
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
        marginVertical: 20,
        marginHorizontal: 10
    },
    sectionTitle: {
        color: "white",
        fontSize: 15,
        marginBottom:8,
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
        paddingVertical: 25,
        paddingHorizontal: 30,
        backgroundColor: "#333333",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    rcmContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 5,
       
    },
    rcmFilmItem: {
        position: "relative",
        width: Dimensions.get("window").width / 3 - 12,
        marginBottom: 10,
        
    },
    rcmFilmImageContainer: {
        width: "100%",
        height: 140,
        borderRadius: 5,
        margin: "auto",
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    rcmFilmSub: {
        position:'absolute',
        color: Colors.WHITE,
        fontSize: 10,
        left:'58.5%',
        borderTopRightRadius:5,
        width:45,
        height:16,
        textAlign:'center',
        backgroundColor: Colors.ACTIVE
    },
    rcmFilmName: {
        color: Colors.GRAY,
        fontSize:12,
        marginTop:5
    },

    buttonMore: {
        position:'relative',
        width : '100%',
        backgroundColor: "#333333",
        paddingVertical:9,
        borderRadius:5,
        marginTop:4,
    },

    buttonMoreIcon: {
        position:'absolute',
        top:"70%",
        left:'41%',
        color: "#a1a1a1",
        },

    buttonMoreText: {
        color: "#a1a1a1",
        textAlign:'center',
    }
});