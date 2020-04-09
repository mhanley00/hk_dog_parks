import React, { useState } from 'react';
// import { hot } from 'react-hot-loader';
import { SET_LANGUAGE } from '../constants/actionTypes';
import LeftPanel from 'components/leftPanel';
import Mapview from 'components/mapview';
import { useDispatch, useSelector } from 'react-redux';
import useDarkMode from 'use-dark-mode';
import './app.scss';

export default function App(){
  const [mapCenter, setMapCenter] = useState();
  const dispatch = useDispatch();
  const language = useSelector(state => state.mapview.language);

  const darkMode = useDarkMode(true);

  function handleSearch(evt) {
    setMapCenter(evt);
  }
  function handleLanguage(lang) {
    dispatch({
      type: SET_LANGUAGE,
      lang,
    });
  }
  return (
  <div className='container'>
    <LeftPanel
      enableDarkMode={darkMode.enable}
      disableDarkMode={darkMode.disable}
      setLanguage={e => {
        handleLanguage(e);
      }}
      onSearch={evt => {
        handleSearch(evt);
      }}
      language={language}
      />
    <Mapview center={mapCenter} language={language} />
  </div>
  );
}
