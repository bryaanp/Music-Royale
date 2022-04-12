import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        color: "#1A73E9",
        fontWeight: "bold",
        fontSize: 48,
        marginTop: 10,
        alignSelf: "center",
    },
    logo: {
        flex: 1,
        // width: '100%', height: '100%',
        height: 200,
        width: 200,
        // height: 185,
        // width: 129,
        alignSelf: "center",
        marginTop: 0,
        marginBottom: 0,
    },
    buttontext: {
        position: 'absolute', 
        top: 20, 
        justifyContent: 'center', 
        alignItems: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
        width: '100%', height: '100%',
        height: 54,
        width: 344,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    footnote: {
        height: 41,
        width: 168,
        // marginTop: 100,

    },
    infoBoxWrapper: {
        paddingTop: 10,
        borderRightColor: '#dddddd',
        borderRightWidth: .7,
        borderLeftColor: '#dddddd',
        borderLeftWidth: .7,
        borderTopColor: '#dddddd',
        borderTopWidth: .7,
        flexDirection: 'row',
        height: 100,
        width: 380,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        marginTop: 30,
        // position: 'absolute'
      },
})