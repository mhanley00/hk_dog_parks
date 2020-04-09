import { SET_LANGUAGE } from 'constants/actionTypes';
import { switchSearchLang } from '../../controllers/esriMapController';
const initialState = 'cn';

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      switchSearchLang(action.lang);
      return action.lang || initialState;
    default:
      return state;
  }
};
