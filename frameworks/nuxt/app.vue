<template>
  <div>
    <h1>Nuxt</h1>
    <IsomorphicDompurifyTest />
  </div>
</template>

<script>  
import IsomorphicDompurifyTest from './src/components/IsomorphicDompurifyTest.vue';

export default {
  name: 'App',
  components: {
    IsomorphicDompurifyTest
  },
}
</script>

<style>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
