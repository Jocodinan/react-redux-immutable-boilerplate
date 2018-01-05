import axios from 'axios';

const apiUrl = 'http://dev-sofia.mycognitiva.io/services/';

export function exampleActionCreator(){
  return{
    type: 'EXAMPLE_STATE_CHANGE',
  }
}

export function exampleFetchData(){
  return function action(dispatch){
    dispatch(fetchStart());

    const request = axios({
      method: 'POST',
      url: apiUrl + 'endpoint',
      data: {
          data: 'test'
      }
    });

    return request.then(
      (response) => {
        dispatch(fetchEnd())
      },
      (err) => {
        dispatch(fetchError(err));
      }
    );
  }
}

function fetchStart(){
  return{
    type: 'FETCH_START'
  }
}

function fetchEnd(){
  return {
    type: 'FETCH_END'
  }
}

function fetchError(){
  return {
    type: 'FETCH_ERROR'
  }
}
