<template>
  <div class="manager-list">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>管理员管理</span>
          <el-button type="primary" size="small" @click="handleAdd">添加管理员</el-button>
        </div>
      </template>
      <div class="search-bar">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="管理员名称">
            <el-input v-model="searchForm.username" placeholder="请输入管理员名称" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option label="全部" value="" />
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="管理员名称" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { getManagerList, addManager, editManager, deleteManager } from '@/api/manager';
  import { ElMessage } from 'element-plus';

  const searchForm = reactive({
    username: '',
    status: ''
  });
  const tableData = ref([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  const total = ref(0);

  const handleSearch = () => {
    currentPage.value = 1;
    fetchData();
  };

  const resetForm = () => {
    searchForm.username = '';
    searchForm.status = '';
    currentPage.value = 1;
    fetchData();
  };

  const handleAdd = async () => {
    try {
      // 模拟添加管理员数据
      const data = {
        username: 'newadmin',
        password: '123456',
        email: 'newadmin@example.com',
        mobile: '13800138000',
        status: 1
      };
      await addManager(data);
      ElMessage.success('添加管理员成功');
      fetchData();
    } catch (error) {
      console.error('添加管理员失败:', error);
      ElMessage.error('添加管理员失败');
    }
  };

  const handleEdit = async (row) => {
    try {
      // 模拟编辑管理员数据
      const data = {
        id: row.id,
        username: row.username,
        email: row.email,
        mobile: row.mobile,
        status: row.status === 1 ? 0 : 1
      };
      await editManager(data);
      ElMessage.success('编辑管理员成功');
      fetchData();
    } catch (error) {
      console.error('编辑管理员失败:', error);
      ElMessage.error('编辑管理员失败');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteManager(id);
      ElMessage.success('删除管理员成功');
      fetchData();
    } catch (error) {
      console.error('删除管理员失败:', error);
      ElMessage.error('删除管理员失败');
    }
  };

  const handleSizeChange = (size) => {
    pageSize.value = size;
    fetchData();
  };

  const handleCurrentChange = (current) => {
    currentPage.value = current;
    fetchData();
  };

  const fetchData = async () => {
    try {
      const params = {
        page: currentPage.value,
        limit: pageSize.value,
        username: searchForm.username,
        status: searchForm.status
      };
      const res = await getManagerList(params);
      tableData.value = res.list || [];
      total.value = res.total || 0;
    } catch (error) {
      console.error('获取管理员列表失败:', error);
      ElMessage.error('获取管理员列表失败');
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less">
  .manager-list {
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