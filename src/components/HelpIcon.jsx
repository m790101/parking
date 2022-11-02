import React from 'react'
import '../style/helpIcon.scss'

function HelpIcon({setIsHelp}) {

    return (
        <div className='help-icon' onClick={()=>{setIsHelp(1)}}>
            <img src="https://i.imgur.com/SzcO41u.png" alt="" />
        </div>
    )
}

export default HelpIcon