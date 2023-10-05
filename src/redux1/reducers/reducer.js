const INITIAL_STATES = {
  user: null,
  token: '',
  loader: false,
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {
    case 'SAVE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'LOGOUT':
      return INITIAL_STATES;
    case 'LOADER_START':
      return {
        ...state,
        loader: true,
      };
    case 'LOADER_STOP':
      return {
        ...state,
        loader: false,
      };
    default:
      return state;
  }
}
