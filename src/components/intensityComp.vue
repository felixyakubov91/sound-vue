<template>
  <div>
    <main>
      <h1 class="emotion">Feeling {{ emotion }}</h1>
      <h3>Change the intensity!</h3>
      <p class="big">
        <span>Options:</span>
        <em>more, less, add, plus</em>
      </p>
      <recordLogic />
    </main>

    <refreshComp />
  </div>
</template>

<script>
import recordLogic from "./recordLogic.vue";
import refreshComp from "./refreshComp.vue";

export default {
  components: {
    recordLogic,
    refreshComp
  },
  props: {
    emotion: {
      default: "Excited",
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
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