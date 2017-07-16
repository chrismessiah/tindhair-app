import { StyleSheet } from 'react-native';

let borderRadius = 10;

const styles = StyleSheet.create({
  touchable: {
    borderRadius: borderRadius,
  },
  buttonContainer: {
    justifyContent: 'center',
    height: 40,
    width: 200,
    borderRadius: borderRadius,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
  }
});

export default styles;
