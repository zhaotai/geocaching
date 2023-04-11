"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Geocache, Location } from '../models';

interface MapProps {
  userLocation: Location | null;
  geocaches: Geocache[];
}

export default function Map({ userLocation, geocaches }: MapProps) {
  const locTurple: [number, number] = userLocation ? [userLocation.lat, userLocation.lng] : [0, 0];
  const transform = `rotate(${userLocation?.heading || 0}deg)`;
  const userIcon = new Icon({
    iconUrl: '/user-marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    html: `<div style="transform: ${transform}"><img src="/user-marker-icon.png" /></div>`,
  });

  return (
    <MapContainer center={locTurple} zoom={13} style={{ height: '100vh', width: '100vw - 240px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userLocation && <Marker icon={userIcon} position={locTurple} />}
      {geocaches.map((geocache: Geocache, index: number) => (
        <Marker key={index} position={[geocache.lat, geocache.lng]}>
          <Popup>
            <div>
              <h4>{geocache.name}</h4>
              <hr />
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
