import React from "react"
import '../style/report.scss'

import Swal from 'sweetalert2'

function Report({ setIsReporting }) {

    function clearUp() {
        setIsReporting(null)
    }
function submit(){
    Swal.fire({
  icon: 'success',
  title: '成功發送，謝謝你的回饋!',
  width:'300px',
  showConfirmButton: false,
  timer: 1500
})
setIsReporting(null)
}
    return (
        <div className="bg">
            <div className="report d-flex flex-column">
                <div className="d-flex  align-items-center report__header">
                    <p className="report__header__title text-center">回報錯誤</p>
                    <img src="https://i.imgur.com/efx42hL.png" alt="" className='report__header__close' onClick={clearUp} />
                </div>
                <textarea name="" id="" cols="15" rows="10" className="report__text" placeholder="請從這裡輸入..."></textarea>
                <button className="report__btn" onClick={submit}>送出</button>
            </div>
        </div>

    )
}

export default Report