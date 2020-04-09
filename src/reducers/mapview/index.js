import { combineReducers } from 'redux';

import layers from 'reducers/mapview/layers';
import error from 'reducers/mapview/error';
import language from 'reducers/mapview/language';

const mapview = combineReducers({
  layers,
  error,
  language
});

export default mapview;
