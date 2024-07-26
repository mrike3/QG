import { defineStore } from 'pinia'
import $http from "../public/js/axiosapi.js";
import {ElMessage,ElMessageBox } from 'element-plus'
import $ from 'jquery'

//登录的数据
export const loginStore = defineStore('login', {
    state: () => ({
        user:{
            admin: '',
            password: ''
        },
        viewState:0
    }),
    getters: {

    },
    actions: {
        viewChange(index){
            this.viewState=index
        },
        login(){
            $http.post('/login', {
                admin: this.user.admin,
                password: this.user.password
            }).then(res => {
                if (res.data == "1") {
                    ElMessage({
                        type:'error',
                        message:'not this admin,please create your admin!',
                        plain:true
                    })
                } else if (res.data == "2") {
                    ElMessage({
                        type:'error',
                        message:'Password Error！',
                        plain:true
                    })
                } else {
                    sessionStorage.setItem('token', res.data)
                    sessionStorage.setItem('oldtime', new Date().getTime())
                    ElMessage({
                        type:'success',
                        message:'登陆成功',
                        plain:true
                    })
                    window.location.href = '/homepage'
                }
            }).catch(e => {
                ElMessageBox.alert(e,'错误提示')
            })
        }
    },
})

//注册的数据
export const registerStore=defineStore('register',{
    state:()=>({
        user:{
            email:'',
            admin:'',
            password:''
        },
        yzm:'',
        inputYzm:'',
        countdown:0,
        emit:null,
        flag:{
            emailState:false,
            adminState:false,
            passState:false,
        }
    }),
    getters:{
        inputEmail:(state)=>[
            {value:state.user.email+'@qq.com'},
            {value:state.user.email+'@163.com'},
            {value:state.user.email+'@outlook.com'},
            {value:state.user.email+'@sina.com'},
            {value:state.user.email+'@yahoo.com'},
            {value:state.user.email+'@gmail.com'},
            {value:state.user.email+'@sohu.com'},
            {value:state.user.email+'@sogou.com'},
        ]
    },
    actions:{
        emailCheck(){
            var emailRegular=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            var email=this.user.email
            if(email==''){
                ElMessage({
                    type:'error',
                    message:'请输入你的邮箱！',
                    plain:true
                })
                this.flag.emailState=false
            }else if(!emailRegular.test(email)){
                ElMessage({
                    type:'error',
                    message:'请输入正确的邮箱！',
                    plain:true
                })
                this.flag.emailState=false
            }else{
                this.flag.emailState=true
            }
        },
        // 账号验证
        adminCheck(){
            var adminRegular= /^\d{5,10}$/
            var admin=this.user.admin
            if(admin==''){
                ElMessage({
                    type:'error',
                    message:'请输入你的账号！',
                    plain:true
                })
                this.flag.adminState=false
            }else if(!adminRegular.test(admin)){
                ElMessage({
                    type:'error',
                    message:'请输入5-10位的账号！',
                    plain:true
                })
                this.flag.adminState=false
            }else{
                $http.post('/adminExist',{
                    admin:admin
                }).then(res=>{
                    if(res.data==true){
                        this.flag.adminState=false
                        ElMessage({
                            type:'error',
                            message:'账号已经存在！',
                            plain:true
                        })
                    }else{
                        this.flag.adminState=true
                    }
                }).catch(e=>{
                    ElMessageBox.alert(e,'error')
                })
            }
        },
        // 密码验证
        passCheck(){
            var passRegular= /^[a-zA-Z]\w{5,17}$/
            var pass=this.user.password
            if(pass==''){
                ElMessage({
                    type:'error',
                    message:'请输入你的密码！',
                    plain:true
                })
                this.flag.passState=false
            }else if(!passRegular.test(pass)){
                ElMessage({
                    type:'error',
                    message:'密码格式：以字母开头，长度在6~18之间，只能包含字符、数字和下划线！',
                    plain:true
                })
                this.flag.passState=false
            }else{
                this.flag.passState=true
            }
        },
        //发送验证码
         sendYzmM(){
            var btn=$('#senbtn').children().eq(0).children().eq(1).children().eq(0)
             if(this.flag.emailState){
                 btn.addClass('is-loading')
                 btn.attr('aria-disabled',true)
                 btn.prepend($('<i class="el-icon is-loading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z"></path></svg></i>'))
                 this.yzm=this.RandomYzm()
                $http.post('/sendYzm',{
                    toEmail:this.user.email,
                    title:'QG注册',
                    message:'尊敬的用户，你正在注册【QG】平台账号，验证码为【'+this.yzm+'】，请在1分钟内输入，此验证码仅用于注册，请勿泄露给他人！',
                }).then(res=>{
                    if(res.data==true){
                        ElMessage({
                            type:'success',
                            message:'验证码发送成功！',
                            plain:true
                        })
                        this.countdown=60
                        this.sendbtnflag=false
                    }
                }).catch(e=>{
                    alert(e)
                })
            }else{
                ElMessage({
                    type:'error',
                    message:'邮箱格式有误，请检查！',
                    plain:true
                })
            }
        },
        //随机验证码
         RandomYzm(){
            var a=''
            for (var i=0;i<6;i++){
                a+=Math.floor(Math.random()*10).toString()
            }
            return a
        },
        //注册账户
         registerAdmin(){
            if(this.flag.emailState && this.flag.adminState && this.flag.passState){
                if(this.countdown==0){
                    ElMessage({
                        type:'error',
                        message:'请发送验证码!',
                        plain:true
                    })
                }else if(this.inputYzm==this.yzm){
                    $http.post('/register',{
                        email:this.user.email,
                        admin:this.user.admin,
                        password:this.user.password
                    }).then(res=>{
                        if(res.data==true){
                            ElMessage({
                                type:'success',
                                message:'注册成功！',
                                plain:true
                            })
                            this.countdown=0
                            this.emit('RetLogin',0)
                        }else{
                            ElMessage({
                                type:'error',
                                message:'注册失败！',
                                plain:true
                            })
                        }
                    }).catch(e=>{
                        ElMessageBox.alert(e,'Error')
                    })
                }else{
                    ElMessage({
                        type:'error',
                        message:'验证码错误！',
                        plain:true
                    })
                }
            }else{
                ElMessage({
                    type:'error',
                    message:'请检查表单！',
                    plain:true
                })
            }
        },
        RetLogin(){
            this.emit('RetLogin',0)
        }
    }
})
//忘记密码数据
export const forgetPassStore=defineStore('forgetPass',{
    state:()=>({
        user:{
            admin:'',
            password:''
        },
        flag:{
            adminState:false,
            passState:false
        },
        yzm:'',
        inputYzm:'',
        countdown:0,
        emit:null
    }),
    actions:{
        sendYzm(){
            var btn=$('#senbtn').children().eq(0).children().eq(1).children().eq(0)
            if(!this.flag.adminState){
                ElMessage({
                    type:'error',
                    message:'请输入正确的账号！',
                    plain:true
                })
            }else{
                btn.addClass('is-loading')
                btn.attr('aria-disabled',true)
                btn.prepend($('<i class="el-icon is-loading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z"></path></svg></i>'))
                this.yzm=this.RandomYzm()
                $http.post('/sendYzm',{
                    title:'QG更改密码',
                    admin:this.user.admin,
                    message:'您正在更改QG账号【'+this.user.admin+'】的密码，验证码为【'+this.yzm+'】，请勿泄露给他人！'
                }).then(res=>{
                    if(res.data==true){
                        ElMessage({
                            type:'success',
                            message:'验证码发送成功！',
                            plain:true
                        })
                        this.countdown=60
                    }
                }).catch(e=>{
                    ElMessageBox.alert(e,'error')
                })
            }
        },
        RetLogin(){
            this.emit('RetLogin',0)
        },
        adminCheck(){
            var admin=this.user.admin
            if(admin==''){
                ElMessage({
                    type:'error',
                    message:'请输入账号！',
                    plain:true
                })
                this.flag.adminState=false
            }else{
                $http.post('/adminExist',{
                    admin:admin
                }).then(res=>{
                    if(res.data!=true){
                        //不存在
                        ElMessage({
                            type:'error',
                            message:'账号不存在！',
                            plain:true
                        })
                        this.flag.adminState=false
                    }else {
                        this.flag.adminState=true
                    }
                }).catch(e=>{
                    ElMessageBox.alert(e,'error')
                })
            }
        },
        passCheck(){
            var pass=this.user.password
            var passRegular= /^[a-zA-Z]\w{5,17}$/
            if(pass==''){
                ElMessage({
                    type:'error',
                    message:'请输入新密码！',
                    plain:true
                })
                this.flag.passState=false
            }else if (!passRegular.test(pass)){
                ElMessage({
                    type:'error',
                    message:'密码格式：以字母开头，长度在6~18之间，只能包含字符、数字和下划线！',
                    plain:true
                })
                this.flag.passState=false
            }else{
                this.flag.passState=true
            }
        },
        changePwd(){
            if(this.flag.adminState&&this.flag.passState){
                if(this.countdown==0){
                    ElMessage({
                        type:'error',
                        message:'请发送验证码！',
                        plain:true
                    })
                }else{
                    if(this.inputYzm==this.yzm){
                        $http.post('/ChangePass',{
                            admin:this.user.admin,
                            newPassword:this.user.password
                        }).then(res=>{
                            if(res.data==true){
                                ElMessage({
                                    type:'success',
                                    message:'密码修改成功！',
                                    plain:true
                                })
                                this.countdown=0
                                this.emit('RetLogin',0)
                            }else{
                                ElMessage({
                                    type:'error',
                                    message:'密码修改错误!',
                                    plain:true
                                })
                            }
                        }).catch(e=>{
                            ElMessageBox.alert(e,'error')
                        })
                    }else {
                        ElMessage({
                            type:'error',
                            message:'验证码不正确！',
                            plain:true
                        })
                    }
                }
            }else {
                ElMessage({
                    type:'error',
                    message:'请检查表单！',
                    plain:true
                })
            }
        },
        RandomYzm(){
            var a=''
            for (var i=0;i<6;i++){
                a+=Math.floor(Math.random()*10).toString()
            }
            return a
        }
    }
})