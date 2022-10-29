import React from 'react'
import '../style/details.scss'

function Details({setSelected,data}){
    //let time = new Date().getHours()
    let day = new Date().getDay()
    return (
        <div className='details '>
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex details__header align-items-center'>
                <p>{data.name}</p>
                </div>
                <img src="https://i.imgur.com/efx42hL.png" alt="" className='details__close' onClick={()=>setSelected(null)}/>
            </div>
            <div className='d-flex details__available'>
                <p>50/ 0.5H</p>
                <div>
                <span>總車位:  {data.totalcar}  </span><span>空位數:  23  </span>
                </div>
            </div>
            <div className='details__icon-section'>

            </div>

                {<ul className='fs-14'>
                    <li>營業時間: <span className='fw-light'>{data.serviceTime}</span></li>
                    <li>費率: <span className='fw-light'>{data.payex}</span></li>
                    <li>地址: <span className='fw-light'>{data.address}</span></li>
                    <li>電話: <span className='fw-light'>{data.tel}</span></li>
                    <li>備註: <span className='fw-light'>{day}</span></li>
    </ul>}
        <p className='details__footer fs-14'>相關停車須知皆以現場公告為準</p>
        </div>
    )
}

export default Details