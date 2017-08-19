import { StyleSheet } from 'react-native';

let borderRadius = 10;
let width = 230;

const styles = StyleSheet.create({
  view: {
    width: width,
    margin: 10,
  },
  touchable: {
    borderRadius: borderRadius,
  },
  buttonContainer: {
    justifyContent: 'center',
    height: 40,
    width: width,
    borderRadius: borderRadius,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 16,
  }
});

export default styles;
