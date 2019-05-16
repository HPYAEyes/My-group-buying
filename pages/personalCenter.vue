<template>
  <div id="personal-center">
    <div class="personal-header">
      <img class="user-avatar" :src="avatar" alt="用户头像">
      <div class="user-info">
        <h1>{{ username }}</h1>
        <p class="user-email">{{ email }}</p>
        <p class="user-createtime">于{{ $moment(createdAt).fromNow() }}加入了本网站</p>
      </div>
    </div>
    <ul class="personal-tabs">
      <li @click="status = ''"><i class="iconfont tg-all-order">全部订单</i></li>
      <li @click="status = '1'"><i class="iconfont tg-daishiyong">待使用</i></li>
      <li @click="status = '2'"><i class="iconfont tg-daipingjia">待评价</i></li>
      <li @click="status = '3'"><i class="iconfont tg-yiguoqi">已过期</i></li>
      <li @click="status = '-1'"><i class="iconfont tg-gerenxinxi">个人信息设置</i></li>
    </ul>
    <div class="personal-container">
      <h2>{{ title }}</h2>
      <template v-if="status !== '-1'">
        <el-collapse>
          <el-collapse-item v-for="item in orderList" :key="item._id">
            <template slot="title">
              <div class="order-item">
                <nuxt-link :to="{ path: '/productDetail', query: { id: item.productId }}">
                  <img class="order-img" :src="item.imgUrl[0]">
                </nuxt-link>
                <div class="order-info">
                  <p>{{ item.saleName }}</p>
                  <span>订单编号：{{ item._id }}</span>
                  <span>有效期至：{{ item.expires }}</span>
                </div>
                <div class="order-price">总价：¥{{ item.price }}</div>
                <div class="order-status">
                  <span v-if="item.status === '0'">已评价</span>
                  <span v-else-if="item.status === '1'">待使用</span>
                  <span v-else-if="item.status === '2'">待评价</span>
                  <span v-else-if="item.status === '3'">已过期</span>
                </div>
              </div>
            </template>
            <div class="order-detail">
              <p>店名：{{ item.productName }}</p>
              <p>地址：{{ item.address }}</p>
              <p>类型：{{ item.type }}</p>
              <p>门店价：{{ item.salePrice }}</p>
              <p>下单时间：{{ $moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}</p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </template>
      <template v-else>
        <div class="personal-info">
          <div class="info-label">头像</div>
          <img :src="avatar" alt="用户头像">
          <el-upload
            class="modify-upload"
            ref="upload"
            action="http://localhost:3333/uploadFiles"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
            :on-error="handleRemove"
            :limit="1"
            accept="image/jpeg,image/png"
            :show-file-list="false"
            >
            <el-button class="modify-btn" round @click="$refs.upload.clearFiles()">修改</el-button>
          </el-upload>
        </div>
        <div class="personal-info">
          <div class="info-label">昵称</div>
          <p>{{ username }}</p>
          <el-button class="modify-btn" round>修改</el-button>
        </div>
        <div class="personal-info">
          <div class="info-label">邮箱</div>
          <p>{{ email }}</p>
        </div>
        <div class="personal-info">
          <div class="info-label">密码</div>
          <el-button class="modify-btn" round @click="modifyPwdDialog = true">修改</el-button>
          <el-dialog
            title="修改密码"
            :visible.sync="modifyPwdDialog"
            center
            width="20%"
            @closed="$refs.modifyPwdForm.resetFields()">
            <el-form
            :model="modifyPwdForm"
            :rules="modifyPwdRules"
            ref="modifyPwdForm"
            label-width="80px">
              <el-form-item label="旧密码" prop="oldPwd">
                <el-input type="password" :maxlength="16" :minlength="6" v-model="modifyPwdForm.oldPwd"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input type="password" :maxlength="16" :minlength="6" v-model="modifyPwdForm.newPwd"></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="repeatPwd">
                <el-input type="password" :maxlength="16" :minlength="6" v-model="modifyPwdForm.repeatPwd"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button @click="modifyPwdDialog = false">取消</el-button>
              <el-button type="primary" @click="modifyPwd('modifyPwdForm')">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import {
  getUserOrderList,
  updatePersonalInfo,
  updateUserPwd
} from 'api/personal';
import { createNamespacedHelpers  } from 'vuex';

const { mapActions } = createNamespacedHelpers('user');

export default {
  name: 'personalCenter',
  fetch({ store, redirect }) {
    if (store.state.user.userInfo.username === '') {
      return redirect('/');
    }
  },
  data() {
    const validateNewPwd = (rule, value, callback) => {
      if (value === this.modifyPwdForm.oldPwd ) {
        callback(new Error('新密码不能与旧密码相同'))
      } else {
        callback()
      }
    }
    const validateRepeatPwd = (rule, value, callback) => {
      if (value !== this.modifyPwdForm.repeatPwd ) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      orderList: [],
      status: '',
      modifyPwdDialog: false,
      modifyPwdForm: {
        oldPwd: '',
        newPwd: '',
        repeatPwd: ''
      },
      modifyPwdRules:{
        oldPwd: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newPwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateNewPwd }
        ],
        repeatPwd: [
          { required: true, message: '请重复输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateRepeatPwd }
        ],
      }
    };
  },
  asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    return {
      username: store.state.user.userInfo.username,
      avatar: store.state.user.userInfo.avatar,
      email: store.state.user.userInfo.email,
      createdAt: store.state.user.userInfo.createdAt,
    };
  },
  mounted() {
    this.getOrderList();
  },
  computed: {
    title() {
      if (this.status === '') {
        return '全部订单';
      }
      const titleObj = {
        '1': '待使用',
        '2': '待评价',
        '3': '已过期',
        '-1': '个人信息设置'
      };
      return titleObj[this.status];
    }
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal === oldVal) return;
      newVal === '-1' ? '': this.getOrderList(newVal);
    },
  },
  methods: {
    ...mapActions([
      'setUserInfo'
    ]),
    modifyPwd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { _id } = this.$store.state.user.userInfo;
          const { oldPwd, newPwd } = this.modifyPwdForm;
          updateUserPwd({ _id, oldPwd, newPwd }).then((res) => {
            this.$message.success(res.data.msg);
            this.modifyPwdDialog = false;
          });
        } else {
          console.warn('error submit');
          return false;
        }
      });
    },
    handleBeforeUpload(file) {
      const reg = /(jpe?g)|png/
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJpgOrPng = reg.test(file.type)
      console.log(isJpgOrPng)

      if (!isJpgOrPng) {
        this.$message.error('上传头像图片只能是png或jpg格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!');
        return false;
      }
      return isJpgOrPng && isLt2M;
    },
    handleSuccess(res) {
      const avatar = res.data[0];
      const newUserInfo = { ...this.$store.state.user.userInfo, avatar };
      this.setUserInfo(newUserInfo);
      const { _id } = this.$store.state.user.userInfo;
      updatePersonalInfo({ _id, avatar }).then((resp) => {
        this.avatar = avatar;
        this.$message.success(res.msg);
      });
    },
    handleRemove(err) {
      this.$message.error(err);
    },
    getOrderList(status) {
      getUserOrderList({
        userId: this.$store.state.user.userInfo._id,
        status
      }).then((res) => {
        this.orderList = res.data.data;
      })
    }
  }
}
</script>
<style lang="scss">
@import "../assets/css/variable.scss";

