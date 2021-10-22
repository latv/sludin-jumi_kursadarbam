const isMoney = (value) => {
    const moneyPattern = /^(\d{1,8}(\.|,)\d{0,2}|\d{1,8})$/; // regex for 2 decimal places , and .
  
    return moneyPattern.test(value) || value === ""; // is valid or not
  }
  
  export default {isMoney};
  