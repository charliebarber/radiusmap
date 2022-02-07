import intersect from "@turf/intersect";

const accessToken = process.env.REACT_APP_MAPBOX_ACCESSTOKEN;
const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';

const getIso = async (profile, lng, lat, minutes) => {
    const query = await fetch(
        `${urlBase}${profile}/${lng},${lat}?contours_minutes=${minutes}&polygons=true&access_token=${accessToken}`,
        { method: 'GET' }
    );
    return await query.json();
};

const getIntersect = (geojson1, geojson2) => {
    return {
        features: [intersect(geojson1.features[0], geojson2.features[0])],
        type: 'FeatureCollection'
    }
}

export {getIso, getIntersect};