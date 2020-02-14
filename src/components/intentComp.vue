<template>
  <main>
    <h1>Hello! Tell me, how do you feel?</h1>
    <p class="big"><span>OPTIONS:</span><br>
    <em>(i'm + ) jolly, excited, nervous, frustrated, happy, calm</em></p>
    <p><span>Click the button to record</span></p>
    <recordLogic />
  </main>
</template>

<script>
import recordLogic from './recordLogic.vue'
import recordButton from './recordButton.vue'

export default {
  components: {
    recordLogic,
    recordButton
  },
  computed: {
    uiState() {
      return this.$store.state.uiState
    }
  }
}
</script>

<style scoped>
main {
  margin-top: 40px;
  padding: 20px 20px 40px;
  text-align: center;
  background: black;
  position: absolute;
  top: 20px;
  left: 50%;
  width: 500px;
  margin-left: -250px;
}

h1 {
  color: rgb(245, 245, 245);
}

p.big {
  font-size: 20px;
  line-height: 1.5;
}

span {
  color: rgb(168, 167, 167);
}
</style>