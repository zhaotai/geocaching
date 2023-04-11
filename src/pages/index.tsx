"use client";
import Head from 'next/head';
import styles from '@/styles/Home.module.css'
import { lazy, useEffect, useState } from 'react';
import { fetchGeocaches } from './network';
import { Geocache, Location } from './models';
import Sidebar from './components/Sidebar';
const Map = lazy(() => import('./components/Map'));


export default function Home() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [geocaches, setGeocaches] = useState<Geocache[]>([]);
  const [geocacheFile, setGeocacheFile] = useState<Buffer | null>(null);
  const [isClientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  useEffect(() => {
    // Get the user's location using the Geolocation API
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude, heading } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude, heading: heading });
      },
      error => {
        console.error(error);
      }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    // Fetch the geocache file from the API
    const fetchGeocacheFile = async () => {
      const response = await fetch('/api/geocaches');
      const buffer = await response.arrayBuffer();
      const geocacheFile = Buffer.from(buffer);
      setGeocacheFile(geocacheFile);
    };

    fetchGeocacheFile();
  }, []);

  useEffect(() => {
    // Fetch the geocaches from the API and filter them by distance from the user's location
    const fetchGeocachesData = async () => {
      if (userLocation && geocacheFile) {
        const geocaches = await fetchGeocaches(userLocation, geocacheFile);
        setGeocaches(geocaches);
      }
    };

    fetchGeocachesData();
  }, [userLocation, geocacheFile]);

  return (
    <>
      <Head>
        <title>Geocaching App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar geocaches={geocaches} />
        </div>
        <div className={styles.map}>
          {isClientSide && <Map userLocation={userLocation} geocaches={geocaches} />}
        </div>
      </div>
    </>
  )
}
