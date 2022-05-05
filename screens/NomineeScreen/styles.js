import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  infoBoxWrapper: {
      paddingTop: 0,
      borderRadius: 20,
      borderRightColor: '#dddddd',
      borderRightWidth: .7,
      borderLeftColor: '#dddddd',
      borderLeftWidth: .7,
      borderTopColor: '#dddddd',
      borderTopWidth: .7,
      borderBottomColor: '#dddddd',
      borderBottomWidth: .7,
      // flexDirection: 'row',
      height: 137,
      width: 175,
      justifyContent: 'center',
      backgroundColor: '#EEEEEE',
      marginLeft: 10,
      // position: 'absolute'
      alignSelf:'center',
      alignItems:'center'
  },
  BoxWrapper: {
    marginTop: .5,
    backgroundColor: '#ededed',
    borderBottomWidth: 1,
    borderColor: '#dddddd', 
    width: 290,
    alignSelf: 'center'

  },
  Caption: {
    fontSize: 13,
    color:'black',
    fontWeight:'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    width: '100%', height: '100%',
    height: 54,
    width: 344,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 5,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
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
  menuBorder: {
    marginTop: 10,
    // justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: '#EEEEEE',
    borderWidth: .7,
    backgroundColor: '#dddddd',
    height: 550,
    width: 300,
  },
  Title: {
    fontSize: 30,
    color:'black',
    fontWeight:'bold',
    alignSelf: 'center',
  },
  button2: {
    marginTop: 10,
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 200,
    alignItems: "center",
    alignSelf:'center',
    justifyContent: 'center',
    marginBottom: 0,
},
  buttonText2: {
      color: 'white',
      fontSize: 16
  },

})