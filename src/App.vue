<template>
  <div id="app" v-loading="loading">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
	data(){
		return{
			loading:false
		}
	}
}
</script>

<style>
#app{
  height: 100%;
}
</style>
