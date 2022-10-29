

const News = () => {

   /* const {
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
                <li key={place_id} onClick={handleSelect(suggestion)}>
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        })



    return (
        <div>
            <input
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Where are you going?"
            />
        </div>
    )*/
}

export default News