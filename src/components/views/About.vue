<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" >
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form'
export default {
  name: 'login',
  components: {LoginForm},
  methods: {
    handleSubmit ({ userName, password }) {
      alert(3)
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
