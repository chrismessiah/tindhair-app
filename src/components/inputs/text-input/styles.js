import { StyleSheet } from 'react-native';

let borderRadius = 8;
let boxHeight = 40;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 15,
    height: boxHeight,
  },
  textBox: {
    justifyContent: 'center',
    borderRadius: borderRadius,
    backgroundColor: 'white',
    height: boxHeight,
    width: 220,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
  },
});

export default styles;
