<template>
  <div>
      <el-col :span="12">
          <div class="result-unit-area">
              <el-row>
                  <div class="result-unit-title">
                      <span @click="dialogVisible = true">{{question}}</span>
                  </div>
              </el-row>
              <el-row>
                  <div class="result-unit-text">
                      <span>{{resultText}}</span>
                  </div>
              </el-row>
              <el-row>
                  <div class="result-unit-website">
                      <span @click="jumpToSourceWeb()">{{website}}</span>
                  </div>
              </el-row>
          </div>
      </el-col>
      <el-dialog
        width="55%"
        :visible.sync="dialogVisible"
        top="5vh"
        >
        <el-row>
            <div class="dialog-title">
                {{question}}
            </div>
            <!-- <div class="dialog-info">
                <span>{{date}}</span>
                <span>笔者 {{autor}}</span>
            </div> -->
            <div>
                <textarea readonly class="dialog-text" v-model="resultText"></textarea>
            </div>
            <div class="dialog-link" @click="jumpToSourceWeb()">
                访问文字来源平台
            </div>
        </el-row>
      </el-dialog>
  </div>
</template>

<script>
import testData from '../common/data/testData.json'
export default {
    props:["question","resultText","website"/* ,"date","autor" */],
    data(){
        return{
            /* question:"", */
            //resultText:"",
            //website:"",
            dialogVisible:false,
            //date:"",
        }
    },
    methods:{
      setResult(){
          /* this.question = testData["result"][0].question;
          this.resultText = testData["result"][0].answer;
          this.website = testData["result"][0].sourceweb;
          this.date = testData["result"][0].date; */
      },
      jumpToSourceWeb(){
        window.open(this.website);
      }
    },
    mounted(){
        //this.setResult();
    }
}
</script>

<style>

</style>
