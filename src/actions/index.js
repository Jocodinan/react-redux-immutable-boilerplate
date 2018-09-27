import axios, { post } from 'axios';
import { apiUrl } from './constants';

//GENERALES
export function testClick(){
  return {
    type: 'TEST'
  }
}

//LOGIN
export function exampleActionCreator(data){
  return function action(dispatch){
    dispatch(exampleActionCreatorStart());

    const request = axios({
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=UTF-8' },
      url: apiUrl + '/ENDPOINT_SLUG',
      data: data
    });

    return request.then(
      (response) => {
        if(response.data.estado.codigo === 200){
          dispatch(exampleActionCreatorEnd(response.data.data))
        }else{
          dispatch(exampleActionCreatorError(response.data.estado.glosa));
        }
      },
      (err) => { 
        dispatch(exampleActionCreatorError('Error de conexión con el servidor, intente nuevamente'))
      }
    );
  }
}

function exampleActionCreatorStart(){
  return {
    type: 'FETCH_LOGIN_START'
  }
}

function exampleActionCreatorEnd(data){
  return {
    type: 'FETCH_LOGIN_END',
    userData,
    code
  }
}

function exampleActionCreatorError(error){
  return {
    type: 'FETCH_LOGIN_ERROR',
    error,
    messageStatus: 'error'
  }
}