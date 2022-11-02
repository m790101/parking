import React from "react"
import '../style/report.scss'

import Swal from 'sweetalert2'

function Report({ setIsReporting }) {

    function clearUp() {
        setIsReporting(null)
    }
/*function submit(){
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
}*/
    return (
        <div className="bg">
            <div className="report d-flex flex-column">
                <div className="d-flex  align-items-center report__header">
                    <p className="report__header__title text-center">回報錯誤</p>
                    <img src="https://i.imgur.com/efx42hL.png" alt="" className='report__header__close' onClick={clearUp} />
                </div>
                <textarea name="" id="" cols="15" rows="10" className="report__text" placeholder="請從這裡輸入..."></textarea>
                <button className="report__btn">送出</button>
            </div>
        </div>

    )
}

export default Report