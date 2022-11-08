import React from 'react'
import './../style/home.scss'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useCallback, useState, useRef, useEffect } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import mapStyle from '../mapStyle'
import Details from '../components/Details'
import axios from 'axios'
import db from '../db.json'
import available from '../available.json'
import Navbar from '../components/Navbar'
import OpenDisplay from '../components/OpenDisplay'
import Help from '../components/Help'
import HelpIcon from '../components/HelpIcon'
import Report from '../components/Report'
import Locate from '../components/Locate'
import Search from '../components/Search'
import { isInRange } from '../utils/isInRange'
const options = {
  enableHighAccuracy: false,
  timeout: 1000,
  maximumAge: 0
}
const markerIcon = {
  black: 'https://i.imgur.com/FBoOQuh.png',
  yellow: 'https://i.imgur.com/lKDCX1d.png',
  red: 'https://i.imgur.com/M7l0UWq.png'
}
let availableDb = available.data.park
let parkingDb = db.data.park
parkingDb = parkingDb.map((park) => {
  let a = availableDb.filter(a => park.id === a.id)
  const day = new Date().getDay()
  const timeOrigin = new Date().getHours()
  const time = Number(timeOrigin) < 10 ? '0' + timeOrigin + ':00':timeOrigin + ':00'
  let fare = ''
  if (park.FareInfo.WorkingDay) {
    if (day > 0 && day <= 5) {
      for (let i = 0; i < park.FareInfo.WorkingDay.length; i++) {
        let timeFix = park.FareInfo.WorkingDay[i].Period.split('~')
        if (isInRange(time, timeFix)) {
          fare = park.FareInfo.WorkingDay[i].Fare

        }
      }
    }
    if (day === 0 || day === 6) {
      for (let i = 0; i < park.FareInfo.Holiday.length; i++) {
        let timeFix = park.FareInfo.Holiday[i].Period.split('~')
        if (isInRange(time, timeFix)) {
          fare = park.FareInfo.Holiday[i].Fare

        }
      }
    }
  }

  return {
    ...park,
    lat: Number(park.EntranceCoord.EntrancecoordInfo[0].Xcod),
    lng: Number(park.EntranceCoord.EntrancecoordInfo[0].Ycod),
    cap: (a[0].availablecar / park.totalcar),
    fare
  }
})
let center = { lat: 25.03, lng: 121.554 }

