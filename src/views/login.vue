<template>
    <div class="login" v-loading="loading">

        <div :class="['wrapper',{'form-success':!loginFormHide}]">
            <div class="container">
                <!-- <div class="title">
          <img class="logo" src="../assets/logo.png" alt="">
          <p>测试中心</p>
        </div> -->

                <!-- <transition name="el-fade-in-linear">
          <div class="login_form" v-show="loginFormHide">
            <div class="login_form_box" v-show="showLoginBox">
              <el-input :disabled="!showLoginBtn" v-model="login.username" @change="userType = false" :class="['login_input',{'input_err': userType}]" type="text" placeholder="用户名"></el-input>
              <el-input @keyup.enter.native="loginBtn()" :disabled="!showLoginBtn" v-model="login.password" @change="passType = false" :class="['login_input',{'input_err': passType}]" type="password" placeholder="密 码" show-password></el-input>
            </div>

            <div class="register_form_box" v-show="showRegisterBox">
              <el-input v-model="register.job_num" class='login_input' type="text" placeholder="工 号"></el-input>
              <el-input v-model="register.user_name" class='login_input' type="text" placeholder="用户名"></el-input>
              <el-input @keyup.enter.native="registerBtn()" v-model="register.password" class='login_input' type="password" placeholder="密 码"></el-input>
            </div>

            <div class="findBack_form_box" v-show="!showRegisterBox && !showLoginBox">
              <el-input v-model="findBack.jobNum" class='login_input' type="text" placeholder="工 号"></el-input>
              <el-input @keyup.enter.native="findBackBtn" v-model="findBack.user_name" class='login_input' type="text" placeholder="用户名"></el-input>
            </div>


            <div class="login_btn_box">
              <div class="register_box" v-show="showLoginBox">
                <button class="login_btn" @click="loginBtn">登录</button>
              </div>
              <div class="register_box" v-show="showRegisterBox">
                <button  class="register_btn" @click="registerBtn">注册</button>
              </div>
              <div class="register_box" v-show="!showRegisterBox && !showLoginBox">
                <button  class="findBack_btn" @click="findBackBtn">找回密码</button>
              </div>
              <el-button v-show="showRegisterBtn" style="color: #fff" type="text" class="checked_register_btn" @click="checkedBtn">{{!showLoginBox? '返回登录':"注册账号"}}</el-button>
              <el-button v-show="showFindBackBtn" style="color: #fff;margin-left: auto" type="text" class="checked_findBack_btn" @click="checkedFindBackBtn">找回密码</el-button>
            </div>

          </div>
        </transition> -->
            </div>

            <!-- 背景 -->
            <ul class="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            login: {},  // 登录
            register: {},  // 注册
            findBack: {}, // 找回密码

            loading: false,

            loginFormHide: true, // 登录框
            userType: false, // 用户名状态
            passType: false, // 密码状态

            showLoginBtn: true, // 登录按钮切换状态

            showLoginBox: true, // 登录窗口
            showRegisterBox: false, // 注册窗口

            showRegisterBtn: true, // 注册账号
            showFindBackBtn: true, // 找回密码按钮
        }
    },
    methods: {
        /**
         * @Description: 页面切换按钮
         * @author Wish
         * @date 2020/4/30
        */
        checkedBtn() {
            if (!this.showRegisterBox && !this.showLoginBox) {
                this.checkedLogin()
            } else {
                this.showLoginBtn = !this.showLoginBtn;
                this.showRegisterBox = !this.showLoginBtn
                this.showLoginBox = this.showLoginBtn
            }

        },

        /**
         * @Description: 切换登录界面
         * @author Wish
         * @date 2020/5/6
        */
        checkedLogin() {
            this.showLoginBox = true;
            this.showRegisterBox = false  //false
            this.showFindBackBtn = true
            this.login = {}
        },


        /**
         * @Description: 注册
         * @author Wish
         * @date 2020/4/30
        */
        registerBtn() {
            if (!this.register['job_num'] || !this.register['user_name'] || !this.register['password']) {
                return this.$message.warning('请填写' + (!this.register['job_num'] ? '工号' : !this.register['user_name'] ? '用户名' : !this.register['password'] ? '密码' : ''))
            }
            if (!Number.isFinite(Number(this.register.job_num))) {
                return this.$message.warning('工号仅能为数字，请输入正确的工号')
            }
            let pattern = new RegExp('^\\w+$')
            if (!pattern.test(this.register.user_name)) {
                return this.$message.warning('用户名仅能为英文、数字与下划线组合，请输入正确的用户名')
            }
            this.$axios.post('/user/register', this.register)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message.success(res.data.message)
                        this.login = {
                            user_name: this.register.user_name,
                            password: this.register.password
                        }
                        this.checkedBtn()
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
                .catch(res => {

                })
            console.log(this.register);
        },

        /**
         * @Description: 切换找回密码界面
         * @author Wish
         * @date 2020/4/30
        */
        checkedFindBackBtn() {
            this.showRegisterBox = false
            this.showLoginBox = false
            this.showFindBackBtn = false
        },

        /**
         * @Description: 找回密码
         * @author Wish
         * @date 2020/5/6    || !this.findBack['username']    !this.findBack['username']?'用户名':''
        */
        findBackBtn() {
            if (!this.findBack['jobNum']) {
                return this.$message.warning('请填写' + (!this.findBack['jobNum'] ? '工号' : ''))
            }
            this.$axios.post('/user/findBack', this.findBack)
                .then(res => {
                    let message = res.data.message
                    if (res.data.code === 0) {
                        if (message.includes('密码')) {
                            this.$alert(res.data.message, '您的密码', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            this.$message.warning(res.data.message)
                        }
                    } else {
                        this.$message.warning(res.data.message)
                    }
                    console.log(res);
                })

        },


        /**
         * @Description: 登录按钮
         * @author Wish
         * @date 2020/4/30
        */
        loginBtn() {
            localStorage.clear()
            this.loading = true
            if (!this.login['username'] || !this.login['password']) {
                this.userType = !this.login['username']
                this.passType = !this.login['password']
                return this.$message.warning('请输入' + (this.login['user_name'] ? '密码' : this.login['password'] ? '用户名' : '用户名和密码'))
            } else {
                let data = {
                    username: this.login['username'],
                    password: this.login['password']
                }
                this.$axios.post('/user/login', data)
                    .then(res => {
                        if (res.data.code === 0) {
                            if (res.data.message === '登录成功') {
                                this.loading = false
                                this.$message.success(res.data.message)
                                localStorage.login = JSON.stringify(this.login);
                                this.$router.push({
                                    name: 'Index'
                                })
                            } else {
                                this.$message.warning(res.data.message)
                                this.showFindBackBtn = true
                                this.loading = false
                            }
                        } else {
                            this.$message.warning(res.data.message)
                            this.loading = false
                        }
                    })
                // this.loginFormHide = false
            }
        },
    },
    mounted() {
        let login = localStorage.login ? JSON.parse(localStorage.login) : null
        if (login) {
            this.login = login
        }
    },
    created() {
        // if(localStorage.getItem('login')){ //登陆了自动跳到首页，来阻止重复登陆
        //   this.$router.push("/")
        // }
    }
}
</script>

