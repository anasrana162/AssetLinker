import {
    TOKEN, USER,HOMEPOSTS
} from '../constants';

const initialState = {
    user: {},
    token: null,
    homeposts: null,

};

const userReducer = (state = initialState, action) => {
    // console.log("action.payload in Redux",action.payload)
    switch (action.type) {
        case TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case USER:
            return {
                ...state,
                user: action.payload
            };
        case HOMEPOSTS:
            return {
                ...state,
                homeposts: action.payload
            };

        default:
            return state;
    }
}
export default userReducer;