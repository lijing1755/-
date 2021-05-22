import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

import { listMyTree as listElementTree } from '@/api/system/element'
import path from 'path'
import test from "./module/test"
import template from "./module/template"
import element from "./module/element"
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    ...(test(Layout)),
    ...(template(Layout)),
    ...(element(Layout))
    // {
    //   path: '/',
    //   component: Layout,
    //   redirect: '/system/user',
    //   name: 'index',
    //   hidden: true
    // }
    // {
    //   path: '/',
    //   component: Layout,
    //   redirect: '/main',
    //   name: 'index',
    //   hidden: true
    // }
]

function resolveRuleRecurcively(ruleList, basePath = '/') {
    return ruleList.map(item => {
        const route = {
            component: Layout,
            meta: {},
            hidden: item.ele_type === 'BUTTON'
        }

        route.path = item.ele_key
        route.name = item.ele_name
        route.meta.title = item.ele_name
        route.meta.icon = item.ele_icon
        if (item.children && item.children.length > 0 && item.children.every(e => e.ele_type === 'BUTTON')) {
            route.childrenHidden = true
            try {
                const module = path.resolve(basePath, route.path)
                const component = () =>
                    import (`@/views${module}/index`)
                route.component = component
            } catch (err) {
                console.error(err)
            }
        }
        if (typeof(item.children) !== 'undefined' && item.children && item.children.length > 0) {
            const tmpBasePath = path.resolve(basePath, route.path)

            route.children = resolveRuleRecurcively(item.children, tmpBasePath)
                // 取子菜单第一个元素的路径
            if (item.children && item.children[0].ele_type !== 'BUTTON') {
                route.redirect = path.resolve(tmpBasePath, route.children[0].path)
            }
            // 顶节点处理完子菜单后将basePath置空，并在path前追加/
            const is_toppest = tmpBasePath.split('/').length - 1 === 1
            if (is_toppest) {
                basePath = '/'
                route.path = basePath.concat(route.path)
            }
            route.icon = item.ele_icon
        } else {
            try {
                const module = path.resolve(basePath, route.path)
                const component = () =>
                    import (`@/views${module}/index`)
                route.component = component
            } catch (err) {
                console.error(err)
            }
        }
        return route
    })
}

export function asyncResolveRouterMap() {
    return listElementTree(-1, ['MENU', 'PAGE', 'BUTTON']).then(res => resolveRuleRecurcively(res.data).concat([{ path: '*', redirect: '/404', hidden: true }]))
}

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})