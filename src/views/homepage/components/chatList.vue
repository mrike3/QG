<script setup>
import chartView from './chatView.vue'
import {onBeforeMount} from 'vue'
import {chatListStore} from '../homeStore.js'
import $http from "../../../../public/js/axiosapi.js";
import Dflex from "../../../components/flex.vue";
const store=chatListStore()
onBeforeMount(()=>{
  $http.post('/home/getFriends',{
    token:sessionStorage.getItem('token')
  }).then(res=>{
    if(res.data!=null){
      res.data.forEach(function (item,index){
        var friend={
          admin:item.user.admin,
          headImg:item.user.headImg,
          nickName:item.user.nickName,
          remarks:item.remarks
        }
        store.friends.push(friend)
      })
    }
  }).catch(e=>{
    alert(e)
  })
})
</script>

<template>
  <el-row style="width: 250px;height: 500px;flex-direction: column">
    <el-row style="width: 100%;height: 12%;background-color: rgba(254,254,254,0.5);border-right: 1px solid rgba(0,0,0,0.1)" justify="center" align="middle">
      <el-space style="width: 90%;height: 100%;background-color: transparent">
        <el-autocomplete placeholder="搜索" clearable v-model="store.SearchInput"
                         :trigger-on-focus="false"
                         :fetch-suggestions="store.friendQuery"
                         @select="store.querySelect"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
          <template #default="{ item }">
            <el-row justify="start" align="middle">
              <el-avatar :src="item.headImg" shape="square"></el-avatar>
              <h4 v-if="item.remarks!=''">{{item.remarks}}</h4>
              <h4 v-else>{{item.nickName}}</h4>
              <font>{{item.admin}}</font>
            </el-row>
          </template>
        </el-autocomplete>
        <el-button type="primary" plain>
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-space>
    </el-row>
    <el-row id="messageList" justify="start">
      <el-row class="messageList" justify="center" align="middle">
        <el-avatar :src="'/QG/img/headIMg/2.jpg'" ></el-avatar>
        <el-row style="height: 40px;width: 150px;flex-direction: column" align="middle">
          <el-row style="width: 100%;height: 50%;" justify="start">
            <el-text truncated style="color: black">地信 - 龙健1575877389100</el-text>
          </el-row>
          <el-row style="width: 100%;height: 50%;" justify="start">
            <el-text truncated style="color: rgba(80,80,80,0.5)" size="small">青春是众然梦想很远，踮起脚尖就能更近一些。</el-text>
          </el-row>
        </el-row>
        <el-row style="height: 40px;width: 40px;color: rgba(80,80,80,0.6);font-size: 13px" align="top">
          22:52
        </el-row>
      </el-row>
    </el-row>
  </el-row>
  <chartView></chartView>
</template>

<style scoped>
#messageList{
  width: 100%;height: 88%;overflow-y: scroll;background-color: rgba(220,220,220,0.5);flex-direction: column;
}
.messageList{
  width: 100%;
  height: 58px;
}
.messageList:hover{
  background-color: rgba(254,254,254,0.8);
}
</style>