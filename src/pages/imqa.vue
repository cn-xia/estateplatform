<template>
  <div>
      <el-row>
          <el-col :span="16" :offset="4">
              <div class="im-panel">
                  <el-row>
                      <div class="im-header">
                      </div>
                  </el-row>
                  <el-row>
                      <el-col :span="17">
                          <el-row>
                              <div  id="imWindow" class="im-dialog">
                                    <component :is="unit.type" v-for="unit in infoList" :key="unit.id"
                                        :question=unit.question
                                        :rsUnits=unit.rsUnits>
                                    </component>
                              </div>
                          </el-row>
                          <el-row>
                              <div class="im-sendbox">
                                  <el-col :span="19">
                                      <textarea class="im-sendbox-text" :placeholder="placeholder" v-model="questionText" @keyup.enter="sendQuestion()"></textarea>
                                  </el-col>
                                  <el-col :span="4">
                                      <button class="im-sendbox-button" @click="sendQuestion()">发送</button>
                                  </el-col>
                              </div>
                          </el-row>
                      </el-col>
                      <el-col :span="7">
                          <div class="im-helpbox">
                              <div class="im-helpbox-title">
                                常见问题
                              </div>
                              <div class="im-helpbox-title-line">
                              </div>
                              <div class="im-helpbox-question" v-for="ques in commonQusList" :key="ques.id">
                                  <span @click="quickInput(ques.title)">{{ques.title}}</span>
                              </div>
                          </div>
                      </el-col>
                  </el-row>
              </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
import userdialogbox from "../components/userdialogbox.vue"
import robotdialogbox from "../components/robotdialogbox.vue"
var requestData;
export default {
    data(){
        return{
            questionText:"",
            placeholder:"您好！输入框在这里，您可以输入想要咨询的问题，我来为您解答！",
            infoList:[/* {id:1,type:"userdialogbox",question:"一百万能买什么样的房子"},{id:2,type:"robotdialogbox"} */],
            commonQusList:[
                {id:1,title:"买房子贷款需要走什么程序"},
                {id:2,title:"如何查看房屋产权年限"},
                {id:3,title:"房屋转让需要什么手续"},
                {id:4,title:"房屋拆迁补偿协议"},
                {id:5,title:"杭州房屋摇号政策细则"}
            ],
        }
    },
    components:{
        userdialogbox,
        robotdialogbox
    },
    methods:{
        init(){
            requestData={};
            requestData.key = "AIzaSyAB47tp2jJYwm1136krSRiksoBdLlGP8qM";
            requestData.cx = "001544261301121368412:csncfzyjp40";
            requestData.num = 3;
        },
        sendQuestion(){
            if(this.questionText.match(/^[ ]*$/)){
                this.questionText = "";
                return;
            }
            var qunit = {};
            var count = this.infoList.length;
            qunit.id = count+1;
            qunit.type = "userdialogbox";
            qunit.question = this.questionText;
            this.infoList.push(qunit);
            //this.scrollControl("imWindow")
            var serverData = {};
            serverData.question = this.questionText;
            var _this = this;
            $.get(this.ServerPath.ipAddress+this.ServerPath.getAnswer,serverData).done(function(res){
                //console.log(res);
                if(res.errCode == 10){
                    //console.log(res);
                    var quesProcessed = "";
                    res.keyWords.forEach(element =>{
                        quesProcessed = quesProcessed+element+" ";
                    });
                    _this.applyAnswer(quesProcessed);
                }
                
            });

          


        },
        applyAnswer(quesProcessed){
            var aunit ={};
            var count = this.infoList.length;
            aunit.id = count+1;
            aunit.question = this.questionText;
            aunit.type = "robotdialogbox";
            
            requestData.q = quesProcessed;
            this.questionText ="";
            //console.log(this.infoList)

            var _this = this;
            $.get(this.ServerPath.demoAddress,requestData).done(function(goData){
                var items = goData.items;
                var rsUnits = [];
                var id=1;
                items.forEach(element => {
                    var rs = {};
                    rs.id = id;
                    rs.title = element.title;
                    var snippet = element.snippet.replace(/\n/g,"");
                    rs.snippet = snippet;
                    rs.link = element.link;
                    rsUnits.push(rs);
                    id = id+1;
                });
                aunit.rsUnits = rsUnits;
                _this.infoList.push(aunit);
                //_this.scrollControl("imWindow");
            });
  
                 
        },
        quickInput(val){
            this.questionText = val;
            this.sendQuestion();
        },
        scrollControl(id){
            var mdiv = document.getElementById(id);
            mdiv.scrollTop = mdiv.scrollHeight;
        }
    },
    mounted(){
        this.init();
    }
}
</script>

<style>
body{
    background-color: #dfdfdf;
}
</style>
