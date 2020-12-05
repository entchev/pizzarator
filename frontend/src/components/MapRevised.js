import React, { Component } from 'react'
import creds from '../creds'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

export class MapRevised extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postcode: props.postcode,
      lat: '',
      lng: '',
    }
  }

  isloaded() {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: creds.GOOGLE_MAPS_API_KEY,
      libraries,
    })

    if (loadError) return 'Error loading maps'
    if (!isLoaded) return 'Loading Maps'
  }

  componentDidMount() {
    fetch(`http://api.postcodes.io/postcodes/${postcode}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          lat: data.result.latitude,
          lng: data.result.longitude,
        })
      })
  }

  render() {
    const libraries = ['places']
    const mapContainerStyle = {
      width: '28vw',
      height: '44vh',
    }
    const center = {
      lat: 51.507351,
      lng: -0.127758,
    }
    const onLoad = (marker) => {
      console.log('marker: ', marker)
    }
    const options = {
      disableDefaultUI: true,
      zoomControl: true,
    }
    const position = {
      lat: this.lat,
      lng: this.lng,
    }

    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
        >
          <Marker
            onLoad={onLoad}
            position={position}
            icon={{
              url: '/images/pizza_ico.svg',
              //   scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        </GoogleMap>
      </div>
    )
  }
}

export default MapRevised
