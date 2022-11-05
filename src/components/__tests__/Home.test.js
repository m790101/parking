import { cleanup, getByTestId, render, screen,waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '../../pages/Home'
const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
  global.navigator.geolocation = mockGeolocation;

  
test('should render Home page',async()=>{
    render(<Home/>)
    //await screen.findByTestId('google-map')
    //screen.debug()
    //const locateElement = screen.getByTestId('locate')
    
    //expect(locateElement).toBeInTheDocument();
})
