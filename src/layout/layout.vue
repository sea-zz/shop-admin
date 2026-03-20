<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container class="layout-main">
      <el-aside :width="$store.state.isCollapse ? 'auto' : '200px'">
        <f-menu></f-menu>
      </el-aside>
      <el-container class="layout-content">
        <el-header style="display:flex;align-items:center;">
          <f-tag-list></f-tag-list>
        </el-header>
        <el-main>
          <router-view v-slot="{ Component }">
          <keep-alive :max="10">
            <component :is="Component" />
          </keep-alive>
        </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
  import FHeader from './components/FHeader.vue';
  import FMenu from './components/FMenu.vue';
  import FTagList from './components/FTagList.vue';
</script>


<style lang="less">
  .layout-main {
    height: calc(100vh - 60px);
    overflow: auto;
  }
  .layout-content {
    flex: auto;
    background-color: rgb(243, 244, 246);
    .el-main {
      height: calc(100% - 60px);
      overflow-y: auto;
    }
  }
</style>