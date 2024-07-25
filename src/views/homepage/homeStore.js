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
        friend:[
            {
                nickName:'Muyou',
                remarks:'邓彩林',
                admin:'Rernsa',
                headImg:'../../../../public/img/headIMg/tx.jpg'
            },
            {
                nickName:'枫叶',
                remarks:'龙健',
                admin:'lj15758773891',
                headImg:'../../../../public/img/headIMg/2.jpg'
            },
            {
                nickName:'意在至高',
                remarks:'余洪用',
                admin:'yhy3141592653589793',
                headImg:'../../../../public/img/headIMg/1.jpg'
            },
            {
                nickName:'晴天&雨后',
                remarks:'熊豪',
                admin:'xh2311253104',
                headImg:'../../../../public/img/headIMg/3.jpg'
            },
            {
                nickName:'十三',
                remarks:'陈派',
                admin:'Selfdisciplineboycp',
                headImg:'../../../../public/img/headIMg/4.jpg'
            },

        ]
    }),
    getters:{
        friendQuery:(state)=>function (str){
            return state.friend.filter(function (val){
               return val.nickName.indexOf(str)!=-1 || val.admin.indexOf(str)!=-1 || val.remarks.indexOf(str)!=-1
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