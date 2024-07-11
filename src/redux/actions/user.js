import {
    TOKEN, USER, HOMEPOSTS, HOMEPOSTSBUILDER
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
export function homePosts(posts) {
    // console.log("userObject in redux action",userObject)
    return {
        type: HOMEPOSTS,
        payload: posts
    }
}
export function homePostsBuilder(posts) {
    // console.log("userObject in redux action",userObject)
    return {
        type: HOMEPOSTSBUILDER,
        payload: posts
    }
}
