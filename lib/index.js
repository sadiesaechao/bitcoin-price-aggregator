const webget = require('./webget')
const priceProviders = require('./price-providers')

async function averageBitcoinPrice() {
  const currentPrices = await Promise.all(
    priceProviders.map((provider) => provider.currentPrice('BTC'))
  )

  const sum = currentPrices.reduce((sum, price) => sum + price, 0)
  return sum / currentPrices.length
}

module.exports = { averageBitcoinPrice }
