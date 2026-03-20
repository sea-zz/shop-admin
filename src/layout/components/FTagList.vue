<template>
  <div class="f-tag-list">
    <el-tabs
    v-model="currentTab"
    type="card"
    class="demo-tabs"
    @tab-remove="removeTab"
    style="min-width: 100px;"
    @tab-change="tabClick"
  >
    <el-tab-pane
      v-for="(item, key) in tabItems"
      :closable="item.path != '/'"
      :key="key"
      :label="item.title"
      :name="item.path"
    ></el-tab-pane>
  </el-tabs>
  <el-dropdown @command="handleDropDown">
    <span class="el-dropdown-link">
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="all">关闭全部</el-dropdown-item>
        <el-dropdown-item command="current">关闭当前</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { getStorage, setStorage, LOCAL_STORAGE } from '@/common/utils/localStorage';

const defaultTabs = [
  {
    title: '后台首页',
    path: '/'
  }
];

const route = useRoute();
const router = useRouter();

const currentTab = ref(route.path)
const tabItems = ref(getStorage(LOCAL_STORAGE.SHOP_ADMIN_TABS) || [...defaultTabs]);

const removeTab = (path) => {
  const newTabs = tabItems.value.filter(item => {
    return item.path !== path
  });
  tabItems.value = newTabs;
  setStorage(LOCAL_STORAGE.SHOP_ADMIN_TABS, newTabs);
  currentTab.value = '/';
  router.push('/');
}

const tabClick = (e) => {
  router.push(e);
}

const addRoute = (tab) => {
  if (!tabItems.value.find(item => item.path == tab.path)) {
    tabItems.value.push(tab);
    setStorage(LOCAL_STORAGE.SHOP_ADMIN_TABS, tabItems.value);
  }
}

onBeforeRouteUpdate((to, from) => {
  addRoute({
    title: to.meta.title,
    path: to.path
  });
  currentTab.value = to.path;
})

const handleDropDown = (e) => {
  switch (e) {
    case 'all':
      closeAll();
      break;
    case 'current':
      closeCurrent();
      break;
    default:
      break;
  }
}

const closeAll = () => {
  tabItems.value = [...defaultTabs];
  setStorage(LOCAL_STORAGE.SHOP_ADMIN_TABS, [...defaultTabs]);
  currentTab.value = '/';
  router.push('/');
}

const closeCurrent = () => {
  const newTabs = tabItems.value.filter(item => {
    if (item.path === '/') {
      return true;
    }
    return item.path !== route.path
  });
  tabItems.value = newTabs;
  setStorage(LOCAL_STORAGE.SHOP_ADMIN_TABS, newTabs);
  currentTab.value = '/';
  router.push('/');
}

</script>

<style leng="less">
.f-tag-list {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .el-dropdown {
    width: 40px;
    height: 100%;
    background-color: #fff;
    color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-dropdown-link {
    color: #ccc;
    justify-content: center;
    font-size: 16px;
  }
  .el-tabs__header{
    margin-bottom: 0; 
    border-bottom: none !important;
  }
  .el-tabs__nav {
     border: none !important;
  }
  .el-tabs__item {
    border: none !important;
    border-radius: 10px;
    margin-right: 5px;
    background-color: #fff;
  }
  .is-disabled {
    cursor: not-allowed;
  }
}

</style>