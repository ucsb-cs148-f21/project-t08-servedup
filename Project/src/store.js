import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './Reducers/loginReducer';

const rootReducer = combineReducers({
    loginReducer
})
 
export const Store = createStore(rootReducer, applyMiddleware(thunk));