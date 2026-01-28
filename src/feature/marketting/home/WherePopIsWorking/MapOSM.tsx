import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const pinIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

export default function MapOSM() {
  return (
    <MapContainer
      center={[22.335, 91.832]}
      zoom={8}
      scrollWheelZoom={false}
      className="h-full w-full rounded-[18px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker: Chattogram */}
      <Marker position={[22.3569, 91.7832]} icon={pinIcon}>
        <Popup>Chattogram</Popup>
      </Marker>

      {/* Marker: Khagrachari */}
      <Marker position={[23.1197, 91.9341]} icon={pinIcon}>
        <Popup>Khagrachari</Popup>
      </Marker>

      {/* Marker: Rangamati */}
      <Marker position={[22.7324, 92.2985]} icon={pinIcon}>
        <Popup>Rangamati</Popup>
      </Marker>

      {/* Marker: Bandarban */}
      <Marker position={[21.8311, 92.3686]} icon={pinIcon}>
        <Popup>Bandarban</Popup>
      </Marker>

      {/* Marker: Cox's Bazar */}
      <Marker position={[21.4272, 92.0058]} icon={pinIcon}>
        <Popup>Cox's Bazar</Popup>
      </Marker>
    </MapContainer>
  )
}
