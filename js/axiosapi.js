import axios from "axios";
const axiosapi =axios.create({
    baseURL:'http://localhost:8080/',
    timeout:60000,
    responseType:'json',
})
axiosapi.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axiosapi.interceptors.request.use((req)=>{
    var token=sessionStorage.getItem('token')
    if(req.url=='/login' || req.url=='/register'|| req.url=='/ChangePass' || req.url=='/sendYzm'||req.url=='/adminExist'){
        return req
    }
    if(token==null){
        window.location.href='/QG/login'
        return Promise.reject('please frist login your admin！')
    }else{
        var oldtime=sessionStorage.getItem('oldtime')
        var now=new Date()
        var cha=(now-parseInt(oldtime)) % (1000 * 60 * 60) / (1000 * 60)
        if(cha>30 ){
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('oldtime')
            window.location.href='/QG/login'
            return Promise.reject('please frist login your admin！')
        }else {
            req.headers['Authorization'] = token
            return req
        }
    }

},(error)=>{
    return Promise.reject(error)
})

export default axiosapi