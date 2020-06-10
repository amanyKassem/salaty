import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import cities from './CitiesReducer';
import profile from './ProfileReducer';

export default combineReducers({
    lang,
    auth,
    cities,
    profile,
});
