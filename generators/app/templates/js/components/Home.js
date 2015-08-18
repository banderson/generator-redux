import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from '../../css/app.css';

class Home extends Component {
  render() {
    // injected from the Sample reducer
    const {title} = this.props;
    return (
      <h1 className={styles.text}>Welcome {title}!</h1>
    );
  }
}

export default connect(state => state.Sample)(Home)
