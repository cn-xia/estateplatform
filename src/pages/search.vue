<template>
  <div>
    <div class="search-top-bar">
      <div class="search-input-area">
        <input class="search-input-box" @keyup.enter="getResult()" v-model="searchtext" >
        <button class="search-button" @click="getResult()">搜 索</button>
      </div>
    </div>
    <div class="search-result-content">
      <div class="search-result-info">
          找到约 {{rsNumStr}} 条结果
      </div>
      <div>
        <el-row>
          <component :is="resultComp" v-for="rsUnit in rsUnits" :key=rsUnit.id 
            :question=rsUnit.question
            :resultText=rsUnit.answer
            :website=rsUnit.sourceweb
            >
          </component>
        </el-row>
      </div>
    </div>
    <div class="search-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page=curPage
        @current-change="handlePageChange"
        :total=rsNum>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ResultUnit from '../components/ResultUnit.vue'
//import testData from '../common/data/testData.json'   //demo用伪数据
//import goData from '../common/data/googleData.json'
var curQuesProcsed;
export default {
  data(){
    return{
      resultComp:"ResultUnit",
      rsNumStr:"",
      rsNum:10,
      searchtext:"",
      rsUnits:[],
      key:"",
      curPage:1
    }
  },
  components:{
    ResultUnit
  },
  methods:{
    init(){
      this.searchtext = this.$route.query.question;
    },
    //从服务器获取数据
    getAnswerFromServer(){
      var requestData={};
      requestData.question = this.$route.query.question;
      //console.log(requestData);
      var _this = this;
      $.get(this.ServerPath.ipAddress+this.ServerPath.getAnswer,requestData).done(function(res){
          //console.log(res);
          if(res.errCode==10){
            curQuesProcsed = "";
            res.keyWords.forEach(element =>{
                curQuesProcsed = curQuesProcsed+element+" ";
            });
            _this.getAnswerFromGoogle(1,curQuesProcsed);
          }
      });
    },
    getAnswerFromGoogle(startIndex,quesProcsed){
      var requestData={};
      requestData.key = "AIzaSyAB47tp2jJYwm1136krSRiksoBdLlGP8qM";
      requestData.cx = "001544261301121368412:csncfzyjp40";
      requestData.start = startIndex;
      requestData.q = quesProcsed;
      //console.log(requestData);
      var _this = this;
      $.get(this.ServerPath.demoAddress,requestData).done(function(res){
          //console.log(res);
          _this.setTestData(res);
      });
    },
    handlePageChange(val){
      var startIndex = 1+(val-1)*10;
      this.getAnswerFromGoogle(startIndex,curQuesProcsed);
    },
    //demo用伪数据
    setTestData(goData){
      //this.rsUnits = testData["result"];
      this.rsNumStr = goData.searchInformation.formattedTotalResults;
      this.rsNum = parseInt(goData.searchInformation.totalResults);
      var items = goData.items;
      this.rsUnits=[];
      var id=1;
      items.forEach(element => {
        var unit = {};
        unit.id = id;
        unit.question = element.title;
        var snippet = element.snippet.replace(/\n/g,"");
        unit.answer = snippet;
        unit.sourceweb = element.link;
        this.rsUnits.push(unit);
        id = id+1;
      });
    },
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
      this.getAnswerFromServer();
      //this.getAnswerFromGoogle(1);
    }
  },
  mounted(){
    this.init();
    this.getAnswerFromServer();
    //this.setTestData(goData);
    //this.getAnswerFromGoogle(1)
  }
}
</script>

<style>

</style>
