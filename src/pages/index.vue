<template>
    <div class="index-content">
        <div class="index-row">
            <img src="../../static/image/logo.png">
        </div>
        <div class="index-row">
            <input class="index-input-box"  @keyup.enter="getResult()"  v-model="searchtext">
            <button class="index-button" @click="getResult()">搜 索</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchtext:"",
        }
    },
    methods:{
        
        getResult(){
            //字符串判空或全是空格
            if(this.searchtext.match(/^[ ]*$/)){
                this.searchtext = "";
                return;
            }
            //跳转到search界面
            var requestData = {};   //{'question':searchtext}
            requestData.question = this.searchtext;
            this.$router.push({path:'/search',query:{question:this.searchtext}});
            
        }
    }
}
</script>

<style>

</style>
