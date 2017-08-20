import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  // statusbar: {
  //   backgroundColor: ((Platform.OS === 'ios') ? 'red' : 'red'),
  //   alignSelf: 'stretch',
  //   height: 20,
  //   zIndex: 1000,
  // },
  header: {
    backgroundColor: ((Platform.OS === 'ios') ? '#f4f4f4' : '#eaeaea'),
    alignSelf: 'stretch',
    height: 48.5,
    borderBottomWidth: 1,
    borderColor: '#c3c3c3',
  }
});

export default styles;
