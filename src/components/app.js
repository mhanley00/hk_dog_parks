import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { SET_LANGUAGE } from '../constants/actionTypes';
import LeftPanel from 'components/leftPanel';
import Mapview from 'components/mapview';
import { useDispatch, useSelector } from 'react-redux';
import './app.scss';

export default function App(){
  const [mapCenter, setMapCenter] = useState();
  const [language, setLanguage] = useState('cn');
  const dispatch = useDispatch();

  function handleSearch(evt) {
    setMapCenter(evt);
  }
  function handleLanguage(lang) {
    setLanguage(lang);
    dispatch({
      type: SET_LANGUAGE,
      lang,
    });
  }
  return (
  <div className='container'>
    <LeftPanel
      onSearch={evt => {
        handleSearch(evt);
      }}
      setLanguage={e => {
        handleLanguage(e);
      }}
      language={language}
      /> 
    <Mapview center={mapCenter} language={language} />
  </div>
  );
};

