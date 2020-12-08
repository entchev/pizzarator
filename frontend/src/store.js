import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reviewListReducer, reviewDetailsReducer } from './reducers/reviewReducers'
import { fetchCoordsReducer } from './reducers/mapReducer'

const reducer = combineReducers({
    reviewList: reviewListReducer,
    reviewDetails: reviewDetailsReducer,
    coords:  fetchCoordsReducer, 
})
const initialState = {}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
