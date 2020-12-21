import axios from 'axios'
import {
  REVIEW_LIST_REQUEST,
  REVIEW_LIST_SUCCESS,
  REVIEW_LIST_FAIL,
  REVIEW_DETAILS_SUCCESS,
  REVIEW_DETAILS_FAIL,
  REVIEW_DETAILS_REQUEST,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_FAIL,
  REVIEW_DELETE_SUCCESS,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_COMMENT_REQUEST,
  REVIEW_COMMENT_FAIL,
  REVIEW_COMMENT_SUCCESS,
  REVIEW_TOP_REQUEST,
  REVIEW_TOP_FAIL,
  REVIEW_TOP_SUCCESS,
} from '../constants/reviewConstants'

export const listReviews = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: REVIEW_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/reviews?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: REVIEW_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listReviewDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/reviews/${id}`)

    dispatch({
      type: REVIEW_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteReview = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/reviews/${id}`, config)

    dispatch({
      type: REVIEW_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createReview = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/reviews`, {}, config)

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateReview = (review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/reviews/${review._id}`,
      review,
      config
    )

    dispatch({
      type: REVIEW_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createReviewComment = (reviewId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: REVIEW_COMMENT_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/reviews/${reviewId}/comments`, comment, config)

    dispatch({
      type: REVIEW_COMMENT_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listTopReviews = () => async (dispatch) => {
  try {
    dispatch({ type: REVIEW_TOP_REQUEST })

    const { data } = await axios.get(`/api/reviews/top`)

    dispatch({
      type: REVIEW_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: REVIEW_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
