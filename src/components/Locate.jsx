
function Locate({ panTo,setCurrentMarkers,setSearchMarkers,setIsLoading}) {
    return (
      <div
      className='locateCurrentButton cursor-pointer '
      data-testid='locate'
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

  export default Locate