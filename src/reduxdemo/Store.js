import {createStore} from 'redux'
import {AuthReducer} from './Reducer'

var Store=createStore(AuthReducer)

export default Store