<template>
  <div id="app">
    <div class="nav">
      <div class="nav__title">
        <router-link to="/">Glass page</router-link>
      </div>
      <div class="nav__title">
        <router-link to="/diff">Diff page</router-link>
      </div>
    </div>
    <keep-alive :key="$route.fullPath" v-if="!isGlassChanged">
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <router-view v-else :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isGlassChanged: false,
      prevSimbol: 'BNBBTC'
    }
  },
  computed: {
    ...mapState(['symbol'])
  },
  watch: {
    $route() {
      if (this.symbol == this.prevSimbol) {
        this.isGlassChanged = false
      } else {
        this.isGlassChanged = true
        this.prevSimbol = this.symbol
      }
    }
  }
}
</script>

<style lang="scss">
.flex {
  display: flex;
  &-column {
    flex-direction: column;
  }
}
.nav {
  width: 100%;
  height: 7vh;
  display: flex;
  background: rgb(20, 142, 171);
  background: linear-gradient(
    90deg,
    rgba(20, 142, 171, 0.5130427170868348) 0%,
    rgba(33, 205, 166, 0.9248074229691877) 42%,
    rgba(0, 255, 188, 0.8687850140056023) 100%
  );
  justify-content: space-evenly;
  &__title {
    display: flex;
    align-items: center;
    width: 15%;
    justify-content: center;
  }
}
a {
  text-decoration: none;
  color: black;
  letter-spacing: 1px;
  &:hover {
    font-weight: 800;
    color: #0400ea;
    text-shadow: 1px 1px 2px black, 0 0 2px red;
    margin-top: 2px;
  }
}
</style>
