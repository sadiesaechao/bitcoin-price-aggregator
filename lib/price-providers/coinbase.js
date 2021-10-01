const webget = require('../webget')

module.exports = {
  currentPrice: async (cryptoSymbol) => {
    const { data } = await webget(`https://api.coinbase.com/v2/prices/${cryptoSymbol}-USD/buy`)
    return parseFloat(data.amount)
  }
}
