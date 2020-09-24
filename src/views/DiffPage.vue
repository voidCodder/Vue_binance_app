<template>
  <div>
    <div class="flex diff__symbol-wrapper">
      <span>Select symbol:</span>
      <div class="select">
        <select class="select" v-model="symbol" @change="sendSymbol(symbol)">
          <option
            v-for="(item, index) in options"
            :key="index"
            class="select__option"
            >{{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="diff__content-wrapper">
      <div class="diff-wrapper">
        <span>Bids:</span>
        <ul>
          <div class="diff-content__title-wrapper">
            <span class="diff-content__title">Amount</span>
            <span class="diff-content__title">Price</span>
          </div>
          <li v-for="(item, index) in diff.a" :key="index">
            {{ item[0] + '|' + item[1] }}
          </li>
        </ul>
      </div>
      <div class="diff-wrapper">
        <span>Asks:</span>
        <ul>
          <div class="diff-content__title-wrapper">
            <span class="diff-content__title">Amount</span>
            <span class="diff-content__title">Price</span>
          </div>
          <li v-for="(item, index) in diff.b" :key="index">
            {{ item[0] + '|' + item[1] }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      symbol: 'BTCUSDT',
      options: ['BTCUSDT', 'BNBBTC', 'ETHBTC']
    }
  },
  computed: {
    ...mapState(['diff'])
  },
  methods: {
    sendSymbol(symbol) {
      this.$store.commit('CHANGE_SYMBOL', {
        symbol
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  width: 200px;
}
.diff {
  &-wrapper {
    min-width: 50%;
  }
  &__symbol-wrapper {
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  &__content-wrapper {
    display: flex;
  }
  &-content {
    &__title-wrapper {
      display: inline-flex;
      justify-content: space-around;
    }
  }
}
span {
  margin-right: 15px;
  margin-left: 5px;
}
select {
  position: relative;
  display: block;
  width: 100%; /* от ширины блока div */
  padding: 0.75rem 2.5rem 0.75rem 1rem; /* отступы от текста до рамки */
  background: none; /* убираем фон */
  border: 1px solid #ccc; /* рамка */
  border-radius: 3px; /* скругление полей формы */
  -webkit-appearance: none; /* Chrome */
  -moz-appearance: none; /* Firefox */
  appearance: none; /* убираем дефолнтные стрелочки */
  font-family: inherit; /* наследует от родителя */
  font-size: 1rem;
  color: #444;
  &:after {
    content: '';
    display: block;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #000 transparent transparent transparent;
    pointer-events: none;
    position: absolute;
    top: 50%;
    right: 1rem;
    z-index: 1;
    margin-top: -3px;
  }
}
</style>
