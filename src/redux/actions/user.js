import {
 TOKEN, USER, 
} from '../constants';

export function userToken(token) {
    return {
        type: TOKEN,
        payload: token
    }
}
export function user(userObject) {
    // console.log("userObject in redux action",userObject)
    return {
        type: USER,
        payload: userObject
    }
}
