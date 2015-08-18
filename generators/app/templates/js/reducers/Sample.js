import * as ActionTypes from '../constants/ActionTypes';

let defaultState = {
  title: 'Home'
};

export default function(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
