function isInRange(value, timeFix) {

    timeFix[0] = timeFix[0] + ':00'
    timeFix[1] = timeFix[1] + ':00'
    if (value >= timeFix[0] && value <= timeFix[1]) {
      return true
    }
    return false
  }

  export {isInRange}