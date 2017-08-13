import { StyleSheet } from 'react-native';

const HEART_WH_RATIO = 1.1052631579;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 250,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
  image: {
    width: 250,
    height: 250,
  },
  canvas: {
    overflow: 'hidden',
    width: 250,
    height: 285,
    overflow: 'hidden',
    borderRadius: 10,
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
