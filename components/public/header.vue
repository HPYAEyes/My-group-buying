<template>
  <el-header class="index-header" height="50px">
    <div class="index-header-left">
      <i class="el-icon-menu"></i>
      <span>首页</span>
      <i class="el-icon-location"></i>
      <el-popover
        class="select-city"
        placement="bottom"
        width="350"
        trigger="click">
        <el-cascader
          v-model="selectCity"
          :options="geoOptions"
          :props="geoProps"
          :show-all-levels="false"
          filterable>
        </el-cascader>
        <el-button type="primary" size="small" style="margin-left: 20px" @click="switchCity">切换城市</el-button>
        <el-button type="text" slot="reference" style="color:#666">{{ choosedCity ? choosedCity.name : position.city }}</el-button>
      </el-popover>
    </div>
    <div class="index-header-right">
      <template v-if="username === ''">
        <el-button type="text" @click="loginDialog = true">登录</el-button>
        <el-button type="text" @click="registerDialog = true">注册</el-button>
      </template>
      <template v-else>
      <el-button type="text">欢迎您，{{ username }}</el-button>
      <el-button type="text" @click="handleLogout">登出</el-button>
      </template>
      <el-button type="text">个人中心</el-button>
    </div>
    <el-dialog
      title="注册"
      :visible.sync="registerDialog"
      width="25%"
      center
      @closed="clearFormData('registerForm')">
      <el-form
        class="register-form"
        :model="registerForm"
        :rules="registerRules"
        ref="registerForm"
        label-width="80px">
        <el-form-item label="昵称" prop="username">
          <el-input v-model="registerForm.username">
            <i class="iconfont tg-name" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email">
            <i class="iconfont tg-email" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkcode">
          <el-input v-model="registerForm.checkcode">
            <i class="iconfont tg-checkcode" slot="prefix"></i>
          </el-input>
          <el-button size="mini" round :disabled="!isExpire" @click="getCheckCode()">发送验证码</el-button>
          <span style="color: orange">{{ chkMsg }}</span>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password" type="password">
            <i class="iconfont tg-pwd" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repeatPwd">
          <el-input v-model="registerForm.repeatPwd" type="password">
            <i class="iconfont tg-repeatpwd" slot="prefix"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleRegister()">注册</el-button>
        <el-button @click="registerDialog = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="登录"
      :visible.sync="loginDialog"
      width="25%"
      center
      @closed="clearFormData('loginForm')">
      <el-form
        class="register-form"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-width="60px">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="loginForm.username">
            <i class="iconfont tg-account" slot="prefix"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i class="iconfont tg-pwd" slot="prefix"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleLogin()">登录</el-button>
        <el-button @click="loginDialog = false">取消</el-button>
      </span>
    </el-dialog>
  </el-header>
</template>
<script>
import { createNamespacedHelpers  } from 'vuex';
import {
  getChkCode,
  register,
  login,
  getUser,
  logout,
  getCity
} from 'api/index';

const { mapState, mapActions } = createNamespacedHelpers('geo');

