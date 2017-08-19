import { StyleSheet } from 'react-native';

const HEART_WH_RATIO = 1.1052631579;
const borderRadius = 10;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 285,
    margin: 20,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  image: {
    width: 250,
    height: 250,
    borderTopLeftRadius: borderRadius,  // android fix
    borderTopRightRadius: borderRadius, // android fix
  },
  canvas: {
    width: 250,
    height: 285,
    overflow: 'hidden',
    borderRadius: borderRadius,
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  textContainer: {
    height: 15,
    width: 250,
    flex:1,
    paddingLeft: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#4b4b4b',
  },
  heartContainer: {
    height: 15,
    width: 15,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 10,
  },
  heartImage: {
    marginLeft: 5,
    height: 15,
    width: 15*HEART_WH_RATIO,
  },
  heartText: {
    color: '#ED3A69',
  }
});

export default styles;
