import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as HomeActions from '../actions/HomeActions';
import styles from '../../css/app.css';

const Home = ({title, dispatch}) => {

  const actions = bindActionCreators(HomeActions, dispatch);
  return (
    <main>
      <h1 className={styles.text}>Welcome {title}!</h1>
      <button onClick={e => actions.changeTitle(prompt())}>
        Update Title
      </button>
      <div>
        <Link to="page">Go to subpage</Link>
      </div>
    </main>
  );
};

export default connect(state => state.Sample)(Home)
