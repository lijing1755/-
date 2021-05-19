import { asyncResolveRouterMap, constantRouterMap } from '@/router'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return asyncResolveRouterMap().then(accessedRouters => {
        // accessedRouters[0].meta.icon = 'link'
        // let iconArr = ['link','link','link','link','link','link',];
        accessedRouters.forEach((element, index) => {
          if (index != accessedRouters.length - 1) {
            // || index !=accessedRouters.length-2
            element.meta = {
              icon: element.meta.icon,
              title: element.meta.title
            }
          }
          // console.log(element.meta.title,'element');
        })
        console.log(accessedRouters, '看看后台返回的路由',)
        commit('SET_ROUTERS', accessedRouters)
      })
    }
  }
}

export default permission
