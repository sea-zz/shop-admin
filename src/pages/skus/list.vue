<template>
  <div class="skus-list">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>规格管理</span>
          <el-button type="primary" size="small" @click="handleAdd">添加规格</el-button>
        </div>
      </template>
      <div class="search-bar">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="规格名称">
            <el-input v-model="searchForm.name" placeholder="请输入规格名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="规格ID" width="100" />
        <el-table-column prop="name" label="规格名称" />
        <el-table-column prop="values" label="规格值">
          <template #default="scope">
            <el-tag v-for="(value, index) in scope.row.values" :key="index" size="small" class="mr8">
              {{ value }}
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

  const searchForm = reactive({
    name: ''
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
    searchForm.name = '';
    currentPage.value = 1;
    fetchData();
  };

  const handleAdd = () => {
    // 跳转到添加规格页面
    console.log('添加规格');
  };

  const handleEdit = (row) => {
    // 跳转到编辑规格页面
    console.log('编辑规格', row);
  };

  const handleDelete = (id) => {
    // 删除规格
    console.log('删除规格', id);
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
    // 模拟数据
    const valuesOptions = [['红色', '蓝色', '绿色'], ['S', 'M', 'L', 'XL'], ['纯棉', '涤纶', '混纺']];
    tableData.value = Array.from({ length: pageSize.value }, (_, index) => ({
      id: (currentPage.value - 1) * pageSize.value + index + 1,
      name: `规格${(currentPage.value - 1) * pageSize.value + index + 1}`,
      values: valuesOptions[index % valuesOptions.length],
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }));
    total.value = 50;
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="less">
  .skus-list {
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