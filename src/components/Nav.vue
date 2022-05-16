<template>
  <nav class="nav">
    <img class="logo" src="../assets/logo.png" alt="">
    <div class="nav_list">
      <router-link v-for="(item,index) in navList" :key="index" class="nav_btn" :to="item.path">{{item.name}}</router-link>
    </div>
    <div class="user_info">
      <el-dropdown trigger="click">
        <div class="el-dropdown-link">
          <span class="user_name">{{userName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><div @click="signOut()">退出登录</div></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </div>
  </nav>
</template>

<script>
  export default {
    name: "Nav",
    props:{
      navList: {
        type: Array,
        default: () => []
      }
    },
    data(){
      return {
        userName: ''
      }
    },
    methods:{
      /**
       * @Description: 退出登录按钮
       * @author Wish
       * @date 2020/5/6
      */
      signOut(){
        // localStorage.clear()
        this.$router.push('/login')
      },
    },
    mounted() {
      this.userName = localStorage.getItem('login')? JSON.parse(localStorage.getItem('login')).username: ''
    }
  }
</script>

<style scoped lang="less">
  .nav{
    display: flex;
    align-items: center;
    height: 60px;
    background: rgba(0,123,255,.8);
    padding: 0 20px;
    min-width: 800px;
    .logo{
      width: 120px;
      object-fit: contain;
    }
    .nav_list{
      margin-left: 30px;
      display: flex;
      align-items: center;
      height: 100%;
      &:hover{
        .nav_btn:not(:hover){
          color: rgba(255,255,255,.5);
        }
      }
      .nav_btn{
        height: 100%;
        padding: 0 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: all .3s;
        font-size: 16px;
        color: rgba(255,255,255,.5);
        &.router-link-exact-active{
          background: rgba(0,123,255,1);
          color: rgba(255,255,255,1) !important;
        }
        &:hover{
          background: rgba(0,123,255,1);
        }
        &:not(:last-child){
          margin-right: 20px;
        }
      }
    }
    .user_info{
      cursor: pointer;
      margin-left: auto;
      /deep/.el-dropdown{
        color: #fff;

      }
      .user_name{
        font-size: 18px;
      }
    }
  }
</style>