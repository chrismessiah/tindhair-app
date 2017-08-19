import { StyleSheet } from 'react-native';

let borderRadius = 8;
const width = 130;
const height = 30;

const styles = StyleSheet.create({
  view: {
    width: width*2,
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: borderRadius,
    borderWidth: 1,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width-0.5,
  },
  buttonLeftContainer: {
    borderTopLeftRadius: borderRadius,      // android fix
    borderBottomLeftRadius: borderRadius    // android fix
  },
  buttonRightContainer: {
    borderTopRightRadius: borderRadius,     // android fix
    borderBottomRightRadius: borderRadius   // android fix
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    includeFontPadding: false,
  },
  buttonActive: {
    fontWeight: '500',
  },
  buttonInactive: {
    fontWeight: '300',
  },



});

export default styles;
