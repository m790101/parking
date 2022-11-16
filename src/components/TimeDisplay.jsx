import '../style/timeDisplay.scss'
import {dateDisplay} from '../utils/date'

function TimeDisplay({refreshTime}){
    let time = dateDisplay()
    return (
        <div className="refresh-time">
             <p>更新時間：{time}</p>
        </div>
    )
}

export default TimeDisplay