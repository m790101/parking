import{fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Search from '../Search'
import userEvent from '@testing-library/user-event'
import usePlacesAutocomplete from 'use-places-autocomplete'
const panTo = jest.fn()
const setSearchMarkers = jest.fn()
const getGeocode = jest.fn()
const getLatLng = jest.fn()

test('should render Locate component',()=>{
    render(<Search  panto={panTo} setSearchMarkers={setSearchMarkers} usePlacesAutocomplete={usePlacesAutocomplete} getGeocode={getGeocode} getLatLng={getLatLng}/>)
    const searchElement = screen.getByTestId('search')
    expect(searchElement).toBeInTheDocument();
})

/*test('should call panto after click',()=>{
    render(<Locate  panto={panTo} setIsLoading={setIsLoading} />)
    const locateElement = screen.getByTestId('locate')
fireEvent.click(locateElement)
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled()
    expect(setIsLoading).toHaveBeenCalled()
})*/