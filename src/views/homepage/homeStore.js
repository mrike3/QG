import { defineStore } from 'pinia'
import {ElNotification } from 'element-plus'

export const homeStore =defineStore('homeStore',{
    state:()=>({
        chatState:0,
        MyAdminState:false,
        friendCircleState:false,
        user:{
            admin:'',
            headImg:'',
            email:'',
            nickName:''
        },
    }),
    actions:{
        exitLogin(){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('oldtime')
            window.location.href='/'
        }
    }
})

export const chatListStore=defineStore('chatList',{
    state:()=>({
        SearchInput:'',
        friends:[]
    }),
    getters:{
        friendQuery:(state)=>function (str){
            return state.friends.filter(function (val){
               return val.nickName.indexOf(str)!=-1
                   || val.admin.indexOf(str)!=-1
                   || val.remarks.indexOf(str)!=-1
            })
        }
    },
    actions:{
        querySelect(str){
            ElNotification({
                title:'查询选中的好友',
                dangerouslyUseHTMLString:true,
                message:'<img width="35px" src="'+str.headImg+'" /><font>'+str.remarks+'</font><font>'+str.admin+'</font>',
                position: 'bottom-right',
                type:'info'
            })
        }
    }

})