import { creatingSimilarAds } from './creating-similar-ads.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const address = document.querySelector('#address');
const ZOOM = 12;

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
  lat: 35.68226,
  lng: 139.75459,
};

const startCoordinate = {
  lat: 35.68226,
  lng: 139.75459,
};

const mainPinIcon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY],
});

let marker = L.marker(startCoordinate, {
  draggable: true,
  icon: mainPinIcon,
});

const icon = L.icon({
  iconUrl: iconSimilarConfig.url,
  iconSize: [iconSimilarConfig.width, iconSimilarConfig.height],
  iconAnchor: [iconSimilarConfig.anchorX, iconSimilarConfig.anchorY],
});

let map;

const renderMap = () => {
  map = L.map('map-canvas').on('load', () => {
  }).setView(cityCenter, ZOOM);
  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const initMapMarker = () => {
  marker.addTo(map);
  address.value = `${startCoordinate.lat}, ${startCoordinate.lng}`;
  address.setAttribute('value', `${startCoordinate.lat}, ${startCoordinate.lng}`);
  marker.on('moveend', (evt) => {
    const coordinate = evt.target.getLatLng();
    address.value = `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
  });
};

const resetMarker = () => {
  marker.remove();
  marker = L.marker(startCoordinate, {
    draggable: true,
    icon: mainPinIcon,
  });
  initMapMarker();
};

let markerGroup;

const initMarkerGroup = () => {
  markerGroup = L.layerGroup().addTo(map);
};

const createSimilarMarker = (point) => {
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
  markerSimilar.addTo(markerGroup).bindPopup(creatingSimilarAds(point));
};

const renderSimilarPoints = (points) => {
  points.forEach((point) => {
    createSimilarMarker(point);
  });
};

const setPoints = async (items) => {
  markerGroup.clearLayers();
  const points = await structuredClone(items);
  renderSimilarPoints(points);
};

const closesPopup = () => document.querySelector('.leaflet-popup-close-button')?.dispatchEvent(new Event('click', { bubbles: true }));

export { setPoints, resetMarker, renderSimilarPoints, renderMap, initMapMarker, initMarkerGroup, closesPopup };
