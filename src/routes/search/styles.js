import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  image: {
    width: 200,
    height: 200,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: 122,
    marginBottom: 5,
  }
});

export default styles;
