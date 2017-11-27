import {combineReducers} from 'redux'
import UserReducer from '../reducers/user'

export default combineReducers({
    user: UserReducer,
})