const Map = () => {
  const [libraries] = useState(['places'])
  let [parkingMarkers, setParkingMarkers] = useState([])
  const [currentMarker, setCurrentMarkers] = useState([])
  const [searchMarkers, setSearchMarkers] = useState([])
  const [parkingData, setParkingData] = useState([])
  const [availbility, setAvailbility] = useState([])
  const [directionResponse, setDirectionResponse] = useState(null)
  const [duration, setDuration] = useState('')
  const [navigate, setNavigate] = useState(null)
  const [isLoading, setIsLoading] = useState(1)
  const [isHelp, setIsHelp] = useState(false)
  const [selected, setSelected] = useState(null)
  const [isReporting, setIsReporting] = useState(null)
  const mapRef = useRef()
  let watchId = null
  const onMapLoad = useCallback(map => {
    mapRef.current = map
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center)
    bounds.extend({ lat: center.lat + 0.002, lng: center.lng + 0.002 })
    map.fitBounds(bounds);

  }, [])

  const initialPanTo = useCallback(({ lat, lng }) => {
    center = { lat: lat, lng: lng } 
    mapRef.current.panTo({ lat, lng });
    //mapRef.current.setZoom(17);

  }, []);
  const panTo = useCallback(({ lat, lng }) => {

    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);

  }, []);
  const initialMarkers = useCallback((p, lat, lng, availableDb, fare) => {
    setParkingMarkers((currents) => {
      currents = currents.filter(current => current.id !== p.id)
      let a = availableDb.filter(a => p.id === a.id)
      return [...currents, {
        ...p,
        lat,
        lng,
        cap: (a[0].availablecar / p.totalcar),
        fare
      }]
    })
  }, [])

  const initialLocate = useCallback(() => {

    watchId = navigator.geolocation.watchPosition(
      (position) => {
        initialPanTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setCurrentMarkers(() => [{
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          id: new Date().getTime()
        }])
        setIsLoading(null)
      },
      () => null,options
    )
  }, [panTo])

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/m790101/parking-data/data')
      .then(data => {
        setParkingData(parkingDb)
        setAvailbility(availableDb)
        data.data.park.map(async (p) => {
          const day = new Date().getDay()
          const timeOrigin = new Date().getHours()
          const time = Number(timeOrigin) < 10 ? '0' + timeOrigin + ':00':timeOrigin + ':00'
          let fare = ''
          if (p.FareInfo.WorkingDay) {
            if (day > 0 && day <= 5) {
              for (let i = 0; i < p.FareInfo.WorkingDay.length; i++) {
                let timeFix = p.FareInfo.WorkingDay[i].Period.split('~')
                if (isInRange(time, timeFix)) {
                  fare = p.FareInfo.WorkingDay[i].Fare
                }
              }
            }
            if (day === 0 || day === 6) {
              for (let i = 0; i < p.FareInfo.Holiday.length; i++) {
                let timeFix = p.FareInfo.Holiday[i].Period.split('~')
                if (isInRange(time, timeFix)) {
                  fare = p.FareInfo.Holiday[i].Fare

                }
              }
            }
          }
          const response = await getGeocode({ address: p.address })
          const { lat, lng } = await getLatLng(response[0]);
          initialMarkers(p, lat, lng, availableDb, fare)
        })
        console.log('hiys')

      }
      )
      .then(() => {

        initialLocate()
      })
      .then(() => { })
      return navigator.geolocation.clearWatch(watchId)
  }, [initialLocate, initialMarkers,watchId])





  //direction
  async function fetchDirections(marker) {

    const directionsService = new window.google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: { lat: currentMarker[0].lat, lng: currentMarker[0].lng },
      destination: { lat: marker.lat, lng: marker.lng },

      travelMode: window.google.maps.TravelMode.DRIVING,
    })


    setDirectionResponse(results)
    setDuration(results.routes[0].legs[0].duration.text)
  }

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
    <div className='map' data-testid='map'>

      <Locate panTo={panTo} currentMarker={currentMarker} setCurrentMarkers={setCurrentMarkers} setSearchMarkers={setSearchMarkers} setIsLoading={setIsLoading} getLatLng={getLatLng} />
      <Navbar />
      <div className='try'>
        <GoogleMap
          data-testid='google-map'
          className='google-map'
          center={center}
          zoom={13}
          mapContainerClassName='map-container'
          //mapContainerStyle={containerStyle}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullScreenControl: false,
            disableDefaultUI: true,
            clickableIcons: false,
            zoomControl: false,
            styles: mapStyle
          }}
          onLoad={onMapLoad}
        >
          {isLoading && <OpenDisplay></OpenDisplay>}

          <Search panTo={panTo} setSearchMarkers={setSearchMarkers} usePlacesAutocomplete={usePlacesAutocomplete} getGeocode={getGeocode} getLatLng={getLatLng} />
          {!selected && < HelpIcon setIsHelp={setIsHelp} isHelp={isHelp} setSelected={setSelected} />}
          {isReporting && <Report setIsReporting={setIsReporting} />}
          {currentMarker.map(marker => <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'https://i.imgur.com/kDPoOVw.png',
              scaledSize: new window.google.maps.Size(30, 23),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 11)
            }}
          />)}
          {searchMarkers.map(marker => <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: 'https://i.imgur.com/N7DhYek.png',
              scaledSize: new window.google.maps.Size(15, 15),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 11)
            }}
          />)}
          {parkingData.map(marker => <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: marker.cap === 0 ? markerIcon.red : marker.cap > 0.1 ? markerIcon.black : markerIcon.yellow,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 11)
            }}
            label={{ text: marker.fare ? marker.fare : ' ', className: 'marker-label' }}
            onClick={() => {
              setSelected(marker)
              setIsHelp(false)
              fetchDirections(marker)
            }}
          />)}

          {parkingMarkers.map(marker => <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: marker.cap === 0 ? markerIcon.red : marker.cap > 0.1 ? markerIcon.black : markerIcon.yellow,
              scaledSize: new window.google.maps.Size(30, 30),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 11)
            }}
            label={{ text: marker.fare, className: 'marker-label' }}
            onClick={() => {
              setSelected(marker)
              setIsHelp(false)
              fetchDirections(marker)
            }}
          />)}
          {navigate && <DirectionsRenderer directions={directionResponse} options={{ suppressMarkers: true }} />}
        </GoogleMap>


      </div>
      {selected && <Details setSelected={setSelected} data={selected}
        availbility={availbility} setDirectionResponse={setDirectionResponse}
        duration={duration} setDuration={setDuration} setNavigate={setNavigate}
        setIsReporting={setIsReporting} navigate={navigate}
      />}
      {isHelp && !selected && <Help setIsHelp={setIsHelp} />}
    </div>


  )
}



export default Map