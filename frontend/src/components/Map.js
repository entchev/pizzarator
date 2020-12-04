import React from 'react'
import creds from '../creds'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InforWindow,
} from '@react-google-maps/api'

const libraries = ['places']
const mapContainerStyle = {
  width: '20vw',
  height: '20vh',
}
const center = {
  lat: 51.507351,
  lng: -0.127758,
}

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: creds.GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </div>
  )
}

export default Map
