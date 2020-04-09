import React, { useEffect, useState, useRef } from 'react';
import { initialize } from '../controllers/esriMapController';

export default function MapView({ center, language }) {
  const mapRef = useRef();
  const [view, setView] = useState(null);
  console.log(center, language);

  useEffect(() => {
    initialize(mapRef.current);
  }, []);
  // gets called every time something changes the "center" state
  useEffect(() => {
    if (view && center) {
      view.center = center;
    }
  }, [center, view]);

  return (
    <div
      className='map'
      ref={mapRef}
      style={{ width: '100%', height: '100%', margin: '0px' }}
    />
  );
}
