import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ******* CENTERING *********
  centerChildrenBoth: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerChildrenHorizontal: {
    flex: 1,
    alignItems: 'center',
  },
  centerChildrenVertical: {
    flex: 1,
    justifyContent: 'center',
  },

  // ********* BACKGROUND COVERS ********
  coverBackground: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
});

export default styles;
