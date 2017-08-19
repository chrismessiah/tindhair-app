import { StyleSheet } from 'react-native';

let borderRadius = 8;
const width = 130;
const height = 30;

const styles = StyleSheet.create({
  view: {
    width: width*2+30,
    margin: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    zIndex: 100,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width+10-1,
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
