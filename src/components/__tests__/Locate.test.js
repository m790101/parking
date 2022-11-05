import{fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Locate from '../Locate'
import userEvent from '@testing-library/user-event'

const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
  global.navigator.geolocation = mockGeolocation;

const panTo = jest.fn()
const setIsLoading = jest.fn()
test('should render Locate component',()=>{
    render(<Locate  panto={panTo}/>)
    const locateElement = screen.getByTestId('locate')

    expect(locateElement).toBeInTheDocument();
})

test('should call panto after click',()=>{
    render(<Locate  panto={panTo} setIsLoading={setIsLoading} />)
    const locateElement = screen.getByTestId('locate')
fireEvent.click(locateElement)
    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled()
    expect(setIsLoading).toHaveBeenCalled()
})