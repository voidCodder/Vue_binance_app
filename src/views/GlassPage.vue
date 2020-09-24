<template>
  <div class="flex main-wrapper">
    <div class="table">
      <div class="table__title">Amount</div>
      <div class="table__title">Price</div>
      <div class="table__title table__title_total">Total</div>
      <template v-for="(item, index) in glass.bids">
        <div :key="index + '1'">{{ item[0] }}</div>
        <div :key="index + '2'">{{ item[1] }}</div>
        <div class="table__total" :key="index + '3'">
          {{ item[0] * item[1] }}
        </div>
      </template>
    </div>

    <div class="table">
      <div class="table__title">Amount</div>
      <div class="table__title">Price</div>
      <div class="table__title table__title_total">Total</div>
      <template class="flex" v-for="(item, index) in glass.asks">
        <div :key="index + '1'">{{ item[0] }}</div>
        <div :key="index + '2'">{{ item[1] }}</div>
        <div class="table__total" :key="index + '3'">
          {{ item[0] * item[1] }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      glass: {
        bids: null,
        asks: null
      },
      socket: null
    }
  },
  computed: {
    ...mapState(['symbol'])
  },
  async created() {
    await this.snapshot()
    this.socketSubscribe()
  },
  watch: {
    symbol() {
      this.socket.close()
      this.socketSubscribe()
    }
  },
  methods: {
    async snapshot() {
      let glass = await this.$SDKbinance.getData(this.symbol)
      glass.bids = glass.bids.reverse()
      glass.asks = glass.asks.reverse()
      this.glass = glass
    },
    socketSubscribe() {
      this.socket = this.$SDKbinance.subscribe(this.symbol)
      this.socket.onmessage = async event => {
        const result = JSON.parse(event.data)
        this.$store.commit('UPDATE_MESSAGES', {
          messages: result
        })
        let [asksAdd, bidsAdd] = [
          result.a.filter(item => item[1] != 0),
          result.b.filter(item => item[1] != 0)
        ]
        asksAdd.reverse()
        bidsAdd.reverse()
        this.glass.asks.splice(
          this.glass.asks.length - asksAdd.length,
          asksAdd.length
        )
        this.glass.bids.splice(
          this.glass.bids.length - bidsAdd.length,
          bidsAdd.length
        )
        this.glass.asks = [...asksAdd, ...this.glass.asks]
        this.glass.bids = [...bidsAdd, ...this.glass.bids]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100%;
  height: 90vh;
  justify-content: space-around;
}
.table {
  padding: 0 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover {
    overflow-y: visible;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(180deg, #00c6fb, #005bea);
  }
  &__title {
    font-weight: 900;
    padding: 5px 0;
    background: white;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #00c6fb;
  }
}
@media (max-width: 840px) {
  .table {
    grid-template-columns: 1fr 1fr;
    &__total {
      display: none;
    }
    &__title_total {
      display: none;
    }
  }
}
</style>
