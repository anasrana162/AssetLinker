import {store} from '../index';

function dispatch(action) {
  store.dispatch(action);
}
export function loaderStart() {
  dispatch({type: 'LOADER_START'});
}
export function loaderStop() {
  dispatch({type: 'LOADER_STOP'});
}

export function saveUser(user) {
  dispatch({type: 'SAVE_USER', payload: user});
}

export function saveToken(token) {
  dispatch({type: 'SAVE_TOKEN', payload: token});
}

export function logoutUser() {
  dispatch({type: 'LOGOUT'});
}
