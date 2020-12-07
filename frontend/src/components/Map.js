import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

const libraries = ['places']
const mapContainerStyle = {
  width: '28vw',
  height: '44vh',
}
const center = {
  lat: 51.507351,
  lng: -0.127758,
}

// const position = {
//   lat: 51.582761,
//   lng: -0.02912,
// }

const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const Map = ({ postcode }) => {
  const [position, setPosition] = useState({})

  useEffect(() => {
    const fetchPosition = async () => {
      const { data } = await axios.get(
        `http://api.postcodes.io/postcodes/${postcode}`
      )

      let temp = {
        lat: data.result.latitude,
        lng: data.result.longitude,
      }

      setPosition(temp)
    }

    fetchPosition()
  }, [postcode])

  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  const onLoad = (marker) => {
    console.log('marker: ', marker)
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
      >
        <Marker
          onLoad={onLoad}
          position={position}
          icon={{
            url: '/images/pizza_ico.svg',
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      </GoogleMap>
    </div>
  )
}

export default Map
