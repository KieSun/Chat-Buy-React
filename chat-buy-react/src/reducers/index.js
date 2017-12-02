import {combineReducers} from 'redux'
import UserReducer from '../reducers/user'
import GoodsReducer from '../reducers/goods'

export default combineReducers({
    user: UserReducer,
    goods: GoodsReducer
})