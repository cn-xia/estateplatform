<template>
    <div class="index-content">
        <div class="index-row">
            <img src="../../static/image/logo.png">
        </div>
        <div class="index-row">
            <input class="index-input-box"  @keyup.enter="getResult()"  v-model="sorttext">
            <button class="index-button" @click="getResult()">搜 索</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            sorttext:"",
        }
    },
    methods:{
        getResult(){
            //console.log(this.sorttext);
            
        }
    }
}
</script>

<style>

</style>
