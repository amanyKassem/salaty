import { combineReducers } from 'redux';
import lang from './LangReducer';
import auth from './AuthReducer';
import cities from './CitiesReducer';
import profile from './ProfileReducer';
import banks from './BanksReducer';
import myCards from './MyCardsReducer';
import userCards from './UserCardsReducer';
import notifications from './NotificationsReducer';
import cardEnquiry from './CardEnquiryReducer';
import contactSocial from './ContactSocialReducer';
import bill from './BillReducer';

export default combineReducers({
    lang,
    auth,
    cities,
    profile,
    banks,
    myCards,
    userCards,
    notifications,
    cardEnquiry,
    contactSocial,
    bill,
});
