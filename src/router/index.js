import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/Index.vue'
import own from '@/pages/own'
import HotList from '@/pages/sub/index/HotList'
import Message from '@/pages/sub/index/Message'
import Explain from '@/pages/sub/index/Explain'
import HotEvaluate from '@/pages/sub/index/HotEvaluate'
import MainText from '@/pages/sub/MainText'
import plite from '@/pages/sub/plite'
import IndividualShar from '@/pages/sub/IndividualShar'
import overView from '@/pages/overView'
import morningNews from '@/pages/sub/News/morningNews'
import noonNews from '@/pages/sub/News/noonNews'
import homeExplain from '@/pages/sub/homePage/homeExplain'
import ranking from '@/pages/sub/homePage/ranking'
import table from '@/pages/sub/homePage/table'
import echartImg from '@/pages/sub/homePage/echartImg'
import echartImgRater from '@/pages/sub/homePage/echartImgRater'
import news from '@/pages/sub/sharSub/news'
import report from '@/pages/sub/sharSub/report'
import comment from '@/pages/sub/sharSub/comment'
import SearchPage from '@/pages/sub/search/SearchPage'
import Searched from '@/pages/sub/search/Searched'
import SearchDetail from '@/pages/sub/search/SearchDetail'
import HomePage from '@/pages/HomePage'
import login from '@/pages/login'
import AI from '@/pages/AI'
// import error from '@/pages/error'
// const login = () => import('@/pages/login')
// 因为登入界面不常用所以用lazyload

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/api/(.*)$',
      redirect: 'http://61.135.195.37:8000/api/$1'
    },
    {
      path: '/o',
      name: 'own',
      component: own
    },
    {
      path: '/L',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/HL',
          name: 'HotList',
          component: HotList
        },
        {
          path: '/MS',
          name: 'Message',
          component: Message
        },
        {
          path: '/EP',
          name: 'Explain',
          component: Explain
        },
        {
          path: '/HE',
          name: 'HotEvaluate',
          component: HotEvaluate
        }
      ]
    },
    {
      path: '/MT',
      name: 'MainText',
      component: MainText
    },
    {
      path: '/IS/:stockcode',
      name: 'IndividualShar',
      component: IndividualShar,
      children: [
        {
          path: '/news/:stockcode',
          component: news
        }, {
          path: '/report/:stockcode',
          component: report
        }, {
          path: '/comment/:stockcode',
          component: comment
        }]
    },
    {
      path: '/OV',
      name: 'overView',
      component: overView
    },
    {
      path: '/MN',
      name: 'morningNews',
      component: morningNews
    },
    {
      path: '/NN',
      name: 'noonNews',
      component: noonNews
    },
    {
      path: '/pt',
      name: 'plite',
      component: plite
    },
    {
      path: '/SP',
      name: 'SearchPage',
      component: SearchPage
    },
    {
      path: '/SE',
      name: 'Searched',
      component: Searched
    },
    {
      path: '/SD',
      name: 'SearchDetail',
      component: SearchDetail
    },
    {
      path: '/TB',
      name: 'table',
      component: table
    },
    {
      path: '/EI',
      name: 'echartImg',
      component: echartImg
    },
    {
      path: '/EIR',
      name: 'echartImgRater',
      component: echartImgRater
    },
    {
      path: '/HEN',
      name: 'homeExplain',
      component: homeExplain
    },
    {
      path: '/RK',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/Ai',
      name: 'AI',
      component: AI
    }
    // {
    //   path: '*',
    //   component: error
    // }
  ]
})
