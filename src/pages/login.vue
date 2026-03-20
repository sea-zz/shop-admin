<template>
  <el-row>
    <el-col :md="12" :lg="16">
      <div class="left-content">
        <h1>欢迎光临</h1>
        <p>👏欢迎来到shopping之家，在这里您将看到各类商品</p>
      </div>
    </el-col>
    <el-col :md="12" :lg="8">
      <div class="right-content">
        <div class="tips">
          <div class="welcome">欢迎回来</div>
          <div class="tip mt16 mb16 color-gray-light">账号密码登录</div>
        </div>
        <el-form ref="formRef" :rules="rules" :model="data">
          <el-form-item prop="username">
            <el-input v-model="data.username" clearable placeholder="请输入用户名">
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
          </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="data.password" clearable placeholder="请输入密码" type="password">
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" round type="primary" @click="submitForm(formRef)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
  import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
  import {login} from '@/api/manager';
  import { ElNotification } from 'element-plus';
  import { setCookie, getCookie, LOGIN_TOKEN } from '@/common/utils/cookie';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  
  const loading = ref(false);
  const formRef = ref(null);
  const data = reactive({
    username: '',
    password: ''
  });
  const rules = {
    username: [
      { required: true, message: '用户名必填'}
    ],
    password: [
      { required: true, message: '密码必填'}
    ]
  };
  
  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        loading.value = true;
        login(data.username, data.password).then(res => {
          // 设置token
          setCookie(LOGIN_TOKEN, res.token);
          // 跳转去首页
          router.push('/');
        }, err => {
          console.error(err);
        }).finally(() => {
          loading.value = false;
        });
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const keyUp = (e) => {
    if (e.key === 'Enter') {
      // 这里是ref.value,模板里面直接就是value了。。。。
      submitForm(formRef.value);
    }
  }

  onMounted(() => {
    document.addEventListener('keyup', keyUp);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keyup', keyUp);
  });

</script>

<style>
.el-row {
  width: 100%;
  height: 100%;
}
.left-content {
  @apply bg-blue-400;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: #fff;
    font-size: 60px;
  }
  p {
    color: #fff;
  }
}
.right-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .welcome {
    font-size: 30px;
    text-align: center;
  }
  .tips {
    width: 200px;
  }
  .tip {
    text-align: center;
    position: relative;
  }
  .tip::before {
    content: '';
    display: block;
    border-bottom: 1px solid #ccc;
    position: absolute;
    top: 12px;
    left: 0;
    width: 50px;
  }
  .tip::after {
    content: '';
    display: block;
    border-bottom: 1px solid #ccc;
    position: absolute;
    top: 12px;
    right: 0px;
    width: 50px;
  }
  .el-form {
    width: 200px;
    .el-button {
      width: 100%;
      @apply bg-blue-400;
    }
  }
}
</style>