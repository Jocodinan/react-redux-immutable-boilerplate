import * as Immutable from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

function exampleStates(state = Immutable.fromJS({
  testState: false,
  fetched: true
}), action){
  switch(action.type){
    case 'EXAMPLE_STATE_CHANGE':
      return state.withMutations((map) => {
        map.set("testState", true)
          .set("fetched", false)
      });
    default:
      return state;
  }
}

export const reducers = combineReducers({
  exampleStates,
  routing: routerReducer
});