const webget = require('../webget')

module.exports = {
  currentPrice: async (cryptoSymbol) => {
    const { ticker } = await webget(`https://api.cryptonator.com/api/ticker/${cryptoSymbol.toLowerCase()}-usd`)
    return parseFloat(ticker.price)
  }
}
