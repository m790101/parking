import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Help from '../Help'
const setIsHelp = jest.fn()
beforeEach(cleanup)
test('should render Help component', () => {
   
    render(<Help setIsHelp={setIsHelp}/>)
    const HelpElement = screen.getByTestId('help')
    expect(HelpElement).toBeInTheDocument();
})


test(' component', () => {
   
    render(<Help setIsHelp={setIsHelp}/>)
    const HelpElement = screen.getByTestId('help')
    expect(HelpElement).toBeInTheDocument();
})
