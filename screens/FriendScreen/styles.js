import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 300,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    entityContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    title: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
      },
      infoBoxWrapper: {
        paddingTop: 5,
        borderBottomColor: '#dddddd',
        borderBottomWidth: .7,
        borderTopColor: '#dddddd',
        borderTopWidth: .7,
        flexDirection: 'row',
        height: 30,
        width: 300,
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
      },
})