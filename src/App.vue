<template>
  <div>
    <myheader></myheader>
    寿命：<input type="text" v-model="life">
    <button @click="clear()">clear</button>
    成長タイプ：
    <select v-model="selected">
      <option v-for="data in grow_type" v-bind:value="data.value" :key="data.text">{{ data.text }}</option>
    </select>
    <p>
      成長適正：すべてC、全週軽トレのみ（平均値）
    </p>
    <p v-if="life.length > 0">
      <span>成長タイプ: {{ grow_stages[selected].type }}</span>
        <table>
          <tbody>
            <tr v-for="(value,index) in grow_stages[selected].value" :key="index">
              <td>{{ grow_stage_names[index] }}</td>
              <td>{{ culcStage(index) }}</td>
              <td v-if="index < 10">{{ culcTrainLight(index) }}</td>
              <td v-else></td>
              <td v-if="index < 10">{{ culcStageWeek(index)*culcTrainLight(index) }}</td>
              <td v-else>（合計値計算未実装）</td>
            </tr>
          </tbody>
        </table>
      <span>黄金モモ：{{ culcPeach(true) }}</span><br>
      <span>白銀モモ：{{ culcPeach(false) }}</span><br>
      <span>テスト：{{ culcStageWeek(4) }}</span><br>
      <span>※成長タイプの端数処理は未実装です(取り急ぎ丸めただけです)</span>
    </p>
    <p v-else>
      (寿命が入力されていません))
    </p>
  </div>
</template>

<script>
import myheader from './components/myheader'
import grow_type from '../assets/grow_type.json'
// import training_light from '../assets/training_light.json'

export default {
  components: {
    myheader
  },
  data () {
    return {
      life: '300',
      selected: '2',
      // 成長タイプ。selectboxの中身。
      grow_type: grow_type ,
      // 成長パターン（軽トレ・Ｃのみ）。
      trainning_light: [
        { stage:"第１段階", value : [1,2,3,4] },
        { stage:"第２段階", value : [3,4,5,6] },
        { stage:"第３段階", value : [5,6,7,8] },
        { stage:"第４段階", value : [6,7,8,9] },
        { stage:"ピーク", value : [8,9,10,11] },
        { stage:"準ピーク", value : [7,8,9,10] },
        { stage:"第５段階", value : [6,7,8,9] },
        { stage:"第６段階", value : [5,6,7,8] },
        { stage:"第７段階", value : [4,5,6,7] },
        { stage:"第８段階", value : [2,3,4,5] }
      ],
      // 成長段階。後でローカルjsonにする
      grow_stages: [
        { type:"早熟", value : [0,5,10,20,30,35,40,55,70,80,100] },
        { type:"持続", value : [0,5,10,20,30,40,45,60,75,85,100] },
        { type:"普通", value : [0,10,20,35,50,60,65,75,80,85,100] },
        { type:"晩成", value : [0,15,30,45,60,70,80,85,90,95,100] }
      ],
      // 成長段階の名前。ローカル（略
      grow_stage_names: ["第1段階","第2段階","第3段階","第4段階","ピーク","準ピーク","第5段階","第6段階","第7段階","第8段階","（寿命）"]
    }
  },
  methods: {
    clear () {
      this.life = ''
    },
    // 延命アイテム計算用。どうせ黄金モモか白銀モモしかないので手抜き
    // todo:ピーク・準ピーク・４段階を配列で返すように変更する
    culcPeach (isGold) {
      var life=25;
      if(isGold) life=50;

      var peak1=this.culcStageWeek(4);
      if(peak1 > life) return "ピーク："+life;
      var return_msg="ピーク："+peak1;
      life-=peak1;

      var peak2=this.culcStageWeek(5);
      if(peak2 > life) return return_msg+"、準ピーク："+life;
      return_msg+="、準ピーク："+peak2;
      life-=peak2;

      return return_msg+="、第4(5)段階："+life;
    },
    // 適当すぎる計算をまとめようとした
    culcStageWeek (stage) {
      if(stage>9) return "えらー";
      if(stage<0) return "えらー";
      return this.culcStage(stage+1)-this.culcStage(stage);
    },
    // 適当すぎる計算をまとめようとした2
    culcStage (stage) {
      if(stage>10) return "えらー";
      if(stage<0) return "えらー";
      return Math.floor(this.grow_stages[this.selected].value[stage]*this.life/100);
    },
    // 軽トレ用 現在は平均値のみ返している
    // TODO:上２絞りパターンと上１厳選に対応する
    culcTrainLight (stage) {
      if(stage>10) return "えらー";
      if(stage<0) return "えらー";
      
      var sum  = function(arr) {
        var sum = 0;
        arr.forEach(function(elm) {
          sum += elm;
        });
        return sum;
      };
      var average = function(arr) {
        return sum(arr)/arr.length;
      };
      return average(this.trainning_light[stage].value);
    }
  }
}
</script>