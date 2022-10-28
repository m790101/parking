import React from 'react'
import '../style/navbar.scss'
//import '../../public/icon/'

function Navbar(){
return (
    <>
        <ul className='nav-phone d-flex align-items-center justify-content-evenly'>
            <li className='nav-phone__item d-flex flex-column justify-content-center  align-items-center'>
                <img src="https://i.imgur.com/vaaMQJ1.png" alt="" className='nav-phone__item__icon'/>
                首頁
            </li>
            <li className='nav-phone__item d-flex flex-column justify-content-center  align-items-center'>
            <img src="https://i.imgur.com/H4QPxLR.png" alt="" className='nav-phone__item__icon'/>
                搜尋</li>
            <li className='nav-phone__item d-flex flex-column justify-content-center align-items-center'>
            <img src="https://i.imgur.com/mbYIfnY.png" alt="" className='nav-phone__item__icon'/>
                最新消息</li>
        </ul>
    </>
)
}

export default Navbar