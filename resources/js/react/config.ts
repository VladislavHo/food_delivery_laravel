import L, { LatLng } from 'leaflet';
export const APP_SERVER = 'http://127.0.0.1:8000';

export const START_LOCATION: LatLng = new LatLng(46.823087, 29.481899);

  export const CASTOM_MARKERS = [
  L.icon({
    iconUrl: '/images/food-marker.svg', 
    iconSize: [40, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
  }),
  L.icon({
    iconUrl: '/images/food-marker-1.svg', 
    iconSize: [40, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
  }),
  L.icon({
    iconUrl: '/images/food-marker-2.svg', 
    iconSize: [40, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
  }),
  L.icon({
    iconUrl: '/images/food-marker-3.svg', 
    iconSize: [40, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34],
  }),
]