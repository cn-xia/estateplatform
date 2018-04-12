<template>
    <div class="userbox">
        <el-row>
            <el-col :span="18" :offset="3">
                <div class="userbox-text">
                    {{question}}
                </div>
            </el-col>
            <el-col :span="2">
                <div class="userbox-img">
                    <img src="../../static/image/user.png">
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props:["question"],
    
}
</script>

<style>

</style>
