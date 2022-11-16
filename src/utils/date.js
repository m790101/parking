import moment from "moment";

function dateDisplay(time){
   return  moment().format('YYYY-MM-DD HH:mm')
}

export{dateDisplay}