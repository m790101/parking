import moment from "moment";

function dateDisplay(){
   return  moment().format('YYYY-MM-DD HH:mm')
}

export{dateDisplay}