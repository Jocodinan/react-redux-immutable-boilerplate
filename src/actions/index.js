import axios, { post } from 'axios';

//GENERALES
export function testClick(){
  return {
    type: 'TEST'
  }
}

// //LOGIN
// export function recoverPassChange(username, password){
//   return function action(dispatch){
//     dispatch(fetchLoginStart());

//     const request = axios({
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json;charset=UTF-8' },
//       url: apiUrl + 'auth/ACTUALIZAR_CONTRASENA_USUARIO',
//       data: {
//         username,
//         password
//       }
//     });

//     return request.then(
//       (response) => {
//         if(response.data.estado.codigo === 200){
//           dispatch(loginUser({
//             dispositivo: 'Desktop',
//             geolocalizacion: '',
//             ip: '',
//             navegador: '',
//             password,
//             username
//           }));
//         }else{
//           dispatch(fetchLoginError(response.data.estado.glosa));
//         }
//       },
//       (err) => { 
//         dispatch(fetchLoginError('Error de conexión con el servidor, intente nuevamente'))
//       }
//     );
//   }
// }

// function fetchLoginStart(){
//   return {
//     type: 'FETCH_LOGIN_START'
//   }
// }

// function fetchLoginEnd(userData, code){
//   return {
//     type: 'FETCH_LOGIN_END',
//     userData,
//     code
//   }
// }

// function fetchLoginError(error){
//   return {
//     type: 'FETCH_LOGIN_ERROR',
//     error,
//     messageStatus: 'error'
//   }
// }