import { Dimensions } from 'react-native';

const availableWidth = Dimensions.get('window').width;
const elementWidth = (availableWidth-10)/3;
const GRID_MARGIN = 5;

const styles = {
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
    height: elementWidth,
    marginBottom: GRID_MARGIN,
  },
};

export default styles;
