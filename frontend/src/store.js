import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reviewListReducer,
  reviewDetailsReducer,
  reviewCreateReducer,
  reviewDeleteReducer,
  reviewUpdateReducer,
  reviewCommentReducer,
  reviewTopRatedReducer,
} from './reducers/reviewReducers'
import { fetchCoordsReducer } from './reducers/mapReducer'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'

const reducer = combineReducers({
  reviewList: reviewListReducer,
  reviewDetails: reviewDetailsReducer,
  reviewCreate: reviewCreateReducer,
  reviewDelete: reviewDeleteReducer,
  reviewUpdate: reviewUpdateReducer,
  reviewComment: reviewCommentReducer,
  reviewTopRated: reviewTopRatedReducer,
  coords: fetchCoordsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
