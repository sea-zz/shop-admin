<script setup>
  import { ref, onMounted, watchEffect } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const fullscreenLoading = ref(true)

  //TODO:逻辑不对
  watchEffect(() => {
    if (store.state.user) {
      fullscreenLoading.value = false;
    }
  });
</script>

<template>
  <router-view></router-view>
  <!-- <div v-loading.fullscreen.lock="fullscreenLoading"></div> -->
</template>

<style scoped>

</style>