#personal-center {
  width: 1200px;
  margin: 0 auto;

  .personal-header {
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    margin-top: 30px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    color: #fff;
    background: linear-gradient(90deg, rgb(64, 158, 255), rgb(160, 207, 255));

    .user-avatar {
      width: 110px;
      height: 110px;
      margin-left: 6%;
      border-radius: 50%;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .2);
      // border: 6px solid rgba(255, 255, 255, .16);
    }

    .user-info {
      margin-left: 30px;
      display: flex;
      flex-direction: column;

      h1 {
        margin-bottom: 4px;
      }

      p {
        margin-bottom: 4px;
      }

      .user-createtime {
        font-size: 14px;
      }
    }
  }

  .personal-tabs {
    width: 100%;
    height: 110px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: $greyFont;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);

    li {
      position: relative;
    }

    i {
      cursor: pointer;
      &:before {
        position: absolute;
        top: 50%;
        transform: translate(-120%, -50%);
        font-size: 32px;
      }
    }

    .tg-all-order {
      &:before {
        color: #409eff;
      }
    }

    .tg-daipingjia {
      &:before {
        color: #e6a23c;
      }
    }

    .tg-daishiyong {
      &:before {
        color: #72baff;
      }
    }

    .tg-yiguoqi {
      &:before {
        color: #f56c6c;
      }
    }

    .tg-gerenxinxi {
      &:before {
        color: #67c23a;        
      }
    }
  }

  .personal-container {
    width: 100%;
    margin-bottom: 30px;
    padding: 0 16px;
    border: 1px solid $border;
    border-radius: 4px;
    background-color: #fff;
    color: $greyFont;
    font-size: 12px;
    box-sizing: border-box;

    h2 {
      padding: 16px 0;
    }

    .personal-info {
      display: flex;
      align-items: center;
      height: 120px;
      border-top: 1px solid #e5e5e5;
      font-size: 18px;
      color: $mainFont;

      .info-label {
        flex-basis: 100px;
        height: 40px;
        line-height: 40px;
        padding-right: 30px;
        border-right: 1px solid #e5e5e5;
        text-align: right;
      }

      img {
        width: 48px;
        height: 48px;
        margin-left: 30px;
        border-radius: 50%;
      }

      p {
        margin-left: 30px;
        color: $greyFont;
        font-size: 14px;
      }

      .modify-upload {
        margin-left: auto;
      }

      .modify-btn {
        margin-left: auto;
        margin-right: 30px;
      }
    }

    .el-collapse,
    .el-collapse-item__wrap {
      border: 0;
    }

    .el-collapse-item__header {
      height: auto;
      line-height: inherit;
      color: inherit;
      font-size: inherit;
      border: 0;
    }

    .el-collapse-item__content {
      padding: 16px;
      border-top: 1px solid #e5e5e5;
      color: inherit;
    }

    .order-item {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 16px 0;
      border-top: 1px solid #e5e5e5;
    }

    .order-detail {
      // border-top: 1px solid #e5e5e5;
    }

    .order-img {
      width: 90px;
      height: 90px;
      border-radius: 4px;
    }

    .order-info {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin-left: 20px;

      p {
        margin-bottom: 8px;
        font-size: 16px;
        color: $mainFont;
      }

      span {
        margin-bottom: 4px;
      }
    }

    .order-price {
      flex-basis: 200px;
    }

    .order-status {
      flex-basis: 200px;
    }
  }
}
</style>
