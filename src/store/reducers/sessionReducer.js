import {
  LOAD_USER,
  UPDATE_USER,
  RESTORE_USER,
  SET_LOADING_STATUS,
} from '../actions/sessionActions.types';

const initialState = {
  user: null,
  isLoading: true,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
    case UPDATE_USER:
    case RESTORE_USER: {
      const { user } = action.payload;

      return {
        ...state,
        user,
      };
    }
    case SET_LOADING_STATUS: {
      const { isLoading } = action.payload;

      return {
        ...state,
        isLoading,
      };
    }
    default:
      return state;
  }
};

export default sessionReducer;
