<template>
  <el-container id="app">
    <el-header v-if="$route.name !== 'Login'">
      <nav-div :navList="navList"></nav-div>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <!--
    <el-footer>
      <footer-div></footer-div>
    </el-footer>
    -->
  </el-container>
</template>

<script>
  export default {
    name: "App",
    components: {
      'navDiv': () => import('@/components/Nav'),
      'FooterDiv': () => import('@/components/Footer')
    },
    data(){
      return {
        navList: [
          {
            name: '日志查询',
            path: '/'
          }
        ],
      }
    },
  }
</script>

<style scoped lang="less">
  // 样式清除
  #app{
    height: 100%;
  }
  /deep/.el-header{
    height: unset !important;
    padding: unset !important;
  }
  /deep/.el-footer{
    padding: unset !important;
  }
  /deep/.el-table--small{
    .el-table__body-wrapper{
      font-size: 14px !important;
    }
  }
  /deep/.el-table{
    .el-table__header{
      tr{
        color: #fff;
        th{
          background-color: rgba(0, 123, 255, 0.8);
          border-right:1px solid #e6f0fa;
        }
      }
    }
    .el-table__body{
      .el-table__row{
        &.current-row{
          td{
            background: #D3EAFF !important;
          }
        }
        &.el-table__row--striped{
          td{
            background: #F0F5FA;
          }
        }
      }
    }
  }
  /deep/.el-button.el-button--primary{
    background-color: rgba(0, 123, 255, 0.8);
    border-color: rgba(0, 123, 255, 0.8);
  }
</style>
