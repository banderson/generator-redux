import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';

class Home extends Component {
  render() {
    const {title, dispatch} = this.props;
    const actions = bindActionCreators(HomeActions, dispatch);
    return (
      <main>
        <h1 className={styles.text}>Welcome {title}!</h1>
        <button onClick={e => actions.changeTitle(prompt())}>
          Update Title
        </button>
      </main>
    );
  }
}

export default connect(state => state.Sample)(Home)
