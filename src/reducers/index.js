import { combineReducers } from 'redux'
import global from './dataReducer'

const rootReducer = combineReducers({
    global,
})

export default rootReducer
