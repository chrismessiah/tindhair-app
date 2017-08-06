import { combineReducers } from 'redux'
import global from './dataReducer'
import nav from './navReducer'

const rootReducer = combineReducers({
    global,
    nav
})

export default rootReducer
