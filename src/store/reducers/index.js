import reducer from './reducer';
import {combineReducers} from 'redux';
import userReducer from './userReducer';


export default combineReducers({
    root: reducer,
    user : userReducer
});

