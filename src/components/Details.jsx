import React, { } from 'react'
import '../style/details.scss'
import { useState,useRef } from 'react'
import Swal from 'sweetalert2'
import DetailNavigateButton from '../components/DetailNavigateButton'


function Details({ setSelected, data, availbility, setDirectionResponse, duration, setDuration, setNavigate, setIsReporting}) {
    //let time = new Date().getHours()
    let availableNum = availbility.filter(a => a.id === data.id)
    let isMachine = data.summary.includes("塔台式")
    const [num, setNum] = useState(data.id)
    const timer = useRef();
    if(num !== data.id){
    clearInterval(timer.current)
    }
function count() {
    if(availableNum[0].availablecar === 0){
          return 
    }
    //setNum(data.id)
    clearInterval(timer.current)
    timer.current = setInterval(() => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    id: data.id,
                    num:data.id,
                    availablecar: data.totalcar - Math.floor(Math.random() * data.totalcar + 1),
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => {
                        console.log(json.availablecar)
                    if (json.availablecar <= 5) {
                        console.log('stop')
                        Swal.fire({
                            icon: 'error',
                            title: '已無車位，請搜尋附近停車場!',
                            width:'300px',
                            showConfirmButton: false,
                            timer: 3000
                          })
                        clearInterval(timer.current);
                    }
                });


    }, 3000)
}
function clearUp() {
    setSelected(null)
    setDirectionResponse(null)
    setNavigate(null)
    setDuration('')
    setNavigate(null)
    clearInterval(timer.current)
}
    return (
        <div className='details' >
            <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex details__header align-items-center'>
                    <p className='fw-bold'>{data.name}</p>
                    {<p>{data.fare?data.fare:'無'}/H</p>}
                </div>
                <img src="https://i.imgur.com/efx42hL.png" alt="" className='details__close' onClick={()=>{clearUp()}} />
            </div>
            <div className='d-flex details__available align-items-center'>
    
                <div>
                    <span>總車位:  {data.totalcar} </span><span>空位數:  {availableNum[0].availablecar}  </span>
                    <button className='details__available__report-btn fs-14' onClick={() => setIsReporting(1)}>回報錯誤</button>
                </div>
            </div>
            <div className='details__icon-section d-flex justify-content-arouned align-items-center'>
                <DetailNavigateButton setNavigate={setNavigate} count={count} duration={duration}/>
                <p>{isMachine ? '機械' : '平面'}</p>
                {data.totalmotor > 0 && <div>
                    <img src="https://i.imgur.com/XrYKfB8.png" alt="" className='details__icon-section__icon' />
                </div>}
                {data.ChargingStation > 0 && <div className='d-flex align-items-center'>
                    <img src="https://i.imgur.com/y8oBrYL.png" alt="" className='details__icon-section__icon' /><span>x{data.ChargingStation}</span>
                </div>}

            </div>

            {<ul className='details__detail-section'>
                <li>營業時間: <span className='fw-light'>{data.serviceTime}</span></li>
                <li>費率: <span className='fw-light'>{data.payex}</span></li>
                <li>地址: <span className='fw-light'>{data.address}</span></li>
                <li>電話: <span className='fw-light'>{data.tel}</span></li>
                <li>備註: <span className='fw-light'></span></li>
            </ul>}
            <p className='details__footer fs-14'>相關停車須知皆以現場公告為準</p>
        </div>
    )
}

export default Details