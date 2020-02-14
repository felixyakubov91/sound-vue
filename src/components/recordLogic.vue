<template>
  <div>
    <record-button
      v-if="intent === 'None' || aborted" 
      @isStoped="aborted = $event"
      :aborted="aborted"
    />
    <div 
      v-if="uiState === 'listening' || 
            intent  !== 'None'      && 
            aborted === false"
      >
        <app-sineloader />
        <button @click="aborting">Stop Recording</button>
    </div>
    </record-button>
  </div>
</template>

<script>
import AppSineloader from './AppSineloader.vue'
import recordButton from './recordButton.vue'

export default {
  components: {
    AppSineloader,
    recordButton
  },
  data() {
    return {
      aborted: false
    }
  },
  computed: {
    intent() {
      return this.$store.state.intent
    },
    uiState() {
      return this.$store.state.uiState
    }
  },
  methods: {
    aborting() {
      this.$store.commit('stopRecording')
      this.aborted = true
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  background: black;
}
button {
  border: none;
  outline: none;
  padding: 12px 15px 10px;
  background: #333;
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.2s all ease;
  &:hover {
    background: #444;
  }
}
</style>