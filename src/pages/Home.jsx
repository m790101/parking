import React from 'react'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
//import { useCallback, useState, useRef, useEffect } from 'react'
//import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
//import axios from 'axios'
const libraries = ["places"];
const containerStyle = { width: '100vw', height: '100vh' }
let center = { lat: 25.03, lng: 121.554 }
const Map = ()=>{

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries
      })
      console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY)
      if (!isLoaded) {
        return (
          <h1>Loading...</h1>
        )
      }
      return (
        <div>

          <GoogleMap center={center}
            zoom={13}
            mapContainerStyle={containerStyle}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullScreenControl: false,
              disableDefaultUI: true,
              zoomControl: true,
            }}
          >
          </GoogleMap>
        </div>
      )
}

export default Map