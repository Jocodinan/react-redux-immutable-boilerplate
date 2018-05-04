import * as Immutable from 'immutable';

export function generalStates(state = Immutable.fromJS({
  test: false,
}), action){
  switch(action.type){
    case 'TEST':
      return state.set('test', true)
    default:
      return state;
  }
}