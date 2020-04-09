import React from 'react';
import Search from './search';

export default function LeftPanel({ onSearch, setLanguage, language, enableDarkMode, disableDarkMode }) {
  return (
    <div className='left-panel'>
      <div className='title'>{language === 'cn' ? '香港狗公園' : 'HK Dog Parks'}</div>
      <div className='btn-wrap'>
        <button
          className='btn'
          onClick={(e) => {
            setLanguage('cn');
            enableDarkMode();
          }}
        >
          中文{' '}
          <span role='img' aria-label='chinese-language'>
            🇨🇳
          </span>
        </button>
        <button
          className='btn'
          onClick={(e) => {
            setLanguage('en');
            disableDarkMode();
          }}
        >
          English{' '}
          <span role='img' aria-label='english-language'>
            🇺🇸
          </span>
        </button>
      </div>
      <Search
        onSearch={(evt) => {
          onSearch(evt);
        }}
        language={language}
      />
    </div>
  );
}
