function fareExtract(fare,payex){
    if(fare === 0){
        if(payex[4] === '0' && payex[5] === '元'){
            return Number(payex.slice(3,5))
        }
        else if(payex[4] === '0'){
            return Number(payex.slice(3,6))
        }
        else if(payex[1] === '0' && payex[2] === '元'){
            return Number(payex.slice(0,2))
        }
        else if(payex[3] === '元'){
            return Number(payex.slice(0,3))
        }
        else if(payex[1] === '0'){
            return Number(payex.slice(0,3))
        }
        
        else return 0

    }
    else{
        return fare
    }

}


export {fareExtract}