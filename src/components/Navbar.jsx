import React from 'react'
import { Link } from 'react-router-dom'
import '../style/navbar.scss'
//import '../../public/icon/'

function Navbar() {
    return (
        <div data-testid='navbar'>
            <div className='nav-phone container'>
                <ul className='nav-phone__panel d-flex align-items-center justify-content-evenly'>
                    <Link to='/'>
                        <li className='nav-phone__panel__item d-flex flex-column justify-content-center  align-items-center'>
                            <img src="https://i.imgur.com/vaaMQJ1.png" alt="" className='nav-phone__panel__item__icon' />
                            首頁
                        </li>
                    </Link>
                    <Link to='/news'>
                        <li className='nav-phone__panel__item d-flex flex-column justify-content-center align-items-center'>
                            <img src="https://i.imgur.com/mbYIfnY.png" alt="" className='nav-phone__panel__item__icon' />
                            最新消息</li>
                    </Link>
                </ul>
            </div>
            <div className='nav-desk'>
                <ul className='nav-desk__panel d-flex  flex-column align-items-center justify-content-evenly '>
                    <li className='nav-desk__panel__item d-flex flex-column justify-content-center  align-items-center'>
                        <Link to='/'>
                            <img src="https://i.imgur.com/vaaMQJ1.png" alt="" className='nav-desk__panel__item__icon' />
                            首頁
                        </Link>
                    </li>
                    <Link to='/news'>
                        <li className='nav-desk__panel__item d-flex flex-column justify-content-center align-items-center'>
                            <img src="https://i.imgur.com/mbYIfnY.png" alt="" className='nav-desk__panel__item__icon' />
                            最新消息</li>
                    </Link>
                </ul>
            </div>

        </div>
    )
}

export default Navbar