<style scoped lang="less">
@prim: rgba(0, 123, 255, 0.8);
.wrapper {
    background: rgba(0, 123, 255, 0.8);
    background: -webkit-linear-gradient(
        top left,
        rgba(0, 123, 255, 0.8),
        rgba(0, 123, 255, 0.2)
    );
    background: -moz-linear-gradient(
        top left,
        rgba(0, 123, 255, 0.8),
        rgba(0, 123, 255, 0.2)
    );
    background: -o-linear-gradient(
        top left,
        rgba(0, 123, 255, 0.8),
        rgba(0, 123, 255, 0.2)
    );
    background: linear-gradient(
        to bottom right,
        rgba(0, 123, 255, 0.8),
        rgba(0, 123, 255, 0.2)
    );

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    &.form-success {
        .container {
            .title {
                transform: translateY(85px);
            }
        }
    }
}

.container {
    min-width: 400px;
    min-height: 280px;
    text-align: center;

    .title {
        font-size: 30px;
        transition-duration: 1s;
        transition-timing-function: ease-in-out;
        font-weight: 200;
        color: #fff;
        display: inline-flex;
        align-items: center;
        /*justify-content: center;*/
        position: relative;

        > img {
            width: 165px;
            object-fit: contain;
            margin-right: 5px;
        }
        > p {
            position: relative;
            padding-left: 10px;
            &::after {
                content: "";
                position: absolute;
                display: block;
                left: 0;
                top: 6px;
                height: 75%;
                background: #ffffff94;
                width: 2px;
            }
        }
    }
}

