import{render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../Navbar'
import {BrowserRouter} from 'react-router-dom'

test('should render Navbar component',()=>{
    render(<BrowserRouter><Navbar/></BrowserRouter>)
    const NavbarElement = screen.getByTestId('navbar')
    expect(NavbarElement).toBeInTheDocument();
})