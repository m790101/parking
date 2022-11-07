import React from 'react'
import '../style/helpIcon.scss'

function HelpIcon({setIsHelp,isHelp}) {
    return (
        <div className='help-icon cursor-pointer' onClick={()=>{setIsHelp(!isHelp)}}>
            <img src="https://i.imgur.com/SzcO41u.png" alt="" />
        </div>
    )
}

export default HelpIcon