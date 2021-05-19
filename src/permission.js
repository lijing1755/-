import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie } from './utils/cookies.js'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  console.log('跳转页面:', to)
  NProgress.start() // start progress bar

  if (getCookie('token')) { // determine if there has token
    /* has token*/

    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.addRouters <= 3) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUser').then(res => { // 拉取user_info
          localStorage.setItem('organization_name',res.data.organization_name)
          store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if (to.path === '/') {
              next({
                path: store.getters.addRouters[0].redirect,
                replace: true
              })
            } else {
              next({
                ...to,
                replace: true
              }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }
            NProgress.done()
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => { // Front end log out
            Message.error(err === 'error' ? 'Verification failed, please login again' : err)
            next({
              path: '/'
            })
          })
        })
      } else {
        if (to.path === '/') {
          next({
            path: store.getters.addRouters[0].redirect,
            replace: true
          })
        } else {
          next()
        }
        NProgress.done()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
