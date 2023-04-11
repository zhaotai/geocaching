export interface Location {
  lat: number;
  lng: number;
  heading: number | null;
}

export interface Geocache {
  lat: number;
  lng: number;
  name: string;
  hash: string;
}