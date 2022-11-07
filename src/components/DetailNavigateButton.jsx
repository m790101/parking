function DetailNavigateButton({setNavigate,count,duration}) {
    return (
<button className='btn-main cursor-pointer' onClick={() => { setNavigate(1); count(); }} data-testid='navigate-button' >開車 {duration}</button>
    )
    
}

export default DetailNavigateButton