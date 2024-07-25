<script setup>
import { registerStore } from '../counter.js'
import $ from "jquery";
const counter=registerStore()
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
      <h2>Create your QG admin</h2>
      <el-autocomplete @blur="counter.emailCheck" clearable style="width: 340px"
                       v-model="counter.user.email" placeholder="your mail"
                       :trigger-on-focus="false" :fetch-suggestions="counter.inputEmail"
      >
        <template #prefix>
          <svg t="1721562401356" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5180" width="15" height="15"><path d="M690.944 628.352c52.821333 40.277333 88.32 48.682667 110.805333 38.613333 14.762667-6.656 25.386667-22.229333 31.573334-39.466666a341.461333 341.461333 0 0 0-150.613334-411.050667 341.333333 341.333333 0 1 0-170.026666 637.013333l0.256 85.333334a424.874667 424.874667 0 0 1-214.186667-57.216C94.677333 763.733333 24.746667 502.784 142.592 298.752c117.76-204.074667 378.752-274.005333 582.826667-156.16a426.752 426.752 0 0 1 188.202666 513.877333 172.202667 172.202667 0 0 1-20.096 39.466667c-14.378667 21.077333-33.066667 38.186667-56.832 48.853333-56.618667 25.429333-125.653333 8.106667-206.08-55.338666a213.333333 213.333333 0 1 1 60.330667-61.098667z m-178.858667 11.733333a128 128 0 1 0 0-256 128 128 0 0 0 0 256z" fill="#cdcdcd" p-id="5181"></path></svg>
        </template>
      </el-autocomplete>
      <el-input v-model="counter.user.admin" placeholder="your admin" @blur="counter.adminCheck"  clearable style="width: 340px;">
        <template #prefix><el-icon><User /></el-icon></template>
      </el-input>
      <el-input type="password" v-model="counter.user.password" show-password placeholder="your password" @blur="counter.passCheck" style="width: 340px;">
        <template #prefix><el-icon><Lock /></el-icon></template>
      </el-input>
      <div id="senbtn">
        <el-input placeholder="Verification Code"  v-model="counter.inputYzm">
          <template #append>
            <el-button @click="counter.sendYzmM()" v-if="counter.countdown==0" loading-icon="Eleme" >
              发送验证码
            </el-button>
            <el-button style="width: 100px" v-else-if="counter.countdown>0" disabled>
              {{counter.countdown}}s
            </el-button>
          </template>
        </el-input>
      </div>
      <el-button style="width: 340px;height: 30px; " @click="counter.registerAdmin" type="primary" round plain>Register</el-button>
      <p style="text-align: center">
        Already have an account！go
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