import{render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Report from '../Report'
import userEvent from '@testing-library/user-event'


test('should render button 送出',()=>{
    render(<Report/>)
    const ReportElement = screen.getByText('送出')
    expect(ReportElement).toBeInTheDocument();
})

test('intial button 送出 should be disabled',()=>{
    render(<Report/>)
    const ReportElement = screen.getByText('送出')
    expect(ReportElement).toBeDisabled();
})

test('if text put in textarea, button 送出 should become enabled',()=>{
    render(<Report/>)
    const ReportElement = screen.getByText('送出')
    userEvent.type(screen.getByPlaceholderText(/請從這裡輸入.../i),'123456')
    expect(ReportElement).toBeEnabled();
})

test('if space put in textarea, button 送出 should stay disabled',()=>{
    render(<Report/>)
    const ReportElement = screen.getByText('送出')
    userEvent.type(screen.getByPlaceholderText(/請從這裡輸入.../i),'     ')
    expect(ReportElement).toBeDisabled();
})
