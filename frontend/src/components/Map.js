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

const GOOGLE_MAPS_API_KEY = creds.GOOGLE_MAPS_API_KEY

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

  const coordsList = useSelector((state) => state.coords)
  console.log(`this is coordsList - ${coordsList}`)
  const { loading, error, coords } = coordsList
  console.log(`this is coords - ${coords}`)

  useEffect(() => {
    dispatch(fetchCoords(postcode))
  }, [dispatch, postcode])

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
      {/* <h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <h3>
            {coords.map((coord) => (
                console.log(coord)
            ))}
          </h3>
        )}
      </h1> */}
      {/* <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
      >
        <Marker
          onLoad={onLoad}
          position={coordsList}
          icon={{
            url: '/images/pizza_ico.svg',
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      </GoogleMap> */}
    </div>
  )
}

export default Map

// JUST IN CASE

//   let temp = {
//     lat: data.result.latitude,
//     lng: data.result.longitude,
//   }

// const position = {
//   lat: 51.582761,
//   lng: -0.02912,
//
