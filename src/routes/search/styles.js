import { StyleSheet, Dimensions } from 'react-native';

const availableWidth = Dimensions.get('window').width;
const elementWidth = (availableWidth-10)/3;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  image: {
    width: elementWidth,
    height: elementWidth
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    width: elementWidth,
    marginBottom: 5,
  },
});

export default styles;
