const webget = require('../webget')

module.exports = {
  currentPrice: async (cryptoSymbol) => {
    const prices = await webget(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoSymbol}&tsyms=USD`)
    return prices.USD
  }
}
