import { login, logout } from "@/api/system/login";
import { getMe } from "@/api/system/user";
import { getSysGroups } from "@/api/system/element";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    user_id: 0,
    name: "",
    avatar: "",
    roles: [],
    sys_groups: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_NICK_NAME: (state, roles) => {
      state.user_nickname = roles
    },
    SET_TYPE: (state, roles) => {
      state.rule_type = roles
      localStorage.setItem('rule_type',roles)
      switch (roles) {
        case 1:
          document.title = '平台管理员'
          break;
          case 2:
            document.title = '机构管理员'
            break;
            case 3:
              document.title = '校区管理员'
              break;
        default:
          break;
      }
    },
    SET_SYS_GROUPS: (state, groups) => {
      state.sys_groups = groups
    }
  },

  actions: {
    // 登录
    Login({ commit }, loginParam) {
      loginParam.user_name.trim();
      return new Promise((resolve, reject) => {
        login(loginParam)
          .then(response => {
            const data = response.data;
            // const payload = jwt.decode(data.token, TOKEN_SECRET, false, 'RS256')
            setToken(data.token);
            commit("SET_TOKEN", data.token);
            // commit('SET_USER_ID', payload.sub)
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUser({ commit }) {
      return new Promise((resolve, reject) => {
        getMe()
          .then(response => {
            const data = response.data;
            commit('SET_TYPE',data.user_role_type)
            commit('SET_NICK_NAME',data.user_nickname)
            commit("SET_NAME", data.user_name);
            commit("SET_AVATAR", data.avatar);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_USER_ID", 0);
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },

    // 获取后台分组标识
    GetSysGroups({ commit }) {
      return new Promise((resolve, reject) => {
        getSysGroups().then(response => {
            const data = response.data;
            commit('SET_SYS_GROUPS',data)
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  }
};

export default user;