.login_form {
    padding: 30px 0;
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .login_form_box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .register_form_box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .findBack_form_box {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .login_input {
        width: unset;
        appearance: none;
        outline: 0;
        border: 1px solid fade(white, 40%);
        background-color: fade(white, 20%);
        border-radius: 3px;
        margin: 0 auto 10px auto;

        /deep/.el-input__inner {
            width: 300px;
            height: 100%;
            background: transparent;
            padding: 10px 15px;
            border: unset;
            text-align: center;
            color: white;
            transition-duration: 0.25s;
            font-weight: 300;
            font-size: 18px;
            transition: all 0.3s;
            &::placeholder {
                font-family: "Source Sans Pro", sans-serif;
                color: white;
                font-weight: 300;
            }
            &:focus {
                background-color: white;
                /*width: 350px;*/

                color: @prim;
            }
        }
        /*/deep/.el-input__suffix{*/
        /*  color: #fff;*/
        /*  .el-input__clear{*/
        /*    color: #fff;*/
        /*  }*/
        /*}*/

        &.input_err {
            border-color: fade(red, 40%);
        }

        &:hover {
            background-color: fade(white, 40%);
        }
    }

    .login_btn_box {
        width: 305px;
        display: flex;
        align-items: center;
        position: relative;
        button {
            appearance: none;
            outline: 0;
            border: 0;
            height: 40px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 3px;
            cursor: pointer;
            transition-duration: 0.25s;
            color: @prim;
            background-color: white;
        }
        .checked_btn {
            width: 40px;
            margin-right: 5px;
        }
        .login_btn {
            flex: 1;
            font-size: 18px;
        }
        .register_box {
            display: flex;
            align-items: center;
            position: relative;
            flex: 1;
            transition: all 0.3s;
            font-size: 16px;
            .register_btn {
                flex: 1;
                font-size: 1;
                /*&:last-child{*/
                /*  margin-left: 5px;*/
                /*}*/
            }
            .findBack_btn {
                flex: 1;
            }
        }
        .checked_register_btn {
            position: absolute;
            bottom: -40px;
            left: 0;
            background: transparent;
        }
        .checked_findBack_btn {
            position: absolute;
            bottom: -40px;
            right: 0;
            background: transparent;
        }
    }
}

.bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 1;

    li {
        position: absolute;
        list-style: none;
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: fade(white, 15%);
        bottom: -160px;

        -webkit-animation: circle 80s infinite;
        animation: circle 80s infinite;

        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;

        &:nth-child(1) {
            left: 10%;
        }

        &:nth-child(2) {
            left: 20%;

            width: 80px;
            height: 80px;

            animation-delay: 2s;
            animation-duration: 17s;
        }

        &:nth-child(3) {
            left: 25%;
            animation-delay: 4s;
        }

        &:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;

            animation-duration: 22s;

            background-color: fade(white, 25%);
        }

        &:nth-child(5) {
            left: 70%;
        }

        &:nth-child(6) {
            left: 80%;
            width: 120px;
            height: 120px;

            animation-delay: 3s;
            background-color: fade(white, 20%);
        }

        &:nth-child(7) {
            left: 32%;
            width: 160px;
            height: 160px;

            animation-delay: 7s;
        }

        &:nth-child(8) {
            left: 55%;
            width: 20px;
            height: 20px;

            animation-delay: 15s;
            animation-duration: 40s;
        }

        &:nth-child(9) {
            left: 25%;
            width: 10px;
            height: 10px;

            animation-delay: 2s;
            animation-duration: 40s;
            background-color: fade(white, 30%);
        }

        &:nth-child(10) {
            left: 90%;
            width: 160px;
            height: 160px;

            animation-delay: 11s;
        }
    }
}

@-webkit-keyframes circle {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-2000) rotate(600deg);
    }
}
@keyframes circle {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-2000px) rotate(600deg);
    }
}
</style>