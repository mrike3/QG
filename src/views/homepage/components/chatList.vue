<script setup>
import Dflex from "../../../components/flex.vue";
import chartView from './chatView.vue'
import {chatListStore} from '../homeStore.js'
const store=chatListStore()
</script>

<template>
  <Dflex id="chatList" direction="column">
    <Dflex id="queryBox">
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
            <Dflex style="justify-content: space-around">
              <el-avatar :src="item.headImg" shape="square"></el-avatar>
              <h4>{{item.remarks}}</h4>
              <font style="display: none">{{item.admin}}</font>
            </Dflex>
          </template>
        </el-autocomplete>
        <el-button type="primary" plain>
          <el-icon><Plus /></el-icon>
        </el-button>
      </el-space>
    </Dflex>
    <Dflex id="messageList" direction="column">
<!--      聊天列表-->
      <Dflex class="messageList">
        <el-avatar :src="'../../../../public/img/headIMg/2.jpg'" ></el-avatar>
        <Dflex style="height: 40px;width: 150px;align-items: center" direction="column">
          <Dflex style="width: 100%;height: 50%;justify-content: flex-start">
            <el-text truncated style="color: black">地信 - 龙健1575877389100</el-text>
          </Dflex>
          <Dflex style="width: 100%;height: 50%;justify-content: flex-start">
            <el-text truncated style="color: rgba(80,80,80,0.5)" size="small">青春是众然梦想很远，踮起脚尖就能更近一些。</el-text>
          </Dflex>
        </Dflex>
        <Dflex style="height: 40px;width: 40px;align-items: flex-start;color: rgba(80,80,80,0.6);font-size: 13px">
          22:52
        </Dflex>
      </Dflex>
    </Dflex>

  </Dflex>
  <chartView></chartView>
</template>

<style scoped>
#chatList{
  width: 250px;
  height: 500px;
}
#queryBox{
  background-color: rgba(254,254,254,0.5);width: 100%;height: 12vh;border-right: 1px solid rgba(0,0,0,0.1)
}
#messageList{
  width: 100%;height: 88vh;overflow-y: scroll;background-color: rgba(220,220,220,0.5);justify-content: flex-start
}
.messageList{
  width: 100%;
  height: 58px;
}
.messageList:hover{
  background-color: rgba(254,254,254,0.8);
}
</style>