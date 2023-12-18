import { disablesAdForm, disablesMapForm, activatesAdForm, activatesMapForm } from './form-activity-switch';
import { returnAdvertisements } from './advertisements.js';
import { MARKS } from '../data/data.js';
import { creatingSimilarAds } from './creating-similar-ads.js';

disablesAdForm();
disablesMapForm();

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const address = document.querySelector('#address');
const points = returnAdvertisements(MARKS);

const ZOOM = 10;

const iconConfig = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const iconSimilarConfig = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const cityCenter = {
  lat: 35.68509,
  lng: 139.64948,
};

const startCoordinate = {
  lat: 35.68509,
  lng: 139.64948,
};

const map = L.map('map-canvas').on('load', () => {
  activatesAdForm();
  activatesMapForm();
}).setView(cityCenter, ZOOM);
L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

const marker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

const icon = L.icon({
  iconUrl: iconSimilarConfig.url,
  iconSize: [iconSimilarConfig.width, iconSimilarConfig.height],
  iconAnchor: [iconSimilarConfig.anchorX, iconSimilarConfig.anchorY],
});

marker.addTo(map);

address.value = `${cityCenter.lat}, ${cityCenter.lng}`;

marker.on('moveend', (evt) => {
  const coordinate = evt.target.getLatLng();
  address.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
});

points.forEach((point) => {
  const { location: { lat, lng } } = point;
  const markerSimilar = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  markerSimilar.addTo(map).bindPopup(creatingSimilarAds(point));
});
