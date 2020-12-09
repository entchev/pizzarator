import React from 'react'
import { useEffect } from 'react'
import Message from '../components/message'
import Loader from '../components/loader'
import { useDispatch, useSelector } from 'react-redux'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import { fetchCoords } from '../actions/mapActions'
import creds from '../temp_creds'

const GOOGLE_MAPS_API_KEY = creds.GMAPS_API_KEY

const libraries = ['places']
const mapContainerStyle = {
  width: '28vw',
  height: '44vh',
}
const center = {
  lat: 51.507351,
  lng: -0.127758,
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const Map = ({ postcode }) => {
  const dispatch = useDispatch()

  const payload = useSelector((state) => state.coords)

  const { loading, error, success, mapData } = payload

  useEffect(() => {
    dispatch(fetchCoords(postcode))
  }, [dispatch, postcode])

  console.log(`initial position is ${mapData}`)

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
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
        >
          <Marker
            onLoad={onLoad}
            position={mapData.position}
            icon={{
              url: '/images/pizza_ico.svg',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        </GoogleMap>
      )}
    </div>
  )
}

export default Map
