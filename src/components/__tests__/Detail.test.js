import { render, screen } from '@testing-library/react'
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
    {id: '002', availablecar: 0, availablemotor: -9, availablebus: -9},
    {id: '003', availablecar: 44, availablemotor: 82, availablebus: 0, ChargeStation: ''},
    {id: '004', availablecar: 145, availablemotor: -9, availablebus: -9, ChargeStation:' '},
    {id: '005', availablecar: 59, availablemotor: 35, availablebus: -9, ChargeStation: ''},
    {id: '006', availablecar: 0, availablemotor: 62, availablebus: -9},
    {id: '007', availablecar: 90, availablemotor: 99, availablebus: -9, ChargeStation: ''},
    {id: '008', availablecar: 28, availablemotor: 1, availablebus: -9},
    {id: '014', availablecar: 50, availablemotor: 1, availablebus: 0, ChargeStation: ''},
    {id: '015', availablecar: 137, availablemotor: 508, availablebus: -9, ChargeStation: ''},
    {id: '016', availablecar: 11, availablemotor: -9, availablebus: -9},
    {id: '018', availablecar: 624, availablemotor: 94, availablebus: -9, ChargeStation: ''},
    {id: '019', availablecar: 3, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '020', availablecar: 129, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '021', availablecar: 83, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '022', availablecar: 3, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '023', availablecar: 109, availablemotor: -9, availablebus: -9, ChargeStation: ''} ,
    {id: '024', availablecar: 47, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '025', availablecar: 79, availablemotor: 0, availablebus: -9, ChargeStation: ''},
    {id: '027', availablecar: 463, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '028', availablecar: 0, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '029', availablecar: 72, availablemotor: 35, availablebus: -9, ChargeStation: ''},
    {id: '030', availablecar: 1, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '031', availablecar: 15, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '032', availablecar: 113, availablemotor: -9, availablebus: -9, ChargeStation: ''},
    {id: '033', availablecar: 18, availablemotor: -9, availablebus: -9},
    {id: '034', availablecar: 36, availablemotor: -9, availablebus: -9} ,
    {id: '035', availablecar: 8, availablemotor: -9, availablebus: -9, ChargeStation: '{…}'},
    {id: '036', availablecar: 60, availablemotor: -9, availablebus: -9, ChargeStation: '{…}'},
    {id: '037', availablecar: 61, availablemotor: -9, availablebus: -9, ChargeStation: '{…}'},
    {id: '038', availablecar: 5, availablemotor: -9, availablebus: -9},
    {id: '039', availablecar: 15, availablemotor: -9, availablebus: -9},
    {id: '040', availablecar: 57, availablemotor: -9, availablebus: -9, ChargeStation: '{…}'},
    {id: '041', availablecar: 11, availablemotor: 0, availablebus: -9, ChargeStation: '{…}'},
    {id: '042', availablecar: 20, availablemotor: 3, availablebus: -9, ChargeStation: '{…}'},
    {id: '043', availablecar: 123, availablemotor: 0, availablebus: -9, ChargeStation: '{…}'},
    {id: '044', availablecar: 106, availablemotor: 50, availablebus: -9, ChargeStation: '{…}'}
]
const duration = '7分鐘'

test('should render Details component', () => {
   
    render(<Details data={data} availbility={availbility} duration={duration} />)
    const DetailElement = screen.getByTestId('detail-button')
    expect(DetailElement).toBeInTheDocument();
})


test('should show how many min from location', () => {
   
    render(<Details data={data} availbility={availbility} duration={duration} />)
    const DetailElement = screen.getByTestId('detail-button').textContent
    expect(DetailElement).toMatch(/開車 7分鐘/)
})