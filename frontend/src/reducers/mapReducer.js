import {
  FETCH_COORDS_REQUEST,
  FETCH_COORDS_SUCCESS,
  FETCH_COORDS_FAIL,
} from '../constants/mapConstants'

export const fetchCoordsReducer = (state = { position: {} }, action) => {
  switch (action.type) {
    case FETCH_COORDS_REQUEST:
      return { loading: true, ...state }
    case FETCH_COORDS_SUCCESS:
      return { loading: false, coords: action.payload }
    case FETCH_COORDS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
