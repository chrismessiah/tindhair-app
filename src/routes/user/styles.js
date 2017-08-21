import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  toggleButton: {
    marginTop: 40,
  },
  gradientButton: {
    marginTop: 20,
    marginBottom: 0,
  },
  header: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  headerText: {
    color: '#C7C7C7',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerActiveText: {
    color: '#262626',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
