<template>
  <div class="app-container">
    <div class="form-width">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="产品标题">
          <el-input v-model="form.title" placeholder="请输入产品标题，30字以内" type="text" />
        </el-form-item>
        <el-form-item label="产品主图">
          <UploadImage ref="uploadImage" />
        </el-form-item>
        <el-form-item label="属性颜色">
          <el-tag v-for="tag in form.colors" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加颜色</el-button>
        </el-form-item>
        <el-form-item label="产品原价">
          <el-input v-model="form.price" placeholder="请输入价格" type="number" />
        </el-form-item>
        <el-form-item label="折扣类型">
          <el-select v-model="form.discountType" multiple placeholder="请选择折扣类型">
            <el-option label="限时秒杀" value="miaosha" />
            <el-option label="特卖商品" value="temai" />
            <el-option label="定制商品" value="dingzhi" />
          </el-select>
        </el-form-item>
        <el-form-item label="产品折扣价">
          <el-input v-model="form.zkPrice" placeholder="请输入价格" type="number" />
        </el-form-item>
        <el-form-item label="是否上架">
          <el-select v-model="form.onSale" placeholder="是否上架">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.inventory" placeholder="请输入产品库存" type="number" @blur="inventoryBlur" />
        </el-form-item>
        <el-form-item label="产品详情">
          <CKeditor ref="ckeditor" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SUBMITCLICK">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入上传图片组件(单张)
import UploadImage from '@/components/UploadImage'
// 引入CKEditor组件
import CKeditor from '@/components/CKeditor'
// 引入ajax请求
import ajax from '@/utils/ajax'

export default {
  name: 'ItemAdd',
  components: { UploadImage, CKeditor },
  data() {
    return {
      // 用来渲染页面的数据
      form: {
        id: '',
        title: '',
        image: '',
        colors: [],
        price: '',
        zkPrice: '',
        discountType: [],
        onSale: '1',
        inventory: 10,
        content: ''
      },
      // 用户提交后端的数据
      formData: {},
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    // 删除tag标签事件
    handleClose(tag) {
      this.form.colors.splice(this.form.colors.indexOf(tag), 1)
    },
    // 添加tag标签事件
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 确定添加tag标签事件
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) this.form.colors.push(inputValue)
      this.inputVisible = false
      this.inputValue = ''
    },
    // 库存失焦校验
    inventoryBlur() {
      if (this.form.inventory < 0) this.form.inventory = 0
    },
    // ---------------
    // 提交按钮点击事件
    // ---------------
    SUBMITCLICK() {
      // 校验 - 产品标题
      const title = this.form.title
      if (!title) {
        this.$message('请输入产品标题')
        return
      } else if (title.length > 30) {
        this.$message('产品标题不得超过30个字')
        return
      }
      this.formData.title = title

      // 校验 - 产品主图
      const image = this.$refs.uploadImage.url
      if (!image) {
        this.$message('请上传产品主图')
        return
      }
      this.formData.image = image

      // 校验 - 产品颜色
      if (!this.form.colors.length) this.formData.colors = '图片色'
      this.formData.colors = this.form.colors.toString()

      // 校验 - 产品原价
      if (!this.form.price) {
        this.$message('请输入产品原价')
        return
      }
      // 校验 - 产品折扣价
      if (!this.form.zkPrice) {
        this.$message('请输入产品折扣价')
        return
      }
      if (Number(this.form.zkPrice) > Number(this.form.price)) {
        this.$message('折扣价须低于原价')
        return
      }
      this.formData.price = Number(this.form.price)
      this.formData.zkPrice = Number(this.form.zkPrice)

      // 校验 - 折扣类型
      this.formData.discountType = this.form.discountType.toString()

      // 校验 - 产品详情
      const content = this.$refs.ckeditor.editorData
      // if (!content) {
      //   this.$message('请输入产品详情')
      //   return
      // }
      this.formData.content = content

      this.formData.onSale = Number(this.form.onSale)
      this.formData.inventory = Number(this.form.inventory)
      console.log(this.formData)
      this.add()
    },
    add() {
      const param = { url: '/api/pro/item/add', data: this.formData }
      ajax.post(param).then((data) => {
        if (data.success === 'true') {
          this.$router.push({ path: '/item/list' })
        } else {
          this.$message(data.msg)
        }
      }).catch((err) => {
        this.$message(err || 'SERVER ERROR')
      })
    }
  }
}
</script>

<style scope>
.form-width {
  width: 900px;
}
@media screen and (max-width: 640px) {
  .form-width {
    width: auto;
  }
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
