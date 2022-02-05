import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Map, {Marker, Source, Layer} from 'react-map-gl';
import intersect from '@turf/intersect';
import bbox from '@turf/bbox';




function App() {
  const accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
  console.log("acess token", accessToken)
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-0.133611);
  const [lat, setLat] = useState(51.524722);
  const [zoom, setZoom] = useState(12);
  const [geojson, setGeojson] = useState(null)
  const [lng2, setLng2] = useState(-0.14672309482554624)
  const [lat2, setLat2] = useState(51.548819958573716)
  const [geojson2, setGeojson2] = useState(null)
    

  const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
  const profile = 'cycling'; // Set the default routing profile
  const minutes = 20; // Set the default duration

  const getIso = async () => {
    const query = await fetch(
      `${urlBase}${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${accessToken}`,
      { method: 'GET' }
    );
    const query2 = await fetch(
      `${urlBase}walking/${lng2},${lat2}?contours_minutes=5&polygons=true&access_token=${accessToken}`,
      { method: 'GET' }
    );
    const data = await query.json();
    const box = bbox(data.features[0])
    console.log("BOX", box)
    console.log(data)
    const data2 = await query2.json();
    const result = {
      features: [intersect(data.features[0], data2.features[0])],
      type: 'FeatureCollection'
    }
    console.log("INTERSECT", result)
    setGeojson(result)
  };

  

  useEffect(() => {
    getIso()
  }, [lng, lat])

  const handleDragEnd = (e) => {
    setLng(e.lngLat.lng)
    setLat(e.lngLat.lat)
  }

  const layerStyle = {
    id: 'isoLayer',
    type: 'fill',
    source: 'iso',
    layout: {},
    paint: {
      'fill-color': '#5a3fc0',
      'fill-opacity': 0.15,
      'fill-outline-color': '#050139',
    }
  }


  return (
    <div>
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: zoom
        }}
        style={{width: "100vw", height: "50vw", position: "relative"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={accessToken}
      >
        <Marker 
          longitude={lng} 
          latitude={lat}
          draggable={true}
          onDragEnd={handleDragEnd}
        />
        <Marker 
          longitude={lng2}
          latitude={lat2}
        />
        <Source
          id="iso"
          type="geojson"
          data={geojson}
        >
          <Layer {...layerStyle}/>
        </Source>
      </Map>
    </div>
  );
}

export default App;
