<template>
  <div class="app-container">
    <el-table :data="list" border style="width: 100%">
      <el-table-column fixed prop="id" label="ID" />
      <el-table-column prop="image" label="主图">
        <template slot-scope="scope">
          <img :src="scope.row.image" style="width: 120px;">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="产品名称" />
      <el-table-column prop="price" label="产品原价" />
      <el-table-column prop="discountTypeCn" label="折扣类型" />
      <el-table-column prop="colors" label="颜色分类" />
      <el-table-column prop="onSale" label="是否上架" />
      <el-table-column prop="inventory" label="库存" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.native.prevent="modifyClick(scope.row)">修改</el-button>
          <!-- <el-button type="text" size="small" @click.native.prevent="deleteClick(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next, total"
        :total="listData.totalCount"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax'
export default {
  name: 'ItemList',
  data() {
    return {
      list: [],
      listData: [],
      page: 1,
      pageSize: 15,
      totalCount: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const param = {
        url: '/api/pro/item/list',
        data: {
          page: this.page,
          pageSize: this.pageSize
        }
      }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.listData = data.data.list
          this.listData.totalCount = data.data.totalCount
          this.handleItemList()
        } else {
          this.$message(data.msg)
        }
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    },
    handleItemList() {
      console.log(this.listData)
      this.listData.forEach((item) => {
        // 将颜色拆分数组
        item.colors = item.colors.replace(',', ' ')
        // 处理图片的显示
        item.imageDOM = '<div class="image"><img src="' + item.image + '"></div>'
        // 折扣类型
        item.discountTypeCn = (() => {
          return item.discountType.replace(/miaosha/, '限时秒杀').replace(/temai/, '特卖商品').replace(/dingzhi/, '定制商品')
        })()
        // 是否上架销售
        item.onSale = item.onSale === 1 ? '上架' : '下架'
      })
      this.list = this.listData
    },
    // 修改操作点击事件
    modifyClick(row) {
      const id = Number(row.id)
      this.$router.push({ path: `/item/modify/${id}` })
    }
  }
}
</script>

<style scoped>
.image {width: 6em; height: 6em;}
.image > img {width: 100%;}

</style>
