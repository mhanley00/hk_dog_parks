import React, { useEffect, useRef } from 'react';
import { attachSearchWidget } from '../controllers/esriMapController';
export default function Search({ onSearch, language }) {
  const searchRef = useRef();
  useEffect(() => {
    attachSearchWidget(searchRef.current);
  }, []);
  return <div className='search-widget' ref={searchRef} />;
}
