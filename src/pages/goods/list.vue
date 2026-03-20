<template>
  <div class="goods-list">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>商品管理</span>
          <el-button type="primary" size="small" @click="handleAdd">添加商品</el-button>
        </div>
      </template>
      <div class="search-bar">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.name" placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item label="商品状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态">
              <el-option label="全部" value="" />
              <el-option label="上架" value="1" />
              <el-option label="下架" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="商品ID" width="100" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="price" label="价格" width="120" />
        <el-table-column prop="stock" label="库存" width="100" />
        <el-table-column prop="sales" label="销量" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
              {{ scope.row.status === 1 ? '上架' : '下架' }}
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
    name: '',
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
    searchForm.name = '';
    searchForm.status = '';
    currentPage.value = 1;
    fetchData();
  };

  const handleAdd = () => {
    // 跳转到添加商品页面
    console.log('添加商品');
  };

  const handleEdit = (row) => {
    // 跳转到编辑商品页面
    console.log('编辑商品', row);
  };

  const handleDelete = (id) => {
    // 删除商品
    console.log('删除商品', id);
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
    tableData.value = Array.from({ length: pageSize.value }, (_, index) => ({
      id: (currentPage.value - 1) * pageSize.value + index + 1,
      name: `商品${(currentPage.value - 1) * pageSize.value + index + 1}`,
      price: (Math.random() * 1000).toFixed(2),
      stock: Math.floor(Math.random() * 1000),
      sales: Math.floor(Math.random() * 1000),
      status: Math.random() > 0.5 ? 1 : 0,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }));
    total.value = 100;
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