<template>
  <div class="login">
    <div class="login-con">
      <Card v-if="show" icon="log-in" title="欢迎登录" >
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
      <el-card v-else class="box-card">
        <div slot="header" >
          <el-menu
              class="site-navbar__menu site-navbar__menu--right"
              mode="horizontal">
              <el-menu-item class="site-navbar__avatar" index="3">
                <el-dropdown :show-timeout="0" placement="bottom">
            <span class="el-dropdown-link">
              <img src="~@/assets/img/avatar.jpeg" :alt="userName">
            </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-menu-item>
            </el-menu>
        </div>
        <div class="text item">
          <Col :span="24">
            <List >
              <ListItem @click="$router.push({ path: 'articleList' })">
                <el-button type="text" class="button">发布文章</el-button>
              </ListItem>
              <ListItem >TODO</ListItem>
            </List>
          </Col>
        </div>
      </el-card>
    </div>
    <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password>
  </div>
</template>

<script>
import { getUUID } from '@/utils'
import LoginForm from '@/components/login-form'
import UpdatePassword from '../admin/main-navbar-update-password'
import Vue from 'vue'
import { clearLoginInfo } from '@/utils'
export default {
  name: 'login',
  components: {LoginForm, UpdatePassword},
  data() {
    return {
      updatePassowrdVisible: false,
      show: true
    }
  },
  computed: {
    navbarLayoutType: {
      get () { return this.$store.state.common.navbarLayoutType }
    },
    sidebarFold: {
      get () { return this.$store.state.common.sidebarFold },
      set (val) { this.$store.commit('common/updateSidebarFold', val) }
    },
    mainTabs: {
      get () { return this.$store.state.common.mainTabs },
      set (val) { this.$store.commit('common/updateMainTabs', val) }
    },
    userName: {
      get () { return this.$store.state.user.name }
    }
  },
  created() {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) { // 正则：非空白就匹配
      this.show = true
    } else {
      this.show = false
    }
  },
  methods: {
    updatePasswordHandle () {
      this.updatePassowrdVisible = true
      this.$nextTick(() => {
        this.$refs.updatePassowrd.init()
      })
    },
    // 退出
    logoutHandle () {
      this.$confirm(`确定进行[退出]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/logout'),
          method: 'post',
          data: this.$http.adornData()
        }).then(({data}) => {
          if (data && data.code === 200) {
            clearLoginInfo()
            this.show = true
            // this.$router.push({ path: '/' })
          }
        })
      }).catch(() => {})
    },
    logout() {
      Vue.cookie.delete('token')
      this.show = true
    },
    handleSubmit ({ userName, password }) {
      this.$http({
        url: this.$http.adornUrl('/admin/sys/login'),
        method: 'post',
        data: this.$http.adornData({
          'username': userName,
          'password': password,
          'uuid': getUUID(),
          'captcha': '1111'
        })
      }).then(({data}) => {
        if (data && data.code === 200) {
          this.$cookie.set('token', data.token)
          this.show = false
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.login{
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  &-con{
    &-header{
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con{
      padding: 10px 0 0;
    }
    .login-tip{
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}

</style>
