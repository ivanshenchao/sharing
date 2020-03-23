import Vue from "vue"
import Vuex from "Vuex"
Vue.use(Vuex);

let state = {
	token:''
}

let mutations = {
	setToken(state,token){
		state.token = token;
		sessionStorage.token = token;
	},
	delToken(state){
		state.token = '';
		sessionStorage.removeItem("token")
	}
}
console.log(state.token);

let getters = {
	
}

let actions = {
	
}

const store = new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})

export default store