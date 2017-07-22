import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ********** GLOBAL ************
  h1White: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white'
  },
  h2White: {
    fontSize: 20,
    color: 'white'
  },
  marginSmall: {
    margin: 20,
  },
  marginSmaller: {
    margin: 5,
  },


  // ***** SPLASH SCREEN ****
  background: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  logo: {
    height: 60,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
  login: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    marginTop: 20,
    backgroundColor: '#A09E9E',
    borderRadius: 10,
  },
  fbButton: {
    alignSelf: 'center',
    marginTop: 350,
  },
  emailButton: {
    alignSelf: 'center',
    marginTop: 20,
  },



  // ******* EMAIL LOGIN *******
  background2: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    backgroundColor: '#f26d4d'
  },
  textButtonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  textButton2: {
    marginLeft: 20,
    marginRight: 20
  },
  inputContaier2: {
    marginTop: 50,
    alignItems: 'center',
  },
  sumbitButton2: {
    marginTop: 200,
  },


  sumbitButton3: {
    marginTop: 270,
  }



});

export default styles;
