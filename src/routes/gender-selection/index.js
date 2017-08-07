import React from 'react';
import { connect } from 'react-redux'
import { Text, View } from 'react-native';

import ColorButton from '../../components/buttons/color-button/';
import styles from './styles';
import globalStyles from '../../styles';

import { signupUser } from '../../actions/';

class GenderSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: 0};
  }
  _onClick = (gender) => {
    let {fullname, email, password, screenKeys} = this.props.global;
    this.props.dispatch(signupUser(fullname, email, password, gender, screenKeys[1]));
  }
  render() {
    return (
      <View style={[globalStyles.coverBackground, styles.background, globalStyles.centerChildrenHorizontal]}>
        <View style={styles.marginMedium}>
          <Text style={styles.h1}>Puh.. almost done!</Text>
          <Text style={[styles.h2, styles.marginSmall]}>Show me hairstyles for</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ColorButton onPress={() => this._onClick('M')} color={'#5f74e4'} value={'Men'}/>
          <ColorButton onPress={() => this._onClick('F')} color={'#5f74e4'} value={'Women'}/>
          <ColorButton onPress={() => this._onClick('O')} color={'#5f74e4'} value={'Both'}/>
        </View>
      </View>
    )
  }
};

function mapStateToProps(state) {
  return {
    global: state.global
  }
}

export default connect(mapStateToProps)(GenderSelection);
