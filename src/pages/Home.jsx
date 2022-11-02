import React from 'react'
import './../style/home.scss'
import { useJsApiLoader, GoogleMap, Marker,DirectionsRenderer } from '@react-google-maps/api'
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

const markerIcon = {
  black:'https://i.imgur.com/FBoOQuh.png',
  yellow:'https://i.imgur.com/lKDCX1d.png',
  red:'https://i.imgur.com/M7l0UWq.png'
}
let availableDb = available.data.park
let parkingDb = db.data.park
parkingDb = parkingDb.map((park) => {
  let a = availableDb.filter(a=> park.id === a.id)
  return {
    ...park,
    lat:Number(park.EntranceCoord.EntrancecoordInfo[0].Xcod),
    lng: Number(park.EntranceCoord.EntrancecoordInfo[0].Ycod),
    cap:(a[0].availablecar/park.totalcar)
  }
})
const containerStyle = { width: '100%', height: '100vh' ,display:'flex'}
let center = { lat: 25.03, lng: 121.554 }


const Map = () => {
  const[libraries] = useState(['places'])
  let [parkingMarkers, setParkingMarkers] = useState([])
  const [currentMarker, setCurrentMarkers] = useState([])
  const [searchMarkers, setSearchMarkers] = useState([])
  const [parkingData,setParkingData] =  useState([])
  const [availbility,setAvailbility] = useState([])
  const [directionResponse,setDirectionResponse] = useState(null)
  const [duration,setDuration] = useState('')
  const [navigate,setNavigate] = useState(null)
  const [isLoading,setIsLoading] = useState(1)
  const[isHelp,setIsHelp] = useState(null)
  const [selected, setSelected] = useState(null)
  const [isReporting,setIsReporting] = useState(null)
  const mapRef = useRef()
  const onMapLoad = useCallback(map => {
    mapRef.current = map

  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(17);

  }, []);
  const initialMarkers = useCallback((p,lat,lng,availableDb)=>{
    setParkingMarkers((currents)=>{
      currents = currents.filter(current=>current.id !== p.id)
      let a = availableDb.filter(a=> p.id === a.id)
      return [...currents,{
        ...p,
        lat,
        lng,
        cap:(a[0].availablecar/p.totalcar)
      }]
    })
  },[])

  const initialLocate = useCallback(()=>{
    navigator.geolocation.getCurrentPosition(
    (position) => {
      panTo({
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
    () => null
  )}, [panTo]) 

  useEffect(() => {
    axios.get('https://my-json-server.typicode.com/m790101/parking-data/data')
    .then(data=>{
      setParkingData(parkingDb)
      setAvailbility(availableDb)
      data.data.park.map(async(p)=>{
        const response = await getGeocode({ address: p.address })
        const { lat, lng } = await getLatLng(response[0]);
         initialMarkers(p,lat,lng,availableDb)
    })
    console.log('hiys')
  }
  )
  .then(()=>{
    initialLocate()
  })
  .then(()=>{})
}, [initialLocate,initialMarkers])

//direction
async function fetchDirections(marker){

const directionsService = new window.google.maps.DirectionsService()
const results = await directionsService.route({
origin: {lat: currentMarker[0].lat, lng:  currentMarker[0].lng},
destination: marker.name,

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
      <div className='map'>

         <Locate panTo={panTo} setCurrentMarkers={setCurrentMarkers} setSearchMarkers={setSearchMarkers} setIsLoading={setIsLoading} />
         <div className='try'>
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
            zoomControl: false,
            styles: mapStyle
          }}
          onLoad={onMapLoad}
        >
        {isLoading && <OpenDisplay></OpenDisplay>}
          <Navbar/>
         <Search panTo={panTo} setSearchMarkers={setSearchMarkers} />
         <HelpIcon setIsHelp={setIsHelp}/>
         {isReporting && <Report setIsReporting={setIsReporting}/>}
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
            url: marker.cap === 0 ? markerIcon.red:marker.cap > 0.1? markerIcon.black:markerIcon.yellow,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 11)
          }}
          onClick={() => {
            setSelected(marker)
            fetchDirections(marker)
          }}
        />)}
          
          {parkingMarkers.map(marker => <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={{
            url: marker.cap === 0?markerIcon.red:marker.cap > 0.1? markerIcon.black:markerIcon.yellow,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 11)
          }}
          onClick={() => {
            setSelected(marker)
            fetchDirections(marker)
          }}
        />)}
          {navigate && <DirectionsRenderer directions={directionResponse} options={{suppressMarkers: true}}/>}
        </GoogleMap>


         </div>
        {selected && <Details setSelected={setSelected} data={selected}
        availbility={availbility} setDirectionResponse={setDirectionResponse}
        duration={duration} setDuration={setDuration} setNavigate={setNavigate}
        setIsReporting={setIsReporting}
        />}
           {isHelp && <Help setIsHelp={setIsHelp}/>}
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
      //e.preventDefalut()
    }

    const handleSelect =
      ({ description }) =>
        async () => {
          setValue(description, false);
          clearSuggestions();
          const response = await getGeocode({ address: description })
          const { lat, lng } = await getLatLng(response[0]);
          panTo({ lat, lng })
          setSearchMarkers(()=> [{
            lat: lat,
            lng: lng,
            id: new Date().getTime()
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
        <div className='box'>
          <input
            className='search'
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="搜尋目標地點"
          />
        </div>
        {status === "OK" && <ul className="suggestion">{renderSuggestions()}</ul>}
      </div>
    )
  }
}

function Locate({ panTo,setCurrentMarkers,setSearchMarkers,setIsLoading}) {
  return (
    <div
    className='locateCurrentButton cursor-pointer '
      onClick={() => {
        setIsLoading(1)
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setCurrentMarkers(() => [{
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              id: new Date().getTime()
            }])
            setIsLoading(null)
            setSearchMarkers([])
          },
          () => null
        );

      }
      }

    >
      <div className='locateCurrentButton__icon'></div>
    </div>
  );
}

export default Map