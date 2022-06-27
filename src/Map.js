import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
     iconUrl: require('leaflet/dist/images/marker-icon.png'),
     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Map = () => {
    const position = [44.98106, -93.174351]
    return (
        <main className="Map">
            <MapContainer center={position} zoom={20} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[44.9856217722, -93.1690153538]}>
                    <Popup>
                        <h4>Giggles Campfire Grill</h4>
                        <ul>
                            <li>Bear Republic Racer 5 IPA</li>
                        </ul>
                    </Popup>
                </Marker>
                <Marker position={[44.9872933995, -93.1701421093]}>
                    <Popup>
                        <h4>The Hangar</h4>
                        <ul>
                            <li>Bent Paddle Kanu</li>
                        </ul>
                    </Popup>
                </Marker>
            </MapContainer>
        </main>
    );
};
export default Map;
