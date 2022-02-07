import RadiusLayer from "./RadiusLayer";
import {getIso, getIntersect} from "../../utils/isoHelper";
import {useEffect, useState} from "react";
import {Marker} from "react-map-gl";

const ShopArea = (props) => {
    const [intersect, setIntersect] = useState(null);
    const [canIntersect, setCanIntersect] = useState(true);

    useEffect(() => {
        getShopGeojson()
            .then((result) => setCanIntersect(true))
            .catch((e) => {
                setIntersect(null)
                setCanIntersect(false)
            });
    }, [props.uniGeojson])

    const getShopGeojson = async () => {
        getIso("walking", props.lng, props.lat, 10)
            .then((result) => setIntersect(getIntersect(props.uniGeojson, result)))
            .catch((e) => setCanIntersect(false));

    }

    if (canIntersect) {
        return (
            <div>
                <Marker longitude={props.lng} latitude={props.lat} />
                <RadiusLayer geojson={intersect} layerId="shopRadius" layerColour="#7B2DC9" layerOpacity={0.5}/>
            </div>
        )
    } else {
        return (
            <Marker longitude={props.lng} latitude={props.lat} />
        );
    }
}

export default ShopArea;