// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import locale from 'iview/dist/locale/zh-TW';
import axios from 'axios'
Vue.use(iView,{locale});


var Mock = require('mockjs');
var users={
  account:'admin',
  password:123456
}
Mock.mock('http://www.bakesi.com/login','post',function(options){
  console.log(options.body)
  var option = JSON.parse(options.body)
  console.log(option)
  var account = option.account;
  var password = option.password;
  if(account == users.account && password == users.password){
    return JSON.stringify({code:0,data:[{name:'admin'}],msg:'登陸成功'})
  }else{
    return JSON.stringify({code:1001,data:null,msg:'用戶名或密碼錯誤'})
  }
})



Vue.config.productionTip = false

Vue.prototype.$http = axios

// axios({
//   method: 'post',
//   url: 'http://www.bakesi.com/login',
//   data:{account:'admin',
//   password:123456},
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }

// }).then((res)=>{
//   console.log(res);
// })



router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

iView.LoadingBar.config({
  color: '#ED4014',
  failedColor: '#f0ad4e',
  height: 2
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
