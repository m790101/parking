import React from 'react'
import '../style/help.scss'

function Help({setIsHelp}) {
    function clearUp() {
        setIsHelp(null)
    }

    return (
        <div className='help' data-testid='help'>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex help__header align-items-center'>
                    <p>需要幫助嗎？</p>
                </div>
                <img src="https://i.imgur.com/efx42hL.png" alt="" className='help__close' onClick={clearUp} />
            </div>
            <div className='help__main '>
                <div className='help__main__section d-flex justify-content-around'>
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://i.imgur.com/FBoOQuh.png" alt="" className='help__main__icon' /><p className=' text-center'>尚有足夠空位</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://i.imgur.com/lKDCX1d.png" alt="" className='help__main__icon' /><p className=' text-center'>即將停滿</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://i.imgur.com/M7l0UWq.png" alt="" className='help__main__icon' /><p className=' text-center'>已停滿</p>
                    </div>
                </div>
                <div className='help__main__section d-flex justify-content-around'>
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://i.imgur.com/XrYKfB8.png" alt="" className='help__main__icon' /><p className=' text-center'>具備機車停車位</p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <img src="https://i.imgur.com/y8oBrYL.png" alt="" className='help__main__icon' /><p className=' text-center'>具備充電樁</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Help