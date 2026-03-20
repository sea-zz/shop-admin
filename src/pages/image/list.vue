<script setup>
import { onMounted, ref, reactive, watchEffect  } from 'vue';
import { getImageCate, getImageCateList, delImageCate } from '@/api/image';
import { ElNotification } from 'element-plus';

// 分类
const cateData = reactive({
  list: [],
  totalCount: 0
});
const catePageRef = ref(1);
// 分类下列表数据
const cateListData = reactive({
  list: [],
  totalCount: 0
});
const cateListPageRef = ref(1);
const cateListIdRef = ref(0);

const queryImageCate = () => {
  getImageCate(catePageRef.value).then(ret => {
    cateData.list = ret.list;
    cateData.totalCount = ret.totalCount;
    cateListIdRef.value = ret?.list?.[0]?.id || 0;
  });
}

watchEffect(() => {
  queryImageCate();
}, [catePageRef]);

watchEffect(() => {
  if (cateListIdRef.value) {
    getImageCateList(cateListIdRef.value, cateListPageRef.value).then(ret => {
      cateListData.list = ret.list;
      cateListData.totalCount = ret.totalCount;
    })
  }
}, [cateListIdRef, cateListPageRef]);

const handleClickCate = (id) => {
  cateListIdRef.value = id;
}

const handleEdit = (e, item) => {
  console.log(11111, e)
  e.stopPropagation();
}

const handleDelCate = (id) => {
  delImageCate(id).then(ret => {
    ElNotification({
      message: '删除成功',
      type: 'success',
    })
  }, err => {
      ElNotification({
        message: '删除失败',
        type: 'error',
      })
  })
}

</script>

<template>
  <el-container class="imagelist-container bg-white">
    <el-header class="border-solid border-1 border-gray-200">
      <el-button type="primary" size="small">新增图片分类</el-button>
      <el-button type="warning" size="small">上传图片</el-button>
    </el-header>
    <el-container>
      <el-aside>
        <div v-for="(item, idx) in cateData.list" :key="idx" :class="['cate-item', 'p12', { 'selected': cateListIdRef === item.id }]" @click="handleClickCate(item.id)">
          <span>{{item.name}}</span>
          <span class="text-sky-500">
            <el-icon class="mr10" @click="e => handleEdit(e, item)"><Edit /></el-icon>
            <el-popconfirm title="是否要删除该分类?" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelCate(item.id)">
              <template #reference>
                <el-icon @click="e => e.stopPropagation()"><Delete /></el-icon>
              </template>
            </el-popconfirm>
            
          </span>
        </div>
      </el-aside>
      <el-main>
        <div class="pic-list-container">
          <div v-for="(item, idx) in cateListData.list" :key="idx">
            <div class="image-cover">
              <el-image
              style="width: 100%; height: 150px"
              :src="item.url"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              show-progress
              :preview-src-list="[item.url]"
              :initial-index="4"
              fit="cover"
            />
            <span class="image-name">{{item.name}}</span>
            </div>
            <div class="image-operate">
              <el-button text type="primary" size="small">重命名</el-button>
              <el-button text type="primary" size="small">删除</el-button>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="less">
.imagelist-container {
  .el-header {
    display: flex;
    align-items: center;
    border-top: none;
    border-left: none;
    border-right: none;
  }
  .el-aside {
    border-right: 1px solid #eee;
  }

  .cate-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    &:hover {
      background-color: rgba(239,246,255, 1);
    }
    &.selected {
      background-color: rgba(239,246,255, 1);
    }
  }
  .pic-list-container {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: calc(25% - 10px);
      margin-right: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
      .image-cover {
        position: relative;
        .image-name {
          position: absolute;
          bottom: 0;
          left: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          background: #ccc;
          color: #fff;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
      .image-operate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ccc;
        border-top: none;
      }
    }
  }
}

</style>
