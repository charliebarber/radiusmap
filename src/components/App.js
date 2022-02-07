import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Sidebar from './sidebar/Sidebar';
import About from './footer/About';
import MapContainer from './map/MapContainer';


function App() {
  const [uniMinutes, setUniMinutes] = useState(20);
  const [uniTransport, setUniTransport] = useState("cycling");

  const handleUniMinutesChange = (e) => {
    setUniMinutes(e.target.value)
  }

  const handleUniTransportChange = (e) => {
    setUniTransport(e.target.value)
  }

  return (
    <div id="container">
      <MapContainer uniMinutes={uniMinutes} uniTransport={uniTransport} />
      <Sidebar handleUniMinutesChange={(e) => handleUniMinutesChange(e)} uniMinutes={uniMinutes} handleUniTransportChange={(e) => handleUniTransportChange(e)} />
      <About />
    </div>
  );
}

export default App;
