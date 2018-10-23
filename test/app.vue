<template>
  <div>
    <div class="item1" ref="item1" @click="scroll(2)">1</div>
    <div class="item2" ref="item2" @click="scroll(1)">2</div>
  </div>
</template>

<script>
import { easeVerticalScroll } from '../dist/mobileUtils.js'
export default {
  name: 'APP',
  methods: {
    scroll (item) {
      easeVerticalScroll(this.$refs[`item${item}`], document.body)
    }
  }
}
</script>

<style lang="stylus" scoped>
.item1
  background-color blue
  height 100vh
.item2
  background-color red
  height 100vh
</style>
