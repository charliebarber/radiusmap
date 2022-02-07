import {Source, Layer} from 'react-map-gl';

const RadiusLayer = (props) => {
    const layerStyle = {
        id: props.layerId,
        type: 'fill',
        source: 'iso',
        layout: {},
        paint: {
          'fill-color': props.layerColour,
          'fill-opacity': props.layerOpacity,
          'fill-outline-color': '#050139',
        }
      }

    return (
        <div>
            <Source
                type="geojson"
                data={props.geojson}
            >
                <Layer {...layerStyle} />
            </Source>
        </div>
    )
}

export default RadiusLayer;