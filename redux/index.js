import { combineReducers } from 'redux'
import {user} from "./user.redux"

const appReducer = combineReducers({user})

export default appReducer