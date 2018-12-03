import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app'
/*import user from './modules/user'
import permission from './modules/permission'*/

//自定义 TODO
import UsersModule from "./../Store/modules/UsersModule";
//自定义 TODO
import getters from './getters'
import title from './modules/title'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    token:''
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      sessionStorage.token = token
    },

    del_token(state) {
      state.token = ''
      sessionStorage.removeItem('token')
    },
  },
    modules: {
      users:UsersModule,  //自定义 TODO
    app,
    // user,
    // permission,
    title
  },
  getters
})

export default store
