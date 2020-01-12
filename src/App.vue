<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import "./style/font.css";
</style>

<style lang="stylus">
body
  margin 0
  padding 0
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align center
  color #2A2E36CC
  // min-height 100vh
.iconfont
  cursor pointer
::-webkit-scrollbar
  width 6px
  background-color transparent
::-webkit-scrollbar-track
  background-color transparent
::-webkit-scrollbar-thumb
  background-color grey
  border-radius 100px
</style>
