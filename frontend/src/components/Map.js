import React, { useState } from 'react'
import { useEffect } from 'react'
import Message from './Message'
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

const Map = ({ postcode, logo, website }) => {
  const dispatch = useDispatch()

  const payload = useSelector((state) => state.coords)

  const { loading, error, mapData } = payload

  useEffect(() => {
    dispatch(fetchCoords(postcode))
  }, [dispatch, postcode])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [selected, setSelected] = useState('')

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

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
            position={mapData.position}
            icon={{
              url: '/images/pizza_ico.svg',
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => setSelected(mapData.position)}
          />
          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null)
              }}
            >
              <div className='map-marker'>
                <img
                  className='map-logo-image'
                  src={logo}
                  alt='company logo'
                ></img>
                <p>
                  <a
                    className='map-link'
                    href={website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Visit their website
                  </a>
                </p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      )}
    </div>
  )
}

export default Map
