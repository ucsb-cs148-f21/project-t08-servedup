import { createStore, combineReducers } from 'redux';
import loginReducer from './Reducers/loginReducer';

const rootReducer = combineReducers({
    loginVariable: loginReducer;
})

const configureStore = () => createStore(rootReducer);

export default configureStore;