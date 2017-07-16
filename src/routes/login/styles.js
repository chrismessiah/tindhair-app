import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
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
  fbLogin: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 40,
    width: 200,
    marginTop: 350,
    //backgroundColor: '#265BFF',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
    // fontWeight: 'bold'
  }
});

export default styles;
