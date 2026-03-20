<template>
  <div class="goods-list">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
          <el-button type="text" size="small" @click="handleAdd">
            <el-icon><Refresh /></el-icon>
          </el-button>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="title" label="公告标题" align="center" />
        <el-table-column prop="create_time" label="发布时间" width="280"  align="center" />
        <el-table-column label="操作" width="150" fixed="right" align="center">
          <template #default="scope">
            <el-button size="small" type="text" @click="handleEdit(scope.row)">修改</el-button>
            <el-popconfirm title="是否要删除该公告?" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button size="small" type="text">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          hide-on-single-page="true"
        />
      </div>
    </el-card>

    <el-drawer v-model="drawer" :title="editId ? '编辑公告' : '新增公告'" size="600" footer-class="header-drawer-footer" @close="cancelClick">
    <el-form
      ref="formRef"
      style="max-width: 600px"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
    >
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="ruleForm.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input
          v-model="ruleForm.content"
          type="textarea"
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
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { ElMessage} from 'element-plus';
  import { getNoticeList, createNotice, updateNotice, deleteNotice } from '../../api/notice';

  const tableData = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const loading = ref(false);

  const formRef = ref(null);
  const drawer = ref(false)
  const ruleForm = reactive({
    title: '',
    content: '',
  })
  const editId = ref(null)

   const rules = {
    title: [
      { required: true, message: '名称必填'}
    ],
    content: [
      { required: true, message: '内容必填'}
    ],
  };

  const handleAdd = () => {
    // 跳转到添加商品页面
    console.log('添加商品')
    drawer.value = true;

    editId.value = null;
    ruleForm.title = '';
    ruleForm.content = '';
  };

  const handleEdit = (row) => {
    // 跳转到编辑商品页面
    console.log('编辑商品', row);
    editId.value = row.id;
    ruleForm.title = row.title;
    ruleForm.content = row.content;

    drawer.value = true
  };

  const cancelClick = () => {
    drawer.value = false;
    // 清空form
    formRef.value.resetFields();
  }

  const confirmClick = () => {
    formRef.value.validate((valid, fields) => {
      if (valid) {
        const promise = editId.value ? updateNotice(editId.value, ruleForm) : createNotice(ruleForm);
        promise.then(() => {
            console.log(1111)
          // 去掉弹窗
          drawer.value = false;
          // 清空form
          formRef.value.resetFields();
          // 提示修改成功
          ElMessage({
            type: 'success',
            message: `${editId.value ? '修改' : '新增'}公告成功！`,
          })
          fetchData();
        });
      } 
    })
  }

  const handleDelete = (id) => {
    // 删除商品
    deleteNotice(id).then(() => {
        fetchData();
    })
  };

  const handleSizeChange = (size) => {
    pageSize.value = size;
    fetchData();
  };

  const handleCurrentChange = (current) => {
    currentPage.value = current;
    fetchData();
  };

  const fetchData = () => {
    loading.value = true;
    getNoticeList(currentPage.value).then(res => {
        tableData.value = res.list;
        total.value = res.totalCount;
        loading.value = false;
    }).finally(() => {
        loading.value = false;
    })
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less">
  .goods-list {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .search-bar {
      margin-bottom: 16px;
    }
    .pagination {
      margin-top: 16px;
      display: flex;
      justify-content: flex-end;
    }
  }
</style>