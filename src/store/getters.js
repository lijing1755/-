const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  signupTime: state => state.admix.signupTime,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
  school_list: state => state.user.school_list,
  school_id: state => Number(state.user.school_id),
  user_nickname:state => state.user.user_nickname,
  sys_groups:state => state.user.sys_groups
}
export default getters
