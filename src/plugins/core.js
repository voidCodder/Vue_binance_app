export default {
  install(Vue) {
    const { SDKbinance } = require('./SDKbinance')
    Vue.prototype.$SDKbinance = SDKbinance
  }
}
