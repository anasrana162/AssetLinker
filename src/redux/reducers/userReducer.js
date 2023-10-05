import {
    TOKEN, USER,
} from '../constants';

const initialState = {
    user: {},
    token: null,
  
};

const userReducer = (state = initialState, action) => {
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