import {combineReducers} from 'redux'
import UserReducer from '../reducers/user'
import GoodsReducer from '../reducers/goods'
import {
    LOG_OUT
} from '../actions/type'
import history from '../common/history'

const appReducer = combineReducers({
    user: UserReducer,
    goods: GoodsReducer
})
  
const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        history.push('/login')
        window.localStorage.clear()
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer