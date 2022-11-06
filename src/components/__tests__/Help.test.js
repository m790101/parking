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


test('should show right content title', () => {
   
    render(<Help setIsHelp={setIsHelp}/>)
    const helpList = screen.getAllByRole('list')
    expect(helpList[0].textContent).toMatch(/尚有足夠空位/)
    expect(helpList[1].textContent).toMatch(/即將停滿/)
    expect(helpList[2].textContent).toMatch(/已停滿/)
    expect(helpList[3].textContent).toMatch(/具備機車停車位/)
    expect(helpList[4].textContent).toMatch(/具備充電樁/)
})

