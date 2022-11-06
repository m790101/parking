
  function Search({ panTo, setSearchMarkers,usePlacesAutocomplete,getGeocode, getLatLng}) {
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
    console.log(usePlacesAutocomplete())
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

          <li key={place_id} onClick={handleSelect(suggestion)} className="suggestion__item cursor-pointer " >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      })

    return (
      <div>
        <div className='box' data-testid='search'>
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

  export default Search