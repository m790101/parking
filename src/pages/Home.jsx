import React from 'react'
import './../style/home.scss'
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api'
import { useCallback, useState, useRef, useEffect } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
//import axios from 'axios'
const libraries = ["places"];
const containerStyle = { width: '100%', height: '95vh' }
let center = { lat: 25.03, lng: 121.554 }

const Map = ()=>{
  //let [parkingMarkers, setParkingMarkers] = useState([])
  //const [currentMarker, setCurrentMarkers] = useState([])
  const [searchMarkers, setSearchMarkers] = useState([])
  const mapRef = useRef()
  const onMapLoad = useCallback(map => {
    mapRef.current = map

  }, [])
  const [selected, setSelected] = useState(null)

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);

  }, []);



    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
        libraries
      })
      if (!isLoaded) {
        return (
          <h1>Loading...</h1>
        )
      }
      return (
        <div className='map'>
        <Search panTo={panTo} setSearchMarkers={setSearchMarkers} />
          <GoogleMap
          className='google-map' 
          center={center}
            zoom={13}
            mapContainerStyle={containerStyle}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullScreenControl: false,
              disableDefaultUI: true,
              zoomControl: true,
            }}
            onLoad={onMapLoad}
          >
          </GoogleMap>
        </div>
      )


      function Search({ panTo, setSearchMarkers }) {
        const {
          ready,
          value,
          suggestions: { status, data },
          setValue,
          clearSuggestions,
        } = usePlacesAutocomplete({
          requestOptions: {
            //location:{lat: ()=>25.03, lng: ()=>121.554},
            //radius:200*1000
          }
        })
      
        const handleInput = (e) => {
          setValue(e.target.value);
        }
      
        const handleSelect =
          ({ description }) =>
            async () => {
              setValue(description, false);
              clearSuggestions();
              const response = await getGeocode({ address: description })
              const { lat, lng } = await getLatLng(response[0]);
              panTo({ lat, lng })
              setSearchMarkers(current => [...current, {
                lat: lat,
                lng: lng,
                time: new Date() + 23
              }])
      
            };
      
      
        const renderSuggestions = () =>
          data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;
      
            return (
          
              <li key={place_id} onClick={handleSelect(suggestion)} className="suggestion__item" >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })
      
        return (
          <div>
            <input
            className='search'
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="搜尋目標地點"
            />
            {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
          </div>
        )
      }
}

export default Map