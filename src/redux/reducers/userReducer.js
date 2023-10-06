import {
    TOKEN, USER,
} from '../constants';

const initialState = {
    user: {},
    token: null,
  
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
      
        default:
            return state;
    }
}
export default userReducer;