import * as geolib from 'geolib';
import pako from 'pako';
import { parseStringPromise } from 'xml2js';
import { Location, Geocache } from '../models';

export async function fetchGeocaches(userLocation: Location, geocacheFile: Buffer): Promise<Geocache[]> {
  const gpxData = pako.inflate(new Uint8Array(geocacheFile), { to: 'string' });
  const gpxXml = await parseStringPromise(gpxData.toString());

  // Extract the geocache data from the GPX XML document
  const geocaches: Geocache[] = gpxXml.gpx.wpt.map((wpt: any) => ({
    lat: parseFloat(wpt.$.lat),
    lng: parseFloat(wpt.$.lon),
    name: wpt.name[0],
    hash: wpt.hash[0],
  }));

  // Filter the geocaches by distance from the user's location
  const geocachesWithin10Miles = geocaches.filter((geocache: Geocache) =>
    geolib.isPointWithinRadius(
      { latitude: geocache.lat, longitude: geocache.lng },
      { latitude: userLocation.lat, longitude: userLocation.lng },
      16093.4 // 10 miles in meters
    )
  );

  return geocachesWithin10Miles;
}