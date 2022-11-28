<template>
 <div class="center-info">
  <div class="center-logo">
    <img src="~assets/img/profile/avatar.svg" alt="">
  </div>
  <div class="login-info">
    <div class="login">
      <span>登录</span>/
      <span>注册</span>
    </div>
    <div class="phone">
      <img src="~assets/img/profile/phone.svg" alt="">
      <span>暂无绑定手机号码</span>
    </div>
  </div>
  <div class="enter">
    <img src="~assets/img/common/arrow-left.svg" alt="">
  </div>
 </div>
</template>

<script>
 export default {
  name: 'ProfileCenter',
  components: {

   }
 }
</script>

<style scoped>

  .center-info {
    display: flex;
    position: relative;
    background-color:  var(--color-tint);
  }

  /* 头像logo */
  .center-info img {
    width: 50px;
    height: 50px;
  }
  .center-logo {
    /* background-color: pink; */
    width: 50px;
    height: 50px;
    margin: 10px;
  }
  
  /* 登录注册信息 */
  .login-info{
    margin: 15px 15px 15px 5px;
    color: #fff;
  }

  .login {
    margin-left: 5px;
  }

  .phone {
    display: flex;
    margin-top: 5px;
    justify-content: center;
    align-items: center;
  }

  .login-info .phone img {
    width: 20px;
    height: 25px;
  }

  .login-info .phone span {
    font-size: 13px;
  }
  
  /* 进入个人中心页面 */
  .enter img {
    position: absolute;
    right: 17px;
    top: 26px;
    width: 20px;
    height: 20px;
  }

</style>
