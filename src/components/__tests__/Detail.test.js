import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Details from '../Details'


const data = {
    AED_Equipment:"0",
    Accessibility_Elevator:"0",
    CellSignal_Enhancement:"0",
    Child_Pickup_Area:"0",
    address:"松壽路1號地下",
    area:"信義區",
    cap:0.06706706706706707,
    id:"001",
    lat:25.0363076,
    lng:121.5661188,
    name:"府前廣場地下停車場",
    payex:"小型車全日月票4200元，周邊里里民全日月票3360元，所在里里民全日月票2940元，夜間月票1000元(限周一至周五19-8，及周六、日與行政機關放假之紀念日、民俗日)，小型車計時30元(9-18)，夜間計時10元(18-9)；機車計時10元(當日當次上限20元)，機車月票300元。",
    serviceTime:"00:00:00~23:59:59",
    summary:"為地下二層停車場，計有1998個小型車停車格，1337個機車停車位",
    tel:"27057716",
    totalbike:0,
    totalbus:0,
    totalcar:1998,
    totalmotor:1360,
    tw97x:"306812.928",
    tw97y:"2769892.95",
}
const availbility = [
    {id: '001', availablecar: 134, availablemotor: 57, availablebus: -9},
]
const duration = '7分鐘'
const mockSetNavigate = jest.fn()
beforeEach(cleanup)
test('should render Details component', () => {
   
    render(<Details data={data} availbility={availbility} duration={duration} setNavigate={mockSetNavigate}/>)
    const DetailElement = screen.getByTestId('detail-button')
    expect(DetailElement).toBeInTheDocument();
})


test('should show how many min from location', () => {
   
    render(<Details data={data} availbility={availbility} duration={duration} />)
    const DetailButton = screen.getByTestId('detail-button').textContent
    expect(DetailButton).toMatch(/開車 7分鐘/)
})

/*test('should get number from press 開車Ｘ分鐘 button', async() => {
    render(<Details data={data} availbility={availbility} duration={duration} setNavigate={mockSetNavigate}/>)
    const count = jest.fn()
    const DetailButton = await screen.findByTestId('detail-button')
    fireEvent.click(DetailButton)
    expect(count).toHaveBeenCalled()

    })

*/



 /*const count = jest.fn().mockReturnValue(1)/*.mockReturnValue({
     json:{
        id: 1,
        num:1,
        availablecar:20,
 }
})
 const setNavigate = jest.fn().mockReturnValue({navigate:1})

    render(<Details data={data} availbility={availbility} duration={duration} />)
    const DetailButton = screen.getByTestId('detail-button')
    fireEvent.click(DetailButton)
    expect(count).toHaveBeenCalled(1)
    expect(setNavigate).toHaveBeenCalled(1)
})*/