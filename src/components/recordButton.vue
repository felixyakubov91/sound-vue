<template>
  <div>
    <button @click="getNewIntent" :class="{ disabled: uiState === 'listening' }">Start recording</button>
  </div>
</template>

<script>
export default {
  props: {
    aborted: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  computed: {
    uiState() {
      return this.$store.state.uiState
    }
  },
  methods: {
    getNewIntent() {
      this.$store.dispatch('getSpeech')
      this.$emit('isStoped', false)
    }
  }
}
</script>

<style scoped>
button {
    font-size:20px;
    font-weight: 700;
    margin-top: 0.5em;
    padding: 20px 30px;
    background: -webkit-gradient(linear, left top, right top, from(#0072ff), to(#00d4ff));
    background: linear-gradient(90deg, #0072ff 0%, #00d4ff 100%);
    border-radius: 6px;
    border-color: #1F2667;
    color: #fff;
    cursor:pointer;
}

button.disabled {
  background: #ccc;
  cursor: none;
}
</style>