import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import DetailNavigateButton from '../DetailNavigateButton'

beforeEach(cleanup)
const setNavigate = jest.fn()
const count = jest.fn()
const duration = '7分鐘'
test('should render DetailNavigateButton component', () => {
   
    render(<DetailNavigateButton setNavigate={setNavigate} count={count} duration={duration}/>)
    const buttonElement = screen.getByTestId('navigate-button')
    expect(buttonElement).toBeInTheDocument();
})

test('should show how many min from location', () => {
   
    render(<DetailNavigateButton setNavigate={setNavigate} count={count} duration={duration}/>)
    const buttonElement = screen.getByTestId('navigate-button').textContent
    expect(buttonElement).toMatch(/開車 7分鐘/)
})

test('should activate count function after click button', () => {
   
    render(<DetailNavigateButton setNavigate={setNavigate} count={count} duration={duration}/>)
    const buttonElement = screen.getByTestId('navigate-button')
    fireEvent.click(buttonElement)
    expect(count).toHaveBeenCalled()
})