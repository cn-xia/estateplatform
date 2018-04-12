<template>
  <div class="robotbox">
        <el-row>
            <el-col :span="2" :offset="1">
                <div class="robotbox-img">
                    <img src="../../static/image/robot.png">
                </div>
            </el-col>
            <el-col :span="17">
                <div class="robotbox-text">
                    <el-row>
                        您的问题是：<span style="color:#FF8C00">{{question}}</span>
                    </el-row>
                    <el-row>
                        <div v-if = "rsUnits.length>0" style="margin-bottom:5px;">
                            我为您找到了以下答案:
                        </div>
                        <div v-else style="color:#CD3333">
                            抱歉，我们目前还无法提供该问题的答案，我会尽快完善知识，期待下次能为您解答相关问题！
                        </div>
                    </el-row>
                    <el-row>
                        <div v-for="unit in rsUnits" :key="unit.id">    
                            <div class="robotbox-unit-title">
                                <span @click="jumpToSourceWeb(unit.link)">{{unit.title}}</span>
                            </div>
                        </div>
                    </el-row>
                    
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:["question","rsUnits"],
    data(){
        return{
        }
    },
    methods:{
        jumpToSourceWeb(link){
            window.open(link);
        }
    },
    mounted(){
        //console.log(this.rsUnits);
    }
}
</script>

<style>

</style>