export default {
  name: 'headerbar',
  data() {
    return {
      selectCity: [], // 切换城市选择框中选择的城市
      choosedCity: '', // 默认选择的城市
      geoOptions: [
        {
          adcode: 'geo',
          name: '省份',
          districts: this.$store.state.geo.cityList
        },
        {
          adcode: 'hot',
          name: '热门城市',
          districts: this.$store.state.geo.hotCity
        }, 
        {
          adcode: 'position',
          name: '定位城市',
          districts: [
            {
              adcode: this.$store.state.geo.position.adcode,
              name: this.$store.state.geo.position.city
            }
          ]
        }
      ],
      geoProps: {
        value: 'adcode',
        label: 'name',
        children: 'districts'
      },
      registerDialog: false,
      registerForm: {
        username: '',
        email: '',
        checkcode: '',
        password: '',
        repeatPwd: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        checkcode: [
          { required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
        repeatPwd: [
          { required: true, message: '请输入确认密码', trigger: 'blur'},
          { validator: (rule, value, callback) => {
              if (value !== this.registerForm.password) {
                callback('两次输入的密码不一致！');
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
      },
      timerid: '', // 验证码定时器id,
      chkMsg: '', // 验证码提示信息,
      isExpire: true, // 发送验证码按钮禁用状态
      loginDialog: false,
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          { required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      username: ''
    };
  },
  async mounted() {
    this.choosedCity = JSON.parse(window.localStorage.getItem('districts'));
    this.setChoosedCity(this.choosedCity);
    const { data: { username } } = await getUser();
    this.username = username;
  },
  computed: {
    ...mapState({
      position: state => state.position,
    }),
    selectCityCode() {
      return this.selectCity[this.selectCity.length - 1];
    }
  },
  methods: {
    ...mapActions([
      'setChoosedCity'
    ]),
    /**
     * @description 切换当前城市
     */
    switchCity() {
      getCity(this.selectCityCode).then((res) => {
        const { data: { districts } } = res.data;
        localStorage.setItem('districts', JSON.stringify(districts[0]));
        // this.setChoosedCity(districts[0]);
        location.href = '/';
      });
    },
    /**
     * @description 重置表单
     * @param {String} formName 注册弹窗表单对象
     */
    clearFormData(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @description 获取验证码
     * @param {Object} params 注册弹窗表单对象
     */
    getCheckCode(params = this.registerForm) {
      let isNamePass, isEmailPass;
      if (this.timerid) {
        return false;
      }
      this.$refs.registerForm.validateField('username', (valid) => {
        isNamePass = valid;
      });
      this.$refs.registerForm.validateField('email', (valid) => {
        isEmailPass = valid;
      });
      // 昵称和邮箱格式校验通过
      if (!isNamePass && !isEmailPass) {
        const { username, email } = params;
        getChkCode({ username: encodeURIComponent(username), email }).then((res) => {
          let count = 60;
          this.isExpire = false;
          this.chkMsg = `验证码已发送，剩余${count--}秒`;
          this.timerid = setInterval(() => {
            this.chkMsg = `验证码已发送，剩余${count--}秒`;
            if (count === 0) {
              clearInterval(this.timerid);
              this.isExpire = true;
              this.chkMsg = '';
            }
          }, 1000);
          this.$message.success(res.data.msg);
        });
      } else {
        return false;
      }
    },
    /**
     * @description 注册
     * @param {Object} params 注册弹窗表单对象
     */
    handleRegister(params = this.registerForm) {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          const query = {
            username: params.username,
            email: params.email,
            password: params.password,
            code: params.checkcode
          }
          register(query).then((res) => {
            this.$message.success(res.data.msg);
            this.registerDialog = false;
            setTimeout(() => {
              location.href = '/';
            }, 2000);
          });
        } else {
          console.log('error submit!');
          return false;
        }
      });
    },
    /**
     * @description 登录
     * @param {Object} params 登录弹窗表单对象
     */
    handleLogin(params = this.loginForm) {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          login(params).then((res) => {
            this.$message.success(res.data.msg);
            this.loginDialog = false;
            setTimeout(() => {
              location.href = '/';
            }, 2000);
          });
        }
      });
    },
    /**
     * @description 登出
     */
    handleLogout() {
      logout().then((res) => {
        this.$message.success(res.data.msg);
        setTimeout(() => {
          location.href = '/';
        }, 2000);
      });
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/variable.scss";

.index-header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $greyFont;

  .index-header-left {
    span {
      margin-right: 20px;
    }
  }

  .index-header-right {
    span {
      margin-left: 40px;
    }
  }

  .el-button--text {
    color: $greyFont;
  }
}

.register-form {
  padding: 0 20px;

  .iconfont {
    margin-left: 4px;
  }

  .checkcode-form-item {
    .el-form-item__content {
      display: flex;

      .el-button {
        margin-left: 6px;
      }
    }
  }
}
</style>
