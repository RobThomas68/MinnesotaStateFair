import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { useContext } from "react";
import DataContext from "./context/DataContext";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Map = () => {
    const center = [44.98106, -93.174351];
    const zoom = 20;

    const { favorites } = useContext(DataContext);

    const favs = favorites.filter((favorite) =>
        favorite.hasOwnProperty("latitude")
    );

    return (
        <main className="Map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

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
