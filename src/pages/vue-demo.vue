<template>
    
</template>
<script >
Vue.use(VueRouter)
    Vue.use(VueRouter); // 安装插件
    var router = new VueRouter({   //配置路由对象
        routers:[{path:'/login',component:Login},
        //路由对象有了名字
        {name : 'login' 'path:'/register',components:Register},
       { path:'/register',components:Register}
        ]
    });

var App = {
    template : `
        <div>
            <router-view></router-view>
        </div>
        <router-link :to={name:login',query:{id:1}} params:{name:abd}"/mylogin">登录
        </router-link>
    ` 
}

// $route路由信息对象 只读对象
//$router路由操作对象 只写对象
路由对象有了名称就等于有了变量名  router-link只需说明这个变量名就可以
路由对象 只需说明这个变量就可以
router

  //  创建一个路由对象 保证login 保证路由的显示 
  路由合并请求
   具备axios对象的引用
   axios quanju 

</script>
<style scoped>


</style>

