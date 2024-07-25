<script setup>
import { forgetPassStore } from '../counter.js'
import $ from "jquery";

const counter=forgetPassStore()
const emit=defineEmits(['RetLogin'])
counter.emit=emit

setInterval(function (){
  if(counter.countdown>0){
    counter.countdown=counter.countdown-1
    if(counter.countdown==0){
      var btn=$('#senbtn').children().eq(0).children().eq(1).children().eq(0)
      btn.removeClass('is-loading')
      btn.attr('aria-disabled',false)
      btn.children().eq(0).remove()
      counter.yzm=''
    }
  }
},1000)
</script>

<template>
  <el-row style="width: 100%;height: 100vh" justify="center" align="middle">
    <el-row id="app" justify="space-evenly" align="middle">
      <h2>Retrieve your password</h2>
      <dv-decoration-6 style="width:300px;height:30px;" />
      <el-input clearable v-model="counter.user.admin" placeholder="your admin" @blur="counter.adminCheck" style="width: 340px">
        <template #prefix><el-icon><User /></el-icon></template>
      </el-input>
      <el-input type="password" placeholder="your new password" v-model="counter.user.password" @blur="counter.passCheck" show-password style="width: 340px">
        <template #prefix><el-icon><Lock /></el-icon></template>
      </el-input>
      <div id="senbtn">
        <el-input placeholder="Verification Code"  v-model="counter.inputYzm">
          <template #append>
            <el-button @click="counter.sendYzm" v-if="counter.countdown==0" loading-icon="Eleme" >
              发送验证码
            </el-button>
            <el-button style="width: 100px" v-else-if="counter.countdown>0" disabled>
              {{counter.countdown}}s
            </el-button>
          </template>
        </el-input>
      </div>
      <el-button type="primary" style="width:340px;" @click="counter.changePwd" round plain >
        Update Password
      </el-button>
      <p style="text-align: center">
        I remember my password！go
        <el-link @click="counter.RetLogin" type="primary">Login</el-link>
      </p>
    </el-row>
  </el-row>
</template>

<style scoped>
#app{
  width: 400px;
  height: 450px;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  box-shadow: -10px 0px 30px 5px lightgrey;
  flex-direction: column;
}
#senbtn{
  width: 340px;
  height: 36px;
}
</style>