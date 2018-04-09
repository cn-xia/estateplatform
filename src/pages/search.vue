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
          找到约 {{rsNum}} 条结果
      </div>
      <div>
        <el-row>
          <component :is="resultComp" v-for="rsUnit in rsUnits" :key=rsUnit.id 
            :question=rsUnit.question
            :resultText=rsUnit.answer
            :website=rsUnit.sourceweb
            :date=rsUnit.date
            :autor=rsUnit.autor>
          </component>
        </el-row>
      </div>
    </div>
    <div class="search-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="430">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ResultUnit from '../components/ResultUnit.vue'
import testData from '../common/data/testData.json'   //demo用伪数据
export default {
  data(){
    return{
      resultComp:"ResultUnit",
      rsNum:430,
      searchtext:"",
      rsUnits:[],
      key:""
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
      $.get(this.ServerPath.ipAddress+this.ServerPath.getAnswer,requestData).done(function(res){
          //console.log(res);
      });
    },
    //demo用伪数据
    getTestData(){
      this.rsUnits = testData["result"];
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
      //this.getAnswerFromServer();
    }
  },
  mounted(){
    this.init();
    //this.getAnswerFromServer();
    this.getTestData();
  }
}
</script>

<style>

</style>
