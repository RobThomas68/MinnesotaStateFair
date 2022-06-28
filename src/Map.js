import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useGeolocated } from "react-geolocated";
import DataContext from "./context/DataContext";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
    const center = [44.98106, -93.174351];
    const zoom = 20;
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const { favorites } = useContext(DataContext);

    const favs = favorites.filter((favorite) =>
        favorite.hasOwnProperty("latitude")
    );

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
        });

    return (
        <main className="Map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer attribution={attribution} url={url} />

                {coords && (
                    <Marker position={[coords.latitude, coords.longitude]}>
                        <Popup>
                            <p>{coords.altitude}</p>
                            <p>{coords.heading}</p>
                            <p>{coords.speed}</p>
                        </Popup>
                    </Marker>
                )}

                {favs.map((f) => (
                    <Marker key={f.id} position={[f.latitude, f.longitude]}>
                        <Popup>
                            <h4>{f.name}</h4>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </main>
    );
};
export default Map;
