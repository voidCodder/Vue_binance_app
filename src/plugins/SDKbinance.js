const axios = require('axios')

export const SDKbinance = {
  getData: async symbol => {
    let binanceGlass = await axios.get(
      `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=500`
    ) //получение стакана по символу symbol
    return binanceGlass.data
  },
  subscribe: function(symbol) {
    symbol = symbol.toLowerCase()
    let socket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${symbol}@depth`
    )
    return socket // возвращение сокета по символу symbol
  }
}
