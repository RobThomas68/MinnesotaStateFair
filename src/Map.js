import { useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle, ScaleControl, useMap } from "react-leaflet";
import { useGeolocated } from "react-geolocated";
import DataContext from "./context/DataContext";
import { IconContext } from "react-icons";
import { MdGpsFixed } from 'react-icons/md';
import L from "leaflet";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});


// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

function FlyToControl({ position }) {
    const parentMap = useMap();
    const positionClass = (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

    const flyTo = () =>
    {
        const pos = [30.3377, -81.4065];
        parentMap.flyTo(pos);
    }

    return (
      <div className={positionClass}>
        <div className="leaflet-bar leaflet-control">
            <a href="#" onClick={flyTo} title="Fly To" role="button" aria-label="Fly To">
                <IconContext.Provider value={{ style: { fontSize: '18px', verticalAlign: 'text-top'} }}>
                    <MdGpsFixed />
                </IconContext.Provider>
            </a>
        </div>
      </div>
    )
  }


const Map = () => {
    const center = [44.98106, -93.174351];
    const zoom = 20;
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    const { favorites } = useContext(DataContext);

    const favs = favorites.filter((favorite) =>
        favorite.hasOwnProperty("latitude")
    );

    const formatTimestamp = (s) => {
        return new Date(s*1000).toISOString();
    }

    const markerIconGreen = new L.Icon({
        iconRetinaUrl: require("./resources/images/leaflet-color-markers/marker-icon-2x-green.png"),
        iconUrl: require("./resources/images/leaflet-color-markers/marker-icon-green.png"),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [4, 41],
      });

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            watchPosition: true,
            userDecisionTimeout: 5000,
        });

    return (
        <main className="Map">
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer attribution={attribution} url={url} />
                <ScaleControl></ScaleControl>

                {coords && (
                    <>
                        <Marker position={[coords.latitude, coords.longitude]}>
                            <Popup>
                                <p>latitude:{coords.latitude}</p>
                                <p>longitude:{coords.longitude}</p>
                                <p>altitude:{coords.altitude}</p>
                                <p>heading:{coords.heading}</p>
                                <p>speed:{coords.speed}</p>
                                <p>accuracy:{coords.accuracy}</p>
                                {coords.timestamp && <p>timestamp:{formatTimestamp(coords.timestamp)}</p>}
                            </Popup>
                        </Marker>

                        <Circle center={[coords.latitude, coords.longitude]} radius={10} />
                        <Circle center={[coords.latitude, coords.longitude]} radius={coords.accuracy} />
                    </>

                )}

                {favs.map((f) => (
                    <Marker key={f.id} position={[f.latitude, f.longitude]} icon={markerIconGreen}>
                        <Popup>
                            <h4>{f.name}</h4>
                        </Popup>
                    </Marker>
                ))}
                <FlyToControl position="topright" />
            </MapContainer>
        </main>
    );
};
export default Map;
