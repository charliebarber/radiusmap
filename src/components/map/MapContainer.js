import Map, {Marker} from "react-map-gl";
import RadiusLayer from "./RadiusLayer";
import {useState, useEffect} from "react";
import {getIso} from '../../utils/isoHelper';
import ShopArea from './ShopArea';

const MapContainer = (props) => {
    const accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
    const [uniLng, setUniLng] = useState(-0.133611);
    const [uniLat, setUniLat] = useState(51.524722);
    const [zoom, setZoom] = useState(12);
    const [geojson, setGeojson] = useState(null);
    const [uniGeojson, setUniGeojson] = useState(null);
    const [lng2, setLng2] = useState(-0.14672309482554624);
    const [lat2, setLat2] = useState(51.548819958573716);
    const [shopsLngLat, setShopsLngLat] = useState([[-0.14672309482554624, 51.548819958573716]])

    useEffect(() => {
        (async () => {
            const iso = await getIso(props.uniTransport, uniLng, uniLat, props.uniMinutes);
            console.log("iso", iso);
            setUniGeojson(iso);
        })();
    },[props.uniMinutes, props.uniTransport, uniLng, uniLat])

    const handleDragEnd = (e) => {
        setUniLng(e.lngLat.lng)
        setUniLat(e.lngLat.lat)
    }

    return (
        <div id="container">
            <Map
                initialViewState={{
                    longitude: uniLng,
                    latitude: uniLat,
                    zoom: zoom
                }}
                style={{width: "100%", height: "50vw", position: "relative"}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={accessToken}
                id="map"
            >
                <Marker
                    longitude={uniLng}
                    latitude={uniLat}
                    draggable={true}
                    onDragEnd={handleDragEnd}
                />
                <RadiusLayer geojson={uniGeojson} layerId="uniRadius" layerColour="#9ebcda" layerOpacity={0.3} />
                {
                    uniGeojson && shopsLngLat.map((shop, index) => {
                        return <ShopArea lng={shop[0]} lat={shop[1]} key={index} uniGeojson={uniGeojson} />
                    })
                }
            </Map>
        </div>
    )
}

export default MapContainer;