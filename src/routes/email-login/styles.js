import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ee5d3d'
  },
  logo: {
    height: 60,
    width: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
  sumbitButton: {
    alignSelf: 'center'
  },
  textButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  inputContaier: {
    marginTop: 50,
  },

  buttonText: {
    fontWeight: '300',
    color: 'white',
  },
  buttonTextActive: {
    fontWeight: '600',
    color: 'white',
  },
  buttonContainerActive: {
    backgroundColor: '#ec7560',
    borderRadius: 20,
  },
});

export default styles;
