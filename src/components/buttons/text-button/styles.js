import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  buttonTextActive: {
    fontWeight: '600',
  },
  
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonContainerActive: {
    backgroundColor: '#787878',
    borderRadius: 20,
  },
});

export default styles;
