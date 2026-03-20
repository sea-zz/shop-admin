<template>
  <div class="p-header">
    <div class="p-header-title ft30">拼多少商城</div>
    <div class="p-header-right pr16">
      <span>
        <el-icon class="mr16" @click="handleMenu">
          <Fold v-if="!$store.state.isCollapse" />
          <Expand v-else />
        </el-icon>
        <el-tooltip
        effect="dark"
        content="刷新"
        placement="bottom"
      >
        <el-icon @click="handleRefresh"><Refresh /></el-icon>
      </el-tooltip>
      </span>
      <div>
      <el-tooltip
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <el-icon class="mr16" @click="toggleFullScreen">
          <FullScreen v-if="!fullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>
        <el-dropdown @command="handleDropDown">
          <span class="el-dropdown-link">
            <el-avatar class="p-header-logo mr8" :size="25" :src="$store.state.user.avatar" />
            {{$store.state.user.username}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="modifyPass">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" title="修改密码" size="600" footer-class="header-drawer-footer" @close="cancelClick">
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="ruleForm.oldpassword" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          v-model="ruleForm.repassword"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto;">
        <el-button type="primary" @click="confirmClick">提交</el-button>
        <el-button @click="cancelClick">取消</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
  import { ArrowDown } from '@element-plus/icons-vue'
  import { ref, reactive } from 'vue';
  import { ElMessageBox, ElMessage} from 'element-plus';
  import { logout as userLogout, resetPass } from '@/api/manager';
  import { delCookie, LOGIN_TOKEN } from '@/common/utils/cookie';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';

  const router = useRouter();
  const store = useStore();

  const fullscreen = ref(false);
  const drawer = ref(false)
  const formRef = ref(null);
  const ruleForm = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })

  const rules = {
    oldpassword: [
      { required: true, message: '旧密码必填'}
    ],
    password: [
      { required: true, message: '密码必填'}
    ],
    repassword: [
      { required: true, message: '新密码必填'}
    ]
  };

  const cancelClick = () => {
    drawer.value = false;
    // 清空form
    formRef.value.resetFields();
  }

  const confirmClick = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        resetPass(ruleForm).then(() => {
          // 去掉弹窗
          drawer.value = false;
          // 清空form
          formRef.value.resetFields();
          // 提示修改成功
          ElMessage({
            type: 'success',
            message: '修改密码成功！',
          })
          // 退出登录
          delCookie(LOGIN_TOKEN);
          // 去登录页
          router.push('/login');
        });
      } 
    })
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      fullscreen.value = true;
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      fullscreen.value = false;
      document.exitFullscreen();
    }
  }

  const handleRefresh = () => location.reload();

  const handleDropDown = (type) => {
    switch (type) {
      case 'modifyPass':
        modifyPass();
        break;
      case 'logout':
        logout();
        break;
      default:
        break;
    }
  }

  const modifyPass = () => {
    drawer.value = true;
  }
  const logout = () => {
    ElMessageBox.confirm(
    '确定要退出当前登录吗?',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
      overflow: true,
    }
  )
    .then(() => {
      userLogout().finally(() => {
        // token
        delCookie(LOGIN_TOKEN);
        // 去登录页
        router.push('/login');
        // 提示成功
        ElMessage({
          type: 'success',
          message: '退出登录成功！',
        })
      });
    })
    .catch(() => {
     
    })
  }

  const handleMenu = () => {
    store.commit('setCollapse', !store.state.isCollapse)
  }

</script>

<style>
  .p-header {
    width: 100%;
    height: 60px;
    @apply flex items-center bg-indigo-500 text-light-50 fixed top-0 left-0;
  }
  .p-header-title {
    flex-basis: 300px;
    text-align: center;
  }
  .p-header-right {
    flex:1;
    display: flex;
    justify-content: space-between;
  }
  .el-icon:hover {
    cursor:pointer;
  }
  .el-dropdown-link {
    @apply flex items-center;
    color: #fff;
  }
  .header-drawer-footer > div {
    display: flex;
    justify-content: flex-start;
  }
</style>