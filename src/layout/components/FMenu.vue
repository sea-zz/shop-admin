<template>
  <el-menu
    :default-active="defaultActive"
    class="el-menu-vertical"
    :collapse="$store.state.isCollapse"
    :collapse-transition="true"
    :router="true"
  >
    <template v-for="(items, index) in $store.state.user.menus">
      <el-sub-menu v-if="items?.child?.length" :index="items.name">
        <template #title>
          <el-icon>
            <component :is="items.icon"></component>
          </el-icon>
          <span>{{items.name}}</span>
        </template>
        <template v-for="(subitem, subidx) in items.child">
          <el-menu-item :index="subitem.frontpath">
            <el-icon>
              <component :is="subitem.icon"></component>
            </el-icon>
            <template #title>{{subitem.name}}</template>
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item v-else :index="items.frontpath">
        <el-icon>
          <component :is="items.icon"></component>
        </el-icon>
        <template #title>{{items.name}}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
   import { useStore } from 'vuex';
   import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router';
   import { ref } from 'vue';
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const defaultActive = ref(route.path);

    onBeforeRouteUpdate((to) => {
      defaultActive.value = to.path;
    });
</script>

<style lang="less">
.el-menu-vertical {
  height: 100%;
  overflow: auto;
}
</style>