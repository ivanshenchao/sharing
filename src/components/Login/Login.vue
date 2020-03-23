<template>
  <div class="login">
    <v-Cdyiersan></v-Cdyiersan>
  </div>
	
</template>

<script>
	import Password from './Password'
  import Message from './Message'
  import Cdyiersan from './Cdyiersan'
  import Cqyiyoumeng from './Cqyiyoumeng'
	export default{
		data(){
			return{
        activeName:'user',
        cdyiersan: true,
        password: false
			}
    },
    name: 'login',
		components:{
			'v-password' : Password,
      'v-Message' : Message,
      'v-Cdyiersan' : Cdyiersan,
      'v-Cqyiyoumeng' : Cqyiyoumeng
		},
    methods: {
    
    },
	mounted(){
       
  }
	}
</script>

<style lang="scss">
	.login{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: relative;
  }
</style>
