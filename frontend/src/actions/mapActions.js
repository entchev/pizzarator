import axios from 'axios'
import {
  FETCH_COORDS_REQUEST,
  FETCH_COORDS_SUCCESS,
  FETCH_COORDS_FAIL,
} from '../constants/mapConstants'

export const fetchCoords = (postcode) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_COORDS_REQUEST })

    const { data } = await axios.get(
      `http://api.postcodes.io/postcodes/${postcode}`
    )

    dispatch({
      type: FETCH_COORDS_SUCCESS,
      payload: {
        position: {
          lat: data.result.latitude,
          lng: data.result.longitude,
        },
      },
    })
  } catch (error) {
    dispatch({
      type: FETCH_COORDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
