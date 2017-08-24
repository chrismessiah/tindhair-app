import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    //backgroundColor: '#ffffff',
    backgroundColor: '#e9e9ef',
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
  genderDescriptor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fixMiddleGender: {
    left: 10,
  },
  sliderHandle: {
    backgroundColor: '#EA6A50'
  },
  genderHeadline: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  genderBlock: {
    backgroundColor: '#f2f1f1',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    padding: 10,
    marginTop: 20,
  }
});

export default styles;
