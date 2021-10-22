const formatMoney = (value) => { return (Math.floor(parseFloat(value) * 100) / 100).toFixed(2) } // round money to 2 deciamls places

export default { formatMoney };