
function Locate({ panTo,setCurrentMarkers,setSearchMarkers,setIsLoading,currentMarker}) {
    return (
      <div
      className='locateCurrentButton cursor-pointer '
      data-testid='locate'
        onClick={() => {
          setIsLoading(1)
          panTo({
            lat: currentMarker[0].lat,
            lng: currentMarker[0].lng,
          })
          setCurrentMarkers(() => [{
            lat: currentMarker[0].lat,
            lng: currentMarker[0].lng,
            id: new Date().getTime()
          }])
          setIsLoading(null)
          setSearchMarkers([])
  
        }
        }
      >
        <div className='locateCurrentButton__icon'></div>
      </div>
    );
  }

  export default Locate