const webget = require('../webget')

module.exports = {
  currentPrice: async (cryptoSymbol) => {
    const price = await webget('https://blockchain.info/q/24hrprice', 'text')
    return parseFloat(price)
  }
}
