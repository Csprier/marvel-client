import { 
  REQUEST_PROFILE, 
  PROFILE_SUCCESS, 
  PROFILE_EDIT_MODE,
  PROFILE_ERROR 
} from '../actions/profileActions';

const initialState = {
  data : {},
  editing: false,
	loading: false,
	error: null
};

export default function profileReducer(state = initialState, action){
  switch(action.type) {
    case REQUEST_PROFILE:
      return {
        ...state,
        loading: true
      }
    case PROFILE_SUCCESS:
      return {
        ...state,
			  loading: false,
			  data : action.data
      }
    case PROFILE_EDIT_MODE:
      return {
        ...state,
        editing: !state.editing
      }
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}