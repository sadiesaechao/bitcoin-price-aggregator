const webget = require('../webget')

module.exports = {
  currentPrice: async (cryptoSymbol) => {
    const [priceInfo] = await webget(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols=${cryptoSymbol.toLowerCase()}`)
    return priceInfo.current_price
  }
}
